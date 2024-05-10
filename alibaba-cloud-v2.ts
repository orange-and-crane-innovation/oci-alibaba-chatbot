// This file is auto-generated, don't edit it
import Console from "@alicloud/tea-console";
import OpenApi, * as $OpenApi from "@alicloud/openapi-client";
import Util from "@alicloud/tea-util";
import Env from "@alicloud/darabonba-env";
import Chatbot20220408, * as $Chatbot20220408 from "@alicloud/chatbot20220408";
import * as $tea from "@alicloud/tea-typescript";

export default class Client {
  static createClient(
    accessKeyId: string,
    accessKeySecret: string
  ): Chatbot20220408 {
    let config = new $OpenApi.Config({});
    // 您的AccessKey ID
    config.accessKeyId = accessKeyId;
    // 您的AccessKey Secret
    config.accessKeySecret = accessKeySecret;
    // endpoing 固定值chatbot.cn-shanghai.aliyuncs.com
    config.endpoint = "chatbot.cn-shanghai.aliyuncs.com";
    return new Chatbot20220408(config);
  }

  static createBot(client: Chatbot20220408): string {
    let createBotRequest = new $Chatbot20220408.CreateInstanceRequest({
      languageCode: "zh-cn",
      name: "场景示例测试机器人",
      introduction: "场景示例测试机器人",
      robotType: "scenario_im",
    });
    let response = await client.createInstance(createBotRequest);
    return response.body.instanceId;
  }

  static queryBots(
    client: Chatbot20220408
  ): $Chatbot20220408.ListInstanceResponseBody {
    let queryBotsRequest = new $Chatbot20220408.ListInstanceRequest({
      pageNumber: 1,
      pageSize: 10,
    });
    let response = await client.listInstance(queryBotsRequest);
    return response.body;
  }

  static describeBot(
    client: Chatbot20220408,
    instanceId: string
  ): $Chatbot20220408.DescribeInstanceResponseBody {
    let describeBotRequest = new $Chatbot20220408.DescribeInstanceRequest({
      instanceId: instanceId,
    });
    let response = await client.describeInstance(describeBotRequest);
    return response.body;
  }

  static deleteBot(
    client: Chatbot20220408,
    instanceId: string
  ): $Chatbot20220408.DeleteInstanceResponseBody {
    let deleteBotRequest = new $Chatbot20220408.DeleteInstanceRequest({
      instanceId: instanceId,
    });
    let response = await client.deleteInstance(deleteBotRequest);
    return response.body;
  }

  static createCategory(client: Chatbot20220408): number {
    let createCategoryRequest = new $Chatbot20220408.CreateCategoryRequest({
      name: "场景示例类目",
      parentCategoryId: -1,
    });
    let response = await client.createCategory(createCategoryRequest);
    return response.body.category.categoryId;
  }

  static createFaq(
    client: Chatbot20220408,
    categoryId: number
  ): $Chatbot20220408.CreateFaqResponseBody {
    let createFaqRequest = new $Chatbot20220408.CreateFaqRequest({
      title: "场景示例faq",
      categoryId: categoryId,
      solutionContent: "场景示例faq答案",
    });
    let response = await client.createFaq(createFaqRequest);
    return response.body;
  }

  static createPublishTask(
    client: Chatbot20220408,
    categoryId: number
  ): number {
    let createPublishTaskRequest =
      new $Chatbot20220408.CreatePublishTaskRequest({
        bizType: "faq",
        dataIdList: [`${categoryId}`],
      });
    let response = await client.createPublishTask(createPublishTaskRequest);
    return response.body.id;
  }

  static getPublishTaskState(
    client: Chatbot20220408,
    taskId: number
  ): $Chatbot20220408.GetPublishTaskStateResponseBody {
    let getPublishTaskStateRequest =
      new $Chatbot20220408.GetPublishTaskStateRequest({
        id: taskId,
      });
    let response = await client.getPublishTaskState(getPublishTaskStateRequest);
    return response.body;
  }

  static linkInstanceCategory(
    client: Chatbot20220408,
    instanceId: string,
    categoryId: number
  ): $Chatbot20220408.LinkInstanceCategoryResponseBody {
    let linkInstanceCategoryRequest =
      new $Chatbot20220408.LinkInstanceCategoryRequest({
        instanceId: instanceId,
        categoryIds: `[${categoryId}]`,
      });
    let response = await client.linkInstanceCategory(
      linkInstanceCategoryRequest
    );
    return response.body;
  }

  static createInstancePublishTask(
    client: Chatbot20220408,
    instanceId: string
  ): $Chatbot20220408.CreateInstancePublishTaskResponseBody {
    let createInstancePublishTaskRequest =
      new $Chatbot20220408.CreateInstancePublishTaskRequest({
        instanceId: instanceId,
      });
    let response = await client.createInstancePublishTask(
      createInstancePublishTaskRequest
    );
    return response.body;
  }

  static getInstancePublishTaskState(
    client: Chatbot20220408,
    instanceId: string,
    id: number
  ): $Chatbot20220408.GetInstancePublishTaskStateResponseBody {
    let getInstancePublishTaskStateRequest =
      new $Chatbot20220408.GetInstancePublishTaskStateRequest({
        instanceId: instanceId,
        id: id,
      });
    let response = await client.getInstancePublishTaskState(
      getInstancePublishTaskStateRequest
    );
    return response.body;
  }

  static chat(
    client: Chatbot20220408,
    instanceId: string,
    perspective: string
  ): $Chatbot20220408.ChatResponseBody {
    let chatRequest = new $Chatbot20220408.ChatRequest({
      instanceId: instanceId,
      utterance: "场景示例faq",
      perspective: [perspective],
    });
    let response = await client.chat(chatRequest);
    return response.body;
  }

  static deleteFaq(
    client: Chatbot20220408,
    knowledgeId: number
  ): $Chatbot20220408.DeleteFaqResponseBody {
    let deleteFaqRequest = new $Chatbot20220408.DeleteFaqRequest({
      knowledgeId: knowledgeId,
    });
    let response = await client.deleteFaq(deleteFaqRequest);
    return response.body;
  }

  static deleteCategory(
    client: Chatbot20220408,
    categoryId: number
  ): $Chatbot20220408.DeleteCategoryResponseBody {
    let deleteCategoryRequest = new $Chatbot20220408.DeleteCategoryRequest({
      categoryId: categoryId,
    });
    let response = await client.deleteCategory(deleteCategoryRequest);
    return response.body;
  }

  static beginSession(
    client: Chatbot20220408,
    instanceId: string
  ): $Chatbot20220408.BeginSessionResponseBody {
    let beginSessionRequest = new $Chatbot20220408.BeginSessionRequest({
      instanceId: instanceId,
    });
    let response = await client.beginSession(beginSessionRequest);
    return response.body;
  }

  static feedback(
    client: Chatbot20220408,
    messageId: string
  ): $Chatbot20220408.FeedbackResponseBody {
    let feedbackRequest = new $Chatbot20220408.FeedbackRequest({
      messageId: messageId,
      feedback: "good",
    });
    let response = await client.feedback(feedbackRequest);
    return response.body;
  }

  static createPerspective(
    client: Chatbot20220408
  ): $Chatbot20220408.CreatePerspectiveResponseBody {
    let createPerspectiveRequest =
      new $Chatbot20220408.CreatePerspectiveRequest({
        name: "场景化示例测试视角",
      });
    let response = await client.createPerspective(createPerspectiveRequest);
    return response.body;
  }

  static createSolution(
    client: Chatbot20220408,
    knowledgeId: number,
    perspectiveCode: string
  ): $Chatbot20220408.CreateSolutionResponseBody {
    let createSolutionRequest = new $Chatbot20220408.CreateSolutionRequest({
      content: "场景化示例测试视角答案",
      contentType: 0,
      knowledgeId: knowledgeId,
      perspectiveCodes: [perspectiveCode],
    });
    let response = await client.createSolution(createSolutionRequest);
    return response.body;
  }

  static async deletePerspective(
    client: Chatbot20220408,
    perspectiveId: string
  ): $Chatbot20220408.DeletePerspectiveResponseBody {
    let deletePerspectiveRequest =
      new $Chatbot20220408.DeletePerspectiveRequest({
        perspectiveId: perspectiveId,
      });
    let response = await client.deletePerspective(deletePerspectiveRequest);
    return response.body;
  }

  static async describePerspective(
    client: Chatbot20220408,
    perspectiveId: string
  ): $Chatbot20220408.DescribePerspectiveResponseBody {
    let describePerspectiveRequest =
      new $Chatbot20220408.DescribePerspectiveRequest({
        perspectiveId: perspectiveId,
      });
    let response = await client.describePerspective(describePerspectiveRequest);
    return response.body;
  }

  static async main(args: string[]): Promise<void> {
    let client = Client.createClient(
      Env.getEnv("ACCESS_KEY_ID"),
      Env.getEnv("ACCESS_KEY_SECRET")
    );
    Console.log(
      "场景示例：创建机器人，创建faq类目，创建faq，创建不同视角的faq答案，通过发布中心发布faq，查询faq发布状态，机器人绑定faq，机器人发布，faq问答，切换视角问答，删除机器人并发布，删除faq，删除faq类目，发布faq类目"
    );
    Console.log("创建机器人");
    let instanceId = Client.createBot(client);
    Console.log(instanceId);
    Console.log("====================================================");
    Console.log("查询机器人列表");
    let queryBots = Client.queryBots(client);
    Console.log(Util.toJSONString($tea.toMap(queryBots)));
    Console.log("====================================================");
    Console.log("查询机器人详情");
    let descrebeBot = Client.describeBot(client, instanceId);
    Console.log(Util.toJSONString($tea.toMap(descrebeBot)));
    Console.log("====================================================");
    Console.log("创建faq类目");
    let categoryId = Client.createCategory(client);
    Console.log(Util.toJSONString(categoryId));
    Console.log("====================================================");
    Console.log("创建faq");
    let createFaq = Client.createFaq(client, categoryId);
    Console.log(Util.toJSONString($tea.toMap(createFaq)));
    Console.log("====================================================");
    Console.log("创建视角：场景化示例测试视角");
    let createPerspective = Client.createPerspective(client);
    Console.log(Util.toJSONString($tea.toMap(createPerspective)));
    Console.log("====================================================");
    Console.log("查询视角详情");
    let describePerspective = Client.describePerspective(
      client,
      createPerspective.perspectiveId
    );
    Console.log(Util.toJSONString($tea.toMap(describePerspective)));
    Console.log("====================================================");
    Console.log("创建faq视角答案：场景化示例测试视角的答案");
    let createSolutionResponse = Client.createSolution(
      client,
      createFaq.knowledgeId,
      describePerspective.perspectiveCode
    );
    Console.log(Util.toJSONString($tea.toMap(createSolutionResponse)));
    Console.log("====================================================");
    let publishTaskId = Client.createPublishTask(client, categoryId);
    Console.log(Util.toJSONString(publishTaskId));
    Console.log("====================================================");

    while (true) {
      await Util.sleep(1000);
      let publishTaskState = Client.getPublishTaskState(client, publishTaskId);
      if (Util.equalString(publishTaskState.status, "FE_SUCCESS")) {
        break;
      } else if (Util.equalString(publishTaskState.status, "FE_FAILED")) {
        return;
      } else if (Util.equalString(publishTaskState.status, "FE_RUNNING")) {
        Console.log("Fallback");
      }
    }
    Console.log("====================================================");
    let linkInstanceCategory = Client.linkInstanceCategory(
      client,
      instanceId,
      categoryId
    );
    Console.log(Util.toJSONString($tea.toMap(linkInstanceCategory)));
    Console.log("====================================================");
    let createInstancePublishTask = Client.createInstancePublishTask(
      client,
      instanceId
    );
    Console.log(Util.toJSONString($tea.toMap(createInstancePublishTask)));
    Console.log("====================================================");

    while (true) {
      await Util.sleep(1000);
      let getInstancePublishTaskState = Client.getInstancePublishTaskState(
        client,
        instanceId,
        createInstancePublishTask.id
      );
      if (Util.equalString(getInstancePublishTaskState.status, "FE_SUCCESS")) {
        break;
      } else if (
        Util.equalString(getInstancePublishTaskState.status, "FE_FAILED")
      ) {
        return;
      } else if (
        Util.equalString(getInstancePublishTaskState.status, "FE_RUNNING")
      ) {
        Console.log("Fallback");
      }
    }
    Console.log("====================================================");
    let beginSession = Client.beginSession(client, instanceId);
    Console.log(Util.toJSONString($tea.toMap(beginSession)));
    let chatResponse = Client.chat(client, instanceId, "");
    Console.log(Util.toJSONString($tea.toMap(chatResponse)));
    let feedback = Client.feedback(client, chatResponse.messageId);
    Console.log(Util.toJSONString($tea.toMap(feedback)));
    Console.log("====================================================");
    let perspectiveChatResponse = Client.chat(
      client,
      instanceId,
      describePerspective.perspectiveCode
    );
    Console.log(Util.toJSONString($tea.toMap(perspectiveChatResponse)));
    Console.log("====================================================");
    let deleteBot = Client.deleteBot(client, instanceId);
    Console.log(Util.toJSONString($tea.toMap(deleteBot)));
    Console.log("====================================================");

    while (true) {
      await Util.sleep(1000);
      let getInstancePublishTaskState = Client.getInstancePublishTaskState(
        client,
        instanceId,
        deleteBot.id
      );
      if (Util.equalString(getInstancePublishTaskState.status, "FE_SUCCESS")) {
        break;
      } else if (
        Util.equalString(getInstancePublishTaskState.status, "FE_FAILED")
      ) {
        return;
      } else if (
        Util.equalString(getInstancePublishTaskState.status, "FE_RUNNING")
      ) {
      }
    }
    Console.log("====================================================");
    let faqDeleteResponse = Client.deleteFaq(client, createFaq.knowledgeId);
    Console.log(Util.toJSONString($tea.toMap(faqDeleteResponse)));
    Console.log("====================================================");
    let deleteFaqPublishTaskId = Client.createPublishTask(client, categoryId);
    Console.log(Util.toJSONString(deleteFaqPublishTaskId));
    Console.log("====================================================");

    while (true) {
      await Util.sleep(1000);
      let publishTaskState = Client.getPublishTaskState(
        client,
        deleteFaqPublishTaskId
      );
      if (Util.equalString(publishTaskState.status, "FE_SUCCESS")) {
        break;
      } else if (Util.equalString(publishTaskState.status, "FE_FAILED")) {
        return;
      } else if (Util.equalString(publishTaskState.status, "FE_RUNNING")) {
      }
    }
    let deleteCategoryResponse = Client.deleteCategory(client, categoryId);
    Console.log(Util.toJSONString($tea.toMap(deleteCategoryResponse)));
    Console.log("====================================================");
    let deleteCategoryPublishTaskId = Client.createPublishTask(
      client,
      categoryId
    );
    Console.log(Util.toJSONString(deleteCategoryPublishTaskId));
    Console.log("====================================================");

    while (true) {
      await Util.sleep(1000);
      let publishTaskState = Client.getPublishTaskState(
        client,
        deleteCategoryPublishTaskId
      );
      if (Util.equalString(publishTaskState.status, "FE_SUCCESS")) {
        break;
      } else if (Util.equalString(publishTaskState.status, "FE_FAILED")) {
        return;
      } else if (Util.equalString(publishTaskState.status, "FE_RUNNING")) {
      }
    }
    Console.log("====================================================");
    let deletePerspective = Client.deletePerspective(
      client,
      createPerspective.perspectiveId
    );
    Console.log(Util.toJSONString($tea.toMap(deletePerspective)));
    Console.log("====================================================");
  }
}
