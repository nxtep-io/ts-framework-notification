import * as FirebaseSDK from 'firebase-admin';
import { BaseError, LoggerInstance } from 'ts-framework-common';
import { NotificationService, NotificationServiceOptions } from '../base';
import { FirebaseMessage, FirebaseMessageSchema } from './FirebaseMessage';

export interface FirebaseServiceOptions extends NotificationServiceOptions {
  /**
   * The Firebase service account object
   */
  serviceAccount?: FirebaseSDK.ServiceAccount

  /**
   * The firebase database URL.
   */
  databaseURL?: string

  /**
   * Debug mode flag.
   */
  debug?: boolean

  /**
   * The logger instance for the service.
   */
  logger?: LoggerInstance;
}

/**
 * Reference: https://firebase.google.com/docs/reference/admin/node/admin.messaging.MessagingOptions
 */
export interface FirebaseTransportOptions {
  priority: 'normal' | 'high'
  timeToLive: number
}

export class Firebase extends NotificationService {
  protected sdk: FirebaseSDK.app.App

  constructor(public readonly options: FirebaseServiceOptions) {
    super(options);

    // Initialize the Firebase Admin SDK
    if (options.serviceAccount && options.databaseURL) {
      this.sdk = FirebaseSDK.initializeApp({
        databaseURL: options.databaseURL,
        credential: FirebaseSDK.credential.cert(options.serviceAccount),
      });
    } else {
      // No transporter available, prepare message for warning or crash
      const message = `${this.options.name}: The Google Service Account is not available.`;

      if (!options.debug) {
        // No debug mode, crash the service
        throw new BaseError(message);

      } else {
        // In debug mode we send all messages to the console
        this.logger.warn(`${message} All messages will be sent to the console as warnings.`);
      }
    }
  }

  public send(message: FirebaseMessageSchema, options?: FirebaseTransportOptions) {
    const data = message instanceof FirebaseMessage ? message : new FirebaseMessage(message);

    if (this.sdk) {
      // Send a message to the device corresponding to the provided
      // registration token with the provided options.
      const { registrationToken, ...payload } = data;
      return this.sdk.messaging().sendToDevice(registrationToken, { notification: payload }, options)
    } else {
      const errorMessage = `${this.options.name} is not ready, the Google Service Account may be invalid or unavailable`;

      if (this.options.debug) {
        // Logs the notification body in the console as a warning
        this.logger.warn(errorMessage, { body: JSON.stringify(data, null, 2) });
      } else {
        // Crash the service, notification could not be sent
        throw new Error(errorMessage);
      }
    }
  }
}