import * as Template from 'email-templates';
import * as nodemailer from 'nodemailer';
import { LoggerInstance } from 'ts-framework-common';
import { NotificationService, NotificationServiceOptions } from '../base';
import { EmailMessageSchema } from './EmailMessage';
export interface EmailServiceOptions extends NotificationServiceOptions {
    /**
     * The default sender for the emails sent by the service.
     */
    from?: string;
    /**
     * The logger instance for the service.
     */
    logger?: LoggerInstance;
    /**
     * E-mails will be sent to console whenever the connectionUrl is not available if debug is "true".
     */
    debug?: boolean;
    /**
     * The SMTP connection URL.
     */
    connectionUrl?: string;
    /**
     * The Nodemailer transporter to be used as the sender engine.
     */
    transporter?: nodemailer.Transporter;
    /**
     * The template engine options, if enabled
     */
    template?: {
        root?: string;
        engine?: string;
        enabled: boolean;
        defaultTemplate?: string;
        send?: boolean;
        preview?: boolean;
    };
}
export declare class Email extends NotificationService {
    readonly options: EmailServiceOptions;
    protected readonly transporter?: nodemailer.Transporter;
    protected readonly templateEngine?: Template;
    /**
     * Instantiates a new email service instance.
     *
     * @param options The email service options
     */
    constructor(options: EmailServiceOptions);
    /**
     * Verifies if the SMTP connection is OK.
     */
    isReady(): Promise<boolean>;
    /**
     * Sends an email message.
     *
     * @param message The message options
     */
    send(message: EmailMessageSchema): Promise<any>;
}
