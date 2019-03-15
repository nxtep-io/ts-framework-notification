import { BaseMessage, BaseMessageSchema } from "../base";
export interface SlackMessageSchema extends BaseMessageSchema {
    from?: string;
    to: string;
    text: string;
    title?: string;
    title_link?: string;
    webhookUrl?: string;
}
export declare class SlackMessage extends BaseMessage implements SlackMessageSchema {
    _id?: string;
    _type: string;
    from?: string;
    to: string;
    text: string;
    constructor(data: SlackMessageSchema);
}
