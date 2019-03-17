import { BaseMessage, BaseMessageSchema } from "../base";
import { SlackAttachment, SlackAttachmentSchema } from './attachment/SlackAttachment';
export interface SlackMessageSchema extends BaseMessageSchema {
    to?: string;
    text: string;
    username?: string;
    iconUrl?: string;
    iconEmoji?: string;
    webhookUrl?: string;
    attachments?: SlackAttachmentSchema[];
}
export declare class SlackMessage extends BaseMessage implements SlackMessageSchema {
    _id?: string;
    _type: string;
    to?: string;
    text: string;
    username?: string;
    webhookUrl?: string;
    attachments?: SlackAttachment[];
    constructor(data: SlackMessageSchema);
    toJSON(): {
        attachments: (SlackAttachment | ({
            author_name: string;
            author_link: string;
            author_icon: string;
            title_link: string;
            image_url: string;
            thumb_url: string;
            fields: import("./attachment/SlackAttachmentField").SlackAttachmentField[];
            actions: import("./attachment/SlackAttachmentAction").SlackAttachmentAction[];
        } & Pick<SlackAttachment, "title" | "color" | "fallback" | "pretext" | "text" | "toJSON">))[];
    } & Pick<this, Exclude<keyof this, "attachments">>;
}
