
import Axios, { AxiosInstance } from "axios";
import { BaseError } from "ts-framework-common";
import { NotificationService, NotificationServiceOptions } from "../base";
import { SlackMessageSchema, SlackMessage } from "./SlackMessage";


export interface SlackServiceOptions extends NotificationServiceOptions {
  webhookUrl?: string;
  channel?: string;
}

export class Slack extends NotificationService {
  public client: AxiosInstance;

  constructor(public readonly options: SlackServiceOptions) {
    super({ name: 'SlackService', ...options });
    this.client = Axios.create();
  }

  async onMount() {
  }

  async onUnmount() {
    this.client = undefined;
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

    const data = new SlackMessage(message);
    const response = await this.client.post(url, { ...data.toJSON() });

    if (response.status !== 200) {
      throw new BaseError((response.data && response.data.message) || "Error attempting to post message on slack");
    }

    return true;
  }

  async onInit() {
  }

  async onReady() {
  }
}