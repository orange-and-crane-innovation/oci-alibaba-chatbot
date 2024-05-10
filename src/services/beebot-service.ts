// This file is auto-generated, don't edit it
// Dependent modules can be viewed by downloading the module dependency file in the project or obtaining SDK dependency information in the upper right corner
import cams20200606, * as $cams20200606 from "@alicloud/cams20200606";
import OpenApi, * as $OpenApi from "@alicloud/openapi-client";
import Util, * as $Util from "@alicloud/tea-util";
import * as $tea from "@alicloud/tea-typescript";

export default class Client {
  /**
   * Initialize the Client with the AccessKey of the account
   * @return Client
   * @throws Exception
   */
  static createClient(): cams20200606 {
    // The project code leakage may result in the leakage of AccessKey, posing a threat to the security of all resources under the account. The following code examples are for reference only.
    // It is recommended to use the more secure STS credential. For more credentials, please refer to: https://www.alibabacloud.com/help/en/alibaba-cloud-sdk-262060/latest/credentials-settings-5.
    let config = new $OpenApi.Config({
      accessKeyId: "LTAI5tNRYX8mq2S6s5Bgxvwo",
      accessKeySecret: "s49qoxd7KBcj6pj6PiSEGNMUy5pU6O",
      // Required, please ensure that the environment variables ALIBABA_CLOUD_ACCESS_KEY_ID is set.
      // accessKeyId: process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'],
      // Required, please ensure that the environment variables ALIBABA_CLOUD_ACCESS_KEY_SECRET is set.
      // accessKeySecret: process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET'],
    });
    // See https://api.alibabacloud.com/product/cams.
    config.endpoint = `cams.ap-southeast-1.aliyuncs.com`;
    return new cams20200606(config);
  }

  static async main({ chatBotInstanceId, utterance }): Promise<any> {
    let client = Client.createClient();
    let beeBotChatRequest = new $cams20200606.BeeBotChatRequest({
      chatBotInstanceId,
      utterance,
    });
    let runtime = new $Util.RuntimeOptions({});
    try {
      // Copy the code to run, please print the return value of the API by yourself.
      return client.beeBotChatWithOptions(beeBotChatRequest, runtime);
    } catch (error) {
      // Only a printing example. Please be careful about exception handling and do not ignore exceptions directly in engineering projects.
      // print error message
      console.log(error.message);
      // Please click on the link below for diagnosis.
      console.log(error.data["Recommend"]);
    }
  }
}

// Client.main(process.argv.slice(2));
