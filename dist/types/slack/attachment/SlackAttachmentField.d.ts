export interface SlackAttachmentFieldSchema {
    title?: string;
    value?: string;
    short?: string;
}
export declare class SlackAttachmentField implements SlackAttachmentFieldSchema {
    title?: string;
    value?: string;
    short?: string;
    constructor(data: SlackAttachmentFieldSchema);
    toJSON(): this;
}
