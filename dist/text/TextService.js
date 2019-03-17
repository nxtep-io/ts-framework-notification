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
const base_1 = require("../base");
const BaseTextGateway_1 = require("./gateways/BaseTextGateway");
const DebugTextGateway_1 = require("./gateways/DebugTextGateway");
class Text extends base_1.NotificationService {
    constructor(options) {
        super(Object.assign({ name: 'TextService' }, options));
        if (!this.options.gateway) {
            throw new Error('No gateway supplied for the Text messages service');
        }
    }
    /**
     * Checks if the service is ready for sending text messages.
     */
    isReady() {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(this.gatewayInstance && this.gatewayInstance.isReady);
        });
    }
    /**
     * Sends a a text message.
     *
     * @param message The message options
     */
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.gatewayInstance) {
                throw new Error('No gateway instance initialized for the Text messages service');
            }
            else if (!message) {
                throw new Error('No message provided for the Text gateway service');
            }
            return this.gatewayInstance.send(message);
        });
    }
    onInit(server) {
        const _super = Object.create(null, {
            onInit: { get: () => super.onInit }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.onInit.call(this, server);
            // Handles twilio dynamic initialization
            if (this.options.gateway === BaseTextGateway_1.TextGateway.TWILIO) {
                const { TwilioTextGateway } = yield Promise.resolve().then(() => require('./gateways/TwilioTextGateway'));
                this.gatewayInstance = new TwilioTextGateway(Object.assign({ from: this.options.from }, this.options.gatewayOptions));
                yield this.gatewayInstance.init();
            }
            else if (this.options.gateway === BaseTextGateway_1.TextGateway.DEBUG) {
                // Handles a debug gateway (console)
                this.gatewayInstance = new DebugTextGateway_1.DebugTextGateway();
            }
        });
    }
}
exports.Text = Text;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdGV4dC9UZXh0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsa0NBQTBFO0FBQzFFLGdFQUEwRTtBQUUxRSxrRUFBK0Q7QUFRL0QsTUFBYSxJQUFLLFNBQVEsMEJBQW1CO0lBSTNDLFlBQVksT0FBMkI7UUFDckMsS0FBSyxpQkFBRyxJQUFJLEVBQUUsYUFBYSxJQUFLLE9BQU8sRUFBRyxDQUFDO1FBRTNDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7U0FDdEU7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDVSxPQUFPOztZQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRSxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsSUFBSSxDQUFDLE9BQTBCOztZQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO2FBQ2xGO2lCQUNJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQzthQUNyRTtZQUNELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsQ0FBQztLQUFBO0lBRUssTUFBTSxDQUFDLE1BQU07Ozs7O1lBQ2pCLE9BQU0sTUFBTSxZQUFDLE1BQU0sRUFBRTtZQUNyQix3Q0FBd0M7WUFDeEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyw2QkFBVyxDQUFDLE1BQU0sRUFBRTtnQkFDL0MsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsMkNBQWEsOEJBQThCLEVBQUMsQ0FBQztnQkFFM0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGlCQUFpQixpQkFDMUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFDOUIsQ0FBQztnQkFFSCxNQUFPLElBQUksQ0FBQyxlQUF1QixDQUFDLElBQUksRUFBRSxDQUFDO2FBQzVDO2lCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssNkJBQVcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3JELG9DQUFvQztnQkFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLG1DQUFnQixFQUFFLENBQUM7YUFDL0M7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQW5ERCxvQkFtREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlLCBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IHsgQmFzZVRleHRHYXRld2F5LCBUZXh0R2F0ZXdheSB9IGZyb20gJy4vZ2F0ZXdheXMvQmFzZVRleHRHYXRld2F5JztcbmltcG9ydCB7IFRleHRNZXNzYWdlU2NoZW1hIH0gZnJvbSAnLi9UZXh0TWVzc2FnZSc7XG5pbXBvcnQgeyBEZWJ1Z1RleHRHYXRld2F5IH0gZnJvbSAnLi9nYXRld2F5cy9EZWJ1Z1RleHRHYXRld2F5JztcblxuZXhwb3J0IGludGVyZmFjZSBUZXh0U2VydmljZU9wdGlvbnMgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB7XG4gIGZyb20/OiBzdHJpbmc7XG4gIGdhdGV3YXk6IFRleHRHYXRld2F5O1xuICBnYXRld2F5T3B0aW9ucz86IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIFRleHQgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgcHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IFRleHRTZXJ2aWNlT3B0aW9ucztcbiAgcHJvdGVjdGVkIGdhdGV3YXlJbnN0YW5jZT86IEJhc2VUZXh0R2F0ZXdheTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBUZXh0U2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcih7IG5hbWU6ICdUZXh0U2VydmljZScsIC4uLm9wdGlvbnMgfSk7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5nYXRld2F5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGdhdGV3YXkgc3VwcGxpZWQgZm9yIHRoZSBUZXh0IG1lc3NhZ2VzIHNlcnZpY2UnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzZXJ2aWNlIGlzIHJlYWR5IGZvciBzZW5kaW5nIHRleHQgbWVzc2FnZXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaXNSZWFkeSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gISEodGhpcy5nYXRld2F5SW5zdGFuY2UgJiYgdGhpcy5nYXRld2F5SW5zdGFuY2UuaXNSZWFkeSk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBhIHRleHQgbWVzc2FnZS5cbiAgICogXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIG9wdGlvbnNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2U6IFRleHRNZXNzYWdlU2NoZW1hKSB7XG4gICAgaWYgKCF0aGlzLmdhdGV3YXlJbnN0YW5jZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBnYXRld2F5IGluc3RhbmNlIGluaXRpYWxpemVkIGZvciB0aGUgVGV4dCBtZXNzYWdlcyBzZXJ2aWNlJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFtZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1lc3NhZ2UgcHJvdmlkZWQgZm9yIHRoZSBUZXh0IGdhdGV3YXkgc2VydmljZScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nYXRld2F5SW5zdGFuY2Uuc2VuZChtZXNzYWdlKTtcbiAgfVxuXG4gIGFzeW5jIG9uSW5pdChzZXJ2ZXIpIHtcbiAgICBzdXBlci5vbkluaXQoc2VydmVyKTtcbiAgICAvLyBIYW5kbGVzIHR3aWxpbyBkeW5hbWljIGluaXRpYWxpemF0aW9uXG4gICAgaWYgKHRoaXMub3B0aW9ucy5nYXRld2F5ID09PSBUZXh0R2F0ZXdheS5UV0lMSU8pIHtcbiAgICAgIGNvbnN0IHsgVHdpbGlvVGV4dEdhdGV3YXkgfSA9IGF3YWl0IGltcG9ydCgnLi9nYXRld2F5cy9Ud2lsaW9UZXh0R2F0ZXdheScpO1xuXG4gICAgICB0aGlzLmdhdGV3YXlJbnN0YW5jZSA9IG5ldyBUd2lsaW9UZXh0R2F0ZXdheSh7XG4gICAgICAgIGZyb206IHRoaXMub3B0aW9ucy5mcm9tLFxuICAgICAgICAuLi50aGlzLm9wdGlvbnMuZ2F0ZXdheU9wdGlvbnMsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgKHRoaXMuZ2F0ZXdheUluc3RhbmNlIGFzIGFueSkuaW5pdCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmdhdGV3YXkgPT09IFRleHRHYXRld2F5LkRFQlVHKSB7XG4gICAgICAvLyBIYW5kbGVzIGEgZGVidWcgZ2F0ZXdheSAoY29uc29sZSlcbiAgICAgIHRoaXMuZ2F0ZXdheUluc3RhbmNlID0gbmV3IERlYnVnVGV4dEdhdGV3YXkoKTtcbiAgICB9XG4gIH1cbn0iXX0=