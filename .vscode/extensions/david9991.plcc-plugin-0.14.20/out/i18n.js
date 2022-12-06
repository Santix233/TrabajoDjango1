"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18nConfiguration = void 0;
const i18n = __importStar(require("i18n"));
const path = __importStar(require("path"));
function i18nConfiguration(context) {
    i18n.configure({
        locales: ['en', 'zh-cn'],
        defaultLocale: 'en',
        queryParameter: 'lang',
        directory: path.join(context.extensionPath, 'locales'),
        api: {
            '__': 'translate',
            "__n": 'translateN'
        }
    });
}
exports.i18nConfiguration = i18nConfiguration;
exports.default = i18n;
//# sourceMappingURL=i18n.js.map