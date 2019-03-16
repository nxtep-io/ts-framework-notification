import { AxiosInstance } from "axios";
import { NotificationService, NotificationServiceOptions } from "../base";
import { SlackMessageSchema } from "./SlackMessage";
export interface SlackServiceOptions extends NotificationServiceOptions {
    webhookUrl?: string;
    channel?: string;
}
export declare class Slack extends NotificationService {
    options: SlackServiceOptions;
    client: AxiosInstance;
    constructor(options: SlackServiceOptions);
    onMount(): Promise<void>;
    onUnmount(): Promise<void>;
    /**
     * Post message on slack.
     *
     * @param options The post options
     */
    send(message: SlackMessageSchema): Promise<boolean>;
    onInit(): Promise<void>;
    onReady(): Promise<void>;
}
