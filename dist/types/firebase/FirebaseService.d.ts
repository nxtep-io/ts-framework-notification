import * as FirebaseSDK from 'firebase-admin';
import { LoggerInstance } from 'ts-framework-common';
import { NotificationService, NotificationServiceOptions } from '../base';
import { FirebaseMessageSchema } from './FirebaseMessage';
export interface FirebaseServiceOptions extends NotificationServiceOptions {
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
    logger?: LoggerInstance;
}
/**
 * Reference: https://firebase.google.com/docs/reference/admin/node/admin.messaging.MessagingOptions
 */
export interface FirebaseTransportOptions {
    priority: 'normal' | 'high';
    timeToLive: number;
}
export default class FirebaseService extends NotificationService {
    readonly options: FirebaseServiceOptions;
    protected sdk: FirebaseSDK.app.App;
    constructor(options: FirebaseServiceOptions);
    send(message: FirebaseMessageSchema, options?: FirebaseTransportOptions): Promise<FirebaseSDK.messaging.MessagingDevicesResponse>;
    onMount(): void;
    onUnmount(): void;
    onInit(): Promise<void>;
    onReady(): Promise<void>;
}
