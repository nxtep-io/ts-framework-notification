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
    }
    onMount() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    onUnmount() {
        return __awaiter(this, void 0, void 0, function* () {
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
            const url = message.webhookUrl || (this.options && this.options.webhookUrl);
            if (!url) {
                throw new ts_framework_common_1.BaseError("Webhook url not supplied");
            }
            const data = new SlackMessage_1.SlackMessage(message);
            const response = yield this.client.post(url, Object.assign({}, data.toJSON()));
            if (response.status !== 200) {
                throw new ts_framework_common_1.BaseError((response.data && response.data.message) || "Error attempting to post message on slack");
            }
            return true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xhY2tTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NsYWNrL1NsYWNrU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsaUNBQTZDO0FBQzdDLDZEQUFnRDtBQUNoRCxrQ0FBMEU7QUFDMUUsaURBQWtFO0FBUWxFLE1BQWEsS0FBTSxTQUFRLDBCQUFtQjtJQUk1QyxZQUFZLE9BQTRCO1FBQ3RDLEtBQUssaUJBQUcsSUFBSSxFQUFFLGNBQWMsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUssT0FBTzs7UUFDYixDQUFDO0tBQUE7SUFFSyxTQUFTOztZQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQzFCLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxJQUFJLENBQUMsT0FBMkI7O1lBQzNDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDUixNQUFNLElBQUksK0JBQVMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2FBQ2pEO1lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxvQkFBTyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUcsQ0FBQztZQUVuRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUMzQixNQUFNLElBQUksK0JBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSwyQ0FBMkMsQ0FBQyxDQUFDO2FBQzlHO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFSyxNQUFNOztRQUNaLENBQUM7S0FBQTtJQUVLLE9BQU87O1FBQ2IsQ0FBQztLQUFBO0NBQ0Y7QUExQ0Qsc0JBMENDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgQXhpb3MsIHsgQXhpb3NJbnN0YW5jZSB9IGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UsIE5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4uL2Jhc2VcIjtcbmltcG9ydCB7IFNsYWNrTWVzc2FnZVNjaGVtYSwgU2xhY2tNZXNzYWdlIH0gZnJvbSBcIi4vU2xhY2tNZXNzYWdlXCI7XG5cblxuZXhwb3J0IGludGVyZmFjZSBTbGFja1NlcnZpY2VPcHRpb25zIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICB3ZWJob29rVXJsPzogc3RyaW5nO1xuICBjaGFubmVsPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgU2xhY2sgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgcHVibGljIG9wdGlvbnM6IFNsYWNrU2VydmljZU9wdGlvbnM7XG4gIHB1YmxpYyBjbGllbnQ6IEF4aW9zSW5zdGFuY2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogU2xhY2tTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKHsgbmFtZTogJ1NsYWNrU2VydmljZScsIC4uLm9wdGlvbnMgfSk7XG4gICAgdGhpcy5jbGllbnQgPSBBeGlvcy5jcmVhdGUoKTtcbiAgfVxuXG4gIGFzeW5jIG9uTW91bnQoKSB7XG4gIH1cblxuICBhc3luYyBvblVubW91bnQoKSB7XG4gICAgdGhpcy5jbGllbnQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUG9zdCBtZXNzYWdlIG9uIHNsYWNrLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgcG9zdCBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlOiBTbGFja01lc3NhZ2VTY2hlbWEpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCB1cmwgPSBtZXNzYWdlLndlYmhvb2tVcmwgfHwgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMud2ViaG9va1VybCk7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXCJXZWJob29rIHVybCBub3Qgc3VwcGxpZWRcIik7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IG5ldyBTbGFja01lc3NhZ2UobWVzc2FnZSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KHVybCwgeyAuLi5kYXRhLnRvSlNPTigpIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEubWVzc2FnZSkgfHwgXCJFcnJvciBhdHRlbXB0aW5nIHRvIHBvc3QgbWVzc2FnZSBvbiBzbGFja1wiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIG9uSW5pdCgpIHtcbiAgfVxuXG4gIGFzeW5jIG9uUmVhZHkoKSB7XG4gIH1cbn0iXX0=