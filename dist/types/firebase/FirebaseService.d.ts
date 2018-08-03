import * as FirebaseSDK from 'firebase-admin';
import { Logger } from 'ts-framework-common';
import { FirebaseMessageSchema } from './FirebaseMessage';
import { BaseNotificationService, BaseNotificationServiceOptions } from '../base';
export interface FirebaseServiceOptions extends BaseNotificationServiceOptions {
    /**
     * The Firebase service account object
     */
    serviceAccount?: FirebaseSDK.ServiceAccount;
    /**
     * The firebase database URL.
     */
    databaseURL?: string;
    /**
     * Debug mode flag.
     */
    debug?: boolean;
    /**
     * The logger instance for the service.
     */
    logger?: Logger;
}
/**
 * Reference: https://firebase.google.com/docs/reference/admin/node/admin.messaging.MessagingOptions
 */
export interface FirebaseTransportOptions {
    priority: 'normal' | 'high';
    timeToLive: number;
}
export default class FirebaseService extends BaseNotificationService {
    protected sdk: FirebaseSDK.app.App;
    protected options: FirebaseServiceOptions;
    protected logger: Logger;
    constructor(options: FirebaseServiceOptions);
    send(message: FirebaseMessageSchema, options?: FirebaseTransportOptions): Promise<FirebaseSDK.messaging.MessagingDevicesResponse>;
}
