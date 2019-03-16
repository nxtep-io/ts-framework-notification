import { BaseMessage, BaseMessageSchema } from "../base";
import { TransportTypes } from './../types';
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

export class SlackMessage extends BaseMessage implements SlackMessageSchema {
  _id?: string;
  _type: string;
  to?: string;
  text: string;
  username?: string;
  attachments?: SlackAttachment[];

  constructor(data: SlackMessageSchema) {
    super({ ...data, type: TransportTypes.SLACK });
    const { attachments = [], ...otherData } = data;
    Object.assign(this, otherData);
    this.attachments = attachments.map(a => new SlackAttachment(a));
  }

  public toJSON() {
    const { attachments = [], ...otherProps } = this;

    return {
      attachments: attachments.map(a => a.toJSON ? a.toJSON() : a),
      ...otherProps,
    }
  }
}