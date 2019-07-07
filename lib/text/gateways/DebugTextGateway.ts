import { Logger, LoggerInstance } from 'ts-framework-common';
import { TextMessageSchema } from "../TextMessage";
import { BaseTextGateway } from "./BaseTextGateway";

export interface DebugTextGatewayOptions {
  logger?: LoggerInstance;
}

export class DebugTextGateway implements BaseTextGateway {
  logger: LoggerInstance;
  isReady = true;

  constructor(protected options: DebugTextGatewayOptions = {}) {
    this.logger = options.logger || Logger.getInstance();
  }


  public async send(message: TextMessageSchema): Promise<any> {
    this.logger.debug('DebugTextGateway: Sending a mocked SMS text message', { message });
    return {};
  }
}