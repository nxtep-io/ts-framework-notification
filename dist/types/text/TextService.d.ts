import { BaseTextGateway, TextGateway } from './gateways/BaseTextGateway';
import { TextMessageSchema } from './TextMessage';
import { NotificationService, NotificationServiceOptions } from '../base';
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
     * Handles built-in gateway support initialization.
     */
    protected initGateway(): Promise<void>;
    /**
     * Checks if the service is ready for sending text messages.
     */
    isReady(): Promise<boolean>;
    /**
     * Sends an email message.
     *
     * @param message The message options
     */
    send(message: TextMessageSchema): Promise<any>;
    onMount(): void;
    onUnmount(): void;
    onInit(): Promise<void>;
    onReady(): Promise<void>;
}
