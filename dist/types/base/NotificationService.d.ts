import { ComponentGroup, ComponentGroupOptions } from "ts-framework-common";
import { BaseMessageSchema } from './BaseMessage';
export interface NotificationServiceOptions extends ComponentGroupOptions {
}
export default abstract class NotificationService extends ComponentGroup {
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
