import { NotificationService, NotificationServiceOptions } from "./base";
import { Email, EmailMessage, EmailServiceOptions } from './email';
import { Firebase, FirebaseMessage, FirebaseServiceOptions } from './firebase';
import { Text, TextMessage, TextServiceOptions } from './text';
export interface NotificationOptions extends NotificationServiceOptions {
    firebase?: FirebaseServiceOptions;
    email?: EmailServiceOptions;
    text?: TextServiceOptions;
}
export declare class Notification extends NotificationService {
    readonly options: NotificationOptions;
    transports: {
        email?: Email;
        firebase?: Firebase;
        text?: Text;
    };
    static EmailMessage: typeof EmailMessage;
    static FirebaseMessage: typeof FirebaseMessage;
    constructor(options: NotificationOptions);
    /**
     * Send a notification using the currently available and configured transporters.
     *
     * @param message The notification to be sent, can be an Email message, a Firebase message or a Text message.
     * @param options The options to be sent to the Transporter
     */
    send(message: EmailMessage | FirebaseMessage | TextMessage, options?: any): Promise<any>;
    onMount(): void;
    onUnmount(): void;
    onInit(): Promise<void>;
    onReady(): Promise<void>;
}
