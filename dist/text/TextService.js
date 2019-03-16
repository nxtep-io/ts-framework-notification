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
        this.options = options;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdGV4dC9UZXh0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsa0NBQTBFO0FBQzFFLGdFQUEwRTtBQUUxRSxrRUFBK0Q7QUFRL0QsTUFBYSxJQUFLLFNBQVEsMEJBQW1CO0lBRzNDLFlBQTRCLE9BQTJCO1FBQ3JELEtBQUssaUJBQUcsSUFBSSxFQUFFLGFBQWEsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQURqQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUdyRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ1UsT0FBTzs7WUFDbEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLElBQUksQ0FBQyxPQUEwQjs7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQzthQUNsRjtpQkFDSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7YUFDckU7WUFDRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLENBQUM7S0FBQTtJQUVLLE1BQU0sQ0FBQyxNQUFNOzs7OztZQUNqQixPQUFNLE1BQU0sWUFBQyxNQUFNLEVBQUU7WUFDckIsd0NBQXdDO1lBQ3hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssNkJBQVcsQ0FBQyxNQUFNLEVBQUU7Z0JBQy9DLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxHQUFHLDJDQUFhLDhCQUE4QixFQUFDLENBQUM7Z0JBRTNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxpQkFBaUIsaUJBQzFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQzlCLENBQUM7Z0JBRUgsTUFBTyxJQUFJLENBQUMsZUFBdUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUM1QztpQkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLDZCQUFXLENBQUMsS0FBSyxFQUFFO2dCQUNyRCxvQ0FBb0M7Z0JBQ3BDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxtQ0FBZ0IsRUFBRSxDQUFDO2FBQy9DO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUFsREQsb0JBa0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSwgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMgfSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCB7IEJhc2VUZXh0R2F0ZXdheSwgVGV4dEdhdGV3YXkgfSBmcm9tICcuL2dhdGV3YXlzL0Jhc2VUZXh0R2F0ZXdheSc7XG5pbXBvcnQgeyBUZXh0TWVzc2FnZVNjaGVtYSB9IGZyb20gJy4vVGV4dE1lc3NhZ2UnO1xuaW1wb3J0IHsgRGVidWdUZXh0R2F0ZXdheSB9IGZyb20gJy4vZ2F0ZXdheXMvRGVidWdUZXh0R2F0ZXdheSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dFNlcnZpY2VPcHRpb25zIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICBmcm9tPzogc3RyaW5nO1xuICBnYXRld2F5OiBUZXh0R2F0ZXdheTtcbiAgZ2F0ZXdheU9wdGlvbnM/OiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIHByb3RlY3RlZCBnYXRld2F5SW5zdGFuY2U/OiBCYXNlVGV4dEdhdGV3YXk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IFRleHRTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKHsgbmFtZTogJ1RleHRTZXJ2aWNlJywgLi4ub3B0aW9ucyB9KTtcblxuICAgIGlmICghdGhpcy5vcHRpb25zLmdhdGV3YXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gZ2F0ZXdheSBzdXBwbGllZCBmb3IgdGhlIFRleHQgbWVzc2FnZXMgc2VydmljZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHNlcnZpY2UgaXMgcmVhZHkgZm9yIHNlbmRpbmcgdGV4dCBtZXNzYWdlcy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBpc1JlYWR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAhISh0aGlzLmdhdGV3YXlJbnN0YW5jZSAmJiB0aGlzLmdhdGV3YXlJbnN0YW5jZS5pc1JlYWR5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIGEgdGV4dCBtZXNzYWdlLlxuICAgKiBcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2Ugb3B0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZTogVGV4dE1lc3NhZ2VTY2hlbWEpIHtcbiAgICBpZiAoIXRoaXMuZ2F0ZXdheUluc3RhbmNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGdhdGV3YXkgaW5zdGFuY2UgaW5pdGlhbGl6ZWQgZm9yIHRoZSBUZXh0IG1lc3NhZ2VzIHNlcnZpY2UnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbWVzc2FnZSBwcm92aWRlZCBmb3IgdGhlIFRleHQgZ2F0ZXdheSBzZXJ2aWNlJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdhdGV3YXlJbnN0YW5jZS5zZW5kKG1lc3NhZ2UpO1xuICB9XG5cbiAgYXN5bmMgb25Jbml0KHNlcnZlcikge1xuICAgIHN1cGVyLm9uSW5pdChzZXJ2ZXIpO1xuICAgIC8vIEhhbmRsZXMgdHdpbGlvIGR5bmFtaWMgaW5pdGlhbGl6YXRpb25cbiAgICBpZiAodGhpcy5vcHRpb25zLmdhdGV3YXkgPT09IFRleHRHYXRld2F5LlRXSUxJTykge1xuICAgICAgY29uc3QgeyBUd2lsaW9UZXh0R2F0ZXdheSB9ID0gYXdhaXQgaW1wb3J0KCcuL2dhdGV3YXlzL1R3aWxpb1RleHRHYXRld2F5Jyk7XG5cbiAgICAgIHRoaXMuZ2F0ZXdheUluc3RhbmNlID0gbmV3IFR3aWxpb1RleHRHYXRld2F5KHtcbiAgICAgICAgZnJvbTogdGhpcy5vcHRpb25zLmZyb20sXG4gICAgICAgIC4uLnRoaXMub3B0aW9ucy5nYXRld2F5T3B0aW9ucyxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCAodGhpcy5nYXRld2F5SW5zdGFuY2UgYXMgYW55KS5pbml0KCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZ2F0ZXdheSA9PT0gVGV4dEdhdGV3YXkuREVCVUcpIHtcbiAgICAgIC8vIEhhbmRsZXMgYSBkZWJ1ZyBnYXRld2F5IChjb25zb2xlKVxuICAgICAgdGhpcy5nYXRld2F5SW5zdGFuY2UgPSBuZXcgRGVidWdUZXh0R2F0ZXdheSgpO1xuICAgIH1cbiAgfVxufSJdfQ==