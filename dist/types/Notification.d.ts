import { NotificationService, NotificationServiceOptions } from "./base";
import { EmailMessage, EmailServiceOptions } from './email';
import { FirebaseMessage, FirebaseServiceOptions } from './firebase';
import { SlackMessage, SlackServiceOptions } from "./slack";
import { TextMessage, TextServiceOptions } from './text';
export declare type Message = EmailMessage | FirebaseMessage | TextMessage | SlackMessage;
export interface NotificationOptions extends NotificationServiceOptions {
    email?: EmailServiceOptions;
    firebase?: FirebaseServiceOptions;
    text?: TextServiceOptions;
    slack?: SlackServiceOptions;
}
export declare class Notification extends NotificationService {
    readonly options: NotificationOptions;
    static EmailMessage: typeof EmailMessage;
    static FirebaseMessage: typeof FirebaseMessage;
    static TextMessage: typeof TextMessage;
    static SlackMessage: typeof SlackMessage;
    constructor(options: NotificationOptions);
    /**
     * Send a notification using the currently available and configured transporters.
     *
     * @param message The notification to be sent, can be an Email message, a Firebase message or a Text message.
     * @param options The options to be sent to the Transporter
     */
    send(message: Message, options?: any): Promise<any>;
    protected getByType<T extends NotificationService>(type: {
        new (): T;
    }): T | undefined;
}
