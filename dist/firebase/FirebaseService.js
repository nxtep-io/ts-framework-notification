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
const base_1 = require("../base");
const FirebaseMessage_1 = require("./FirebaseMessage");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZWJhc2VTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2ZpcmViYXNlL0ZpcmViYXNlU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQThDO0FBQzlDLDZEQUFnRTtBQUNoRSxrQ0FBMEU7QUFDMUUsdURBQTJFO0FBZ0MzRSxNQUFxQixlQUFnQixTQUFRLDBCQUFtQjtJQUc5RCxZQUE0QixPQUErQjtRQUN6RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFEVyxZQUFPLEdBQVAsT0FBTyxDQUF3QjtRQUd6RCxvQ0FBb0M7UUFDcEMsSUFBSSxPQUFPLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDakQsSUFBSSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO2dCQUNuQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7Z0JBQ2hDLFVBQVUsRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO2FBQ2hFLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxpRUFBaUU7WUFDakUsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZ0RBQWdELENBQUM7WUFFckYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xCLG1DQUFtQztnQkFDbkMsTUFBTSxJQUFJLCtCQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7YUFFOUI7aUJBQU07Z0JBQ0wsb0RBQW9EO2dCQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sd0RBQXdELENBQUMsQ0FBQzthQUN0RjtTQUNGO0lBQ0gsQ0FBQztJQUVNLElBQUksQ0FBQyxPQUE4QixFQUFFLE9BQWtDO1FBQzVFLE1BQU0sSUFBSSxHQUFHLE9BQU8sWUFBWSx5QkFBZSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUkseUJBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6RixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWiw2REFBNkQ7WUFDN0QsZ0RBQWdEO1lBQ2hELE1BQU0sRUFBRSxpQkFBaUIsS0FBaUIsSUFBSSxFQUFuQiw2Q0FBbUIsQ0FBQztZQUMvQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1NBQ2hHO2FBQU07WUFDTCxNQUFNLFlBQVksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSx5RUFBeUUsQ0FBQztZQUVuSCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUN0Qix5REFBeUQ7Z0JBQ3pELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3pFO2lCQUFNO2dCQUNMLG9EQUFvRDtnQkFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMvQjtTQUNGO0lBQ0gsQ0FBQztJQUNELE9BQU87SUFDUCxDQUFDO0lBQ0QsU0FBUztJQUNULENBQUM7SUFDSyxNQUFNOztRQUNaLENBQUM7S0FBQTtJQUNLLE9BQU87O1FBQ2IsQ0FBQztLQUFBO0NBQ0Y7QUF2REQsa0NBdURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRmlyZWJhc2VTREsgZnJvbSAnZmlyZWJhc2UtYWRtaW4nO1xuaW1wb3J0IHsgQmFzZUVycm9yLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSwgTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMgfSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCBGaXJlYmFzZU1lc3NhZ2UsIHsgRmlyZWJhc2VNZXNzYWdlU2NoZW1hIH0gZnJvbSAnLi9GaXJlYmFzZU1lc3NhZ2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpcmViYXNlU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgRmlyZWJhc2Ugc2VydmljZSBhY2NvdW50IG9iamVjdFxuICAgKi9cbiAgc2VydmljZUFjY291bnQ/OiBGaXJlYmFzZVNESy5TZXJ2aWNlQWNjb3VudFxuXG4gIC8qKlxuICAgKiBUaGUgZmlyZWJhc2UgZGF0YWJhc2UgVVJMLlxuICAgKi9cbiAgZGF0YWJhc2VVUkw/OiBzdHJpbmdcblxuICAvKipcbiAgICogRGVidWcgbW9kZSBmbGFnLlxuICAgKi9cbiAgZGVidWc/OiBib29sZWFuXG5cbiAgLyoqXG4gICAqIFRoZSBsb2dnZXIgaW5zdGFuY2UgZm9yIHRoZSBzZXJ2aWNlLlxuICAgKi9cbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG59XG5cbi8qKlxuICogUmVmZXJlbmNlOiBodHRwczovL2ZpcmViYXNlLmdvb2dsZS5jb20vZG9jcy9yZWZlcmVuY2UvYWRtaW4vbm9kZS9hZG1pbi5tZXNzYWdpbmcuTWVzc2FnaW5nT3B0aW9uc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEZpcmViYXNlVHJhbnNwb3J0T3B0aW9ucyB7XG4gIHByaW9yaXR5OiAnbm9ybWFsJyB8ICdoaWdoJ1xuICB0aW1lVG9MaXZlOiBudW1iZXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIHByb3RlY3RlZCBzZGs6IEZpcmViYXNlU0RLLmFwcC5BcHBcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb3B0aW9uczogRmlyZWJhc2VTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgRmlyZWJhc2UgQWRtaW4gU0RLXG4gICAgaWYgKG9wdGlvbnMuc2VydmljZUFjY291bnQgJiYgb3B0aW9ucy5kYXRhYmFzZVVSTCkge1xuICAgICAgdGhpcy5zZGsgPSBGaXJlYmFzZVNESy5pbml0aWFsaXplQXBwKHtcbiAgICAgICAgZGF0YWJhc2VVUkw6IG9wdGlvbnMuZGF0YWJhc2VVUkwsXG4gICAgICAgIGNyZWRlbnRpYWw6IEZpcmViYXNlU0RLLmNyZWRlbnRpYWwuY2VydChvcHRpb25zLnNlcnZpY2VBY2NvdW50KSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyB0cmFuc3BvcnRlciBhdmFpbGFibGUsIHByZXBhcmUgbWVzc2FnZSBmb3Igd2FybmluZyBvciBjcmFzaFxuICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMub3B0aW9ucy5uYW1lfTogVGhlIEdvb2dsZSBTZXJ2aWNlIEFjY291bnQgaXMgbm90IGF2YWlsYWJsZS5gO1xuXG4gICAgICBpZiAoIW9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgLy8gTm8gZGVidWcgbW9kZSwgY3Jhc2ggdGhlIHNlcnZpY2VcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihtZXNzYWdlKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSW4gZGVidWcgbW9kZSB3ZSBzZW5kIGFsbCBtZXNzYWdlcyB0byB0aGUgY29uc29sZVxuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGAke21lc3NhZ2V9IEFsbCBtZXNzYWdlcyB3aWxsIGJlIHNlbnQgdG8gdGhlIGNvbnNvbGUgYXMgd2FybmluZ3MuYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNlbmQobWVzc2FnZTogRmlyZWJhc2VNZXNzYWdlU2NoZW1hLCBvcHRpb25zPzogRmlyZWJhc2VUcmFuc3BvcnRPcHRpb25zKSB7XG4gICAgY29uc3QgZGF0YSA9IG1lc3NhZ2UgaW5zdGFuY2VvZiBGaXJlYmFzZU1lc3NhZ2UgPyBtZXNzYWdlIDogbmV3IEZpcmViYXNlTWVzc2FnZShtZXNzYWdlKTtcblxuICAgIGlmICh0aGlzLnNkaykge1xuICAgICAgLy8gU2VuZCBhIG1lc3NhZ2UgdG8gdGhlIGRldmljZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBwcm92aWRlZFxuICAgICAgLy8gcmVnaXN0cmF0aW9uIHRva2VuIHdpdGggdGhlIHByb3ZpZGVkIG9wdGlvbnMuXG4gICAgICBjb25zdCB7IHJlZ2lzdHJhdGlvblRva2VuLCAuLi5wYXlsb2FkIH0gPSBkYXRhO1xuICAgICAgcmV0dXJuIHRoaXMuc2RrLm1lc3NhZ2luZygpLnNlbmRUb0RldmljZShyZWdpc3RyYXRpb25Ub2tlbiwgeyBub3RpZmljYXRpb246IHBheWxvYWQgfSwgb3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYCR7dGhpcy5vcHRpb25zLm5hbWV9IGlzIG5vdCByZWFkeSwgdGhlIEdvb2dsZSBTZXJ2aWNlIEFjY291bnQgbWF5IGJlIGludmFsaWQgb3IgdW5hdmFpbGFibGVgO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIC8vIExvZ3MgdGhlIG5vdGlmaWNhdGlvbiBib2R5IGluIHRoZSBjb25zb2xlIGFzIGEgd2FybmluZ1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGVycm9yTWVzc2FnZSwgeyBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENyYXNoIHRoZSBzZXJ2aWNlLCBub3RpZmljYXRpb24gY291bGQgbm90IGJlIHNlbnRcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG9uTW91bnQoKSB7XG4gIH1cbiAgb25Vbm1vdW50KCkge1xuICB9XG4gIGFzeW5jIG9uSW5pdCgpIHtcbiAgfVxuICBhc3luYyBvblJlYWR5KCkge1xuICB9XG59Il19