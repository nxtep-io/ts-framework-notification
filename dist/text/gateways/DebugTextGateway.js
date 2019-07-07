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
class DebugTextGateway {
    constructor(options = {}) {
        this.options = options;
        this.isReady = true;
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
    }
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('DebugTextGateway: Sending a mocked SMS text message', { message });
            return {};
        });
    }
}
exports.DebugTextGateway = DebugTextGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVidWdUZXh0R2F0ZXdheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi90ZXh0L2dhdGV3YXlzL0RlYnVnVGV4dEdhdGV3YXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZEQUE2RDtBQVE3RCxNQUFhLGdCQUFnQjtJQUkzQixZQUFzQixVQUFtQyxFQUFFO1FBQXJDLFlBQU8sR0FBUCxPQUFPLENBQThCO1FBRjNELFlBQU8sR0FBRyxJQUFJLENBQUM7UUFHYixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBR1ksSUFBSSxDQUFDLE9BQTBCOztZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxREFBcUQsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDdEYsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDO0tBQUE7Q0FDRjtBQWJELDRDQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuaW1wb3J0IHsgVGV4dE1lc3NhZ2VTY2hlbWEgfSBmcm9tIFwiLi4vVGV4dE1lc3NhZ2VcIjtcbmltcG9ydCB7IEJhc2VUZXh0R2F0ZXdheSB9IGZyb20gXCIuL0Jhc2VUZXh0R2F0ZXdheVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIERlYnVnVGV4dEdhdGV3YXlPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWJ1Z1RleHRHYXRld2F5IGltcGxlbWVudHMgQmFzZVRleHRHYXRld2F5IHtcbiAgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgaXNSZWFkeSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IERlYnVnVGV4dEdhdGV3YXlPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cblxuICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlOiBUZXh0TWVzc2FnZVNjaGVtYSk6IFByb21pc2U8YW55PiB7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoJ0RlYnVnVGV4dEdhdGV3YXk6IFNlbmRpbmcgYSBtb2NrZWQgU01TIHRleHQgbWVzc2FnZScsIHsgbWVzc2FnZSB9KTtcbiAgICByZXR1cm4ge307XG4gIH1cbn0iXX0=