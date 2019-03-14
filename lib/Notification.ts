import { NotificationService, NotificationServiceOptions } from "./base";
import { Email, EmailMessage, EmailServiceOptions } from './email';
import { Firebase, FirebaseMessage, FirebaseServiceOptions } from './firebase';
import { Text, TextMessage, TextServiceOptions } from './text';

export interface NotificationOptions extends NotificationServiceOptions {
  firebase?: FirebaseServiceOptions
  email?: EmailServiceOptions
  text?: TextServiceOptions
}

export default class Notification extends NotificationService {
  transports: {
    email?: Email
    firebase?: Firebase
    text?: Text
  }

  static EmailMessage = EmailMessage;
  static FirebaseMessage = FirebaseMessage;

  constructor(public readonly options: NotificationOptions) {
    super(options);
    this.transports = {};

    // At least one transport must be supplied to use this abstraction layer
    if (!this.options.email && !this.options.firebase) {
      throw new Error('No transports configured, you need to specifiy at least one debug service to use the Notification layer.');
    }

    // Initialize the email transport, if available
    if (this.options.email) {
      this.transports.email = new Email(this.options.email)
    }

    // Initialize the firebase transport, if available
    if (this.options.firebase) {
      this.transports.firebase = new Firebase(this.options.firebase);
    }

    // Initialize the text transport, if available
    if (this.options.text) {
      this.transports.text = new Text(this.options.text);
    }
  }

  /**
   * Send a notification using the currently available and configured transporters.
   * 
   * @param message The notification to be sent, can be an Email message, a Firebase message or a Text message.
   * @param options The options to be sent to the Transporter
   */
  public async send(message: EmailMessage | FirebaseMessage | TextMessage, options?: any) {
    if (this.transports.email && message instanceof EmailMessage) {
      return this.transports.email.send(message);
    } else if (this.transports.firebase && message instanceof FirebaseMessage) {
      return this.transports.firebase.send(message, options);
    } else if (this.transports.text && message instanceof TextMessage) {
      return this.transports.text.send(message);
    } else {
      throw new Error(`${this.options.name}: Transport not available or misconfigured: "${message._type}"`);
    }
  }

  onMount() {
  }
  onUnmount() {
  }
  async onInit() {
  }
  async onReady() {
  }
}