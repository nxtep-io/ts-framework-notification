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
const TwilioTextGateway_1 = require("./gateways/TwilioTextGateway");
class TextService extends base_1.NotificationService {
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
            return this.gatewayInstance.send(message);
        });
    }
    onMount() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    onUnmount() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    onInit() {
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
    onReady() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = TextService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdGV4dC9UZXh0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsa0NBQTBFO0FBQzFFLGdFQUEwRTtBQUMxRSxvRUFBeUQ7QUFTekQsTUFBcUIsV0FBWSxTQUFRLDBCQUFtQjtJQUkxRCxZQUFZLE9BQTJCO1FBQ3JDLEtBQUssaUJBQUcsSUFBSSxFQUFFLGFBQWEsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUUzQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1NBQ3RFO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ1UsT0FBTzs7WUFDbEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLElBQUksQ0FBQyxPQUEwQjs7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQzthQUNsRjtZQUNELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsQ0FBQztLQUFBO0lBRUssT0FBTzs7UUFDYixDQUFDO0tBQUE7SUFDSyxTQUFTOztRQUNmLENBQUM7S0FBQTtJQUNLLE1BQU07O1lBQ1Ysd0NBQXdDO1lBQ3hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssNkJBQVcsQ0FBQyxNQUFNLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSwyQkFBYSxpQkFDdEMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFDOUIsQ0FBQzthQUNKO2lCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssNkJBQVcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3JELG9DQUFvQztnQkFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRztvQkFDckIsT0FBTyxFQUFFLElBQUk7b0JBQ1AsSUFBSSxDQUFDLEdBQUc7OzRCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFEQUFxRCxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4RyxDQUFDO3FCQUFBO2lCQUNGLENBQUE7YUFDRjtRQUNILENBQUM7S0FBQTtJQUNLLE9BQU87O1FBQ2IsQ0FBQztLQUFBO0NBQ0Y7QUF0REQsOEJBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSwgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMgfSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCB7IEJhc2VUZXh0R2F0ZXdheSwgVGV4dEdhdGV3YXkgfSBmcm9tICcuL2dhdGV3YXlzL0Jhc2VUZXh0R2F0ZXdheSc7XG5pbXBvcnQgVHdpbGlvR2F0ZXdheSBmcm9tICcuL2dhdGV3YXlzL1R3aWxpb1RleHRHYXRld2F5JztcbmltcG9ydCB7IFRleHRNZXNzYWdlU2NoZW1hIH0gZnJvbSAnLi9UZXh0TWVzc2FnZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dFNlcnZpY2VPcHRpb25zIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICBmcm9tPzogc3RyaW5nO1xuICBnYXRld2F5OiBUZXh0R2F0ZXdheTtcbiAgZ2F0ZXdheU9wdGlvbnM/OiBhbnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRTZXJ2aWNlIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIHB1YmxpYyBvcHRpb25zOiBUZXh0U2VydmljZU9wdGlvbnM7XG4gIHByb3RlY3RlZCBnYXRld2F5SW5zdGFuY2U/OiBCYXNlVGV4dEdhdGV3YXk7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogVGV4dFNlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIoeyBuYW1lOiAnVGV4dFNlcnZpY2UnLCAuLi5vcHRpb25zIH0pO1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZ2F0ZXdheSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBnYXRld2F5IHN1cHBsaWVkIGZvciB0aGUgVGV4dCBtZXNzYWdlcyBzZXJ2aWNlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgc2VydmljZSBpcyByZWFkeSBmb3Igc2VuZGluZyB0ZXh0IG1lc3NhZ2VzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGlzUmVhZHkoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICEhKHRoaXMuZ2F0ZXdheUluc3RhbmNlICYmIHRoaXMuZ2F0ZXdheUluc3RhbmNlLmlzUmVhZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgYSB0ZXh0IG1lc3NhZ2UuXG4gICAqIFxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlOiBUZXh0TWVzc2FnZVNjaGVtYSkge1xuICAgIGlmICghdGhpcy5nYXRld2F5SW5zdGFuY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gZ2F0ZXdheSBpbnN0YW5jZSBpbml0aWFsaXplZCBmb3IgdGhlIFRleHQgbWVzc2FnZXMgc2VydmljZScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nYXRld2F5SW5zdGFuY2Uuc2VuZChtZXNzYWdlKTtcbiAgfVxuXG4gIGFzeW5jIG9uTW91bnQoKSB7XG4gIH1cbiAgYXN5bmMgb25Vbm1vdW50KCkge1xuICB9XG4gIGFzeW5jIG9uSW5pdCgpIHtcbiAgICAvLyBIYW5kbGVzIHR3aWxpbyBkeW5hbWljIGluaXRpYWxpemF0aW9uXG4gICAgaWYgKHRoaXMub3B0aW9ucy5nYXRld2F5ID09PSBUZXh0R2F0ZXdheS5UV0lMSU8pIHtcbiAgICAgIHRoaXMuZ2F0ZXdheUluc3RhbmNlID0gbmV3IFR3aWxpb0dhdGV3YXkoe1xuICAgICAgICBmcm9tOiB0aGlzLm9wdGlvbnMuZnJvbSxcbiAgICAgICAgLi4udGhpcy5vcHRpb25zLmdhdGV3YXlPcHRpb25zLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZ2F0ZXdheSA9PT0gVGV4dEdhdGV3YXkuREVCVUcpIHtcbiAgICAgIC8vIEhhbmRsZXMgYSBkZWJ1ZyBnYXRld2F5IChjb25zb2xlKVxuICAgICAgdGhpcy5nYXRld2F5SW5zdGFuY2UgPSB7XG4gICAgICAgIGlzUmVhZHk6IHRydWUsXG4gICAgICAgIGFzeW5jIHNlbmQobXNnKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybignVGV4dFNlcnZpY2U6IFNlbmRpbmcgU01TIGFzIGEgd2FybmluZyBpbiBkZWJ1ZyBtb2RlJywgSlNPTi5zdHJpbmdpZnkobXNnLCBudWxsLCAyKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgb25SZWFkeSgpIHtcbiAgfVxufSJdfQ==