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
const ts_framework_common_1 = require("ts-framework-common");
const base_1 = require("./base");
const email_1 = require("./email");
const firebase_1 = require("./firebase");
const slack_1 = require("./slack");
const text_1 = require("./text");
class Notification extends base_1.NotificationService {
    constructor(options) {
        super(Object.assign({ name: 'NotificationService' }, options));
        const available = ['email', 'firebase', 'text', 'slack'];
        const requested = Object.keys(this.options).filter(key => available.indexOf(key) >= 0);
        // At least one transport must be supplied to use this abstraction layer
        if (requested.length === 0) {
            throw new Error('No transports configured, you need to specifiy at least one debug service to use the Notification layer.');
        }
        // Initialize the email transport, if available
        if (this.options.email) {
            this.component(new email_1.Email(this.options.email));
        }
        // Initialize the firebase transport, if available
        if (this.options.firebase) {
            this.component(new firebase_1.Firebase(this.options.firebase));
        }
        // Initialize the text transport, if available
        if (this.options.text) {
            this.component(new text_1.Text(this.options.text));
        }
        // Initialize the slack transport, if available
        if (this.options.slack) {
            this.component(new slack_1.Slack(this.options.slack));
        }
    }
    /**
     * Send a notification using the currently available and configured transporters.
     *
     * @param message The notification to be sent, can be an Email message, a Firebase message or a Text message.
     * @param options The options to be sent to the Transporter
     */
    send(message, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message instanceof email_1.EmailMessage) {
                return this.getByType(email_1.Email).send(message);
            }
            else if (message instanceof firebase_1.FirebaseMessage) {
                return this.getByType(firebase_1.Firebase).send(message, options);
            }
            else if (message instanceof text_1.TextMessage) {
                return this.getByType(text_1.Text).send(message);
            }
            else if (message instanceof slack_1.SlackMessage) {
                return this.getByType(slack_1.Slack).send(message);
            }
            else {
                throw new ts_framework_common_1.BaseError(`${this.options.name}: Message is not a valid instance for the Notification transport`, { type: (typeof message), });
            }
        });
    }
    getByType(type) {
        return this.children.find(child => child instanceof type);
    }
}
Notification.EmailMessage = email_1.EmailMessage;
Notification.FirebaseMessage = firebase_1.FirebaseMessage;
Notification.TextMessage = text_1.TextMessage;
Notification.SlackMessage = slack_1.SlackMessage;
exports.Notification = Notification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL05vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQWdEO0FBQ2hELGlDQUF5RTtBQUN6RSxtQ0FBbUU7QUFDbkUseUNBQStFO0FBQy9FLG1DQUFtRTtBQUNuRSxpQ0FBK0Q7QUFXL0QsTUFBYSxZQUFhLFNBQVEsMEJBQW1CO0lBUW5ELFlBQVksT0FBNEI7UUFDdEMsS0FBSyxpQkFBRyxJQUFJLEVBQUUscUJBQXFCLElBQUssT0FBTyxFQUFHLENBQUM7UUFDbkQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXZGLHdFQUF3RTtRQUN4RSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsMEdBQTBHLENBQUMsQ0FBQztTQUM3SDtRQUVELCtDQUErQztRQUMvQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBRUQsa0RBQWtEO1FBQ2xELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsOENBQThDO1FBQzlDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFFRCwrQ0FBK0M7UUFDL0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtZQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksYUFBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNVLElBQUksQ0FBQyxPQUFnQixFQUFFLE9BQWE7O1lBQy9DLElBQUksT0FBTyxZQUFZLG9CQUFZLEVBQUU7Z0JBQ25DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hFO2lCQUFNLElBQUksT0FBTyxZQUFZLDBCQUFlLEVBQUU7Z0JBQzdDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBK0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDL0U7aUJBQU0sSUFBSSxPQUFPLFlBQVksa0JBQVcsRUFBRTtnQkFDekMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDOUQ7aUJBQU0sSUFBSSxPQUFPLFlBQVksb0JBQVksRUFBRTtnQkFDMUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEU7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLCtCQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksa0VBQWtFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMxSTtRQUNILENBQUM7S0FBQTtJQUVTLFNBQVMsQ0FBZ0MsSUFBa0I7UUFDbkUsT0FBUSxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFlBQVksSUFBSSxDQUFRLENBQUM7SUFDNUUsQ0FBQzs7QUExRE0seUJBQVksR0FBRyxvQkFBWSxDQUFDO0FBQzVCLDRCQUFlLEdBQUcsMEJBQWUsQ0FBQztBQUNsQyx3QkFBVyxHQUFHLGtCQUFXLENBQUM7QUFDMUIseUJBQVksR0FBRyxvQkFBWSxDQUFDO0FBTnJDLG9DQThEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlLCBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCB7IEVtYWlsLCBFbWFpbE1lc3NhZ2UsIEVtYWlsU2VydmljZU9wdGlvbnMgfSBmcm9tICcuL2VtYWlsJztcbmltcG9ydCB7IEZpcmViYXNlLCBGaXJlYmFzZU1lc3NhZ2UsIEZpcmViYXNlU2VydmljZU9wdGlvbnMgfSBmcm9tICcuL2ZpcmViYXNlJztcbmltcG9ydCB7IFNsYWNrLCBTbGFja01lc3NhZ2UsIFNsYWNrU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9zbGFja1wiO1xuaW1wb3J0IHsgVGV4dCwgVGV4dE1lc3NhZ2UsIFRleHRTZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4vdGV4dCc7XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2UgPSBFbWFpbE1lc3NhZ2UgfCBGaXJlYmFzZU1lc3NhZ2UgfCBUZXh0TWVzc2FnZSB8IFNsYWNrTWVzc2FnZTtcblxuZXhwb3J0IGludGVyZmFjZSBOb3RpZmljYXRpb25PcHRpb25zIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICBlbWFpbD86IEVtYWlsU2VydmljZU9wdGlvbnNcbiAgZmlyZWJhc2U/OiBGaXJlYmFzZVNlcnZpY2VPcHRpb25zXG4gIHRleHQ/OiBUZXh0U2VydmljZU9wdGlvbnNcbiAgc2xhY2s/OiBTbGFja1NlcnZpY2VPcHRpb25zXG59XG5cbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb24gZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgcHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IE5vdGlmaWNhdGlvbk9wdGlvbnM7XG5cbiAgc3RhdGljIEVtYWlsTWVzc2FnZSA9IEVtYWlsTWVzc2FnZTtcbiAgc3RhdGljIEZpcmViYXNlTWVzc2FnZSA9IEZpcmViYXNlTWVzc2FnZTtcbiAgc3RhdGljIFRleHRNZXNzYWdlID0gVGV4dE1lc3NhZ2U7XG4gIHN0YXRpYyBTbGFja01lc3NhZ2UgPSBTbGFja01lc3NhZ2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTm90aWZpY2F0aW9uT3B0aW9ucykge1xuICAgIHN1cGVyKHsgbmFtZTogJ05vdGlmaWNhdGlvblNlcnZpY2UnLCAuLi5vcHRpb25zIH0pO1xuICAgIGNvbnN0IGF2YWlsYWJsZSA9IFsnZW1haWwnLCAnZmlyZWJhc2UnLCAndGV4dCcsICdzbGFjayddO1xuICAgIGNvbnN0IHJlcXVlc3RlZCA9IE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucykuZmlsdGVyKGtleSA9PiBhdmFpbGFibGUuaW5kZXhPZihrZXkpID49IDApO1xuXG4gICAgLy8gQXQgbGVhc3Qgb25lIHRyYW5zcG9ydCBtdXN0IGJlIHN1cHBsaWVkIHRvIHVzZSB0aGlzIGFic3RyYWN0aW9uIGxheWVyXG4gICAgaWYgKHJlcXVlc3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gdHJhbnNwb3J0cyBjb25maWd1cmVkLCB5b3UgbmVlZCB0byBzcGVjaWZpeSBhdCBsZWFzdCBvbmUgZGVidWcgc2VydmljZSB0byB1c2UgdGhlIE5vdGlmaWNhdGlvbiBsYXllci4nKTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBlbWFpbCB0cmFuc3BvcnQsIGlmIGF2YWlsYWJsZVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZW1haWwpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50KG5ldyBFbWFpbCh0aGlzLm9wdGlvbnMuZW1haWwpKTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBmaXJlYmFzZSB0cmFuc3BvcnQsIGlmIGF2YWlsYWJsZVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZmlyZWJhc2UpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50KG5ldyBGaXJlYmFzZSh0aGlzLm9wdGlvbnMuZmlyZWJhc2UpKTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSB0ZXh0IHRyYW5zcG9ydCwgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMub3B0aW9ucy50ZXh0KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudChuZXcgVGV4dCh0aGlzLm9wdGlvbnMudGV4dCkpO1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgdGhlIHNsYWNrIHRyYW5zcG9ydCwgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zbGFjaykge1xuICAgICAgdGhpcy5jb21wb25lbnQobmV3IFNsYWNrKHRoaXMub3B0aW9ucy5zbGFjaykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgbm90aWZpY2F0aW9uIHVzaW5nIHRoZSBjdXJyZW50bHkgYXZhaWxhYmxlIGFuZCBjb25maWd1cmVkIHRyYW5zcG9ydGVycy5cbiAgICogXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBub3RpZmljYXRpb24gdG8gYmUgc2VudCwgY2FuIGJlIGFuIEVtYWlsIG1lc3NhZ2UsIGEgRmlyZWJhc2UgbWVzc2FnZSBvciBhIFRleHQgbWVzc2FnZS5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgdG8gYmUgc2VudCB0byB0aGUgVHJhbnNwb3J0ZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2U6IE1lc3NhZ2UsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVtYWlsTWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QnlUeXBlKEVtYWlsIGFzIHsgbmV3KCk6IEVtYWlsIH0pLnNlbmQobWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRmlyZWJhc2VNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRCeVR5cGUoRmlyZWJhc2UgYXMgeyBuZXcoKTogRmlyZWJhc2UgfSkuc2VuZChtZXNzYWdlLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBUZXh0TWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QnlUeXBlKFRleHQgYXMgeyBuZXcoKTogVGV4dCB9KS5zZW5kKG1lc3NhZ2UpO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIFNsYWNrTWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QnlUeXBlKFNsYWNrIGFzIHsgbmV3KCk6IFNsYWNrIH0pLnNlbmQobWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoYCR7dGhpcy5vcHRpb25zLm5hbWV9OiBNZXNzYWdlIGlzIG5vdCBhIHZhbGlkIGluc3RhbmNlIGZvciB0aGUgTm90aWZpY2F0aW9uIHRyYW5zcG9ydGAsIHsgdHlwZTogKHR5cGVvZiBtZXNzYWdlKSwgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldEJ5VHlwZTxUIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZT4odHlwZTogeyBuZXcoKTogVCB9KTogVCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuICh0aGlzLmNoaWxkcmVuIGFzIFRbXSkuZmluZChjaGlsZCA9PiBjaGlsZCBpbnN0YW5jZW9mIHR5cGUpIGFzIGFueTtcbiAgfVxufSJdfQ==