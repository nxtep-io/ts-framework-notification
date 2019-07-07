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
const SlackMessage_1 = require("./SlackMessage");
class Slack extends base_1.NotificationService {
    constructor(options) {
        super(Object.assign({ name: 'SlackService' }, options));
        this.client = axios_1.default.create();
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
        this.apiUrl = options.apiUrl || 'https://slack.com/api/chat.postMessage';
    }
    onMount(server) {
        const _super = Object.create(null, {
            onMount: { get: () => super.onMount }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.onMount.call(this, server);
            this.client = this.client || axios_1.default.create();
        });
    }
    onUnmount(server) {
        const _super = Object.create(null, {
            onUnmount: { get: () => super.onUnmount }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.onUnmount.call(this, server);
            this.client = undefined;
        });
    }
    /**
     * Post message on slack.
     *
     * @param options The post options
     */
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new SlackMessage_1.SlackMessage(message);
            // Prefer webhook url for backwards compatibility
            const url = this.options.webhookUrl || this.apiUrl;
            if (this.options.debug) {
                // Logs the notification body in the console as a debug log
                const debugMessage = `${this.options.name} received a message in debug mode`;
                this.logger.debug(debugMessage, { message: data.toJSON() });
                return { debug: true, message: data };
            }
            if (!url) {
                throw new ts_framework_common_1.BaseError("Webhook url not supplied");
            }
            // Post to desired url, passing access token whenever available
            const response = yield this.client.post(url, Object.assign({}, data.toJSON()), {
                headers: this.options.accessToken ? {
                    'Authorization': `Bearer ${this.options.accessToken}`
                } : {}
            });
            if (response.status !== 200) {
                throw new ts_framework_common_1.BaseError((response.data && response.data.message) || "Error attempting to post message on slack");
            }
            return response;
        });
    }
}
exports.Slack = Slack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xhY2tTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NsYWNrL1NsYWNrU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsaUNBQTZDO0FBQzdDLDZEQUF3RTtBQUN4RSxrQ0FBMEU7QUFDMUUsaURBQWtFO0FBWWxFLE1BQWEsS0FBTSxTQUFRLDBCQUFtQjtJQU01QyxZQUFZLE9BQTRCO1FBQ3RDLEtBQUssaUJBQUcsSUFBSSxFQUFFLGNBQWMsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksd0NBQXdDLENBQUM7SUFDM0UsQ0FBQztJQUVLLE9BQU8sQ0FBQyxNQUFNOzs7OztZQUNsQixNQUFNLE9BQU0sT0FBTyxZQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxlQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUMsQ0FBQztLQUFBO0lBRUssU0FBUyxDQUFDLE1BQU07Ozs7O1lBQ3BCLE1BQU0sT0FBTSxTQUFTLFlBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDMUIsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLElBQUksQ0FBQyxPQUEyQjs7WUFDM0MsTUFBTSxJQUFJLEdBQUcsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXZDLGlEQUFpRDtZQUNqRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBRW5ELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RCLDJEQUEyRDtnQkFDM0QsTUFBTSxZQUFZLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksbUNBQW1DLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RCxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDdkM7WUFFRCxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNSLE1BQU0sSUFBSSwrQkFBUyxDQUFDLDBCQUEwQixDQUFDLENBQUM7YUFDakQ7WUFFRCwrREFBK0Q7WUFDL0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLG9CQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBSTtnQkFDakUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsZUFBZSxFQUFFLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7aUJBQ3RELENBQUMsQ0FBQyxDQUFDLEVBQUU7YUFDUCxDQUFDLENBQUM7WUFFSCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUMzQixNQUFNLElBQUksK0JBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSwyQ0FBMkMsQ0FBQyxDQUFDO2FBQzlHO1lBRUQsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQztLQUFBO0NBQ0Y7QUExREQsc0JBMERDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgQXhpb3MsIHsgQXhpb3NJbnN0YW5jZSB9IGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IHsgQmFzZUVycm9yLCBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UsIE5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4uL2Jhc2VcIjtcbmltcG9ydCB7IFNsYWNrTWVzc2FnZSwgU2xhY2tNZXNzYWdlU2NoZW1hIH0gZnJvbSBcIi4vU2xhY2tNZXNzYWdlXCI7XG5cblxuZXhwb3J0IGludGVyZmFjZSBTbGFja1NlcnZpY2VPcHRpb25zIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbiAgZGVidWc/OiBib29sZWFuO1xuICBjaGFubmVsPzogc3RyaW5nO1xuICBhcGlVcmw/OiBzdHJpbmc7XG4gIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xuICB3ZWJob29rVXJsPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgU2xhY2sgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgcHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IFNsYWNrU2VydmljZU9wdGlvbnM7XG4gIHB1YmxpYyBjbGllbnQ6IEF4aW9zSW5zdGFuY2U7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBwdWJsaWMgYXBpVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogU2xhY2tTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKHsgbmFtZTogJ1NsYWNrU2VydmljZScsIC4uLm9wdGlvbnMgfSk7XG4gICAgdGhpcy5jbGllbnQgPSBBeGlvcy5jcmVhdGUoKTtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICAgIHRoaXMuYXBpVXJsID0gb3B0aW9ucy5hcGlVcmwgfHwgJ2h0dHBzOi8vc2xhY2suY29tL2FwaS9jaGF0LnBvc3RNZXNzYWdlJztcbiAgfVxuXG4gIGFzeW5jIG9uTW91bnQoc2VydmVyKSB7XG4gICAgYXdhaXQgc3VwZXIub25Nb3VudChzZXJ2ZXIpO1xuICAgIHRoaXMuY2xpZW50ID0gdGhpcy5jbGllbnQgfHwgQXhpb3MuY3JlYXRlKCk7XG4gIH1cblxuICBhc3luYyBvblVubW91bnQoc2VydmVyKSB7XG4gICAgYXdhaXQgc3VwZXIub25Vbm1vdW50KHNlcnZlcik7XG4gICAgdGhpcy5jbGllbnQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUG9zdCBtZXNzYWdlIG9uIHNsYWNrLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgcG9zdCBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlOiBTbGFja01lc3NhZ2VTY2hlbWEpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGRhdGEgPSBuZXcgU2xhY2tNZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgLy8gUHJlZmVyIHdlYmhvb2sgdXJsIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgIGNvbnN0IHVybCA9IHRoaXMub3B0aW9ucy53ZWJob29rVXJsIHx8IHRoaXMuYXBpVXJsO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgLy8gTG9ncyB0aGUgbm90aWZpY2F0aW9uIGJvZHkgaW4gdGhlIGNvbnNvbGUgYXMgYSBkZWJ1ZyBsb2dcbiAgICAgIGNvbnN0IGRlYnVnTWVzc2FnZSA9IGAke3RoaXMub3B0aW9ucy5uYW1lfSByZWNlaXZlZCBhIG1lc3NhZ2UgaW4gZGVidWcgbW9kZWA7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhkZWJ1Z01lc3NhZ2UsIHsgbWVzc2FnZTogZGF0YS50b0pTT04oKSB9KTtcbiAgICAgIHJldHVybiB7IGRlYnVnOiB0cnVlLCBtZXNzYWdlOiBkYXRhIH07XG4gICAgfVxuXG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXCJXZWJob29rIHVybCBub3Qgc3VwcGxpZWRcIik7XG4gICAgfVxuXG4gICAgLy8gUG9zdCB0byBkZXNpcmVkIHVybCwgcGFzc2luZyBhY2Nlc3MgdG9rZW4gd2hlbmV2ZXIgYXZhaWxhYmxlXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KHVybCwgeyAuLi5kYXRhLnRvSlNPTigpIH0sIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMub3B0aW9ucy5hY2Nlc3NUb2tlbiA/IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dGhpcy5vcHRpb25zLmFjY2Vzc1Rva2VufWBcbiAgICAgIH0gOiB7fVxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEubWVzc2FnZSkgfHwgXCJFcnJvciBhdHRlbXB0aW5nIHRvIHBvc3QgbWVzc2FnZSBvbiBzbGFja1wiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbn0iXX0=