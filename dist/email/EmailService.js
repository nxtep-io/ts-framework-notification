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
class EmailService extends base_1.NotificationService {
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
exports.default = EmailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2VtYWlsL0VtYWlsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLHlDQUF5QztBQUN6Qyw2QkFBNkI7QUFDN0IsNkRBQWdFO0FBQ2hFLGtDQUEwRTtBQUMxRSxpREFBa0U7QUF1Q2xFLE1BQXFCLFlBQWEsU0FBUSwwQkFBbUI7SUFJM0Q7Ozs7T0FJRztJQUNILFlBQTRCLFVBQStCLEVBQUU7UUFDM0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRFcsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFHM0QsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ3ZCLG9EQUFvRDtZQUNwRCxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7U0FDeEM7YUFBTSxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDaEMsOERBQThEO1lBQzlELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDdEU7YUFBTTtZQUNMLGlFQUFpRTtZQUNqRSxNQUFNLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSw0Q0FBNEMsQ0FBQztZQUVqRixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDbEIsbUNBQW1DO2dCQUNuQyxNQUFNLElBQUksK0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTCxvREFBb0Q7Z0JBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyx3REFBd0QsQ0FBQyxDQUFDO2FBQ3RGO1NBQ0Y7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsbUJBQUssZUFBZSxFQUFFLFVBQVUsSUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFFB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OztRQUNiLENBQUM7S0FBQTtDQUNGO0FBakhELCtCQWlIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRlbXBsYXRlIGZyb20gJ2VtYWlsLXRlbXBsYXRlcyc7XG5pbXBvcnQgKiBhcyBub2RlbWFpbGVyIGZyb20gJ25vZGVtYWlsZXInO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IEJhc2VFcnJvciwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tICd0cy1mcmFtZXdvcmstY29tbW9uJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UsIE5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIH0gZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgRW1haWxNZXNzYWdlLCB7IEVtYWlsTWVzc2FnZVNjaGVtYSB9IGZyb20gJy4vRW1haWxNZXNzYWdlJztcblxuZXhwb3J0IGludGVyZmFjZSBFbWFpbFNlcnZpY2VPcHRpb25zIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIGRlZmF1bHQgc2VuZGVyIGZvciB0aGUgZW1haWxzIHNlbnQgYnkgdGhlIHNlcnZpY2UuXG4gICAqL1xuICBmcm9tPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbG9nZ2VyIGluc3RhbmNlIGZvciB0aGUgc2VydmljZS5cbiAgICovXG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuXG4gIC8qKlxuICAgKiBFLW1haWxzIHdpbGwgYmUgc2VudCB0byBjb25zb2xlIHdoZW5ldmVyIHRoZSBjb25uZWN0aW9uVXJsIGlzIG5vdCBhdmFpbGFibGUgaWYgZGVidWcgaXMgXCJ0cnVlXCIuXG4gICAqL1xuICBkZWJ1Zz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBTTVRQIGNvbm5lY3Rpb24gVVJMLlxuICAgKi9cbiAgY29ubmVjdGlvblVybD86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIE5vZGVtYWlsZXIgdHJhbnNwb3J0ZXIgdG8gYmUgdXNlZCBhcyB0aGUgc2VuZGVyIGVuZ2luZS5cbiAgICovXG4gIHRyYW5zcG9ydGVyPzogbm9kZW1haWxlci5UcmFuc3BvcnRlcjtcblxuICAvKipcbiAgICogVGhlIHRlbXBsYXRlIGVuZ2luZSBvcHRpb25zLCBpZiBlbmFibGVkXG4gICAqL1xuICB0ZW1wbGF0ZT86IHtcbiAgICByb290Pzogc3RyaW5nO1xuICAgIGVuZ2luZT86IHN0cmluZztcbiAgICBlbmFibGVkOiBib29sZWFuO1xuICAgIGRlZmF1bHRUZW1wbGF0ZT86IHN0cmluZztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWFpbFNlcnZpY2UgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRyYW5zcG9ydGVyPzogbm9kZW1haWxlci5UcmFuc3BvcnRlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRlbXBsYXRlRW5naW5lPzogVGVtcGxhdGU7XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlcyBhIG5ldyBlbWFpbCBzZXJ2aWNlIGluc3RhbmNlLlxuICAgKiBcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGVtYWlsIHNlcnZpY2Ugb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IEVtYWlsU2VydmljZU9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnMudHJhbnNwb3J0ZXIpIHtcbiAgICAgIC8vIFRyYW5zcG9ydGVyIGluc3RhbmNlIHdhcyBnaXZlbiB0byB0aGUgY29uc3RydWN0b3JcbiAgICAgIHRoaXMudHJhbnNwb3J0ZXIgPSBvcHRpb25zLnRyYW5zcG9ydGVyO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5jb25uZWN0aW9uVXJsKSB7XG4gICAgICAvLyBJbnN0YW50aWF0ZSBhIG5ldyBUcmFuc3BvcnRlciBiYXNlZCBvbiBTTVRQIGNvbm5lY3Rpb24gVVJMLlxuICAgICAgdGhpcy50cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KG9wdGlvbnMuY29ubmVjdGlvblVybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vIHRyYW5zcG9ydGVyIGF2YWlsYWJsZSwgcHJlcGFyZSBtZXNzYWdlIGZvciB3YXJuaW5nIG9yIGNyYXNoXG4gICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5vcHRpb25zLm5hbWV9OiBUaGUgU01UUCBjb25uZWN0aW9uVXJsIGlzIG5vdCBhdmFpbGFibGUuYDtcblxuICAgICAgaWYgKCFvcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIC8vIE5vIGRlYnVnIG1vZGUsIGNyYXNoIHRoZSBzZXJ2aWNlXG4gICAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IobWVzc2FnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJbiBkZWJ1ZyBtb2RlIHdlIHNlbmQgYWxsIG1lc3NhZ2VzIHRvIHRoZSBjb25zb2xlXG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYCR7bWVzc2FnZX0gQWxsIG1lc3NhZ2VzIHdpbGwgYmUgc2VudCB0byB0aGUgY29uc29sZSBhcyB3YXJuaW5ncy5gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMudGVtcGxhdGUgPSB7IGRlZmF1bHRUZW1wbGF0ZTogJ2NlcmJlcnVzJywgLi4udGhpcy5vcHRpb25zLnRlbXBsYXRlIH07XG5cbiAgICAvLyBJZiB0cmFuc3BvcnRlciBpcyBhdmFpbGFibGUsIHByZXBhcmUgdGhlIHRlbXBsYXRlIGVuZ2luZVxuICAgIGlmICh0aGlzLnRyYW5zcG9ydGVyICYmIHRoaXMub3B0aW9ucy50ZW1wbGF0ZS5lbmFibGVkKSB7XG5cbiAgICAgIC8vIEluc3RhbnRpYXRlIHRoZSB0ZW1wbGF0ZSBlbmdpbmUgcmVuZGVyZXIgZm9yIHNlbmRpbmcgY29vbCBlbWFpbHNcbiAgICAgIHRoaXMudGVtcGxhdGVFbmdpbmUgPSBuZXcgVGVtcGxhdGUoe1xuICAgICAgICBtZXNzYWdlOiB7IGZyb206IG9wdGlvbnMuZnJvbSB9LFxuICAgICAgICB0cmFuc3BvcnQ6IHRoaXMudHJhbnNwb3J0ZXIsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgcm9vdDogdGhpcy5vcHRpb25zLnRlbXBsYXRlLnJvb3QgfHwgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vdGVtcGxhdGVzJyksXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgZXh0ZW5zaW9uOiB0aGlzLm9wdGlvbnMudGVtcGxhdGUuZW5naW5lIHx8ICdlanMnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgaWYgdGhlIFNNVFAgY29ubmVjdGlvbiBpcyBPSy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBpc1JlYWR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICghdGhpcy50cmFuc3BvcnRlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gSWYgaXQgZG9lc250IHRocm93IGFuIGVycm9yIGV2ZXJ5dGhpbmcgaXMgb2suXG4gICAgICBhd2FpdCB0aGlzLnRyYW5zcG9ydGVyLnZlcmlmeSgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhleGNlcHRpb24pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhbiBlbWFpbCBtZXNzYWdlLlxuICAgKiBcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2Ugb3B0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZTogRW1haWxNZXNzYWdlU2NoZW1hKSB7XG4gICAgY29uc3QgZGF0YSA9IG1lc3NhZ2UgPSBtZXNzYWdlIGluc3RhbmNlb2YgRW1haWxNZXNzYWdlID8gbWVzc2FnZSA6IG5ldyBFbWFpbE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgY29uc3QgaXNSZWFkeSA9IGF3YWl0IHRoaXMuaXNSZWFkeSgpO1xuXG4gICAgaWYgKGlzUmVhZHkgJiYgdGhpcy50ZW1wbGF0ZUVuZ2luZSkge1xuICAgICAgLy8gU2VuZCBlbWFpbCB1c2luZyB0aGUgY3VycmVudCB0ZW1wbGF0ZSBlbmdpbmVcbiAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlRW5naW5lLnNlbmQoe1xuICAgICAgICBtZXNzYWdlOiBkYXRhLFxuICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICBnZXRWYWx1ZTogKHZhbHVlLCBkZWZhdWx0VmFsdWUpID0+IHZhbHVlIHx8IGRlZmF1bHRWYWx1ZSxcbiAgICAgICAgICAuLi5kYXRhLmxvY2Fsc1xuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZTogZGF0YS50ZW1wbGF0ZSB8fCB0aGlzLm9wdGlvbnMudGVtcGxhdGUuZGVmYXVsdFRlbXBsYXRlLFxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKGlzUmVhZHkpIHtcbiAgICAgIC8vIFNlbmQgc2ltcGxlIGVtYWlsIHVzaW5nIHRoZSB0cmFuc3BvcnRlclxuICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0ZXIuc2VuZE1haWwoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGAke3RoaXMub3B0aW9ucy5uYW1lfSBpcyBub3QgcmVhZHksIHRoZSBTTVRQIGNvbm5lY3Rpb25VcmwgbWF5IGJlIGludmFsaWQgb3IgdW5hdmFpbGFibGVgO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIC8vIExvZ3MgdGhlIGVtYWlsIGJvZHkgaW4gdGhlIGNvbnNvbGUgYXMgYSB3YXJuaW5nXG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oZXJyb3JNZXNzYWdlLCB7IGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ3Jhc2ggdGhlIHNlcnZpY2UsIGVtYWlsIGNvdWxkIG5vdCBiZSBzZW50XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbk1vdW50KCkge1xuICB9XG5cbiAgb25Vbm1vdW50KCkge1xuICB9XG5cbiAgYXN5bmMgb25Jbml0KCkge1xuICB9XG5cbiAgYXN5bmMgb25SZWFkeSgpIHtcbiAgfVxufSJdfQ==