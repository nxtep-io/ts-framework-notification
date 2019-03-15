import * as Twilio from 'twilio';
import { TextMessageSchema } from "../TextMessage";
import { BaseTextGateway } from "./BaseTextGateway";

export interface TwilioGatewayOptions {
  from: string;
  accountSid: string;
  authToken: string;
}

export class TwilioTextGateway implements BaseTextGateway {
  client: any;
  isReady = false;

  constructor(protected options: TwilioGatewayOptions) {
  }

  public async init() {
    const { accountSid, authToken } = this.options;
    

    if(!accountSid || !authToken) {
      throw new Error('Tried to instantiate the Twilio SMS gateway without a valid set of credentials');
    }

    this.client = Twilio(accountSid, authToken);
    this.isReady = true;
  }

  public send(message: TextMessageSchema) {
    return this.client.messages.create({
      body: message.text,
      from: message.from || this.options.from,
      to: message.to,
    });
  }
}