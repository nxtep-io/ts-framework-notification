export interface SlackAttachmentActionSchema {
    type: string;
    text: string;
    url: string;
    fallback: string;
    style?: 'primary' | 'danger' | undefined;
}
export declare class SlackAttachmentAction implements SlackAttachmentActionSchema {
    type: string;
    text: string;
    url: string;
    fallback: string;
    style?: 'primary' | 'danger' | undefined;
    constructor(data: SlackAttachmentActionSchema);
    toJSON(): this;
}
