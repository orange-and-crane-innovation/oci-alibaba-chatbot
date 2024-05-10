import Chatbot20220408, * as $Chatbot20220408 from "@alicloud/chatbot20220408";
import OpenApi, * as $OpenApi from "@alicloud/openapi-client";
import Console from "@alicloud/tea-console";
import Util, * as $Util from "@alicloud/tea-util";
import * as $tea from "@alicloud/tea-typescript";

export default class Client {
  /**
   * Client
   * @return Client
   * @throws Exception
   */
  static createClient(): Chatbot20220408 {
    let config = new $OpenApi.Config({
      // Nick
      // accessKeyId: "LTAI5tNRYX8mq2S6s5Bgxvwo",
      // accessKeySecret: "s49qoxd7KBcj6pj6PiSEGNMUy5pU6O",
      // Jiggy
      accessKeyId: "LTAI5tPurR4AmJim5mW2VHve",
      accessKeySecret: "2HNopbtk5BEQQOm1X4X7kJXQJp5kQK",

      // type: "access_key",
      // regionId: "ap-southeast-1",

      // accessKeyId: process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'],
      // accessKeySecret: process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET'],
    });
    // Endpoint https://api.aliyun.com/product/Chatbot

    config.endpoint = `chatbot.cn-shanghai.aliyuncs.com`;
    // config.endpoint = `chatbot.ap-southeast-1.aliyuncs.com`;
    return new Chatbot20220408(config);
  }

  static async main(args: string[]): Promise<void> {
    let client = Client.createClient();
    // let createDocRequest = new $Chatbot20220408.CreateDocRequest({});
    // let runtime = new $Util.RuntimeOptions({});
    try {
      let queryBots = Client.queryBots(client);
      // let resp = await client.createDocWithOptions(createDocRequest, runtime);
      // Console.log(Util.toJSONString(resp));
    } catch (error) {
      console.log(error.message);
      console.log(error.data["Recommend"]);
      Util.assertAsString(error.message);
    }
  }

  static async queryBots(
    client: Chatbot20220408
  ): Promise<$Chatbot20220408.ListInstanceResponseBody> {
    let queryBotsRequest = new $Chatbot20220408.ListInstanceRequest({
      pageNumber: 1,
      pageSize: 10,
    });
    let response = await client.listInstance(queryBotsRequest);
    return response.body;
  }

  static async beginSession(
    client: Chatbot20220408,
    instanceId: string
  ): Promise<$Chatbot20220408.BeginSessionResponseBody> {
    // const client = Client.createClient();
    let beginSessionRequest = new $Chatbot20220408.BeginSessionRequest({
      instanceId: instanceId,
    });
    let response = await client.beginSession(beginSessionRequest);
    return response.body;
  }

  static async chat(client, instanceId, perspective): Promise<void> {
    // let client = Client.createClient();
    let chatRequest = new $Chatbot20220408.ChatRequest({
      instanceId: instanceId || "123",
      utterance: "hey",
      perspective: [perspective],
      sessionId: "9c6ebdc6e66f46ecadab3434314f6959",
    });
    let runtime = new $Util.RuntimeOptions({});
    try {
      console.log("TRY CHAT");
      // await client.chatWithOptions(chatRequest, runtime);
      let response = await client.chat(chatRequest);
      console.log("chat response", response);
    } catch (error) {
      console.log(error.message);
      console.log(error.data["Recommend"]);
    }
  }
}

// Client.main(process.argv.slice(2));
