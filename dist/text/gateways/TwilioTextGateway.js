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
const Twilio = require("twilio");
class TwilioTextGateway {
    constructor(options) {
        this.options = options;
        this.isReady = false;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountSid, authToken } = this.options;
            if (!accountSid || !authToken) {
                throw new Error('Tried to instantiate the Twilio SMS gateway without a valid set of credentials');
            }
            this.client = Twilio(accountSid, authToken);
            this.isReady = true;
        });
    }
    send(message) {
        return this.client.messages.create({
            body: message.text,
            from: message.from || this.options.from,
            to: message.to,
        });
    }
}
exports.TwilioTextGateway = TwilioTextGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHdpbGlvVGV4dEdhdGV3YXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvdGV4dC9nYXRld2F5cy9Ud2lsaW9UZXh0R2F0ZXdheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQWlDO0FBVWpDLE1BQWEsaUJBQWlCO0lBSTVCLFlBQXNCLE9BQTZCO1FBQTdCLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBRm5ELFlBQU8sR0FBRyxLQUFLLENBQUM7SUFHaEIsQ0FBQztJQUVZLElBQUk7O1lBQ2YsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBRy9DLElBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQzthQUNuRztZQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO0tBQUE7SUFFTSxJQUFJLENBQUMsT0FBMEI7UUFDcEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDakMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUN2QyxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUExQkQsOENBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVHdpbGlvIGZyb20gJ3R3aWxpbyc7XG5pbXBvcnQgeyBUZXh0TWVzc2FnZVNjaGVtYSB9IGZyb20gXCIuLi9UZXh0TWVzc2FnZVwiO1xuaW1wb3J0IHsgQmFzZVRleHRHYXRld2F5IH0gZnJvbSBcIi4vQmFzZVRleHRHYXRld2F5XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHdpbGlvR2F0ZXdheU9wdGlvbnMge1xuICBmcm9tOiBzdHJpbmc7XG4gIGFjY291bnRTaWQ6IHN0cmluZztcbiAgYXV0aFRva2VuOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBUd2lsaW9UZXh0R2F0ZXdheSBpbXBsZW1lbnRzIEJhc2VUZXh0R2F0ZXdheSB7XG4gIGNsaWVudDogYW55O1xuICBpc1JlYWR5ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IFR3aWxpb0dhdGV3YXlPcHRpb25zKSB7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaW5pdCgpIHtcbiAgICBjb25zdCB7IGFjY291bnRTaWQsIGF1dGhUb2tlbiB9ID0gdGhpcy5vcHRpb25zO1xuICAgIFxuXG4gICAgaWYoIWFjY291bnRTaWQgfHwgIWF1dGhUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBpbnN0YW50aWF0ZSB0aGUgVHdpbGlvIFNNUyBnYXRld2F5IHdpdGhvdXQgYSB2YWxpZCBzZXQgb2YgY3JlZGVudGlhbHMnKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsaWVudCA9IFR3aWxpbyhhY2NvdW50U2lkLCBhdXRoVG9rZW4pO1xuICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc2VuZChtZXNzYWdlOiBUZXh0TWVzc2FnZVNjaGVtYSkge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgYm9keTogbWVzc2FnZS50ZXh0LFxuICAgICAgZnJvbTogbWVzc2FnZS5mcm9tIHx8IHRoaXMub3B0aW9ucy5mcm9tLFxuICAgICAgdG86IG1lc3NhZ2UudG8sXG4gICAgfSk7XG4gIH1cbn0iXX0=