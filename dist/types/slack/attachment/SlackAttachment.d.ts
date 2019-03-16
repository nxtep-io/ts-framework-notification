import { SlackAttachmentFieldSchema, SlackAttachmentField } from "./SlackAttachmentField";
import { SlackAttachmentActionSchema, SlackAttachmentAction } from "./SlackAttachmentAction";
export interface SlackAttachmentSchema {
    fallback: string;
    pretext?: string;
    authorName?: string;
    authorLink?: string;
    authorIcon?: string;
    title?: string;
    titleLink?: string;
    text?: string;
    fields?: SlackAttachmentFieldSchema[];
    actions?: SlackAttachmentActionSchema[];
    color?: 'good' | 'warning' | 'danger' | string;
    imageUrl?: string;
    thumbUrl?: string;
}
export declare class SlackAttachment implements SlackAttachmentSchema {
    fallback: string;
    pretext?: string;
    authorName?: string;
    authorLink?: string;
    authorIcon?: string;
    title?: string;
    titleLink?: string;
    text?: string;
    fields?: SlackAttachmentField[];
    actions?: SlackAttachmentAction[];
    color?: 'good' | 'warning' | 'danger' | string;
    imageUrl?: string;
    thumbUrl?: string;
    constructor(data: SlackAttachmentSchema);
    toJSON(): {
        author_name: string;
        author_link: string;
        author_icon: string;
        title_link: string;
        image_url: string;
        thumb_url: string;
        fields: SlackAttachmentField[];
        actions: SlackAttachmentAction[];
    } & Pick<this, Exclude<keyof this, "fields" | "actions" | "authorName" | "authorLink" | "authorIcon" | "titleLink" | "imageUrl" | "thumbUrl">>;
}
