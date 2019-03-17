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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL05vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQWdEO0FBQ2hELGlDQUF5RTtBQUN6RSxtQ0FBbUU7QUFDbkUseUNBQStFO0FBQy9FLG1DQUFtRTtBQUNuRSxpQ0FBK0Q7QUFXL0QsTUFBYSxZQUFhLFNBQVEsMEJBQW1CO0lBUW5ELFlBQVksT0FBNEI7UUFDdEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsTUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXZGLHdFQUF3RTtRQUN4RSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsMEdBQTBHLENBQUMsQ0FBQztTQUM3SDtRQUVELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVwQiwrQ0FBK0M7UUFDL0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtZQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksYUFBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUMvQztRQUVELGtEQUFrRDtRQUNsRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUNyRDtRQUVELDhDQUE4QztRQUM5QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsK0NBQStDO1FBQy9DLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGFBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDL0M7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxJQUFJLENBQUMsT0FBZ0IsRUFBRSxPQUFhOztZQUMvQyxJQUFJLE9BQU8sWUFBWSxvQkFBWSxFQUFFO2dCQUNuQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBeUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoRTtpQkFBTSxJQUFJLE9BQU8sWUFBWSwwQkFBZSxFQUFFO2dCQUM3QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQStCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQy9FO2lCQUFNLElBQUksT0FBTyxZQUFZLGtCQUFXLEVBQUU7Z0JBQ3pDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUF1QixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlEO2lCQUFNLElBQUksT0FBTyxZQUFZLG9CQUFZLEVBQUU7Z0JBQzFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hFO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSwrQkFBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGtFQUFrRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDMUk7UUFDSCxDQUFDO0tBQUE7SUFFUyxTQUFTLENBQWdDLElBQWtCO1FBQ25FLE9BQVEsSUFBSSxDQUFDLFFBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLElBQUksQ0FBUSxDQUFDO0lBQzVFLENBQUM7O0FBNURNLHlCQUFZLEdBQUcsb0JBQVksQ0FBQztBQUM1Qiw0QkFBZSxHQUFHLDBCQUFlLENBQUM7QUFDbEMsd0JBQVcsR0FBRyxrQkFBVyxDQUFDO0FBQzFCLHlCQUFZLEdBQUcsb0JBQVksQ0FBQztBQU5yQyxvQ0FnRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSwgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgeyBFbWFpbCwgRW1haWxNZXNzYWdlLCBFbWFpbFNlcnZpY2VPcHRpb25zIH0gZnJvbSAnLi9lbWFpbCc7XG5pbXBvcnQgeyBGaXJlYmFzZSwgRmlyZWJhc2VNZXNzYWdlLCBGaXJlYmFzZVNlcnZpY2VPcHRpb25zIH0gZnJvbSAnLi9maXJlYmFzZSc7XG5pbXBvcnQgeyBTbGFjaywgU2xhY2tNZXNzYWdlLCBTbGFja1NlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vc2xhY2tcIjtcbmltcG9ydCB7IFRleHQsIFRleHRNZXNzYWdlLCBUZXh0U2VydmljZU9wdGlvbnMgfSBmcm9tICcuL3RleHQnO1xuXG5leHBvcnQgdHlwZSBNZXNzYWdlID0gRW1haWxNZXNzYWdlIHwgRmlyZWJhc2VNZXNzYWdlIHwgVGV4dE1lc3NhZ2UgfCBTbGFja01lc3NhZ2U7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm90aWZpY2F0aW9uT3B0aW9ucyBleHRlbmRzIE5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIHtcbiAgZW1haWw/OiBFbWFpbFNlcnZpY2VPcHRpb25zXG4gIGZpcmViYXNlPzogRmlyZWJhc2VTZXJ2aWNlT3B0aW9uc1xuICB0ZXh0PzogVGV4dFNlcnZpY2VPcHRpb25zXG4gIHNsYWNrPzogU2xhY2tTZXJ2aWNlT3B0aW9uc1xufVxuXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIHB1YmxpYyByZWFkb25seSBvcHRpb25zOiBOb3RpZmljYXRpb25PcHRpb25zO1xuXG4gIHN0YXRpYyBFbWFpbE1lc3NhZ2UgPSBFbWFpbE1lc3NhZ2U7XG4gIHN0YXRpYyBGaXJlYmFzZU1lc3NhZ2UgPSBGaXJlYmFzZU1lc3NhZ2U7XG4gIHN0YXRpYyBUZXh0TWVzc2FnZSA9IFRleHRNZXNzYWdlO1xuICBzdGF0aWMgU2xhY2tNZXNzYWdlID0gU2xhY2tNZXNzYWdlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE5vdGlmaWNhdGlvbk9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICBjb25zdCBhdmFpbGFibGUgPSBbJ2VtYWlsJywgJ2ZpcmViYXNlJywgJ3RleHQnLCAnc2xhY2snXTtcbiAgICBjb25zdCByZXF1ZXN0ZWQgPSBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMpLmZpbHRlcihrZXkgPT4gYXZhaWxhYmxlLmluZGV4T2Yoa2V5KSA+PSAwKTtcblxuICAgIC8vIEF0IGxlYXN0IG9uZSB0cmFuc3BvcnQgbXVzdCBiZSBzdXBwbGllZCB0byB1c2UgdGhpcyBhYnN0cmFjdGlvbiBsYXllclxuICAgIGlmIChyZXF1ZXN0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHRyYW5zcG9ydHMgY29uZmlndXJlZCwgeW91IG5lZWQgdG8gc3BlY2lmaXkgYXQgbGVhc3Qgb25lIGRlYnVnIHNlcnZpY2UgdG8gdXNlIHRoZSBOb3RpZmljYXRpb24gbGF5ZXIuJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXTtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIGVtYWlsIHRyYW5zcG9ydCwgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5lbWFpbCkge1xuICAgICAgdGhpcy5jb21wb25lbnQobmV3IEVtYWlsKHRoaXMub3B0aW9ucy5lbWFpbCkpO1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgdGhlIGZpcmViYXNlIHRyYW5zcG9ydCwgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5maXJlYmFzZSkge1xuICAgICAgdGhpcy5jb21wb25lbnQobmV3IEZpcmViYXNlKHRoaXMub3B0aW9ucy5maXJlYmFzZSkpO1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgdGhlIHRleHQgdHJhbnNwb3J0LCBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5vcHRpb25zLnRleHQpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50KG5ldyBUZXh0KHRoaXMub3B0aW9ucy50ZXh0KSk7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgc2xhY2sgdHJhbnNwb3J0LCBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5vcHRpb25zLnNsYWNrKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudChuZXcgU2xhY2sodGhpcy5vcHRpb25zLnNsYWNrKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgYSBub3RpZmljYXRpb24gdXNpbmcgdGhlIGN1cnJlbnRseSBhdmFpbGFibGUgYW5kIGNvbmZpZ3VyZWQgdHJhbnNwb3J0ZXJzLlxuICAgKiBcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG5vdGlmaWNhdGlvbiB0byBiZSBzZW50LCBjYW4gYmUgYW4gRW1haWwgbWVzc2FnZSwgYSBGaXJlYmFzZSBtZXNzYWdlIG9yIGEgVGV4dCBtZXNzYWdlLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyB0byBiZSBzZW50IHRvIHRoZSBUcmFuc3BvcnRlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZTogTWVzc2FnZSwgb3B0aW9ucz86IGFueSkge1xuICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRW1haWxNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRCeVR5cGUoRW1haWwgYXMgeyBuZXcoKTogRW1haWwgfSkuc2VuZChtZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBGaXJlYmFzZU1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEJ5VHlwZShGaXJlYmFzZSBhcyB7IG5ldygpOiBGaXJlYmFzZSB9KS5zZW5kKG1lc3NhZ2UsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIFRleHRNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRCeVR5cGUoVGV4dCBhcyB7IG5ldygpOiBUZXh0IH0pLnNlbmQobWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgU2xhY2tNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRCeVR5cGUoU2xhY2sgYXMgeyBuZXcoKTogU2xhY2sgfSkuc2VuZChtZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihgJHt0aGlzLm9wdGlvbnMubmFtZX06IE1lc3NhZ2UgaXMgbm90IGEgdmFsaWQgaW5zdGFuY2UgZm9yIHRoZSBOb3RpZmljYXRpb24gdHJhbnNwb3J0YCwgeyB0eXBlOiAodHlwZW9mIG1lc3NhZ2UpLCB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0QnlUeXBlPFQgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlPih0eXBlOiB7IG5ldygpOiBUIH0pOiBUIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gKHRoaXMuY2hpbGRyZW4gYXMgVFtdKS5maW5kKGNoaWxkID0+IGNoaWxkIGluc3RhbmNlb2YgdHlwZSkgYXMgYW55O1xuICB9XG59Il19