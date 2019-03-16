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
        super(options);
        this.options = options;
        const available = ['email', 'firebase', 'text', 'slack'];
        const requested = Object.keys(this.options).filter(key => available.indexOf(key) >= 0);
        // At least one transport must be supplied to use this abstraction layer
        if (requested.length === 0) {
            throw new Error('No transports configured, you need to specifiy at least one debug service to use the Notification layer.');
        }
        const children = [];
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
            this.component(new slack_1.Slack(this.options.text));
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
// transports: {
//   email?: Email
//   firebase?: Firebase
//   text?: Text
//   slack?: Slack
// }
Notification.EmailMessage = email_1.EmailMessage;
Notification.FirebaseMessage = firebase_1.FirebaseMessage;
Notification.TextMessage = text_1.TextMessage;
Notification.SlackMessage = slack_1.SlackMessage;
exports.Notification = Notification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL05vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQWdEO0FBQ2hELGlDQUF5RTtBQUN6RSxtQ0FBbUU7QUFDbkUseUNBQStFO0FBQy9FLG1DQUFtRTtBQUNuRSxpQ0FBK0Q7QUFXL0QsTUFBYSxZQUFhLFNBQVEsMEJBQW1CO0lBYW5ELFlBQTRCLE9BQTRCO1FBQ3RELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURXLFlBQU8sR0FBUCxPQUFPLENBQXFCO1FBRXRELE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV2Rix3RUFBd0U7UUFDeEUsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLDBHQUEwRyxDQUFDLENBQUM7U0FDN0g7UUFFRCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFFcEIsK0NBQStDO1FBQy9DLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGFBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDL0M7UUFFRCxrREFBa0Q7UUFDbEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksbUJBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDckQ7UUFFRCw4Q0FBOEM7UUFDOUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUVELCtDQUErQztRQUMvQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsSUFBSSxDQUFDLE9BQWdCLEVBQUUsT0FBYTs7WUFDL0MsSUFBSSxPQUFPLFlBQVksb0JBQVksRUFBRTtnQkFDbkMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEU7aUJBQU0sSUFBSSxPQUFPLFlBQVksMEJBQWUsRUFBRTtnQkFDN0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUErQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzthQUMvRTtpQkFBTSxJQUFJLE9BQU8sWUFBWSxrQkFBVyxFQUFFO2dCQUN6QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBdUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM5RDtpQkFBTSxJQUFJLE9BQU8sWUFBWSxvQkFBWSxFQUFFO2dCQUMxQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBeUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoRTtpQkFBTTtnQkFDTCxNQUFNLElBQUksK0JBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxrRUFBa0UsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzFJO1FBQ0gsQ0FBQztLQUFBO0lBRVMsU0FBUyxDQUFnQyxJQUFrQjtRQUNuRSxPQUFRLElBQUksQ0FBQyxRQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssWUFBWSxJQUFJLENBQVEsQ0FBQztJQUM1RSxDQUFDOztBQW5FRCxnQkFBZ0I7QUFDaEIsa0JBQWtCO0FBQ2xCLHdCQUF3QjtBQUN4QixnQkFBZ0I7QUFDaEIsa0JBQWtCO0FBQ2xCLElBQUk7QUFFRyx5QkFBWSxHQUFHLG9CQUFZLENBQUM7QUFDNUIsNEJBQWUsR0FBRywwQkFBZSxDQUFDO0FBQ2xDLHdCQUFXLEdBQUcsa0JBQVcsQ0FBQztBQUMxQix5QkFBWSxHQUFHLG9CQUFZLENBQUM7QUFYckMsb0NBcUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UsIE5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZVwiO1xuaW1wb3J0IHsgRW1haWwsIEVtYWlsTWVzc2FnZSwgRW1haWxTZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4vZW1haWwnO1xuaW1wb3J0IHsgRmlyZWJhc2UsIEZpcmViYXNlTWVzc2FnZSwgRmlyZWJhc2VTZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4vZmlyZWJhc2UnO1xuaW1wb3J0IHsgU2xhY2ssIFNsYWNrTWVzc2FnZSwgU2xhY2tTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL3NsYWNrXCI7XG5pbXBvcnQgeyBUZXh0LCBUZXh0TWVzc2FnZSwgVGV4dFNlcnZpY2VPcHRpb25zIH0gZnJvbSAnLi90ZXh0JztcblxuZXhwb3J0IHR5cGUgTWVzc2FnZSA9IEVtYWlsTWVzc2FnZSB8IEZpcmViYXNlTWVzc2FnZSB8IFRleHRNZXNzYWdlIHwgU2xhY2tNZXNzYWdlO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvbk9wdGlvbnMgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB7XG4gIGVtYWlsPzogRW1haWxTZXJ2aWNlT3B0aW9uc1xuICBmaXJlYmFzZT86IEZpcmViYXNlU2VydmljZU9wdGlvbnNcbiAgdGV4dD86IFRleHRTZXJ2aWNlT3B0aW9uc1xuICBzbGFjaz86IFNsYWNrU2VydmljZU9wdGlvbnNcbn1cblxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbiBleHRlbmRzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICAvLyB0cmFuc3BvcnRzOiB7XG4gIC8vICAgZW1haWw/OiBFbWFpbFxuICAvLyAgIGZpcmViYXNlPzogRmlyZWJhc2VcbiAgLy8gICB0ZXh0PzogVGV4dFxuICAvLyAgIHNsYWNrPzogU2xhY2tcbiAgLy8gfVxuXG4gIHN0YXRpYyBFbWFpbE1lc3NhZ2UgPSBFbWFpbE1lc3NhZ2U7XG4gIHN0YXRpYyBGaXJlYmFzZU1lc3NhZ2UgPSBGaXJlYmFzZU1lc3NhZ2U7XG4gIHN0YXRpYyBUZXh0TWVzc2FnZSA9IFRleHRNZXNzYWdlO1xuICBzdGF0aWMgU2xhY2tNZXNzYWdlID0gU2xhY2tNZXNzYWdlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBvcHRpb25zOiBOb3RpZmljYXRpb25PcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgY29uc3QgYXZhaWxhYmxlID0gWydlbWFpbCcsICdmaXJlYmFzZScsICd0ZXh0JywgJ3NsYWNrJ107XG4gICAgY29uc3QgcmVxdWVzdGVkID0gT2JqZWN0LmtleXModGhpcy5vcHRpb25zKS5maWx0ZXIoa2V5ID0+IGF2YWlsYWJsZS5pbmRleE9mKGtleSkgPj0gMCk7XG5cbiAgICAvLyBBdCBsZWFzdCBvbmUgdHJhbnNwb3J0IG11c3QgYmUgc3VwcGxpZWQgdG8gdXNlIHRoaXMgYWJzdHJhY3Rpb24gbGF5ZXJcbiAgICBpZiAocmVxdWVzdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyB0cmFuc3BvcnRzIGNvbmZpZ3VyZWQsIHlvdSBuZWVkIHRvIHNwZWNpZml5IGF0IGxlYXN0IG9uZSBkZWJ1ZyBzZXJ2aWNlIHRvIHVzZSB0aGUgTm90aWZpY2F0aW9uIGxheWVyLicpO1xuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuID0gW107XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBlbWFpbCB0cmFuc3BvcnQsIGlmIGF2YWlsYWJsZVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZW1haWwpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50KG5ldyBFbWFpbCh0aGlzLm9wdGlvbnMuZW1haWwpKTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBmaXJlYmFzZSB0cmFuc3BvcnQsIGlmIGF2YWlsYWJsZVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZmlyZWJhc2UpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50KG5ldyBGaXJlYmFzZSh0aGlzLm9wdGlvbnMuZmlyZWJhc2UpKTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSB0ZXh0IHRyYW5zcG9ydCwgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMub3B0aW9ucy50ZXh0KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudChuZXcgVGV4dCh0aGlzLm9wdGlvbnMudGV4dCkpO1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgdGhlIHNsYWNrIHRyYW5zcG9ydCwgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zbGFjaykge1xuICAgICAgdGhpcy5jb21wb25lbnQobmV3IFNsYWNrKHRoaXMub3B0aW9ucy50ZXh0KSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgYSBub3RpZmljYXRpb24gdXNpbmcgdGhlIGN1cnJlbnRseSBhdmFpbGFibGUgYW5kIGNvbmZpZ3VyZWQgdHJhbnNwb3J0ZXJzLlxuICAgKiBcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG5vdGlmaWNhdGlvbiB0byBiZSBzZW50LCBjYW4gYmUgYW4gRW1haWwgbWVzc2FnZSwgYSBGaXJlYmFzZSBtZXNzYWdlIG9yIGEgVGV4dCBtZXNzYWdlLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyB0byBiZSBzZW50IHRvIHRoZSBUcmFuc3BvcnRlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZTogTWVzc2FnZSwgb3B0aW9ucz86IGFueSkge1xuICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRW1haWxNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRCeVR5cGUoRW1haWwgYXMgeyBuZXcoKTogRW1haWwgfSkuc2VuZChtZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBGaXJlYmFzZU1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEJ5VHlwZShGaXJlYmFzZSBhcyB7IG5ldygpOiBGaXJlYmFzZSB9KS5zZW5kKG1lc3NhZ2UsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIFRleHRNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRCeVR5cGUoVGV4dCBhcyB7IG5ldygpOiBUZXh0IH0pLnNlbmQobWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgU2xhY2tNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRCeVR5cGUoU2xhY2sgYXMgeyBuZXcoKTogU2xhY2sgfSkuc2VuZChtZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihgJHt0aGlzLm9wdGlvbnMubmFtZX06IE1lc3NhZ2UgaXMgbm90IGEgdmFsaWQgaW5zdGFuY2UgZm9yIHRoZSBOb3RpZmljYXRpb24gdHJhbnNwb3J0YCwgeyB0eXBlOiAodHlwZW9mIG1lc3NhZ2UpLCB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0QnlUeXBlPFQgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlPih0eXBlOiB7IG5ldygpOiBUIH0pOiBUIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gKHRoaXMuY2hpbGRyZW4gYXMgVFtdKS5maW5kKGNoaWxkID0+IGNoaWxkIGluc3RhbmNlb2YgdHlwZSkgYXMgYW55O1xuICB9XG59Il19