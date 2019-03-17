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
    constructor(options = {}) {
        super(Object.assign({ name: 'SlackService' }, options));
        this.client = axios_1.default.create();
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
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
            const url = data.webhookUrl || (this.options && this.options.webhookUrl);
            if (this.options.debug) {
                // Logs the notification body in the console as a debug log
                const debugMessage = `${this.options.name} received a message in debug mode`;
                this.logger.debug(debugMessage, { message: data.toJSON() });
                return { debug: true, message: data };
            }
            if (!url) {
                throw new ts_framework_common_1.BaseError("Webhook url not supplied");
            }
            const response = yield this.client.post(url, Object.assign({}, data.toJSON()));
            if (response.status !== 200) {
                throw new ts_framework_common_1.BaseError((response.data && response.data.message) || "Error attempting to post message on slack");
            }
            return response;
        });
    }
}
exports.Slack = Slack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xhY2tTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NsYWNrL1NsYWNrU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsaUNBQTZDO0FBQzdDLDZEQUF3RTtBQUN4RSxrQ0FBMEU7QUFDMUUsaURBQWtFO0FBVWxFLE1BQWEsS0FBTSxTQUFRLDBCQUFtQjtJQUs1QyxZQUFZLFVBQStCLEVBQUU7UUFDM0MsS0FBSyxpQkFBRyxJQUFJLEVBQUUsY0FBYyxJQUFLLE9BQU8sRUFBRyxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFSyxPQUFPLENBQUMsTUFBTTs7Ozs7WUFDbEIsTUFBTSxPQUFNLE9BQU8sWUFBQyxNQUFNLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksZUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzlDLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxNQUFNOzs7OztZQUNwQixNQUFNLE9BQU0sU0FBUyxZQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQzFCLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxJQUFJLENBQUMsT0FBMkI7O1lBQzNDLE1BQU0sSUFBSSxHQUFHLElBQUksMkJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXpFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RCLDJEQUEyRDtnQkFDM0QsTUFBTSxZQUFZLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksbUNBQW1DLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RCxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDdkM7WUFFRCxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNSLE1BQU0sSUFBSSwrQkFBUyxDQUFDLDBCQUEwQixDQUFDLENBQUM7YUFDakQ7WUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsb0JBQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFHLENBQUM7WUFFbkUsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDM0IsTUFBTSxJQUFJLCtCQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksMkNBQTJDLENBQUMsQ0FBQzthQUM5RztZQUVELE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtDQUNGO0FBakRELHNCQWlEQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IEF4aW9zLCB7IEF4aW9zSW5zdGFuY2UgfSBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IEJhc2VFcnJvciwgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlLCBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuLi9iYXNlXCI7XG5pbXBvcnQgeyBTbGFja01lc3NhZ2UsIFNsYWNrTWVzc2FnZVNjaGVtYSB9IGZyb20gXCIuL1NsYWNrTWVzc2FnZVwiO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2xhY2tTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIE5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIHdlYmhvb2tVcmw/OiBzdHJpbmc7XG4gIGNoYW5uZWw/OiBzdHJpbmc7XG4gIGRlYnVnPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFNsYWNrIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIHB1YmxpYyByZWFkb25seSBvcHRpb25zOiBTbGFja1NlcnZpY2VPcHRpb25zO1xuICBwdWJsaWMgY2xpZW50OiBBeGlvc0luc3RhbmNlO1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBTbGFja1NlcnZpY2VPcHRpb25zID0ge30pIHtcbiAgICBzdXBlcih7IG5hbWU6ICdTbGFja1NlcnZpY2UnLCAuLi5vcHRpb25zIH0pO1xuICAgIHRoaXMuY2xpZW50ID0gQXhpb3MuY3JlYXRlKCk7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIGFzeW5jIG9uTW91bnQoc2VydmVyKSB7XG4gICAgYXdhaXQgc3VwZXIub25Nb3VudChzZXJ2ZXIpO1xuICAgIHRoaXMuY2xpZW50ID0gdGhpcy5jbGllbnQgfHwgQXhpb3MuY3JlYXRlKCk7XG4gIH1cblxuICBhc3luYyBvblVubW91bnQoc2VydmVyKSB7XG4gICAgYXdhaXQgc3VwZXIub25Vbm1vdW50KHNlcnZlcik7XG4gICAgdGhpcy5jbGllbnQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUG9zdCBtZXNzYWdlIG9uIHNsYWNrLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgcG9zdCBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlOiBTbGFja01lc3NhZ2VTY2hlbWEpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGRhdGEgPSBuZXcgU2xhY2tNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIGNvbnN0IHVybCA9IGRhdGEud2ViaG9va1VybCB8fCAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy53ZWJob29rVXJsKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcpIHtcbiAgICAgIC8vIExvZ3MgdGhlIG5vdGlmaWNhdGlvbiBib2R5IGluIHRoZSBjb25zb2xlIGFzIGEgZGVidWcgbG9nXG4gICAgICBjb25zdCBkZWJ1Z01lc3NhZ2UgPSBgJHt0aGlzLm9wdGlvbnMubmFtZX0gcmVjZWl2ZWQgYSBtZXNzYWdlIGluIGRlYnVnIG1vZGVgO1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoZGVidWdNZXNzYWdlLCB7IG1lc3NhZ2U6IGRhdGEudG9KU09OKCkgfSk7XG4gICAgICByZXR1cm4geyBkZWJ1ZzogdHJ1ZSwgbWVzc2FnZTogZGF0YSB9O1xuICAgIH1cblxuICAgIGlmICghdXJsKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKFwiV2ViaG9vayB1cmwgbm90IHN1cHBsaWVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jbGllbnQucG9zdCh1cmwsIHsgLi4uZGF0YS50b0pTT04oKSB9KTtcblxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcigocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLm1lc3NhZ2UpIHx8IFwiRXJyb3IgYXR0ZW1wdGluZyB0byBwb3N0IG1lc3NhZ2Ugb24gc2xhY2tcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG59Il19