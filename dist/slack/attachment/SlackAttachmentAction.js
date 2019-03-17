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
class SlackAttachmentAction {
    constructor(data) {
        Object.assign(this, data);
    }
    toJSON() {
        const otherProps = __rest(this, []);
        return Object.assign({}, otherProps);
    }
}
exports.SlackAttachmentAction = SlackAttachmentAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xhY2tBdHRhY2htZW50QWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3NsYWNrL2F0dGFjaG1lbnQvU2xhY2tBdHRhY2htZW50QWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsTUFBYSxxQkFBcUI7SUFPaEMsWUFBWSxJQUFpQztRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQVEsNkJBQXNCLENBQUM7UUFFL0IseUJBQ0ssVUFBVSxFQUNkO0lBQ0gsQ0FBQztDQUNGO0FBbEJELHNEQWtCQyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGludGVyZmFjZSBTbGFja0F0dGFjaG1lbnRBY3Rpb25TY2hlbWEge1xuICB0eXBlOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIGZhbGxiYWNrOiBzdHJpbmc7XG4gIHN0eWxlPzogJ3ByaW1hcnknIHwgJ2RhbmdlcicgfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBTbGFja0F0dGFjaG1lbnRBY3Rpb24gaW1wbGVtZW50cyBTbGFja0F0dGFjaG1lbnRBY3Rpb25TY2hlbWEge1xuICB0eXBlOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIGZhbGxiYWNrOiBzdHJpbmc7XG4gIHN0eWxlPzogJ3ByaW1hcnknIHwgJ2RhbmdlcicgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogU2xhY2tBdHRhY2htZW50QWN0aW9uU2NoZW1hKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKSB7XG4gICAgY29uc3QgeyAuLi5vdGhlclByb3BzIH0gPSB0aGlzO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm90aGVyUHJvcHMsXG4gICAgfVxuICB9XG59Il19