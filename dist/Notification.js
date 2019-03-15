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
const text_1 = require("./text");
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
        // Initialize the text transport, if available
        if (this.options.text) {
            this.transports.text = new text_1.Text(this.options.text);
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
            if (this.transports.email && message instanceof email_1.EmailMessage) {
                return this.transports.email.send(message);
            }
            else if (this.transports.firebase && message instanceof firebase_1.FirebaseMessage) {
                return this.transports.firebase.send(message, options);
            }
            else if (this.transports.text && message instanceof text_1.TextMessage) {
                return this.transports.text.send(message);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL05vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXlFO0FBQ3pFLG1DQUFtRTtBQUNuRSx5Q0FBK0U7QUFDL0UsaUNBQStEO0FBUS9ELE1BQXFCLFlBQWEsU0FBUSwwQkFBbUI7SUFVM0QsWUFBNEIsT0FBNEI7UUFDdEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRFcsWUFBTyxHQUFQLE9BQU8sQ0FBcUI7UUFFdEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsd0VBQXdFO1FBQ3hFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsMEdBQTBHLENBQUMsQ0FBQztTQUM3SDtRQUVELCtDQUErQztRQUMvQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDdEQ7UUFFRCxrREFBa0Q7UUFDbEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNoRTtRQUVELDhDQUE4QztRQUM5QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEQ7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxJQUFJLENBQUMsT0FBcUQsRUFBRSxPQUFhOztZQUNwRixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLE9BQU8sWUFBWSxvQkFBWSxFQUFFO2dCQUM1RCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM1QztpQkFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxJQUFJLE9BQU8sWUFBWSwwQkFBZSxFQUFFO2dCQUN6RSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDeEQ7aUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxPQUFPLFlBQVksa0JBQVcsRUFBRTtnQkFDakUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0M7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxnREFBZ0QsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7YUFDdkc7UUFDSCxDQUFDO0tBQUE7SUFFRCxPQUFPO0lBQ1AsQ0FBQztJQUNELFNBQVM7SUFDVCxDQUFDO0lBQ0ssTUFBTTs7UUFDWixDQUFDO0tBQUE7SUFDSyxPQUFPOztRQUNiLENBQUM7S0FBQTs7QUFyRE0seUJBQVksR0FBRyxvQkFBWSxDQUFDO0FBQzVCLDRCQUFlLEdBQUcsMEJBQWUsQ0FBQztBQVIzQywrQkE2REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlLCBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCB7IEVtYWlsLCBFbWFpbE1lc3NhZ2UsIEVtYWlsU2VydmljZU9wdGlvbnMgfSBmcm9tICcuL2VtYWlsJztcbmltcG9ydCB7IEZpcmViYXNlLCBGaXJlYmFzZU1lc3NhZ2UsIEZpcmViYXNlU2VydmljZU9wdGlvbnMgfSBmcm9tICcuL2ZpcmViYXNlJztcbmltcG9ydCB7IFRleHQsIFRleHRNZXNzYWdlLCBUZXh0U2VydmljZU9wdGlvbnMgfSBmcm9tICcuL3RleHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvbk9wdGlvbnMgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB7XG4gIGZpcmViYXNlPzogRmlyZWJhc2VTZXJ2aWNlT3B0aW9uc1xuICBlbWFpbD86IEVtYWlsU2VydmljZU9wdGlvbnNcbiAgdGV4dD86IFRleHRTZXJ2aWNlT3B0aW9uc1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RpZmljYXRpb24gZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgdHJhbnNwb3J0czoge1xuICAgIGVtYWlsPzogRW1haWxcbiAgICBmaXJlYmFzZT86IEZpcmViYXNlXG4gICAgdGV4dD86IFRleHRcbiAgfVxuXG4gIHN0YXRpYyBFbWFpbE1lc3NhZ2UgPSBFbWFpbE1lc3NhZ2U7XG4gIHN0YXRpYyBGaXJlYmFzZU1lc3NhZ2UgPSBGaXJlYmFzZU1lc3NhZ2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IE5vdGlmaWNhdGlvbk9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLnRyYW5zcG9ydHMgPSB7fTtcblxuICAgIC8vIEF0IGxlYXN0IG9uZSB0cmFuc3BvcnQgbXVzdCBiZSBzdXBwbGllZCB0byB1c2UgdGhpcyBhYnN0cmFjdGlvbiBsYXllclxuICAgIGlmICghdGhpcy5vcHRpb25zLmVtYWlsICYmICF0aGlzLm9wdGlvbnMuZmlyZWJhc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gdHJhbnNwb3J0cyBjb25maWd1cmVkLCB5b3UgbmVlZCB0byBzcGVjaWZpeSBhdCBsZWFzdCBvbmUgZGVidWcgc2VydmljZSB0byB1c2UgdGhlIE5vdGlmaWNhdGlvbiBsYXllci4nKTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBlbWFpbCB0cmFuc3BvcnQsIGlmIGF2YWlsYWJsZVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZW1haWwpIHtcbiAgICAgIHRoaXMudHJhbnNwb3J0cy5lbWFpbCA9IG5ldyBFbWFpbCh0aGlzLm9wdGlvbnMuZW1haWwpXG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZmlyZWJhc2UgdHJhbnNwb3J0LCBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5vcHRpb25zLmZpcmViYXNlKSB7XG4gICAgICB0aGlzLnRyYW5zcG9ydHMuZmlyZWJhc2UgPSBuZXcgRmlyZWJhc2UodGhpcy5vcHRpb25zLmZpcmViYXNlKTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSB0ZXh0IHRyYW5zcG9ydCwgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMub3B0aW9ucy50ZXh0KSB7XG4gICAgICB0aGlzLnRyYW5zcG9ydHMudGV4dCA9IG5ldyBUZXh0KHRoaXMub3B0aW9ucy50ZXh0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhIG5vdGlmaWNhdGlvbiB1c2luZyB0aGUgY3VycmVudGx5IGF2YWlsYWJsZSBhbmQgY29uZmlndXJlZCB0cmFuc3BvcnRlcnMuXG4gICAqIFxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbm90aWZpY2F0aW9uIHRvIGJlIHNlbnQsIGNhbiBiZSBhbiBFbWFpbCBtZXNzYWdlLCBhIEZpcmViYXNlIG1lc3NhZ2Ugb3IgYSBUZXh0IG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIHRvIGJlIHNlbnQgdG8gdGhlIFRyYW5zcG9ydGVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlOiBFbWFpbE1lc3NhZ2UgfCBGaXJlYmFzZU1lc3NhZ2UgfCBUZXh0TWVzc2FnZSwgb3B0aW9ucz86IGFueSkge1xuICAgIGlmICh0aGlzLnRyYW5zcG9ydHMuZW1haWwgJiYgbWVzc2FnZSBpbnN0YW5jZW9mIEVtYWlsTWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0cy5lbWFpbC5zZW5kKG1lc3NhZ2UpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50cmFuc3BvcnRzLmZpcmViYXNlICYmIG1lc3NhZ2UgaW5zdGFuY2VvZiBGaXJlYmFzZU1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydHMuZmlyZWJhc2Uuc2VuZChtZXNzYWdlLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHJhbnNwb3J0cy50ZXh0ICYmIG1lc3NhZ2UgaW5zdGFuY2VvZiBUZXh0TWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0cy50ZXh0LnNlbmQobWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0aGlzLm9wdGlvbnMubmFtZX06IFRyYW5zcG9ydCBub3QgYXZhaWxhYmxlIG9yIG1pc2NvbmZpZ3VyZWQ6IFwiJHttZXNzYWdlLl90eXBlfVwiYCk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VudCgpIHtcbiAgfVxuICBvblVubW91bnQoKSB7XG4gIH1cbiAgYXN5bmMgb25Jbml0KCkge1xuICB9XG4gIGFzeW5jIG9uUmVhZHkoKSB7XG4gIH1cbn0iXX0=