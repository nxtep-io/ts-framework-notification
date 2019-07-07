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
        const _a = this, { to, attachments = [] } = _a, otherProps = __rest(_a, ["to", "attachments"]);
        return Object.assign({ attachments: attachments.map(a => a.toJSON ? a.toJSON() : a), channel: to }, otherProps);
    }
}
exports.SlackMessage = SlackMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xhY2tNZXNzYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NsYWNrL1NsYWNrTWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGtDQUF5RDtBQUN6RCxzQ0FBNEM7QUFDNUMsa0VBQXNGO0FBWXRGLE1BQWEsWUFBYSxTQUFRLGtCQUFXO0lBUzNDLFlBQVksSUFBd0I7UUFDbEMsS0FBSyxtQkFBTSxJQUFJLElBQUUsSUFBSSxFQUFFLHNCQUFjLENBQUMsS0FBSyxJQUFHLENBQUM7UUFDL0MsTUFBTSxFQUFFLFdBQVcsR0FBRyxFQUFFLEtBQW1CLElBQUksRUFBckIseUNBQXFCLENBQUM7UUFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxpQ0FBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLFNBQThDLEVBQTlDLEVBQUUsRUFBRSxFQUFFLFdBQVcsR0FBRyxFQUFFLE9BQXdCLEVBQXRCLDhDQUFzQixDQUFDO1FBRXJELHVCQUNFLFdBQVcsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDNUQsT0FBTyxFQUFFLEVBQUUsSUFDUixVQUFVLEVBQ2Q7SUFDSCxDQUFDO0NBQ0Y7QUF6QkQsb0NBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1lc3NhZ2UsIEJhc2VNZXNzYWdlU2NoZW1hIH0gZnJvbSBcIi4uL2Jhc2VcIjtcbmltcG9ydCB7IFRyYW5zcG9ydFR5cGVzIH0gZnJvbSAnLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBTbGFja0F0dGFjaG1lbnQsIFNsYWNrQXR0YWNobWVudFNjaGVtYSB9IGZyb20gJy4vYXR0YWNobWVudC9TbGFja0F0dGFjaG1lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNsYWNrTWVzc2FnZVNjaGVtYSBleHRlbmRzIEJhc2VNZXNzYWdlU2NoZW1hIHtcbiAgdG8/OiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgdXNlcm5hbWU/OiBzdHJpbmc7XG4gIGljb25Vcmw/OiBzdHJpbmc7XG4gIGljb25FbW9qaT86IHN0cmluZztcbiAgYXNfdXNlcj86IGJvb2xlYW47XG4gIGF0dGFjaG1lbnRzPzogU2xhY2tBdHRhY2htZW50U2NoZW1hW107XG59XG5cbmV4cG9ydCBjbGFzcyBTbGFja01lc3NhZ2UgZXh0ZW5kcyBCYXNlTWVzc2FnZSBpbXBsZW1lbnRzIFNsYWNrTWVzc2FnZVNjaGVtYSB7XG4gIF9pZD86IHN0cmluZztcbiAgX3R5cGU6IHN0cmluZztcbiAgdG8/OiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgdXNlcm5hbWU/OiBzdHJpbmc7XG4gIGFzX3VzZXI/OiBib29sZWFuO1xuICBhdHRhY2htZW50cz86IFNsYWNrQXR0YWNobWVudFtdO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFNsYWNrTWVzc2FnZVNjaGVtYSkge1xuICAgIHN1cGVyKHsgLi4uZGF0YSwgdHlwZTogVHJhbnNwb3J0VHlwZXMuU0xBQ0sgfSk7XG4gICAgY29uc3QgeyBhdHRhY2htZW50cyA9IFtdLCAuLi5vdGhlckRhdGEgfSA9IGRhdGE7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvdGhlckRhdGEpO1xuICAgIHRoaXMuYXR0YWNobWVudHMgPSBhdHRhY2htZW50cy5tYXAoYSA9PiBuZXcgU2xhY2tBdHRhY2htZW50KGEpKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgY29uc3QgeyB0bywgYXR0YWNobWVudHMgPSBbXSwgLi4ub3RoZXJQcm9wcyB9ID0gdGhpcztcblxuICAgIHJldHVybiB7XG4gICAgICBhdHRhY2htZW50czogYXR0YWNobWVudHMubWFwKGEgPT4gYS50b0pTT04gPyBhLnRvSlNPTigpIDogYSksXG4gICAgICBjaGFubmVsOiB0byxcbiAgICAgIC4uLm90aGVyUHJvcHMsXG4gICAgfVxuICB9XG59Il19