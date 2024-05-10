import request from "request";
import { Event, Handler } from "../types";
import { withPreflightResponse } from "utils/middleware";
import { verifyAuthToken } from "utils/token";
import Client from "services/beebot-service";

function callSendAPI(senderPsid, response) {
  // The page access token we have generated in your app settings
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

  // Construct the message body
  let requestBody = {
    recipient: {
      id: senderPsid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: ACCESS_TOKEN },
      method: "POST",
      json: requestBody,
    },
    (err, _res, _body) => {
      if (!err) {
        console.log("Message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

function handlePostback(senderPsid, receivedPostback) {
  let response;

  // Get the payload for the postback
  let payload = receivedPostback.payload;

  // Set the response based on the postback payload
  if (payload === "yes") {
    response = { text: "Thanks!" };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback
  callSendAPI(senderPsid, response);
}

async function handleMessage(senderPsid, receivedMessage) {
  let response;

  // Checks if the message contains text
  if (receivedMessage.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of your request to the Send API
    if (receivedMessage.text === "hi") {
      const chatBotInstanceId = 123;
      const chat = await Client.main({
        chatBotInstanceId,
        utterance: receivedMessage.text,
      });
      console.log("chat", chat.body);
      response = {
        text: chat.body.data.messages[0].text.content,
      };
    } else if (receivedMessage.text === "hi!") {
      response = {
        text: `Helo! what is your name?`,
      };
    } else if (receivedMessage.text === "nick") {
      response = {
        text: `Hi ${receivedMessage.text}! how can I help you?`,
      };
    } else {
      response = {
        text: `You sent the message: '${receivedMessage.text}'. Wait! we'll find you something.`,
      };
    }
  } else if (receivedMessage.attachments) {
    // Get the URL of the message attachment
    let attachmentUrl = receivedMessage.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachmentUrl,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes",
                },
                {
                  type: "postback",
                  title: "No!",
                  payload: "no",
                },
              ],
            },
          ],
        },
      },
    };
  }

  // Send the response message
  callSendAPI(senderPsid, response);
}

const _handler: Handler = async (event: Event) => {
  console.log("req body", event.httpMethod);
  if (event.httpMethod === "POST") {
    const body = event?.body ? JSON.parse(event.body) : {};
    if (body.object === "page") {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function (entry) {
        // Gets the body of the webhook event
        let webhookEvent = entry.messaging[0];
        console.log(webhookEvent);

        // Get the sender PSID
        let senderPsid = webhookEvent.sender.id;
        console.log("Sender PSID: " + senderPsid);

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhookEvent.message) {
          handleMessage(senderPsid, webhookEvent.message);
        } else if (webhookEvent.postback) {
          handlePostback(senderPsid, webhookEvent.postback);
        }
      });

      // Returns a '200 OK' response to all requests
      return {
        statusCode: 200,
        body: "EVENT_RECEIVED",
      };
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      return {
        statusCode: 404,
      };
    }
  }

  if (event.httpMethod === "GET") {
    // Your verify token. Should be a random string.
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    // Parse the query params
    let mode = event.queryStringParameters["hub.mode"];
    let token = event.queryStringParameters["hub.verify_token"];
    let challenge = event.queryStringParameters["hub.challenge"];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        return {
          statusCode: 200,
          body: challenge,
        };
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        return {
          statusCode: 403,
        };
      }
    }
  }
};

const handler = verifyAuthToken(_handler);
export { handler };
