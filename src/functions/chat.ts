import { Handler, HandlerEvent } from "@netlify/functions";
import Client from "services/beebot-service";
// import Client from "services/alibaba-cloud-v2";
// import Client from "services/alibaba-cloud";

const handler: Handler = async (event: HandlerEvent) => {
  const reqBody = event?.body ? JSON.parse(event.body) : {};
  console.log(reqBody);
  const chatBotInstanceId = 123;
  const chat = await Client.main({
    chatBotInstanceId,
    utterance: reqBody.utterance,
  });
  console.log("chat", chat.body);
  // let client = Client.main([]);
  // let client = Client.createClient();
  // let welcome = Client.beginSession(client, "123");
  // let chat = Client.chat(client, "123", "");
  // let chat = Client.chat(["asdf"]);
  // Client.main(process.argv.slice(2));

  return {
    statusCode: 200,
    body: JSON.stringify(chat.body),
  };
};

export { handler };
// FirstCategory
