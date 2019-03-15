import { TransportTypes } from './../types';
import { BaseMessage, BaseMessageSchema } from "../base";

export interface SlackMessageSchema extends BaseMessageSchema {
  from?: string;
  to: string;
  text: string;
  title?: string;
  title_link?: string;
  webhookUrl?: string;
}

export class SlackMessage extends BaseMessage implements SlackMessageSchema {
  _id?: string;
  _type: string;
  from?: string;
  to: string;
  text: string;

  constructor(data: SlackMessageSchema) {
    super({ ...data, type: TransportTypes.SLACK });
    this.from = data.from;
    this.to = data.to;
    this.text = data.text;
  }
}