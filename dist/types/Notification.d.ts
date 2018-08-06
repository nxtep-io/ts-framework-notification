import { NotificationService, NotificationServiceOptions } from "./base";
import { Email, EmailMessage, EmailServiceOptions } from './email';
import { Firebase, FirebaseMessage, FirebaseServiceOptions } from './firebase';
export interface NotificationOptions extends NotificationServiceOptions {
    firebase?: FirebaseServiceOptions;
    email?: EmailServiceOptions;
}
export default class Notification extends NotificationService {
    readonly options: NotificationOptions;
    transports: {
        email?: Email;
        firebase?: Firebase;
    };
    static EmailMessage: typeof EmailMessage;
    static FirebaseMessage: typeof FirebaseMessage;
    constructor(options: NotificationOptions);
    /**
     * Send a notification using the currently available and configured transporters.
     *
     * @param message The notification to be sent, can be a Email message or a Firebase message.
     * @param options The options to be sent to the Transporter
     */
    send(message: EmailMessage | FirebaseMessage, options?: any): Promise<any>;
    onMount(): void;
    onUnmount(): void;
    onInit(): Promise<void>;
    onReady(): Promise<void>;
}
