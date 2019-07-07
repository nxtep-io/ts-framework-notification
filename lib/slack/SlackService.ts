
import Axios, { AxiosInstance } from "axios";
import { BaseError, Logger, LoggerInstance } from "ts-framework-common";
import { NotificationService, NotificationServiceOptions } from "../base";
import { SlackMessage, SlackMessageSchema } from "./SlackMessage";


export interface SlackServiceOptions extends NotificationServiceOptions {
  logger?: LoggerInstance;
  debug?: boolean;
  channel?: string;
  apiUrl?: string;
  accessToken?: string;
  webhookUrl?: string;
}

export class Slack extends NotificationService {
  public readonly options: SlackServiceOptions;
  public client: AxiosInstance;
  public logger: LoggerInstance;
  public apiUrl: string;

  constructor(options: SlackServiceOptions) {
    super({ name: 'SlackService', ...options });
    this.client = Axios.create();
    this.logger = options.logger || Logger.getInstance();
    this.apiUrl = options.apiUrl || 'https://slack.com/api/chat.postMessage';
  }

  async onMount(server) {
    await super.onMount(server);
    this.client = this.client || Axios.create();
  }

  async onUnmount(server) {
    await super.onUnmount(server);
    this.client = undefined;
  }

  /**
   * Post message on slack.
   *
   * @param options The post options
   */
  public async send(message: SlackMessageSchema): Promise<any> {
    const data = new SlackMessage(message);

    // Prefer webhook url for backwards compatibility
    const url = this.options.webhookUrl || this.apiUrl;

    if (this.options.debug) {
      // Logs the notification body in the console as a debug log
      const debugMessage = `${this.options.name} received a message in debug mode`;
      this.logger.debug(debugMessage, { message: data.toJSON() });
      return { debug: true, message: data };
    }

    if (!url) {
      throw new BaseError("Webhook url not supplied");
    }

    // Post to desired url, passing access token whenever available
    const response = await this.client.post(url, { ...data.toJSON() }, {
      headers: this.options.accessToken ? {
        'Authorization': `Bearer ${this.options.accessToken}`
      } : {}
    });

    if (response.status !== 200) {
      throw new BaseError((response.data && response.data.message) || "Error attempting to post message on slack");
    }

    return response;
  }
}