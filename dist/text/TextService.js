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
const BaseTextGateway_1 = require("./gateways/BaseTextGateway");
const TwilioTextGateway_1 = require("./gateways/TwilioTextGateway");
const base_1 = require("../base");
class TextService extends base_1.NotificationService {
    constructor(options) {
        super(Object.assign({ name: 'TextService' }, options));
        if (!this.options.gateway) {
            throw new Error('No gateway supplied for the Text messages service');
        }
        this.initGateway().catch(exception => {
            this.logger.error(exception);
            this.gatewayInstance = undefined;
        });
    }
    /**
     * Handles built-in gateway support initialization.
     */
    initGateway() {
        return __awaiter(this, void 0, void 0, function* () {
            // Handles twilio dynamic initialization
            if (this.options.gateway === BaseTextGateway_1.TextGateway.TWILIO) {
                this.gatewayInstance = new TwilioTextGateway_1.default(Object.assign({ from: this.options.from }, this.options.gatewayOptions));
            }
            else if (this.options.gateway === BaseTextGateway_1.TextGateway.DEBUG) {
                // Handles a debug gateway (console)
                this.gatewayInstance = {
                    isReady: true,
                    send(msg) {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.logger.warn('TextService: Sending SMS as a warning in debug mode', JSON.stringify(msg, null, 2));
                        });
                    }
                };
            }
        });
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
     * Sends an email message.
     *
     * @param message The message options
     */
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.gatewayInstance.send(message);
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
exports.default = TextService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdGV4dC9UZXh0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsZ0VBQTBFO0FBQzFFLG9FQUF5RDtBQUV6RCxrQ0FBMEU7QUFRMUUsTUFBcUIsV0FBWSxTQUFRLDBCQUFtQjtJQUkxRCxZQUFZLE9BQTJCO1FBQ3JDLEtBQUssaUJBQUcsSUFBSSxFQUFFLGFBQWEsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUUzQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNhLFdBQVc7O1lBQ3pCLHdDQUF3QztZQUN4QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLDZCQUFXLENBQUMsTUFBTSxFQUFFO2dCQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksMkJBQWEsaUJBQ3RDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQzlCLENBQUM7YUFDSjtpQkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLDZCQUFXLENBQUMsS0FBSyxFQUFFO2dCQUNyRCxvQ0FBb0M7Z0JBQ3BDLElBQUksQ0FBQyxlQUFlLEdBQUc7b0JBQ3JCLE9BQU8sRUFBRSxJQUFJO29CQUNQLElBQUksQ0FBQyxHQUFHOzs0QkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxREFBcUQsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEcsQ0FBQztxQkFBQTtpQkFDRixDQUFBO2FBQ0Y7UUFDSCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLE9BQU87O1lBQ2xCLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxJQUFJLENBQUMsT0FBMEI7O1lBQzFDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsQ0FBQztLQUFBO0lBRUQsT0FBTztJQUNQLENBQUM7SUFDRCxTQUFTO0lBQ1QsQ0FBQztJQUNLLE1BQU07O1FBQ1osQ0FBQztLQUFBO0lBQ0ssT0FBTzs7UUFDYixDQUFDO0tBQUE7Q0FDRjtBQTlERCw4QkE4REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlVGV4dEdhdGV3YXksIFRleHRHYXRld2F5IH0gZnJvbSAnLi9nYXRld2F5cy9CYXNlVGV4dEdhdGV3YXknO1xuaW1wb3J0IFR3aWxpb0dhdGV3YXkgZnJvbSAnLi9nYXRld2F5cy9Ud2lsaW9UZXh0R2F0ZXdheSc7XG5pbXBvcnQgeyBUZXh0TWVzc2FnZVNjaGVtYSB9IGZyb20gJy4vVGV4dE1lc3NhZ2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSwgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMgfSBmcm9tICcuLi9iYXNlJztcblxuZXhwb3J0IGludGVyZmFjZSBUZXh0U2VydmljZU9wdGlvbnMgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB7XG4gIGZyb20/OiBzdHJpbmc7XG4gIGdhdGV3YXk6IFRleHRHYXRld2F5O1xuICBnYXRld2F5T3B0aW9ucz86IGFueTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dFNlcnZpY2UgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgcHVibGljIG9wdGlvbnM6IFRleHRTZXJ2aWNlT3B0aW9ucztcbiAgcHJvdGVjdGVkIGdhdGV3YXlJbnN0YW5jZT86IEJhc2VUZXh0R2F0ZXdheTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBUZXh0U2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcih7IG5hbWU6ICdUZXh0U2VydmljZScsIC4uLm9wdGlvbnMgfSk7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5nYXRld2F5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGdhdGV3YXkgc3VwcGxpZWQgZm9yIHRoZSBUZXh0IG1lc3NhZ2VzIHNlcnZpY2UnKTtcbiAgICB9XG5cbiAgICB0aGlzLmluaXRHYXRld2F5KCkuY2F0Y2goZXhjZXB0aW9uID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGV4Y2VwdGlvbilcbiAgICAgIHRoaXMuZ2F0ZXdheUluc3RhbmNlID0gdW5kZWZpbmVkO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYnVpbHQtaW4gZ2F0ZXdheSBzdXBwb3J0IGluaXRpYWxpemF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIGluaXRHYXRld2F5KCkge1xuICAgIC8vIEhhbmRsZXMgdHdpbGlvIGR5bmFtaWMgaW5pdGlhbGl6YXRpb25cbiAgICBpZiAodGhpcy5vcHRpb25zLmdhdGV3YXkgPT09IFRleHRHYXRld2F5LlRXSUxJTykge1xuICAgICAgdGhpcy5nYXRld2F5SW5zdGFuY2UgPSBuZXcgVHdpbGlvR2F0ZXdheSh7XG4gICAgICAgIGZyb206IHRoaXMub3B0aW9ucy5mcm9tLFxuICAgICAgICAuLi50aGlzLm9wdGlvbnMuZ2F0ZXdheU9wdGlvbnMsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5nYXRld2F5ID09PSBUZXh0R2F0ZXdheS5ERUJVRykge1xuICAgICAgLy8gSGFuZGxlcyBhIGRlYnVnIGdhdGV3YXkgKGNvbnNvbGUpXG4gICAgICB0aGlzLmdhdGV3YXlJbnN0YW5jZSA9IHtcbiAgICAgICAgaXNSZWFkeTogdHJ1ZSxcbiAgICAgICAgYXN5bmMgc2VuZChtc2cpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdUZXh0U2VydmljZTogU2VuZGluZyBTTVMgYXMgYSB3YXJuaW5nIGluIGRlYnVnIG1vZGUnLCBKU09OLnN0cmluZ2lmeShtc2csIG51bGwsIDIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHNlcnZpY2UgaXMgcmVhZHkgZm9yIHNlbmRpbmcgdGV4dCBtZXNzYWdlcy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBpc1JlYWR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAhISh0aGlzLmdhdGV3YXlJbnN0YW5jZSAmJiB0aGlzLmdhdGV3YXlJbnN0YW5jZS5pc1JlYWR5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhbiBlbWFpbCBtZXNzYWdlLlxuICAgKiBcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2Ugb3B0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZTogVGV4dE1lc3NhZ2VTY2hlbWEpIHtcbiAgICByZXR1cm4gdGhpcy5nYXRld2F5SW5zdGFuY2Uuc2VuZChtZXNzYWdlKTtcbiAgfVxuXG4gIG9uTW91bnQoKSB7XG4gIH1cbiAgb25Vbm1vdW50KCkge1xuICB9XG4gIGFzeW5jIG9uSW5pdCgpIHtcbiAgfVxuICBhc3luYyBvblJlYWR5KCkge1xuICB9XG59Il19