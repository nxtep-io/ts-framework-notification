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
const base_1 = require("../base");
const types_1 = require("./../types");
const SlackAttachment_1 = require("./attachment/SlackAttachment");
class SlackMessage extends base_1.BaseMessage {
    constructor(data) {
        super(Object.assign({}, data, { type: types_1.TransportTypes.SLACK }));
        const { attachments = [] } = data, otherData = __rest(data, ["attachments"]);
        Object.assign(this, otherData);
        this.attachments = attachments.map(a => new SlackAttachment_1.SlackAttachment(a));
    }
    toJSON() {
        const _a = this, { attachments = [] } = _a, otherProps = __rest(_a, ["attachments"]);
        return Object.assign({ attachments: attachments.map(a => a.toJSON ? a.toJSON() : a) }, otherProps);
    }
}
exports.SlackMessage = SlackMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xhY2tNZXNzYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NsYWNrL1NsYWNrTWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGtDQUF5RDtBQUN6RCxzQ0FBNEM7QUFDNUMsa0VBQXNGO0FBWXRGLE1BQWEsWUFBYSxTQUFRLGtCQUFXO0lBUTNDLFlBQVksSUFBd0I7UUFDbEMsS0FBSyxtQkFBTSxJQUFJLElBQUUsSUFBSSxFQUFFLHNCQUFjLENBQUMsS0FBSyxJQUFHLENBQUM7UUFDL0MsTUFBTSxFQUFFLFdBQVcsR0FBRyxFQUFFLEtBQW1CLElBQUksRUFBckIseUNBQXFCLENBQUM7UUFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxpQ0FBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLFNBQTBDLEVBQTFDLEVBQUUsV0FBVyxHQUFHLEVBQUUsT0FBd0IsRUFBdEIsd0NBQXNCLENBQUM7UUFFakQsdUJBQ0UsV0FBVyxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUN6RCxVQUFVLEVBQ2Q7SUFDSCxDQUFDO0NBQ0Y7QUF2QkQsb0NBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1lc3NhZ2UsIEJhc2VNZXNzYWdlU2NoZW1hIH0gZnJvbSBcIi4uL2Jhc2VcIjtcbmltcG9ydCB7IFRyYW5zcG9ydFR5cGVzIH0gZnJvbSAnLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBTbGFja0F0dGFjaG1lbnQsIFNsYWNrQXR0YWNobWVudFNjaGVtYSB9IGZyb20gJy4vYXR0YWNobWVudC9TbGFja0F0dGFjaG1lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNsYWNrTWVzc2FnZVNjaGVtYSBleHRlbmRzIEJhc2VNZXNzYWdlU2NoZW1hIHtcbiAgdG8/OiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgdXNlcm5hbWU/OiBzdHJpbmc7XG4gIGljb25Vcmw/OiBzdHJpbmc7XG4gIGljb25FbW9qaT86IHN0cmluZztcbiAgd2ViaG9va1VybD86IHN0cmluZztcbiAgYXR0YWNobWVudHM/OiBTbGFja0F0dGFjaG1lbnRTY2hlbWFbXTtcbn1cblxuZXhwb3J0IGNsYXNzIFNsYWNrTWVzc2FnZSBleHRlbmRzIEJhc2VNZXNzYWdlIGltcGxlbWVudHMgU2xhY2tNZXNzYWdlU2NoZW1hIHtcbiAgX2lkPzogc3RyaW5nO1xuICBfdHlwZTogc3RyaW5nO1xuICB0bz86IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICB1c2VybmFtZT86IHN0cmluZztcbiAgYXR0YWNobWVudHM/OiBTbGFja0F0dGFjaG1lbnRbXTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBTbGFja01lc3NhZ2VTY2hlbWEpIHtcbiAgICBzdXBlcih7IC4uLmRhdGEsIHR5cGU6IFRyYW5zcG9ydFR5cGVzLlNMQUNLIH0pO1xuICAgIGNvbnN0IHsgYXR0YWNobWVudHMgPSBbXSwgLi4ub3RoZXJEYXRhIH0gPSBkYXRhO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3RoZXJEYXRhKTtcbiAgICB0aGlzLmF0dGFjaG1lbnRzID0gYXR0YWNobWVudHMubWFwKGEgPT4gbmV3IFNsYWNrQXR0YWNobWVudChhKSk7XG4gIH1cblxuICBwdWJsaWMgdG9KU09OKCkge1xuICAgIGNvbnN0IHsgYXR0YWNobWVudHMgPSBbXSwgLi4ub3RoZXJQcm9wcyB9ID0gdGhpcztcblxuICAgIHJldHVybiB7XG4gICAgICBhdHRhY2htZW50czogYXR0YWNobWVudHMubWFwKGEgPT4gYS50b0pTT04gPyBhLnRvSlNPTigpIDogYSksXG4gICAgICAuLi5vdGhlclByb3BzLFxuICAgIH1cbiAgfVxufSJdfQ==