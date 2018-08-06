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
const base_1 = require("./base");
const email_1 = require("./email");
const firebase_1 = require("./firebase");
class Notification extends base_1.NotificationService {
    constructor(options) {
        super(options);
        this.options = options;
        this.transports = {};
        // At least one transport must be supplied to use this abstraction layer
        if (!this.options.email && !this.options.firebase) {
            throw new Error('No transports configured, you need to specifiy at least one debug service to use the Notification layer.');
        }
        // Initialize the email transport, if available
        if (this.options.email) {
            this.transports.email = new email_1.Email(this.options.email);
        }
        // Initialize the firebase transport, if available
        if (this.options.firebase) {
            this.transports.firebase = new firebase_1.Firebase(this.options.firebase);
        }
    }
    /**
     * Send a notification using the currently available and configured transporters.
     *
     * @param message The notification to be sent, can be a Email message or a Firebase message.
     * @param options The options to be sent to the Transporter
     */
    send(message, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.transports.email && message instanceof email_1.EmailMessage) {
                return this.transports.email.send(message);
            }
            else if (this.transports.firebase && message instanceof firebase_1.FirebaseMessage) {
                return this.transports.firebase.send(message, options);
            }
            else {
                throw new Error(`${this.options.name}: Transport not available or misconfigured: "${message._type}"`);
            }
        });
    }
    onMount() {
    }
    onUnmount() {
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
Notification.EmailMessage = email_1.EmailMessage;
Notification.FirebaseMessage = firebase_1.FirebaseMessage;
exports.default = Notification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL05vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsaUNBQXlFO0FBQ3pFLG1DQUF1RjtBQUN2Rix5Q0FBc0c7QUFPdEcsa0JBQWtDLFNBQVEsMEJBQW1CO0lBUzNELFlBQTRCLE9BQTRCO1FBQ3RELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURXLFlBQU8sR0FBUCxPQUFPLENBQXFCO1FBRXRELElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXJCLHdFQUF3RTtRQUN4RSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sSUFBSSxLQUFLLENBQUMsMEdBQTBHLENBQUMsQ0FBQztRQUM5SCxDQUFDO1FBRUQsK0NBQStDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZELENBQUM7UUFFRCxrREFBa0Q7UUFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxJQUFJLENBQUMsT0FBdUMsRUFBRSxPQUFhOztZQUN0RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxPQUFPLFlBQVksb0JBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxPQUFPLFlBQVksMEJBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdEQUFnRCxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUN4RyxDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRUQsT0FBTztJQUNQLENBQUM7SUFDRCxTQUFTO0lBQ1QsQ0FBQztJQUNLLE1BQU07O1FBQ1osQ0FBQztLQUFBO0lBQ0ssT0FBTzs7UUFDYixDQUFDO0tBQUE7O0FBOUNNLHlCQUFZLEdBQUcsb0JBQVksQ0FBQztBQUM1Qiw0QkFBZSxHQUFHLDBCQUFlLENBQUM7QUFQM0MsK0JBcURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNwb3J0VHlwZXMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UsIE5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZVwiO1xuaW1wb3J0IHsgRW1haWwsIEVtYWlsTWVzc2FnZSwgRW1haWxNZXNzYWdlU2NoZW1hLCBFbWFpbFNlcnZpY2VPcHRpb25zIH0gZnJvbSAnLi9lbWFpbCc7XG5pbXBvcnQgeyBGaXJlYmFzZSwgRmlyZWJhc2VNZXNzYWdlLCBGaXJlYmFzZU1lc3NhZ2VTY2hlbWEsIEZpcmViYXNlU2VydmljZU9wdGlvbnMgfSBmcm9tICcuL2ZpcmViYXNlJztcblxuZXhwb3J0IGludGVyZmFjZSBOb3RpZmljYXRpb25PcHRpb25zIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICBmaXJlYmFzZT86IEZpcmViYXNlU2VydmljZU9wdGlvbnNcbiAgZW1haWw/OiBFbWFpbFNlcnZpY2VPcHRpb25zXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGlmaWNhdGlvbiBleHRlbmRzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICB0cmFuc3BvcnRzOiB7XG4gICAgZW1haWw/OiBFbWFpbFxuICAgIGZpcmViYXNlPzogRmlyZWJhc2VcbiAgfVxuXG4gIHN0YXRpYyBFbWFpbE1lc3NhZ2UgPSBFbWFpbE1lc3NhZ2U7XG4gIHN0YXRpYyBGaXJlYmFzZU1lc3NhZ2UgPSBGaXJlYmFzZU1lc3NhZ2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IE5vdGlmaWNhdGlvbk9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLnRyYW5zcG9ydHMgPSB7fTtcblxuICAgIC8vIEF0IGxlYXN0IG9uZSB0cmFuc3BvcnQgbXVzdCBiZSBzdXBwbGllZCB0byB1c2UgdGhpcyBhYnN0cmFjdGlvbiBsYXllclxuICAgIGlmICghdGhpcy5vcHRpb25zLmVtYWlsICYmICF0aGlzLm9wdGlvbnMuZmlyZWJhc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gdHJhbnNwb3J0cyBjb25maWd1cmVkLCB5b3UgbmVlZCB0byBzcGVjaWZpeSBhdCBsZWFzdCBvbmUgZGVidWcgc2VydmljZSB0byB1c2UgdGhlIE5vdGlmaWNhdGlvbiBsYXllci4nKTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBlbWFpbCB0cmFuc3BvcnQsIGlmIGF2YWlsYWJsZVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZW1haWwpIHtcbiAgICAgIHRoaXMudHJhbnNwb3J0cy5lbWFpbCA9IG5ldyBFbWFpbCh0aGlzLm9wdGlvbnMuZW1haWwpXG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZmlyZWJhc2UgdHJhbnNwb3J0LCBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5vcHRpb25zLmZpcmViYXNlKSB7XG4gICAgICB0aGlzLnRyYW5zcG9ydHMuZmlyZWJhc2UgPSBuZXcgRmlyZWJhc2UodGhpcy5vcHRpb25zLmZpcmViYXNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhIG5vdGlmaWNhdGlvbiB1c2luZyB0aGUgY3VycmVudGx5IGF2YWlsYWJsZSBhbmQgY29uZmlndXJlZCB0cmFuc3BvcnRlcnMuXG4gICAqIFxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbm90aWZpY2F0aW9uIHRvIGJlIHNlbnQsIGNhbiBiZSBhIEVtYWlsIG1lc3NhZ2Ugb3IgYSBGaXJlYmFzZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyB0byBiZSBzZW50IHRvIHRoZSBUcmFuc3BvcnRlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZTogRW1haWxNZXNzYWdlIHwgRmlyZWJhc2VNZXNzYWdlLCBvcHRpb25zPzogYW55KSB7XG4gICAgaWYgKHRoaXMudHJhbnNwb3J0cy5lbWFpbCAmJiBtZXNzYWdlIGluc3RhbmNlb2YgRW1haWxNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnRzLmVtYWlsLnNlbmQobWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnRyYW5zcG9ydHMuZmlyZWJhc2UgJiYgbWVzc2FnZSBpbnN0YW5jZW9mIEZpcmViYXNlTWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0cy5maXJlYmFzZS5zZW5kKG1lc3NhZ2UsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGhpcy5vcHRpb25zLm5hbWV9OiBUcmFuc3BvcnQgbm90IGF2YWlsYWJsZSBvciBtaXNjb25maWd1cmVkOiBcIiR7bWVzc2FnZS5fdHlwZX1cImApO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91bnQoKSB7XG4gIH1cbiAgb25Vbm1vdW50KCkge1xuICB9XG4gIGFzeW5jIG9uSW5pdCgpIHtcbiAgfVxuICBhc3luYyBvblJlYWR5KCkge1xuICB9XG59Il19