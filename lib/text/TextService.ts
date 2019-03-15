import { NotificationService, NotificationServiceOptions } from '../base';
import { BaseTextGateway, TextGateway } from './gateways/BaseTextGateway';
import { TextMessageSchema } from './TextMessage';

export interface TextServiceOptions extends NotificationServiceOptions {
  from?: string;
  gateway: TextGateway;
  gatewayOptions?: any;
}

export default class TextService extends NotificationService {
  public options: TextServiceOptions;
  protected gatewayInstance?: BaseTextGateway;

  constructor(options: TextServiceOptions) {
    super({ name: 'TextService', ...options });

    if (!this.options.gateway) {
      throw new Error('No gateway supplied for the Text messages service');
    }
  }

  /**
   * Checks if the service is ready for sending text messages.
   */
  public async isReady(): Promise<boolean> {
    return !!(this.gatewayInstance && this.gatewayInstance.isReady);
  }

  /**
   * Sends a a text message.
   * 
   * @param message The message options
   */
  public async send(message: TextMessageSchema) {
    if (!this.gatewayInstance) {
      throw new Error('No gateway instance initialized for the Text messages service');
    }
    else if (!message) {
      throw new Error('No message provided for the Text gateway service');
    }
    return this.gatewayInstance.send(message);
  }

  async onMount() {
  }
  
  async onUnmount() {
  }

  async onInit() {
    // Handles twilio dynamic initialization
    if (this.options.gateway === TextGateway.TWILIO) {
      const { TwilioTextGateway } = await import('./gateways/TwilioTextGateway');

      this.gatewayInstance = new TwilioTextGateway({
        from: this.options.from,
        ...this.options.gatewayOptions,
      });

      await (this.gatewayInstance as any).init();
    } else if (this.options.gateway === TextGateway.DEBUG) {
      // Handles a debug gateway (console)
      this.gatewayInstance = {
        isReady: true,
        async send(msg) {
          this.logger.warn('TextService: Sending SMS as a warning in debug mode', JSON.stringify(msg, null, 2));
        }
      }
    }
  }

  async onReady() {
  }
}