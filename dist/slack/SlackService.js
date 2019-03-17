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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xhY2tTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NsYWNrL1NsYWNrU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsaUNBQTZDO0FBQzdDLDZEQUF3RTtBQUN4RSxrQ0FBMEU7QUFDMUUsaURBQWtFO0FBVWxFLE1BQWEsS0FBTSxTQUFRLDBCQUFtQjtJQUs1QyxZQUFZLE9BQTRCO1FBQ3RDLEtBQUssaUJBQUcsSUFBSSxFQUFFLGNBQWMsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRUssT0FBTyxDQUFDLE1BQU07Ozs7O1lBQ2xCLE1BQU0sT0FBTSxPQUFPLFlBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLGVBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QyxDQUFDO0tBQUE7SUFFSyxTQUFTLENBQUMsTUFBTTs7Ozs7WUFDcEIsTUFBTSxPQUFNLFNBQVMsWUFBQyxNQUFNLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUMxQixDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsSUFBSSxDQUFDLE9BQTJCOztZQUMzQyxNQUFNLElBQUksR0FBRyxJQUFJLDJCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV6RSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUN0QiwyREFBMkQ7Z0JBQzNELE1BQU0sWUFBWSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLG1DQUFtQyxDQUFDO2dCQUM3RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDNUQsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO2FBQ3ZDO1lBRUQsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDUixNQUFNLElBQUksK0JBQVMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2FBQ2pEO1lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLG9CQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRyxDQUFDO1lBRW5FLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQzNCLE1BQU0sSUFBSSwrQkFBUyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLDJDQUEyQyxDQUFDLENBQUM7YUFDOUc7WUFFRCxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDO0tBQUE7Q0FDRjtBQWpERCxzQkFpREMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBBeGlvcywgeyBBeGlvc0luc3RhbmNlIH0gZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyBCYXNlRXJyb3IsIExvZ2dlciwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSwgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi4vYmFzZVwiO1xuaW1wb3J0IHsgU2xhY2tNZXNzYWdlLCBTbGFja01lc3NhZ2VTY2hlbWEgfSBmcm9tIFwiLi9TbGFja01lc3NhZ2VcIjtcblxuXG5leHBvcnQgaW50ZXJmYWNlIFNsYWNrU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuICB3ZWJob29rVXJsPzogc3RyaW5nO1xuICBjaGFubmVsPzogc3RyaW5nO1xuICBkZWJ1Zz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBTbGFjayBleHRlbmRzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICBwdWJsaWMgcmVhZG9ubHkgb3B0aW9uczogU2xhY2tTZXJ2aWNlT3B0aW9ucztcbiAgcHVibGljIGNsaWVudDogQXhpb3NJbnN0YW5jZTtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogU2xhY2tTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKHsgbmFtZTogJ1NsYWNrU2VydmljZScsIC4uLm9wdGlvbnMgfSk7XG4gICAgdGhpcy5jbGllbnQgPSBBeGlvcy5jcmVhdGUoKTtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgYXN5bmMgb25Nb3VudChzZXJ2ZXIpIHtcbiAgICBhd2FpdCBzdXBlci5vbk1vdW50KHNlcnZlcik7XG4gICAgdGhpcy5jbGllbnQgPSB0aGlzLmNsaWVudCB8fCBBeGlvcy5jcmVhdGUoKTtcbiAgfVxuXG4gIGFzeW5jIG9uVW5tb3VudChzZXJ2ZXIpIHtcbiAgICBhd2FpdCBzdXBlci5vblVubW91bnQoc2VydmVyKTtcbiAgICB0aGlzLmNsaWVudCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3N0IG1lc3NhZ2Ugb24gc2xhY2suXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBwb3N0IG9wdGlvbnNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2U6IFNsYWNrTWVzc2FnZVNjaGVtYSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgZGF0YSA9IG5ldyBTbGFja01lc3NhZ2UobWVzc2FnZSk7XG4gICAgY29uc3QgdXJsID0gZGF0YS53ZWJob29rVXJsIHx8ICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLndlYmhvb2tVcmwpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgLy8gTG9ncyB0aGUgbm90aWZpY2F0aW9uIGJvZHkgaW4gdGhlIGNvbnNvbGUgYXMgYSBkZWJ1ZyBsb2dcbiAgICAgIGNvbnN0IGRlYnVnTWVzc2FnZSA9IGAke3RoaXMub3B0aW9ucy5uYW1lfSByZWNlaXZlZCBhIG1lc3NhZ2UgaW4gZGVidWcgbW9kZWA7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhkZWJ1Z01lc3NhZ2UsIHsgbWVzc2FnZTogZGF0YS50b0pTT04oKSB9KTtcbiAgICAgIHJldHVybiB7IGRlYnVnOiB0cnVlLCBtZXNzYWdlOiBkYXRhIH07XG4gICAgfVxuXG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXCJXZWJob29rIHVybCBub3Qgc3VwcGxpZWRcIik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KHVybCwgeyAuLi5kYXRhLnRvSlNPTigpIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEubWVzc2FnZSkgfHwgXCJFcnJvciBhdHRlbXB0aW5nIHRvIHBvc3QgbWVzc2FnZSBvbiBzbGFja1wiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbn0iXX0=