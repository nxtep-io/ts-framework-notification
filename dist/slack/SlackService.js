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
const axios_1 = require("axios");
const ts_framework_common_1 = require("ts-framework-common");
const base_1 = require("../base");
class Slack extends base_1.NotificationService {
    constructor(options) {
        super(Object.assign({ name: 'SlackService' }, options));
    }
    /**
     * Post message on slack.
     *
     * @param options The post options
     */
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = message.webhookUrl || (this.options && this.options.webhookUrl);
            if (!url) {
                throw new ts_framework_common_1.BaseError("Webhook url not supplied");
            }
            const response = yield this.client.post(url, Object.assign({}, message));
            if (response.status !== 200) {
                throw new ts_framework_common_1.BaseError((response.data && response.data.message) || "Error attempting to post message on slack");
            }
            return true;
        });
    }
    onMount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = axios_1.default.create();
        });
    }
    onUnmount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = undefined;
        });
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
exports.Slack = Slack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xhY2tTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NsYWNrL1NsYWNrU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsaUNBQTZDO0FBQzdDLDZEQUFnRDtBQUNoRCxrQ0FBMEU7QUFTMUUsTUFBYSxLQUFNLFNBQVEsMEJBQW1CO0lBSTVDLFlBQVksT0FBNEI7UUFDdEMsS0FBSyxpQkFBRyxJQUFJLEVBQUUsY0FBYyxJQUFLLE9BQU8sRUFBRyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UsSUFBSSxDQUFDLE9BQTJCOztZQUMzQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1IsTUFBTSxJQUFJLCtCQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQzthQUNqRDtZQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxvQkFBTyxPQUFPLEVBQUcsQ0FBQztZQUU3RCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUMzQixNQUFNLElBQUksK0JBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSwyQ0FBMkMsQ0FBQyxDQUFDO2FBQzlHO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFSyxPQUFPOztZQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUVLLFNBQVM7O1lBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDMUIsQ0FBQztLQUFBO0lBRUssTUFBTTs7UUFDWixDQUFDO0tBQUE7SUFFSyxPQUFPOztRQUNiLENBQUM7S0FBQTtDQUNGO0FBekNELHNCQXlDQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IEF4aW9zLCB7IEF4aW9zSW5zdGFuY2UgfSBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlLCBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuLi9iYXNlXCI7XG5pbXBvcnQgeyBTbGFja01lc3NhZ2VTY2hlbWEgfSBmcm9tIFwiLi9TbGFja01lc3NhZ2VcIjtcblxuXG5leHBvcnQgaW50ZXJmYWNlIFNsYWNrU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB7XG4gIHdlYmhvb2tVcmw/OiBzdHJpbmc7XG4gIGNoYW5uZWw/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBTbGFjayBleHRlbmRzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICBwdWJsaWMgb3B0aW9uczogU2xhY2tTZXJ2aWNlT3B0aW9ucztcbiAgcHVibGljIGNsaWVudDogQXhpb3NJbnN0YW5jZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBTbGFja1NlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIoeyBuYW1lOiAnU2xhY2tTZXJ2aWNlJywgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3N0IG1lc3NhZ2Ugb24gc2xhY2suXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBwb3N0IG9wdGlvbnNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2U6IFNsYWNrTWVzc2FnZVNjaGVtYSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHVybCA9IG1lc3NhZ2Uud2ViaG9va1VybCB8fCAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy53ZWJob29rVXJsKTtcbiAgICBpZiAoIXVybCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcIldlYmhvb2sgdXJsIG5vdCBzdXBwbGllZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnBvc3QodXJsLCB7IC4uLm1lc3NhZ2UgfSk7XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5tZXNzYWdlKSB8fCBcIkVycm9yIGF0dGVtcHRpbmcgdG8gcG9zdCBtZXNzYWdlIG9uIHNsYWNrXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgb25Nb3VudCgpIHtcbiAgICB0aGlzLmNsaWVudCA9IEF4aW9zLmNyZWF0ZSgpO1xuICB9XG5cbiAgYXN5bmMgb25Vbm1vdW50KCkge1xuICAgIHRoaXMuY2xpZW50ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgYXN5bmMgb25Jbml0KCkge1xuICB9XG5cbiAgYXN5bmMgb25SZWFkeSgpIHtcbiAgfVxufSJdfQ==