import request from "request";
import { Event, Handler } from "../types";
import { withPreflightResponse } from "utils/middleware";
import { verifyAuthToken } from "utils/token";
import Client from "services/beebot-service";
import axios from "axios";
import { knowledge } from "knowledge-base";

async function callSendAPI(senderPsid, response) {
  // The page access token we have generated in your app settings
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  console.log("ACCESS_TOKEN", ACCESS_TOKEN);

  // Construct the message body
  let requestBody = {
    recipient: {
      id: senderPsid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  console.log(
    "fb request",
    JSON.stringify({
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: ACCESS_TOKEN },
      method: "POST",
      json: requestBody,
    })
  );
  return axios.post(
    "https://graph.facebook.com/v2.6/me/messages",
    requestBody,
    {
      params: { access_token: ACCESS_TOKEN },
    }
  );
  return request(
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
  console.log("POSTBACK RECEIVED", payload);
  const results = knowledge.filter((k) => {
    return payload === k.question;
  });
  console.log("results", results);
  const result = results[0] || knowledge[0];
  if (result) {
    response = {
      text: result.answer,
    };
    callSendAPI(senderPsid, response);
    const to = setTimeout(() => {
      result.options.map((opt, idx) => {
        if (idx + 1 < result.options.length) {
          response = buildAttachment(opt);
          callSendAPI(senderPsid, response);
        }
      });
      clearTimeout(to);
    }, 1000);
    const to2 = setTimeout(() => {
      response = buildAttachment(result.options[result.options.length - 1]);
      callSendAPI(senderPsid, response);
      clearTimeout(to2);
    }, 4000);
  }

  // Send the message to acknowledge the postback
  // callSendAPI(senderPsid, response);
}

const buildAttachment = (option) => {
  const btnData: any = {
    type: option.type,
  };
  if (option.type === "postback") {
    btnData.payload = option.question;
    btnData.title = option.buttonLabel;
  }
  if (option.type === "web_url") {
    btnData.url = option.answer;
    btnData.title = "Bisitahin and Link";
  }
  // return {
  //   attachment: {
  //     type: "template",
  //     payload: {
  //       template_type: "button",
  //       text: "What do you want to do next?",
  //       buttons: [
  //         {
  //           type: "web_url",
  //           url: "https://www.messenger.com",
  //           title: "Visit Messenger",
  //         },
  //         {
  //           type: "web_url",
  //           url: "https://www.messenger1.com",
  //           title: "Visit Messenger2",
  //         },
  //         {
  //           type: "web_url",
  //           url: "https://www.messenger2.com",
  //           title: "Visit Messenger3",
  //         },
  //       ],
  //     },
  //   },
  // };
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        // elements: buttons.map((btn, i) => {
        //   return {
        //     title: title,
        //     subtitle: subtitle,
        //     // image_url:
        //     //   "https://www.rappler.com/tachyon/r3-assets/612F469A6EA84F6BAE882D2B94A4B421/img/F8B8017CF6C940E7BE742DD09BE3FEDA/rizal-park_d5eb7d95eaad426fb486fce5243c5642_F8B8017CF6C940E7BE742DD09BE3FEDA.jpg",
        //     buttons: () => {
        //       const data: any = {
        //         type: btn.type,
        //         title: btn.question,
        //       };
        //       if (btn.type === "postback") data.payload = btn.question;
        //       if (btn.type === "web_url") data.url = btn.answer;
        //       return [data];
        //     },
        //   };
        // }),

        elements: [
          {
            // title: option.question,
            subtitle: option.question,
            // image_url:
            //   "https://www.rappler.com/tachyon/r3-assets/612F469A6EA84F6BAE882D2B94A4B421/img/F8B8017CF6C940E7BE742DD09BE3FEDA/rizal-park_d5eb7d95eaad426fb486fce5243c5642_F8B8017CF6C940E7BE742DD09BE3FEDA.jpg",
            buttons: [btnData],
            // buttons: buttons.map((btn, i) => {
            //   const data: any = {
            //     type: btn.type,
            //     title: btn.question,
            //   };
            //   if (btn.type === "postback") data.payload = btn.question;
            //   if (btn.type === "web_url") data.url = btn.answer;
            //   return data;
            // }),
          },
        ],
      },
    },
  };
};

async function handleMessage(senderPsid, receivedMessage) {
  let response;

  if (receivedMessage.text) {
    const result = knowledge[0];
    response = {
      text: result.answer,
    };
    callSendAPI(senderPsid, response);
    const to = setTimeout(() => {
      result.options.map((opt, idx) => {
        if (idx + 1 < result.options.length) {
          response = buildAttachment(opt);
          callSendAPI(senderPsid, response);
        }
      });
      clearTimeout(to);
    }, 1000);
    const to2 = setTimeout(() => {
      response = buildAttachment(result.options[result.options.length - 1]);
      callSendAPI(senderPsid, response);
      clearTimeout(to2);
    }, 4000);

    // else {
    //   const chatBotInstanceId = process.env.ALIBABA_ROBOT_ID;
    //   console.log("chatBotInstanceId", chatBotInstanceId);
    //   console.log("receivedMessage.text", receivedMessage.text);
    //   console.log("process.env.ACCESS_TOKEN", process.env.ACCESS_TOKEN);
    //   const chat = await Client.main({
    //     chatBotInstanceId,
    //     utterance: receivedMessage.text,
    //   });

    //   let text =
    //     chat.body.data?.messages?.[0]?.knowledge?.summary ||
    //     chat.body.data?.messages?.[0]?.text?.content;
    //   response = {
    //     text,
    //   };
    //   if (
    //     text ===
    //     "I haven't learned this question yet. It has been recorded and will learn to answer it for you as soon as possible. Please try to ask me other questions."
    //   ) {
    //     // console.log("chat", chat.body);
    //     // console.log("data", chat.body.data);
    //     // console.log("messages[0]", chat.body.data.messages[0]);
    //     response = {
    //       text: knowledge[0].answer,
    //     };
    //     if (knowledge[0].options)
    //       response.quick_replies = knowledge[0].options.map((o) => {
    //         return {
    //           content_type: "text",
    //           title: o.question,
    //           payload: o.question,
    //           // image_url: "http://example.com/img/red.png",
    //         };
    //       });
    //   }
    // }
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
  // callSendAPI(senderPsid, response);
}

const _handler: Handler = async (event: Event) => {
  console.log("req body", event.body);
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
