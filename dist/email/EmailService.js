"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const ts_framework_common_1 = require("ts-framework-common");
const nodemailer = require("nodemailer");
const Template = require("email-templates");
const base_1 = require("../base");
const EmailMessage_1 = require("./EmailMessage");
class EmailService extends base_1.BaseNotificationService {
    /**
     * Instantiates a new email service instance.
     *
     * @param options The email service options
     */
    constructor(options = {}) {
        super('EmailService', options);
        this.options = options;
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
        if (options.transporter) {
            // Transporter instance was given to the constructor
            this.transporter = options.transporter;
        }
        else if (options.connectionUrl) {
            // Instantiate a new Transporter based on SMTP connection URL.
            this.transporter = nodemailer.createTransport(options.connectionUrl);
        }
        else {
            // No transporter available, prepare message for warning or crash
            const message = `${this.name}: The SMTP connectionUrl is not available.`;
            if (!options.debug) {
                // No debug mode, crash the service
                throw new Error(message);
            }
            else if (options.verbose) {
                // In debug mode we send all messages to the console
                this.logger.warn(`${message} All messages will be sent to the console as warnings.`);
            }
        }
        this.options.template = Object.assign({ defaultTemplate: 'cerberus' }, this.options.template);
        // If transporter is available, prepare the template engine
        if (this.transporter && this.options.template.enabled) {
            // Instantiate the template engine renderer for sending cool emails
            this.templateEngine = new Template({
                message: { from: options.from },
                transport: this.transporter,
                views: {
                    root: this.options.template.root || path.join(__dirname, './templates'),
                    options: {
                        extension: this.options.template.engine || 'ejs'
                    }
                }
            });
        }
    }
    /**
     * Verifies if the SMTP connection is OK.
     */
    isReady() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.transporter) {
                return false;
            }
            try {
                // If it doesnt throw an error everything is ok.
                yield this.transporter.verify();
                return true;
            }
            catch (exception) {
                this.logger.debug(exception);
                return false;
            }
        });
    }
    /**
     * Sends an email message.
     *
     * @param message The message options
     */
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = message = message instanceof EmailMessage_1.default ? message : new EmailMessage_1.default(message);
            const isReady = yield this.isReady();
            if (isReady && this.templateEngine) {
                // Send email using the current template engine
                return this.templateEngine.send({
                    message: data,
                    locals: Object.assign({ getValue: (value, defaultValue) => value || defaultValue }, data.locals),
                    template: data.template || this.options.template.defaultTemplate,
                });
            }
            else if (isReady) {
                // Send simple email using the transporter
                return this.transporter.sendMail(data);
            }
            else {
                const errorMessage = `${this.name} is not ready, the SMTP connectionUrl may be invalid or unavailable`;
                if (this.options.debug) {
                    // Logs the email body in the console as a warning
                    this.logger.warn(errorMessage, { body: JSON.stringify(data, null, 2) });
                }
                else {
                    // Crash the service, email could not be sent
                    throw new Error(errorMessage);
                }
            }
        });
    }
}
exports.default = EmailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2VtYWlsL0VtYWlsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTZCO0FBQzdCLDZEQUE2QztBQUM3Qyx5Q0FBeUM7QUFDekMsNENBQTRDO0FBRTVDLGtDQUFrRjtBQUNsRixpREFBa0U7QUF1Q2xFLGtCQUFrQyxTQUFRLDhCQUF1QjtJQUsvRDs7OztPQUlHO0lBQ0gsWUFBK0IsVUFBK0IsRUFBRTtRQUM5RCxLQUFLLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBREYsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFFOUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFckQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDeEIsb0RBQW9EO1lBQ3BELElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUN6QyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLDhEQUE4RDtZQUM5RCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLGlFQUFpRTtZQUNqRSxNQUFNLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLDRDQUE0QyxDQUFDO1lBRXpFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLG1DQUFtQztnQkFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQUMs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QUNOLE1BQU0sWUFBWSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUkscUVBQXFFLENBQUM7Z0JBRXZHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsa0RBQWtEO29CQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDMUUsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTiw2Q0FBNkM7b0JBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUF2R0QsK0JBdUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuaW1wb3J0ICogYXMgbm9kZW1haWxlciBmcm9tICdub2RlbWFpbGVyJztcbmltcG9ydCAqIGFzIFRlbXBsYXRlIGZyb20gJ2VtYWlsLXRlbXBsYXRlcyc7XG5pbXBvcnQgeyBUcmFuc3BvcnRUeXBlcyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlLCBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMgfSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCBFbWFpbE1lc3NhZ2UsIHsgRW1haWxNZXNzYWdlU2NoZW1hIH0gZnJvbSAnLi9FbWFpbE1lc3NhZ2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVtYWlsU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIGRlZmF1bHQgc2VuZGVyIGZvciB0aGUgZW1haWxzIHNlbnQgYnkgdGhlIHNlcnZpY2UuXG4gICAqL1xuICBmcm9tPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbG9nZ2VyIGluc3RhbmNlIGZvciB0aGUgc2VydmljZS5cbiAgICovXG4gIGxvZ2dlcj86IExvZ2dlcjtcblxuICAvKipcbiAgICogRS1tYWlscyB3aWxsIGJlIHNlbnQgdG8gY29uc29sZSB3aGVuZXZlciB0aGUgY29ubmVjdGlvblVybCBpcyBub3QgYXZhaWxhYmxlIGlmIGRlYnVnIGlzIFwidHJ1ZVwiLlxuICAgKi9cbiAgZGVidWc/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgU01UUCBjb25uZWN0aW9uIFVSTC5cbiAgICovXG4gIGNvbm5lY3Rpb25Vcmw/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBOb2RlbWFpbGVyIHRyYW5zcG9ydGVyIHRvIGJlIHVzZWQgYXMgdGhlIHNlbmRlciBlbmdpbmUuXG4gICAqL1xuICB0cmFuc3BvcnRlcj86IG5vZGVtYWlsZXIuVHJhbnNwb3J0ZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB0ZW1wbGF0ZSBlbmdpbmUgb3B0aW9ucywgaWYgZW5hYmxlZFxuICAgKi9cbiAgdGVtcGxhdGU/OiB7XG4gICAgcm9vdD86IHN0cmluZztcbiAgICBlbmdpbmU/OiBzdHJpbmc7XG4gICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgICBkZWZhdWx0VGVtcGxhdGU/OiBzdHJpbmc7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1haWxTZXJ2aWNlIGV4dGVuZHMgQmFzZU5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdHJhbnNwb3J0ZXI/OiBub2RlbWFpbGVyLlRyYW5zcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdGVtcGxhdGVFbmdpbmU/OiBUZW1wbGF0ZTtcbiAgcHJvdGVjdGVkIGxvZ2dlcjogTG9nZ2VyO1xuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZXMgYSBuZXcgZW1haWwgc2VydmljZSBpbnN0YW5jZS5cbiAgICogXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBlbWFpbCBzZXJ2aWNlIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBFbWFpbFNlcnZpY2VPcHRpb25zID0ge30pIHtcbiAgICBzdXBlcignRW1haWxTZXJ2aWNlJywgb3B0aW9ucyk7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgIGlmIChvcHRpb25zLnRyYW5zcG9ydGVyKSB7XG4gICAgICAvLyBUcmFuc3BvcnRlciBpbnN0YW5jZSB3YXMgZ2l2ZW4gdG8gdGhlIGNvbnN0cnVjdG9yXG4gICAgICB0aGlzLnRyYW5zcG9ydGVyID0gb3B0aW9ucy50cmFuc3BvcnRlcjtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuY29ubmVjdGlvblVybCkge1xuICAgICAgLy8gSW5zdGFudGlhdGUgYSBuZXcgVHJhbnNwb3J0ZXIgYmFzZWQgb24gU01UUCBjb25uZWN0aW9uIFVSTC5cbiAgICAgIHRoaXMudHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydChvcHRpb25zLmNvbm5lY3Rpb25VcmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyB0cmFuc3BvcnRlciBhdmFpbGFibGUsIHByZXBhcmUgbWVzc2FnZSBmb3Igd2FybmluZyBvciBjcmFzaFxuICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMubmFtZX06IFRoZSBTTVRQIGNvbm5lY3Rpb25VcmwgaXMgbm90IGF2YWlsYWJsZS5gO1xuXG4gICAgICBpZiAoIW9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgLy8gTm8gZGVidWcgbW9kZSwgY3Jhc2ggdGhlIHNlcnZpY2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnZlcmJvc2UpIHtcbiAgICAgICAgLy8gSW4gZGVidWcgbW9kZSB3ZSBzZW5kIGFsbCBtZXNzYWdlcyB0byB0aGUgY29uc29sZVxuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGAke21lc3NhZ2V9IEFsbCBtZXNzYWdlcyB3aWxsIGJlIHNlbnQgdG8gdGhlIGNvbnNvbGUgYXMgd2FybmluZ3MuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zLnRlbXBsYXRlID0geyBkZWZhdWx0VGVtcGxhdGU6ICdjZXJiZXJ1cycsIC4uLnRoaXMub3B0aW9ucy50ZW1wbGF0ZSB9O1xuXG4gICAgLy8gSWYgdHJhbnNwb3J0ZXIgaXMgYXZhaWxhYmxlLCBwcmVwYXJlIHRoZSB0ZW1wbGF0ZSBlbmdpbmVcbiAgICBpZiAodGhpcy50cmFuc3BvcnRlciAmJiB0aGlzLm9wdGlvbnMudGVtcGxhdGUuZW5hYmxlZCkge1xuXG4gICAgICAvLyBJbnN0YW50aWF0ZSB0aGUgdGVtcGxhdGUgZW5naW5lIHJlbmRlcmVyIGZvciBzZW5kaW5nIGNvb2wgZW1haWxzXG4gICAgICB0aGlzLnRlbXBsYXRlRW5naW5lID0gbmV3IFRlbXBsYXRlKHtcbiAgICAgICAgbWVzc2FnZTogeyBmcm9tOiBvcHRpb25zLmZyb20gfSxcbiAgICAgICAgdHJhbnNwb3J0OiB0aGlzLnRyYW5zcG9ydGVyLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIHJvb3Q6IHRoaXMub3B0aW9ucy50ZW1wbGF0ZS5yb290IHx8IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3RlbXBsYXRlcycpLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5vcHRpb25zLnRlbXBsYXRlLmVuZ2luZSB8fCAnZWpzJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIHRoZSBTTVRQIGNvbm5lY3Rpb24gaXMgT0suXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaXNSZWFkeSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIXRoaXMudHJhbnNwb3J0ZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIElmIGl0IGRvZXNudCB0aHJvdyBhbiBlcnJvciBldmVyeXRoaW5nIGlzIG9rLlxuICAgICAgYXdhaXQgdGhpcy50cmFuc3BvcnRlci52ZXJpZnkoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoZXhjZXB0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYW4gZW1haWwgbWVzc2FnZS5cbiAgICogXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIG9wdGlvbnNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2U6IEVtYWlsTWVzc2FnZVNjaGVtYSkge1xuICAgIGNvbnN0IGRhdGEgPSBtZXNzYWdlID0gbWVzc2FnZSBpbnN0YW5jZW9mIEVtYWlsTWVzc2FnZSA/IG1lc3NhZ2UgOiBuZXcgRW1haWxNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIGNvbnN0IGlzUmVhZHkgPSBhd2FpdCB0aGlzLmlzUmVhZHkoKTtcblxuICAgIGlmIChpc1JlYWR5ICYmIHRoaXMudGVtcGxhdGVFbmdpbmUpIHtcbiAgICAgIC8vIFNlbmQgZW1haWwgdXNpbmcgdGhlIGN1cnJlbnQgdGVtcGxhdGUgZW5naW5lXG4gICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZUVuZ2luZS5zZW5kKHtcbiAgICAgICAgbWVzc2FnZTogZGF0YSxcbiAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgZ2V0VmFsdWU6ICh2YWx1ZSwgZGVmYXVsdFZhbHVlKSA9PiB2YWx1ZSB8fCBkZWZhdWx0VmFsdWUsXG4gICAgICAgICAgLi4uZGF0YS5sb2NhbHNcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IGRhdGEudGVtcGxhdGUgfHwgdGhpcy5vcHRpb25zLnRlbXBsYXRlLmRlZmF1bHRUZW1wbGF0ZSxcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmIChpc1JlYWR5KSB7XG4gICAgICAvLyBTZW5kIHNpbXBsZSBlbWFpbCB1c2luZyB0aGUgdHJhbnNwb3J0ZXJcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydGVyLnNlbmRNYWlsKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgJHt0aGlzLm5hbWV9IGlzIG5vdCByZWFkeSwgdGhlIFNNVFAgY29ubmVjdGlvblVybCBtYXkgYmUgaW52YWxpZCBvciB1bmF2YWlsYWJsZWA7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgLy8gTG9ncyB0aGUgZW1haWwgYm9keSBpbiB0aGUgY29uc29sZSBhcyBhIHdhcm5pbmdcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihlcnJvck1lc3NhZ2UsIHsgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDcmFzaCB0aGUgc2VydmljZSwgZW1haWwgY291bGQgbm90IGJlIHNlbnRcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59Il19