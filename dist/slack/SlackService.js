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
        this.options = options;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xhY2tTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NsYWNrL1NsYWNrU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsaUNBQTZDO0FBQzdDLDZEQUFnRDtBQUNoRCxrQ0FBMEU7QUFDMUUsaURBQWtFO0FBUWxFLE1BQWEsS0FBTSxTQUFRLDBCQUFtQjtJQUc1QyxZQUE0QixPQUE0QjtRQUN0RCxLQUFLLGlCQUFHLElBQUksRUFBRSxjQUFjLElBQUssT0FBTyxFQUFHLENBQUM7UUFEbEIsWUFBTyxHQUFQLE9BQU8sQ0FBcUI7UUFFdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVLLE9BQU87O1FBQ2IsQ0FBQztLQUFBO0lBRUssU0FBUzs7WUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUMxQixDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsSUFBSSxDQUFDLE9BQTJCOztZQUMzQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1IsTUFBTSxJQUFJLCtCQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQzthQUNqRDtZQUVELE1BQU0sSUFBSSxHQUFHLElBQUksMkJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsb0JBQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFHLENBQUM7WUFFbkUsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDM0IsTUFBTSxJQUFJLCtCQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksMkNBQTJDLENBQUMsQ0FBQzthQUM5RztZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUssTUFBTTs7UUFDWixDQUFDO0tBQUE7SUFFSyxPQUFPOztRQUNiLENBQUM7S0FBQTtDQUNGO0FBekNELHNCQXlDQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IEF4aW9zLCB7IEF4aW9zSW5zdGFuY2UgfSBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlLCBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuLi9iYXNlXCI7XG5pbXBvcnQgeyBTbGFja01lc3NhZ2VTY2hlbWEsIFNsYWNrTWVzc2FnZSB9IGZyb20gXCIuL1NsYWNrTWVzc2FnZVwiO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2xhY2tTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIE5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIHtcbiAgd2ViaG9va1VybD86IHN0cmluZztcbiAgY2hhbm5lbD86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFNsYWNrIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIHB1YmxpYyBjbGllbnQ6IEF4aW9zSW5zdGFuY2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IFNsYWNrU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcih7IG5hbWU6ICdTbGFja1NlcnZpY2UnLCAuLi5vcHRpb25zIH0pO1xuICAgIHRoaXMuY2xpZW50ID0gQXhpb3MuY3JlYXRlKCk7XG4gIH1cblxuICBhc3luYyBvbk1vdW50KCkge1xuICB9XG5cbiAgYXN5bmMgb25Vbm1vdW50KCkge1xuICAgIHRoaXMuY2xpZW50ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFBvc3QgbWVzc2FnZSBvbiBzbGFjay5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIHBvc3Qgb3B0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZTogU2xhY2tNZXNzYWdlU2NoZW1hKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgdXJsID0gbWVzc2FnZS53ZWJob29rVXJsIHx8ICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLndlYmhvb2tVcmwpO1xuICAgIGlmICghdXJsKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKFwiV2ViaG9vayB1cmwgbm90IHN1cHBsaWVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSBuZXcgU2xhY2tNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jbGllbnQucG9zdCh1cmwsIHsgLi4uZGF0YS50b0pTT04oKSB9KTtcblxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcigocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLm1lc3NhZ2UpIHx8IFwiRXJyb3IgYXR0ZW1wdGluZyB0byBwb3N0IG1lc3NhZ2Ugb24gc2xhY2tcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBvbkluaXQoKSB7XG4gIH1cblxuICBhc3luYyBvblJlYWR5KCkge1xuICB9XG59Il19