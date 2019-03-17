import { AxiosInstance } from "axios";
import { LoggerInstance } from "ts-framework-common";
import { NotificationService, NotificationServiceOptions } from "../base";
import { SlackMessageSchema } from "./SlackMessage";
export interface SlackServiceOptions extends NotificationServiceOptions {
    logger?: LoggerInstance;
    webhookUrl?: string;
    channel?: string;
    debug?: boolean;
}
export declare class Slack extends NotificationService {
    readonly options: SlackServiceOptions;
    client: AxiosInstance;
    logger: LoggerInstance;
    constructor(options?: SlackServiceOptions);
    onMount(server: any): Promise<void>;
    onUnmount(server: any): Promise<void>;
    /**
     * Post message on slack.
     *
     * @param options The post options
     */
    send(message: SlackMessageSchema): Promise<any>;
}
