"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const FirebaseSDK = require("firebase-admin");
const ts_framework_common_1 = require("ts-framework-common");
const FirebaseMessage_1 = require("./FirebaseMessage");
const base_1 = require("../base");
class FirebaseService extends base_1.BaseNotificationService {
    constructor(options) {
        super('FirebaseService', options);
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
        // Initialize the Firebase Admin SDK
        if (options.serviceAccount && options.databaseURL) {
            this.sdk = FirebaseSDK.initializeApp({
                databaseURL: options.databaseURL,
                credential: FirebaseSDK.credential.cert(options.serviceAccount),
            });
        }
        else {
            // No transporter available, prepare message for warning or crash
            const message = `${this.name}: The Google Service Account is not available.`;
            if (!options.debug) {
                // No debug mode, crash the service
                throw new Error(message);
            }
            else if (options.verbose) {
                // In debug mode we send all messages to the console
                this.logger.warn(`${message} All messages will be sent to the console as warnings.`);
            }
        }
    }
    send(message, options) {
        const data = message instanceof FirebaseMessage_1.default ? message : new FirebaseMessage_1.default(message);
        if (this.sdk) {
            // Send a message to the device corresponding to the provided
            // registration token with the provided options.
            const { registrationToken } = data, payload = __rest(data, ["registrationToken"]);
            return this.sdk.messaging().sendToDevice(registrationToken, { notification: payload }, options);
        }
        else {
            const errorMessage = `${this.name} is not ready, the Google Service Account may be invalid or unavailable`;
            if (this.options.debug) {
                // Logs the notification body in the console as a warning
                this.logger.warn(errorMessage, { body: JSON.stringify(data, null, 2) });
            }
            else {
                // Crash the service, notification could not be sent
                throw new Error(errorMessage);
            }
        }
    }
}
exports.default = FirebaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZWJhc2VTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2ZpcmViYXNlL0ZpcmViYXNlU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhDQUE4QztBQUM5Qyw2REFBNkM7QUFFN0MsdURBQTJFO0FBQzNFLGtDQUFrRjtBQWdDbEYscUJBQXFDLFNBQVEsOEJBQXVCO0lBS2xFLFlBQVksT0FBK0I7UUFDekMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXJELG9DQUFvQztRQUNwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztnQkFDbkMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO2dCQUNoQyxVQUFVLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQzthQUNoRSxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixpRUFBaUU7WUFDakUsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxnREFBZ0QsQ0FBQztZQUU3RSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixtQ0FBbUM7Z0JBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFM0IsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDM0Isb0RBQW9EO2dCQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sd0RBQXdELENBQUMsQ0FBQztZQUN2RixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTSxJQUFJLENBQUMsT0FBOEIsRUFBRSxPQUFrQztRQUM1RSxNQUFNLElBQUksR0FBRyxPQUFPLFlBQVkseUJBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLHlCQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFekYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYiw2REFBNkQ7WUFDN0QsZ0RBQWdEO1lBQ2hELE1BQU0sRUFBRSxpQkFBaUIsS0FBaUIsSUFBSSxFQUFuQiw2Q0FBbUIsQ0FBQztZQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDakcsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxZQUFZLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSx5RUFBeUUsQ0FBQztZQUUzRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLHlEQUF5RDtnQkFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLG9EQUFvRDtnQkFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7Q0FFRjtBQW5ERCxrQ0FtREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBGaXJlYmFzZVNESyBmcm9tICdmaXJlYmFzZS1hZG1pbic7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd0cy1mcmFtZXdvcmstY29tbW9uJztcbmltcG9ydCB7IEJhc2VNZXNzYWdlU2NoZW1hIH0gZnJvbSAnLi8uLi9iYXNlL0Jhc2VNZXNzYWdlJztcbmltcG9ydCBGaXJlYmFzZU1lc3NhZ2UsIHsgRmlyZWJhc2VNZXNzYWdlU2NoZW1hIH0gZnJvbSAnLi9GaXJlYmFzZU1lc3NhZ2UnO1xuaW1wb3J0IHsgQmFzZU5vdGlmaWNhdGlvblNlcnZpY2UsIEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4uL2Jhc2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpcmViYXNlU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIEZpcmViYXNlIHNlcnZpY2UgYWNjb3VudCBvYmplY3RcbiAgICovXG4gIHNlcnZpY2VBY2NvdW50PzogRmlyZWJhc2VTREsuU2VydmljZUFjY291bnRcblxuICAvKipcbiAgICogVGhlIGZpcmViYXNlIGRhdGFiYXNlIFVSTC5cbiAgICovXG4gIGRhdGFiYXNlVVJMPzogc3RyaW5nXG5cbiAgLyoqXG4gICAqIERlYnVnIG1vZGUgZmxhZy5cbiAgICovXG4gIGRlYnVnPzogYm9vbGVhblxuXG4gIC8qKlxuICAgKiBUaGUgbG9nZ2VyIGluc3RhbmNlIGZvciB0aGUgc2VydmljZS5cbiAgICovXG4gIGxvZ2dlcj86IExvZ2dlcjtcbn1cblxuLyoqXG4gKiBSZWZlcmVuY2U6IGh0dHBzOi8vZmlyZWJhc2UuZ29vZ2xlLmNvbS9kb2NzL3JlZmVyZW5jZS9hZG1pbi9ub2RlL2FkbWluLm1lc3NhZ2luZy5NZXNzYWdpbmdPcHRpb25zXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmlyZWJhc2VUcmFuc3BvcnRPcHRpb25zIHtcbiAgcHJpb3JpdHk6ICdub3JtYWwnIHwgJ2hpZ2gnXG4gIHRpbWVUb0xpdmU6IG51bWJlclxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaXJlYmFzZVNlcnZpY2UgZXh0ZW5kcyBCYXNlTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIHByb3RlY3RlZCBzZGs6IEZpcmViYXNlU0RLLmFwcC5BcHBcbiAgcHJvdGVjdGVkIG9wdGlvbnM6IEZpcmViYXNlU2VydmljZU9wdGlvbnNcbiAgcHJvdGVjdGVkIGxvZ2dlcjogTG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEZpcmViYXNlU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcignRmlyZWJhc2VTZXJ2aWNlJywgb3B0aW9ucyk7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIEZpcmViYXNlIEFkbWluIFNES1xuICAgIGlmIChvcHRpb25zLnNlcnZpY2VBY2NvdW50ICYmIG9wdGlvbnMuZGF0YWJhc2VVUkwpIHtcbiAgICAgIHRoaXMuc2RrID0gRmlyZWJhc2VTREsuaW5pdGlhbGl6ZUFwcCh7XG4gICAgICAgIGRhdGFiYXNlVVJMOiBvcHRpb25zLmRhdGFiYXNlVVJMLFxuICAgICAgICBjcmVkZW50aWFsOiBGaXJlYmFzZVNESy5jcmVkZW50aWFsLmNlcnQob3B0aW9ucy5zZXJ2aWNlQWNjb3VudCksXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm8gdHJhbnNwb3J0ZXIgYXZhaWxhYmxlLCBwcmVwYXJlIG1lc3NhZ2UgZm9yIHdhcm5pbmcgb3IgY3Jhc2hcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLm5hbWV9OiBUaGUgR29vZ2xlIFNlcnZpY2UgQWNjb3VudCBpcyBub3QgYXZhaWxhYmxlLmA7XG5cbiAgICAgIGlmICghb3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICAvLyBObyBkZWJ1ZyBtb2RlLCBjcmFzaCB0aGUgc2VydmljZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG5cbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICAgIC8vIEluIGRlYnVnIG1vZGUgd2Ugc2VuZCBhbGwgbWVzc2FnZXMgdG8gdGhlIGNvbnNvbGVcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihgJHttZXNzYWdlfSBBbGwgbWVzc2FnZXMgd2lsbCBiZSBzZW50IHRvIHRoZSBjb25zb2xlIGFzIHdhcm5pbmdzLmApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZW5kKG1lc3NhZ2U6IEZpcmViYXNlTWVzc2FnZVNjaGVtYSwgb3B0aW9ucz86IEZpcmViYXNlVHJhbnNwb3J0T3B0aW9ucykge1xuICAgIGNvbnN0IGRhdGEgPSBtZXNzYWdlIGluc3RhbmNlb2YgRmlyZWJhc2VNZXNzYWdlID8gbWVzc2FnZSA6IG5ldyBGaXJlYmFzZU1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICBpZiAodGhpcy5zZGspIHtcbiAgICAgIC8vIFNlbmQgYSBtZXNzYWdlIHRvIHRoZSBkZXZpY2UgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvdmlkZWRcbiAgICAgIC8vIHJlZ2lzdHJhdGlvbiB0b2tlbiB3aXRoIHRoZSBwcm92aWRlZCBvcHRpb25zLlxuICAgICAgY29uc3QgeyByZWdpc3RyYXRpb25Ub2tlbiwgLi4ucGF5bG9hZCB9ID0gZGF0YTtcbiAgICAgIHJldHVybiB0aGlzLnNkay5tZXNzYWdpbmcoKS5zZW5kVG9EZXZpY2UocmVnaXN0cmF0aW9uVG9rZW4sIHsgbm90aWZpY2F0aW9uOiBwYXlsb2FkIH0sIG9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGAke3RoaXMubmFtZX0gaXMgbm90IHJlYWR5LCB0aGUgR29vZ2xlIFNlcnZpY2UgQWNjb3VudCBtYXkgYmUgaW52YWxpZCBvciB1bmF2YWlsYWJsZWA7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgLy8gTG9ncyB0aGUgbm90aWZpY2F0aW9uIGJvZHkgaW4gdGhlIGNvbnNvbGUgYXMgYSB3YXJuaW5nXG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oZXJyb3JNZXNzYWdlLCB7IGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ3Jhc2ggdGhlIHNlcnZpY2UsIG5vdGlmaWNhdGlvbiBjb3VsZCBub3QgYmUgc2VudFxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufSJdfQ==