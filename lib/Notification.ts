import { BaseError } from "ts-framework-common";
import { NotificationService, NotificationServiceOptions } from "./base";
import { Email, EmailMessage, EmailServiceOptions } from './email';
import { Firebase, FirebaseMessage, FirebaseServiceOptions } from './firebase';
import { Slack, SlackMessage, SlackServiceOptions } from "./slack";
import { Text, TextMessage, TextServiceOptions } from './text';

export type Message = EmailMessage | FirebaseMessage | TextMessage | SlackMessage;

export interface NotificationOptions extends NotificationServiceOptions {
  email?: EmailServiceOptions
  firebase?: FirebaseServiceOptions
  text?: TextServiceOptions
  slack?: SlackServiceOptions
}

export class Notification extends NotificationService {
  public readonly options: NotificationOptions;

  static EmailMessage = EmailMessage;
  static FirebaseMessage = FirebaseMessage;
  static TextMessage = TextMessage;
  static SlackMessage = SlackMessage;

  constructor(options: NotificationOptions) {
    super(options);
    const available = ['email', 'firebase', 'text', 'slack'];
    const requested = Object.keys(this.options).filter(key => available.indexOf(key) >= 0);

    // At least one transport must be supplied to use this abstraction layer
    if (requested.length === 0) {
      throw new Error('No transports configured, you need to specifiy at least one debug service to use the Notification layer.');
    }

    const children = [];

    // Initialize the email transport, if available
    if (this.options.email) {
      this.component(new Email(this.options.email));
    }

    // Initialize the firebase transport, if available
    if (this.options.firebase) {
      this.component(new Firebase(this.options.firebase));
    }

    // Initialize the text transport, if available
    if (this.options.text) {
      this.component(new Text(this.options.text));
    }

    // Initialize the slack transport, if available
    if (this.options.slack) {
      this.component(new Slack(this.options.slack));
    }
  }

  /**
   * Send a notification using the currently available and configured transporters.
   * 
   * @param message The notification to be sent, can be an Email message, a Firebase message or a Text message.
   * @param options The options to be sent to the Transporter
   */
  public async send(message: Message, options?: any) {
    if (message instanceof EmailMessage) {
      return this.getByType(Email as { new(): Email }).send(message);
    } else if (message instanceof FirebaseMessage) {
      return this.getByType(Firebase as { new(): Firebase }).send(message, options);
    } else if (message instanceof TextMessage) {
      return this.getByType(Text as { new(): Text }).send(message);
    } else if (message instanceof SlackMessage) {
      return this.getByType(Slack as { new(): Slack }).send(message);
    } else {
      throw new BaseError(`${this.options.name}: Message is not a valid instance for the Notification transport`, { type: (typeof message), });
    }
  }

  protected getByType<T extends NotificationService>(type: { new(): T }): T | undefined {
    return (this.children as T[]).find(child => child instanceof type) as any;
  }
}