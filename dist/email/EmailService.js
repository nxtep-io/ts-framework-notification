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
const Template = require("email-templates");
const nodemailer = require("nodemailer");
const path = require("path");
const ts_framework_common_1 = require("ts-framework-common");
const base_1 = require("../base");
const EmailMessage_1 = require("./EmailMessage");
class Email extends base_1.NotificationService {
    /**
     * Instantiates a new email service instance.
     *
     * @param options The email service options
     */
    constructor(options = {}) {
        super(options);
        this.options = options;
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
            const message = `${this.options.name}: The SMTP connectionUrl is not available.`;
            if (!options.debug) {
                // No debug mode, crash the service
                throw new ts_framework_common_1.BaseError(message);
            }
            else {
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
            const data = message = message instanceof EmailMessage_1.EmailMessage ? message : new EmailMessage_1.EmailMessage(message);
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
                const errorMessage = `${this.options.name} is not ready, the SMTP connectionUrl may be invalid or unavailable`;
                if (this.options.debug) {
                    // Logs the email body in the console as a warning
                    this.logger.warn(errorMessage, { body: JSON.stringify(data, null, 2) });
                }
                else {
                    // Crash the service, email could not be sent
                    throw new ts_framework_common_1.BaseError(errorMessage);
                }
            }
        });
    }
    onMount() {
    }
    onUnmount() {
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    onReady() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.Email = Email;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2VtYWlsL0VtYWlsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLHlDQUF5QztBQUN6Qyw2QkFBNkI7QUFDN0IsNkRBQWdFO0FBQ2hFLGtDQUEwRTtBQUMxRSxpREFBa0U7QUF1Q2xFLE1BQWEsS0FBTSxTQUFRLDBCQUFtQjtJQUk1Qzs7OztPQUlHO0lBQ0gsWUFBNEIsVUFBK0IsRUFBRTtRQUMzRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFEVyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtRQUczRCxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDdkIsb0RBQW9EO1lBQ3BELElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztTQUN4QzthQUFNLElBQUksT0FBTyxDQUFDLGFBQWEsRUFBRTtZQUNoQyw4REFBOEQ7WUFDOUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN0RTthQUFNO1lBQ0wsaUVBQWlFO1lBQ2pFLE1BQU0sT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLDRDQUE0QyxDQUFDO1lBRWpGLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNsQixtQ0FBbUM7Z0JBQ25DLE1BQU0sSUFBSSwrQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLG9EQUFvRDtnQkFDcEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLHdEQUF3RCxDQUFDLENBQUM7YUFDdEY7U0FDRjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxtQkFBSyxlQUFlLEVBQUUsVUFBVSxJQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsUUFB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O1FBQ2IsQ0FBQztLQUFBO0NBQ0Y7QUFqSEQsc0JBaUhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVGVtcGxhdGUgZnJvbSAnZW1haWwtdGVtcGxhdGVzJztcbmltcG9ydCAqIGFzIG5vZGVtYWlsZXIgZnJvbSAnbm9kZW1haWxlcic7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQmFzZUVycm9yLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSwgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMgfSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCB7IEVtYWlsTWVzc2FnZSwgRW1haWxNZXNzYWdlU2NoZW1hIH0gZnJvbSAnLi9FbWFpbE1lc3NhZ2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVtYWlsU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBzZW5kZXIgZm9yIHRoZSBlbWFpbHMgc2VudCBieSB0aGUgc2VydmljZS5cbiAgICovXG4gIGZyb20/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBsb2dnZXIgaW5zdGFuY2UgZm9yIHRoZSBzZXJ2aWNlLlxuICAgKi9cbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG5cbiAgLyoqXG4gICAqIEUtbWFpbHMgd2lsbCBiZSBzZW50IHRvIGNvbnNvbGUgd2hlbmV2ZXIgdGhlIGNvbm5lY3Rpb25VcmwgaXMgbm90IGF2YWlsYWJsZSBpZiBkZWJ1ZyBpcyBcInRydWVcIi5cbiAgICovXG4gIGRlYnVnPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIFNNVFAgY29ubmVjdGlvbiBVUkwuXG4gICAqL1xuICBjb25uZWN0aW9uVXJsPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgTm9kZW1haWxlciB0cmFuc3BvcnRlciB0byBiZSB1c2VkIGFzIHRoZSBzZW5kZXIgZW5naW5lLlxuICAgKi9cbiAgdHJhbnNwb3J0ZXI/OiBub2RlbWFpbGVyLlRyYW5zcG9ydGVyO1xuXG4gIC8qKlxuICAgKiBUaGUgdGVtcGxhdGUgZW5naW5lIG9wdGlvbnMsIGlmIGVuYWJsZWRcbiAgICovXG4gIHRlbXBsYXRlPzoge1xuICAgIHJvb3Q/OiBzdHJpbmc7XG4gICAgZW5naW5lPzogc3RyaW5nO1xuICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgZGVmYXVsdFRlbXBsYXRlPzogc3RyaW5nO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbWFpbCBleHRlbmRzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdHJhbnNwb3J0ZXI/OiBub2RlbWFpbGVyLlRyYW5zcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdGVtcGxhdGVFbmdpbmU/OiBUZW1wbGF0ZTtcblxuICAvKipcbiAgICogSW5zdGFudGlhdGVzIGEgbmV3IGVtYWlsIHNlcnZpY2UgaW5zdGFuY2UuXG4gICAqIFxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgZW1haWwgc2VydmljZSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb3B0aW9uczogRW1haWxTZXJ2aWNlT3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICBpZiAob3B0aW9ucy50cmFuc3BvcnRlcikge1xuICAgICAgLy8gVHJhbnNwb3J0ZXIgaW5zdGFuY2Ugd2FzIGdpdmVuIHRvIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgdGhpcy50cmFuc3BvcnRlciA9IG9wdGlvbnMudHJhbnNwb3J0ZXI7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmNvbm5lY3Rpb25VcmwpIHtcbiAgICAgIC8vIEluc3RhbnRpYXRlIGEgbmV3IFRyYW5zcG9ydGVyIGJhc2VkIG9uIFNNVFAgY29ubmVjdGlvbiBVUkwuXG4gICAgICB0aGlzLnRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQob3B0aW9ucy5jb25uZWN0aW9uVXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm8gdHJhbnNwb3J0ZXIgYXZhaWxhYmxlLCBwcmVwYXJlIG1lc3NhZ2UgZm9yIHdhcm5pbmcgb3IgY3Jhc2hcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLm9wdGlvbnMubmFtZX06IFRoZSBTTVRQIGNvbm5lY3Rpb25VcmwgaXMgbm90IGF2YWlsYWJsZS5gO1xuXG4gICAgICBpZiAoIW9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgLy8gTm8gZGVidWcgbW9kZSwgY3Jhc2ggdGhlIHNlcnZpY2VcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEluIGRlYnVnIG1vZGUgd2Ugc2VuZCBhbGwgbWVzc2FnZXMgdG8gdGhlIGNvbnNvbGVcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihgJHttZXNzYWdlfSBBbGwgbWVzc2FnZXMgd2lsbCBiZSBzZW50IHRvIHRoZSBjb25zb2xlIGFzIHdhcm5pbmdzLmApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucy50ZW1wbGF0ZSA9IHsgZGVmYXVsdFRlbXBsYXRlOiAnY2VyYmVydXMnLCAuLi50aGlzLm9wdGlvbnMudGVtcGxhdGUgfTtcblxuICAgIC8vIElmIHRyYW5zcG9ydGVyIGlzIGF2YWlsYWJsZSwgcHJlcGFyZSB0aGUgdGVtcGxhdGUgZW5naW5lXG4gICAgaWYgKHRoaXMudHJhbnNwb3J0ZXIgJiYgdGhpcy5vcHRpb25zLnRlbXBsYXRlLmVuYWJsZWQpIHtcblxuICAgICAgLy8gSW5zdGFudGlhdGUgdGhlIHRlbXBsYXRlIGVuZ2luZSByZW5kZXJlciBmb3Igc2VuZGluZyBjb29sIGVtYWlsc1xuICAgICAgdGhpcy50ZW1wbGF0ZUVuZ2luZSA9IG5ldyBUZW1wbGF0ZSh7XG4gICAgICAgIG1lc3NhZ2U6IHsgZnJvbTogb3B0aW9ucy5mcm9tIH0sXG4gICAgICAgIHRyYW5zcG9ydDogdGhpcy50cmFuc3BvcnRlcixcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICByb290OiB0aGlzLm9wdGlvbnMudGVtcGxhdGUucm9vdCB8fCBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi90ZW1wbGF0ZXMnKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBleHRlbnNpb246IHRoaXMub3B0aW9ucy50ZW1wbGF0ZS5lbmdpbmUgfHwgJ2VqcydcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyBpZiB0aGUgU01UUCBjb25uZWN0aW9uIGlzIE9LLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGlzUmVhZHkoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKCF0aGlzLnRyYW5zcG9ydGVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyBJZiBpdCBkb2VzbnQgdGhyb3cgYW4gZXJyb3IgZXZlcnl0aGluZyBpcyBvay5cbiAgICAgIGF3YWl0IHRoaXMudHJhbnNwb3J0ZXIudmVyaWZ5KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKGV4Y2VwdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGFuIGVtYWlsIG1lc3NhZ2UuXG4gICAqIFxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlOiBFbWFpbE1lc3NhZ2VTY2hlbWEpIHtcbiAgICBjb25zdCBkYXRhID0gbWVzc2FnZSA9IG1lc3NhZ2UgaW5zdGFuY2VvZiBFbWFpbE1lc3NhZ2UgPyBtZXNzYWdlIDogbmV3IEVtYWlsTWVzc2FnZShtZXNzYWdlKTtcbiAgICBjb25zdCBpc1JlYWR5ID0gYXdhaXQgdGhpcy5pc1JlYWR5KCk7XG5cbiAgICBpZiAoaXNSZWFkeSAmJiB0aGlzLnRlbXBsYXRlRW5naW5lKSB7XG4gICAgICAvLyBTZW5kIGVtYWlsIHVzaW5nIHRoZSBjdXJyZW50IHRlbXBsYXRlIGVuZ2luZVxuICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVFbmdpbmUuc2VuZCh7XG4gICAgICAgIG1lc3NhZ2U6IGRhdGEsXG4gICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgIGdldFZhbHVlOiAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4gdmFsdWUgfHwgZGVmYXVsdFZhbHVlLFxuICAgICAgICAgIC4uLmRhdGEubG9jYWxzXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiBkYXRhLnRlbXBsYXRlIHx8IHRoaXMub3B0aW9ucy50ZW1wbGF0ZS5kZWZhdWx0VGVtcGxhdGUsXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAoaXNSZWFkeSkge1xuICAgICAgLy8gU2VuZCBzaW1wbGUgZW1haWwgdXNpbmcgdGhlIHRyYW5zcG9ydGVyXG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnRlci5zZW5kTWFpbChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYCR7dGhpcy5vcHRpb25zLm5hbWV9IGlzIG5vdCByZWFkeSwgdGhlIFNNVFAgY29ubmVjdGlvblVybCBtYXkgYmUgaW52YWxpZCBvciB1bmF2YWlsYWJsZWA7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgLy8gTG9ncyB0aGUgZW1haWwgYm9keSBpbiB0aGUgY29uc29sZSBhcyBhIHdhcm5pbmdcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihlcnJvck1lc3NhZ2UsIHsgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDcmFzaCB0aGUgc2VydmljZSwgZW1haWwgY291bGQgbm90IGJlIHNlbnRcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uTW91bnQoKSB7XG4gIH1cblxuICBvblVubW91bnQoKSB7XG4gIH1cblxuICBhc3luYyBvbkluaXQoKSB7XG4gIH1cblxuICBhc3luYyBvblJlYWR5KCkge1xuICB9XG59Il19