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
exports.getcon = void 0;
const vscode = __importStar(require("vscode"));
class getConfiguration {
    getHelperAddress() {
        let helperAddress = vscode.workspace.getConfiguration().get("plcc.HelperAddress");
        helperAddress = helperAddress.trim();
        return helperAddress;
    }
    getDownloadAddress() {
        let downloadAddress = vscode.workspace.getConfiguration().get('plcc.HelperDownloadAddress');
        downloadAddress = downloadAddress.trim();
        return downloadAddress;
    }
    getRepositoryAddresses() {
        return vscode.workspace.getConfiguration().get('plcc.RepositoryAddresses');
    }
    getCompileAddress() {
        let compileAddress = vscode.workspace.getConfiguration().get("plcc.CompilerAddress");
        compileAddress = compileAddress.trim();
        return compileAddress;
    }
    getTestingMode() {
        let testingMode = vscode.workspace.getConfiguration().get("plcc.TestingMode");
        return testingMode;
    }
}
let getcon = new getConfiguration();
exports.getcon = getcon;
//# sourceMappingURL=configurations.js.map