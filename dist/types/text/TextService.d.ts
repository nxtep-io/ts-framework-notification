import { NotificationService, NotificationServiceOptions } from '../base';
import { BaseTextGateway, TextGateway } from './gateways/BaseTextGateway';
import { TextMessageSchema } from './TextMessage';
export interface TextServiceOptions extends NotificationServiceOptions {
    from?: string;
    gateway: TextGateway;
    gatewayOptions?: any;
}
export default class TextService extends NotificationService {
    options: TextServiceOptions;
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
    onMount(): Promise<void>;
    onUnmount(): Promise<void>;
    onInit(): Promise<void>;
    onReady(): Promise<void>;
}
