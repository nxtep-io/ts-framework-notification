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
        if (!this.options.gateway && this.options.debug) {
            this.options.gateway = BaseTextGateway_1.TextGateway.DEBUG;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdGV4dC9UZXh0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsa0NBQTBFO0FBQzFFLGdFQUEwRTtBQUMxRSxrRUFBK0Q7QUFXL0QsTUFBYSxJQUFLLFNBQVEsMEJBQW1CO0lBSTNDLFlBQVksT0FBMkI7UUFDckMsS0FBSyxpQkFBRyxJQUFJLEVBQUUsYUFBYSxJQUFLLE9BQU8sRUFBRyxDQUFDO1FBRTNDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtZQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyw2QkFBVyxDQUFDLEtBQUssQ0FBQztTQUMxQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNVLE9BQU87O1lBQ2xCLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxJQUFJLENBQUMsT0FBMEI7O1lBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7YUFDbEY7aUJBQ0ksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO2FBQ3JFO1lBQ0QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxDQUFDO0tBQUE7SUFFSyxNQUFNLENBQUMsTUFBTTs7Ozs7WUFDakIsT0FBTSxNQUFNLFlBQUMsTUFBTSxFQUFFO1lBQ3JCLHdDQUF3QztZQUN4QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLDZCQUFXLENBQUMsTUFBTSxFQUFFO2dCQUMvQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsR0FBRywyQ0FBYSw4QkFBOEIsRUFBQyxDQUFDO2dCQUUzRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksaUJBQWlCLGlCQUMxQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUM5QixDQUFDO2dCQUVILE1BQU8sSUFBSSxDQUFDLGVBQXFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDMUQ7aUJBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyw2QkFBVyxDQUFDLEtBQUssRUFBRTtnQkFDckQsb0NBQW9DO2dCQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksbUNBQWdCLEVBQUUsQ0FBQzthQUMvQztRQUNILENBQUM7S0FBQTtDQUNGO0FBbkRELG9CQW1EQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UsIE5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIH0gZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgeyBCYXNlVGV4dEdhdGV3YXksIFRleHRHYXRld2F5IH0gZnJvbSAnLi9nYXRld2F5cy9CYXNlVGV4dEdhdGV3YXknO1xuaW1wb3J0IHsgRGVidWdUZXh0R2F0ZXdheSB9IGZyb20gJy4vZ2F0ZXdheXMvRGVidWdUZXh0R2F0ZXdheSc7XG5pbXBvcnQgeyBUd2lsaW9UZXh0R2F0ZXdheSB9IGZyb20gJy4vZ2F0ZXdheXMvVHdpbGlvVGV4dEdhdGV3YXknO1xuaW1wb3J0IHsgVGV4dE1lc3NhZ2VTY2hlbWEgfSBmcm9tICcuL1RleHRNZXNzYWdlJztcblxuZXhwb3J0IGludGVyZmFjZSBUZXh0U2VydmljZU9wdGlvbnMgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB7XG4gIGZyb20/OiBzdHJpbmc7XG4gIGRlYnVnPzogYm9vbGVhbjtcbiAgZ2F0ZXdheT86IFRleHRHYXRld2F5O1xuICBnYXRld2F5T3B0aW9ucz86IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIFRleHQgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgcHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IFRleHRTZXJ2aWNlT3B0aW9ucztcbiAgcHJvdGVjdGVkIGdhdGV3YXlJbnN0YW5jZT86IEJhc2VUZXh0R2F0ZXdheTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBUZXh0U2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcih7IG5hbWU6ICdUZXh0U2VydmljZScsIC4uLm9wdGlvbnMgfSk7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5nYXRld2F5ICYmIHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgdGhpcy5vcHRpb25zLmdhdGV3YXkgPSBUZXh0R2F0ZXdheS5ERUJVRztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzZXJ2aWNlIGlzIHJlYWR5IGZvciBzZW5kaW5nIHRleHQgbWVzc2FnZXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaXNSZWFkeSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gISEodGhpcy5nYXRld2F5SW5zdGFuY2UgJiYgdGhpcy5nYXRld2F5SW5zdGFuY2UuaXNSZWFkeSk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBhIHRleHQgbWVzc2FnZS5cbiAgICogXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIG9wdGlvbnNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2U6IFRleHRNZXNzYWdlU2NoZW1hKSB7XG4gICAgaWYgKCF0aGlzLmdhdGV3YXlJbnN0YW5jZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBnYXRld2F5IGluc3RhbmNlIGluaXRpYWxpemVkIGZvciB0aGUgVGV4dCBtZXNzYWdlcyBzZXJ2aWNlJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFtZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1lc3NhZ2UgcHJvdmlkZWQgZm9yIHRoZSBUZXh0IGdhdGV3YXkgc2VydmljZScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nYXRld2F5SW5zdGFuY2Uuc2VuZChtZXNzYWdlKTtcbiAgfVxuXG4gIGFzeW5jIG9uSW5pdChzZXJ2ZXIpIHtcbiAgICBzdXBlci5vbkluaXQoc2VydmVyKTtcbiAgICAvLyBIYW5kbGVzIHR3aWxpbyBkeW5hbWljIGluaXRpYWxpemF0aW9uXG4gICAgaWYgKHRoaXMub3B0aW9ucy5nYXRld2F5ID09PSBUZXh0R2F0ZXdheS5UV0lMSU8pIHtcbiAgICAgIGNvbnN0IHsgVHdpbGlvVGV4dEdhdGV3YXkgfSA9IGF3YWl0IGltcG9ydCgnLi9nYXRld2F5cy9Ud2lsaW9UZXh0R2F0ZXdheScpO1xuXG4gICAgICB0aGlzLmdhdGV3YXlJbnN0YW5jZSA9IG5ldyBUd2lsaW9UZXh0R2F0ZXdheSh7XG4gICAgICAgIGZyb206IHRoaXMub3B0aW9ucy5mcm9tLFxuICAgICAgICAuLi50aGlzLm9wdGlvbnMuZ2F0ZXdheU9wdGlvbnMsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgKHRoaXMuZ2F0ZXdheUluc3RhbmNlIGFzIFR3aWxpb1RleHRHYXRld2F5KS5pbml0KCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZ2F0ZXdheSA9PT0gVGV4dEdhdGV3YXkuREVCVUcpIHtcbiAgICAgIC8vIEhhbmRsZXMgYSBkZWJ1ZyBnYXRld2F5IChjb25zb2xlKVxuICAgICAgdGhpcy5nYXRld2F5SW5zdGFuY2UgPSBuZXcgRGVidWdUZXh0R2F0ZXdheSgpO1xuICAgIH1cbiAgfVxufSJdfQ==