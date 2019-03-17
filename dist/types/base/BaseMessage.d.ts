export interface BaseMessageSchema {
    _id?: string;
    _type?: string;
}
export declare abstract class BaseMessage {
    _id?: string;
    _type: string;
    constructor(data: any);
}
