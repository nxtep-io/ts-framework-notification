"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
class FirebaseService extends base_1.NotificationService {
    constructor(options) {
        super(options);
        this.options = options;
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
        const data = message instanceof FirebaseMessage_1.default ? message : new FirebaseMessage_1.default(message);
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
exports.default = FirebaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZWJhc2VTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2ZpcmViYXNlL0ZpcmViYXNlU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQThDO0FBQzlDLDZEQUF3RDtBQUV4RCx1REFBMkU7QUFDM0Usa0NBQTBFO0FBZ0MxRSxxQkFBcUMsU0FBUSwwQkFBbUI7SUFHOUQsWUFBNEIsT0FBK0I7UUFDekQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRFcsWUFBTyxHQUFQLE9BQU8sQ0FBd0I7UUFHekQsb0NBQW9DO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO2dCQUNuQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7Z0JBQ2hDLFVBQVUsRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO2FBQ2hFLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLGlFQUFpRTtZQUNqRSxNQUFNLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxnREFBZ0QsQ0FBQztZQUVyRixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixtQ0FBbUM7Z0JBQ25DLE1BQU0sSUFBSSwrQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRS9CLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixvREFBb0Q7Z0JBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyx3REFBd0QsQ0FBQyxDQUFDO1lBQ3ZGLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVNLElBQUksQ0FBQyxPQUE4QixFQUFFLE9BQWtDO1FBQzVFLE1BQU0sSUFBSSxHQUFHLE9BQU8sWUFBWSx5QkFBZSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUkseUJBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLDZEQUE2RDtZQUM3RCxnREFBZ0Q7WUFDaEQsTUFBTSxFQUFFLGlCQUFpQixLQUFpQixJQUFJLEVBQW5CLDZDQUFtQixDQUFDO1lBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUNqRyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLFlBQVksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSx5RUFBeUUsQ0FBQztZQUVuSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLHlEQUF5RDtnQkFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLG9EQUFvRDtnQkFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPO0lBQ1AsQ0FBQztJQUNELFNBQVM7SUFDVCxDQUFDO0lBQ0ssTUFBTTs7UUFDWixDQUFDO0tBQUE7SUFDSyxPQUFPOztRQUNiLENBQUM7S0FBQTtDQUNGO0FBdkRELGtDQXVEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEZpcmViYXNlU0RLIGZyb20gJ2ZpcmViYXNlLWFkbWluJztcbmltcG9ydCB7IExvZ2dlciwgQmFzZUVycm9yIH0gZnJvbSAndHMtZnJhbWV3b3JrLWNvbW1vbic7XG5pbXBvcnQgeyBCYXNlTWVzc2FnZVNjaGVtYSB9IGZyb20gJy4vLi4vYmFzZS9CYXNlTWVzc2FnZSc7XG5pbXBvcnQgRmlyZWJhc2VNZXNzYWdlLCB7IEZpcmViYXNlTWVzc2FnZVNjaGVtYSB9IGZyb20gJy4vRmlyZWJhc2VNZXNzYWdlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UsIE5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIH0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlyZWJhc2VTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIE5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBGaXJlYmFzZSBzZXJ2aWNlIGFjY291bnQgb2JqZWN0XG4gICAqL1xuICBzZXJ2aWNlQWNjb3VudD86IEZpcmViYXNlU0RLLlNlcnZpY2VBY2NvdW50XG5cbiAgLyoqXG4gICAqIFRoZSBmaXJlYmFzZSBkYXRhYmFzZSBVUkwuXG4gICAqL1xuICBkYXRhYmFzZVVSTD86IHN0cmluZ1xuXG4gIC8qKlxuICAgKiBEZWJ1ZyBtb2RlIGZsYWcuXG4gICAqL1xuICBkZWJ1Zz86IGJvb2xlYW5cblxuICAvKipcbiAgICogVGhlIGxvZ2dlciBpbnN0YW5jZSBmb3IgdGhlIHNlcnZpY2UuXG4gICAqL1xuICBsb2dnZXI/OiBMb2dnZXI7XG59XG5cbi8qKlxuICogUmVmZXJlbmNlOiBodHRwczovL2ZpcmViYXNlLmdvb2dsZS5jb20vZG9jcy9yZWZlcmVuY2UvYWRtaW4vbm9kZS9hZG1pbi5tZXNzYWdpbmcuTWVzc2FnaW5nT3B0aW9uc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEZpcmViYXNlVHJhbnNwb3J0T3B0aW9ucyB7XG4gIHByaW9yaXR5OiAnbm9ybWFsJyB8ICdoaWdoJ1xuICB0aW1lVG9MaXZlOiBudW1iZXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIHByb3RlY3RlZCBzZGs6IEZpcmViYXNlU0RLLmFwcC5BcHBcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb3B0aW9uczogRmlyZWJhc2VTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgRmlyZWJhc2UgQWRtaW4gU0RLXG4gICAgaWYgKG9wdGlvbnMuc2VydmljZUFjY291bnQgJiYgb3B0aW9ucy5kYXRhYmFzZVVSTCkge1xuICAgICAgdGhpcy5zZGsgPSBGaXJlYmFzZVNESy5pbml0aWFsaXplQXBwKHtcbiAgICAgICAgZGF0YWJhc2VVUkw6IG9wdGlvbnMuZGF0YWJhc2VVUkwsXG4gICAgICAgIGNyZWRlbnRpYWw6IEZpcmViYXNlU0RLLmNyZWRlbnRpYWwuY2VydChvcHRpb25zLnNlcnZpY2VBY2NvdW50KSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyB0cmFuc3BvcnRlciBhdmFpbGFibGUsIHByZXBhcmUgbWVzc2FnZSBmb3Igd2FybmluZyBvciBjcmFzaFxuICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMub3B0aW9ucy5uYW1lfTogVGhlIEdvb2dsZSBTZXJ2aWNlIEFjY291bnQgaXMgbm90IGF2YWlsYWJsZS5gO1xuXG4gICAgICBpZiAoIW9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgLy8gTm8gZGVidWcgbW9kZSwgY3Jhc2ggdGhlIHNlcnZpY2VcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihtZXNzYWdlKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSW4gZGVidWcgbW9kZSB3ZSBzZW5kIGFsbCBtZXNzYWdlcyB0byB0aGUgY29uc29sZVxuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGAke21lc3NhZ2V9IEFsbCBtZXNzYWdlcyB3aWxsIGJlIHNlbnQgdG8gdGhlIGNvbnNvbGUgYXMgd2FybmluZ3MuYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNlbmQobWVzc2FnZTogRmlyZWJhc2VNZXNzYWdlU2NoZW1hLCBvcHRpb25zPzogRmlyZWJhc2VUcmFuc3BvcnRPcHRpb25zKSB7XG4gICAgY29uc3QgZGF0YSA9IG1lc3NhZ2UgaW5zdGFuY2VvZiBGaXJlYmFzZU1lc3NhZ2UgPyBtZXNzYWdlIDogbmV3IEZpcmViYXNlTWVzc2FnZShtZXNzYWdlKTtcblxuICAgIGlmICh0aGlzLnNkaykge1xuICAgICAgLy8gU2VuZCBhIG1lc3NhZ2UgdG8gdGhlIGRldmljZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBwcm92aWRlZFxuICAgICAgLy8gcmVnaXN0cmF0aW9uIHRva2VuIHdpdGggdGhlIHByb3ZpZGVkIG9wdGlvbnMuXG4gICAgICBjb25zdCB7IHJlZ2lzdHJhdGlvblRva2VuLCAuLi5wYXlsb2FkIH0gPSBkYXRhO1xuICAgICAgcmV0dXJuIHRoaXMuc2RrLm1lc3NhZ2luZygpLnNlbmRUb0RldmljZShyZWdpc3RyYXRpb25Ub2tlbiwgeyBub3RpZmljYXRpb246IHBheWxvYWQgfSwgb3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYCR7dGhpcy5vcHRpb25zLm5hbWV9IGlzIG5vdCByZWFkeSwgdGhlIEdvb2dsZSBTZXJ2aWNlIEFjY291bnQgbWF5IGJlIGludmFsaWQgb3IgdW5hdmFpbGFibGVgO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIC8vIExvZ3MgdGhlIG5vdGlmaWNhdGlvbiBib2R5IGluIHRoZSBjb25zb2xlIGFzIGEgd2FybmluZ1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGVycm9yTWVzc2FnZSwgeyBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENyYXNoIHRoZSBzZXJ2aWNlLCBub3RpZmljYXRpb24gY291bGQgbm90IGJlIHNlbnRcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uTW91bnQoKSB7XG4gIH1cbiAgb25Vbm1vdW50KCkge1xuICB9XG4gIGFzeW5jIG9uSW5pdCgpIHtcbiAgfVxuICBhc3luYyBvblJlYWR5KCkge1xuICB9XG59Il19