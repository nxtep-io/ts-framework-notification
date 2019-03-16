import { NotificationService, NotificationServiceOptions } from '../base';
import { BaseTextGateway, TextGateway } from './gateways/BaseTextGateway';
import { TextMessageSchema } from './TextMessage';
export interface TextServiceOptions extends NotificationServiceOptions {
    from?: string;
    gateway: TextGateway;
    gatewayOptions?: any;
}
export declare class Text extends NotificationService {
    readonly options: TextServiceOptions;
    protected gatewayInstance?: BaseTextGateway;
    constructor(options: TextServiceOptions);
    /**
     * Checks if the service is ready for sending text messages.
     */
    isReady(): Promise<boolean>;
    /**
     * Sends a a text message.
     *
     * @param message The message options
     */
    send(message: TextMessageSchema): Promise<any>;
    onInit(server: any): Promise<void>;
}
