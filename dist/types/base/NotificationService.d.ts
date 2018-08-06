import { BaseMessageSchema } from './BaseMessage';
import { Service, ServiceOptions } from "ts-framework-common";
export interface NotificationServiceOptions extends ServiceOptions {
}
export default abstract class NotificationService extends Service {
    options: NotificationServiceOptions;
    /**
     * Instantiates a new Notification service.
     *
     * @param options The notification service options
     */
    constructor(options: NotificationServiceOptions);
    /**
     * Sends a new message through the notification service.
     *
     * @param data The data to be sent through the notification service
     * @param options The options to be used in the transport
     */
    abstract send(message: BaseMessageSchema, options?: any): any;
}
