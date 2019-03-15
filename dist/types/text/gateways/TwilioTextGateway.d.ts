import { TextMessageSchema } from "../TextMessage";
import { BaseTextGateway } from "./BaseTextGateway";
export interface TwilioGatewayOptions {
    from: string;
    accountSid: string;
    authToken: string;
}
export declare class TwilioTextGateway implements BaseTextGateway {
    protected options: TwilioGatewayOptions;
    client: any;
    isReady: boolean;
    constructor(options: TwilioGatewayOptions);
    init(): Promise<void>;
    send(message: TextMessageSchema): any;
}
