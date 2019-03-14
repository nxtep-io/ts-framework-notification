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
class TwilioTextGateway {
    constructor(options) {
        this.options = options;
        this.isReady = false;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const Twilio = yield Promise.resolve().then(() => require('twilio'));
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
exports.default = TwilioTextGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHdpbGlvVGV4dEdhdGV3YXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvdGV4dC9nYXRld2F5cy9Ud2lsaW9UZXh0R2F0ZXdheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBU0EsTUFBcUIsaUJBQWlCO0lBSXBDLFlBQXNCLE9BQTZCO1FBQTdCLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBRm5ELFlBQU8sR0FBRyxLQUFLLENBQUM7UUFHZCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRWUsSUFBSTs7WUFDbEIsTUFBTSxNQUFNLEdBQUcsMkNBQWEsUUFBUSxFQUFDLENBQUM7WUFDdEMsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBRy9DLElBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQzthQUNuRztZQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO0tBQUE7SUFFTSxJQUFJLENBQUMsT0FBMEI7UUFDcEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDakMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUN2QyxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUE1QkQsb0NBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dE1lc3NhZ2VTY2hlbWEgfSBmcm9tIFwiLi4vVGV4dE1lc3NhZ2VcIjtcbmltcG9ydCB7IEJhc2VUZXh0R2F0ZXdheSB9IGZyb20gXCIuL0Jhc2VUZXh0R2F0ZXdheVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFR3aWxpb0dhdGV3YXlPcHRpb25zIHtcbiAgZnJvbTogc3RyaW5nO1xuICBhY2NvdW50U2lkOiBzdHJpbmc7XG4gIGF1dGhUb2tlbjogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUd2lsaW9UZXh0R2F0ZXdheSBpbXBsZW1lbnRzIEJhc2VUZXh0R2F0ZXdheSB7XG4gIGNsaWVudDogYW55O1xuICBpc1JlYWR5ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IFR3aWxpb0dhdGV3YXlPcHRpb25zKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgaW5pdCgpIHtcbiAgICBjb25zdCBUd2lsaW8gPSBhd2FpdCBpbXBvcnQoJ3R3aWxpbycpO1xuICAgIGNvbnN0IHsgYWNjb3VudFNpZCwgYXV0aFRva2VuIH0gPSB0aGlzLm9wdGlvbnM7XG4gICAgXG5cbiAgICBpZighYWNjb3VudFNpZCB8fCAhYXV0aFRva2VuKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGluc3RhbnRpYXRlIHRoZSBUd2lsaW8gU01TIGdhdGV3YXkgd2l0aG91dCBhIHZhbGlkIHNldCBvZiBjcmVkZW50aWFscycpO1xuICAgIH1cblxuICAgIHRoaXMuY2xpZW50ID0gVHdpbGlvKGFjY291bnRTaWQsIGF1dGhUb2tlbik7XG4gICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZW5kKG1lc3NhZ2U6IFRleHRNZXNzYWdlU2NoZW1hKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50Lm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgICBib2R5OiBtZXNzYWdlLnRleHQsXG4gICAgICBmcm9tOiBtZXNzYWdlLmZyb20gfHwgdGhpcy5vcHRpb25zLmZyb20sXG4gICAgICB0bzogbWVzc2FnZS50byxcbiAgICB9KTtcbiAgfVxufSJdfQ==