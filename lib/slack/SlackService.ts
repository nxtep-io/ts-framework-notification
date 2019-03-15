
import Axios, { AxiosInstance } from "axios";
import { BaseError } from "ts-framework-common";
import { NotificationService, NotificationServiceOptions } from "../base";
import { SlackMessageSchema } from "./SlackMessage";


export interface SlackServiceOptions extends NotificationServiceOptions {
  webhookUrl?: string;
  channel?: string;
}

export class Slack extends NotificationService {
  public options: SlackServiceOptions;
  public client: AxiosInstance;

  constructor(options: SlackServiceOptions) {
    super({ name: 'SlackService', ...options });
  }

  /**
   * Post message on slack.
   *
   * @param options The post options
   */
  public async send(message: SlackMessageSchema): Promise<boolean> {
    const url = message.webhookUrl || (this.options && this.options.webhookUrl);
    if (!url) {
      throw new BaseError("Webhook url not supplied");
    }

    const response = await this.client.post(url, { ...message });

    if (response.status !== 200) {
      throw new BaseError((response.data && response.data.message) || "Error attempting to post message on slack");
    }

    return true;
  }

  async onMount() {
    this.client = Axios.create();
  }

  async onUnmount() {
    this.client = undefined;
  }

  async onInit() {
  }

  async onReady() {
  }
}