import { LoggerInstance } from 'ts-framework-common';
import { TextMessageSchema } from "../TextMessage";
import { BaseTextGateway } from "./BaseTextGateway";
export interface DebugTextGatewayOptions {
    logger?: LoggerInstance;
}
export declare class DebugTextGateway implements BaseTextGateway {
    protected options: DebugTextGatewayOptions;
    logger: LoggerInstance;
    isReady: boolean;
    constructor(options?: DebugTextGatewayOptions);
    send(message: TextMessageSchema): Promise<any>;
}
