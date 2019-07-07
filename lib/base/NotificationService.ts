import { ComponentGroup, ComponentGroupOptions } from "ts-framework-common";
import { BaseMessageSchema } from './BaseMessage';

export interface NotificationServiceOptions extends ComponentGroupOptions {
}

export abstract class NotificationService extends ComponentGroup {
  /**
   * Instantiates a new Notification service.
   * 
   * @param options The notification service options
   */
  constructor(public options: NotificationServiceOptions) {
    super(options);
  }

  /**
   * Sends a new message through the notification service.
   * 
   * @param data The data to be sent through the notification service
   * @param options The options to be used in the transport
   */
  public abstract send(message: BaseMessageSchema, options?: any);
}