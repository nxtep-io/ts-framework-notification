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
const base_1 = require("../base");
const FirebaseMessage_1 = require("./FirebaseMessage");
class Firebase extends base_1.NotificationService {
    constructor(options) {
        super(Object.assign({ name: 'FirebaseService' }, options));
        // Initialize the Firebase Admin SDK
        if (options.serviceAccount && options.databaseURL) {
            this.sdk = FirebaseSDK.initializeApp({
                databaseURL: options.databaseURL,
                credential: FirebaseSDK.credential.cert(options.serviceAccount),
            });
        }
        else {
            // No transporter available, prepare message for warning or crash
            const message = `${this.options.name}: The Google Service Account is not available.`;
            if (!options.debug) {
                // No debug mode, crash the service
                throw new ts_framework_common_1.BaseError(message);
            }
            else {
                // In debug mode we send all messages to the console
                this.logger.warn(`${message} All messages will be sent to the console as warnings.`);
            }
        }
    }
    send(message, options) {
        const data = message instanceof FirebaseMessage_1.FirebaseMessage ? message : new FirebaseMessage_1.FirebaseMessage(message);
        if (this.sdk) {
            // Send a message to the device corresponding to the provided
            // registration token with the provided options.
            const { registrationToken } = data, payload = __rest(data, ["registrationToken"]);
            return this.sdk.messaging().sendToDevice(registrationToken, { notification: payload }, options);
        }
        else {
            const errorMessage = `${this.options.name} is not ready, the Google Service Account may be invalid or unavailable`;
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
exports.Firebase = Firebase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZWJhc2VTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2ZpcmViYXNlL0ZpcmViYXNlU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhDQUE4QztBQUM5Qyw2REFBZ0U7QUFDaEUsa0NBQTBFO0FBQzFFLHVEQUEyRTtBQWdDM0UsTUFBYSxRQUFTLFNBQVEsMEJBQW1CO0lBSS9DLFlBQVksT0FBK0I7UUFDekMsS0FBSyxpQkFBRyxJQUFJLEVBQUUsaUJBQWlCLElBQUssT0FBTyxFQUFHLENBQUM7UUFFL0Msb0NBQW9DO1FBQ3BDLElBQUksT0FBTyxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ2pELElBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztnQkFDbkMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO2dCQUNoQyxVQUFVLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQzthQUNoRSxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsaUVBQWlFO1lBQ2pFLE1BQU0sT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdEQUFnRCxDQUFDO1lBRXJGLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNsQixtQ0FBbUM7Z0JBQ25DLE1BQU0sSUFBSSwrQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBRTlCO2lCQUFNO2dCQUNMLG9EQUFvRDtnQkFDcEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLHdEQUF3RCxDQUFDLENBQUM7YUFDdEY7U0FDRjtJQUNILENBQUM7SUFFTSxJQUFJLENBQUMsT0FBOEIsRUFBRSxPQUFrQztRQUM1RSxNQUFNLElBQUksR0FBRyxPQUFPLFlBQVksaUNBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLGlDQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFekYsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1osNkRBQTZEO1lBQzdELGdEQUFnRDtZQUNoRCxNQUFNLEVBQUUsaUJBQWlCLEtBQWlCLElBQUksRUFBbkIsNkNBQW1CLENBQUM7WUFDL0MsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUNoRzthQUFNO1lBQ0wsTUFBTSxZQUFZLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUkseUVBQXlFLENBQUM7WUFFbkgsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDdEIseURBQXlEO2dCQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN6RTtpQkFBTTtnQkFDTCxvREFBb0Q7Z0JBQ3BELE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDL0I7U0FDRjtJQUNILENBQUM7Q0FDRjtBQWhERCw0QkFnREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBGaXJlYmFzZVNESyBmcm9tICdmaXJlYmFzZS1hZG1pbic7XG5pbXBvcnQgeyBCYXNlRXJyb3IsIExvZ2dlckluc3RhbmNlIH0gZnJvbSAndHMtZnJhbWV3b3JrLWNvbW1vbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlLCBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IHsgRmlyZWJhc2VNZXNzYWdlLCBGaXJlYmFzZU1lc3NhZ2VTY2hlbWEgfSBmcm9tICcuL0ZpcmViYXNlTWVzc2FnZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlyZWJhc2VTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIE5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBGaXJlYmFzZSBzZXJ2aWNlIGFjY291bnQgb2JqZWN0XG4gICAqL1xuICBzZXJ2aWNlQWNjb3VudD86IEZpcmViYXNlU0RLLlNlcnZpY2VBY2NvdW50XG5cbiAgLyoqXG4gICAqIFRoZSBmaXJlYmFzZSBkYXRhYmFzZSBVUkwuXG4gICAqL1xuICBkYXRhYmFzZVVSTD86IHN0cmluZ1xuXG4gIC8qKlxuICAgKiBEZWJ1ZyBtb2RlIGZsYWcuXG4gICAqL1xuICBkZWJ1Zz86IGJvb2xlYW5cblxuICAvKipcbiAgICogVGhlIGxvZ2dlciBpbnN0YW5jZSBmb3IgdGhlIHNlcnZpY2UuXG4gICAqL1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbn1cblxuLyoqXG4gKiBSZWZlcmVuY2U6IGh0dHBzOi8vZmlyZWJhc2UuZ29vZ2xlLmNvbS9kb2NzL3JlZmVyZW5jZS9hZG1pbi9ub2RlL2FkbWluLm1lc3NhZ2luZy5NZXNzYWdpbmdPcHRpb25zXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmlyZWJhc2VUcmFuc3BvcnRPcHRpb25zIHtcbiAgcHJpb3JpdHk6ICdub3JtYWwnIHwgJ2hpZ2gnXG4gIHRpbWVUb0xpdmU6IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgRmlyZWJhc2UgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgcHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IEZpcmViYXNlU2VydmljZU9wdGlvbnM7XG4gIHByb3RlY3RlZCBzZGs6IEZpcmViYXNlU0RLLmFwcC5BcHBcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBGaXJlYmFzZVNlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIoeyBuYW1lOiAnRmlyZWJhc2VTZXJ2aWNlJywgLi4ub3B0aW9ucyB9KTtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIEZpcmViYXNlIEFkbWluIFNES1xuICAgIGlmIChvcHRpb25zLnNlcnZpY2VBY2NvdW50ICYmIG9wdGlvbnMuZGF0YWJhc2VVUkwpIHtcbiAgICAgIHRoaXMuc2RrID0gRmlyZWJhc2VTREsuaW5pdGlhbGl6ZUFwcCh7XG4gICAgICAgIGRhdGFiYXNlVVJMOiBvcHRpb25zLmRhdGFiYXNlVVJMLFxuICAgICAgICBjcmVkZW50aWFsOiBGaXJlYmFzZVNESy5jcmVkZW50aWFsLmNlcnQob3B0aW9ucy5zZXJ2aWNlQWNjb3VudCksXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm8gdHJhbnNwb3J0ZXIgYXZhaWxhYmxlLCBwcmVwYXJlIG1lc3NhZ2UgZm9yIHdhcm5pbmcgb3IgY3Jhc2hcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLm9wdGlvbnMubmFtZX06IFRoZSBHb29nbGUgU2VydmljZSBBY2NvdW50IGlzIG5vdCBhdmFpbGFibGUuYDtcblxuICAgICAgaWYgKCFvcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIC8vIE5vIGRlYnVnIG1vZGUsIGNyYXNoIHRoZSBzZXJ2aWNlXG4gICAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IobWVzc2FnZSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEluIGRlYnVnIG1vZGUgd2Ugc2VuZCBhbGwgbWVzc2FnZXMgdG8gdGhlIGNvbnNvbGVcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihgJHttZXNzYWdlfSBBbGwgbWVzc2FnZXMgd2lsbCBiZSBzZW50IHRvIHRoZSBjb25zb2xlIGFzIHdhcm5pbmdzLmApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZW5kKG1lc3NhZ2U6IEZpcmViYXNlTWVzc2FnZVNjaGVtYSwgb3B0aW9ucz86IEZpcmViYXNlVHJhbnNwb3J0T3B0aW9ucykge1xuICAgIGNvbnN0IGRhdGEgPSBtZXNzYWdlIGluc3RhbmNlb2YgRmlyZWJhc2VNZXNzYWdlID8gbWVzc2FnZSA6IG5ldyBGaXJlYmFzZU1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICBpZiAodGhpcy5zZGspIHtcbiAgICAgIC8vIFNlbmQgYSBtZXNzYWdlIHRvIHRoZSBkZXZpY2UgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvdmlkZWRcbiAgICAgIC8vIHJlZ2lzdHJhdGlvbiB0b2tlbiB3aXRoIHRoZSBwcm92aWRlZCBvcHRpb25zLlxuICAgICAgY29uc3QgeyByZWdpc3RyYXRpb25Ub2tlbiwgLi4ucGF5bG9hZCB9ID0gZGF0YTtcbiAgICAgIHJldHVybiB0aGlzLnNkay5tZXNzYWdpbmcoKS5zZW5kVG9EZXZpY2UocmVnaXN0cmF0aW9uVG9rZW4sIHsgbm90aWZpY2F0aW9uOiBwYXlsb2FkIH0sIG9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGAke3RoaXMub3B0aW9ucy5uYW1lfSBpcyBub3QgcmVhZHksIHRoZSBHb29nbGUgU2VydmljZSBBY2NvdW50IG1heSBiZSBpbnZhbGlkIG9yIHVuYXZhaWxhYmxlYDtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICAvLyBMb2dzIHRoZSBub3RpZmljYXRpb24gYm9keSBpbiB0aGUgY29uc29sZSBhcyBhIHdhcm5pbmdcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihlcnJvck1lc3NhZ2UsIHsgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDcmFzaCB0aGUgc2VydmljZSwgbm90aWZpY2F0aW9uIGNvdWxkIG5vdCBiZSBzZW50XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSJdfQ==