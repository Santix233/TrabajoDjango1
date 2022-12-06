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
exports.LadderConfigViewProvider = void 0;
const vscode = __importStar(require("vscode"));
const ladderConfigView = __importStar(require("./LadderConfigView"));
const common_1 = require("./common");
class LadderConfigViewProvider {
    constructor() {
        this.curEdit = "";
        this.actChannel = "";
        common_1.Common.myEmitter.on('actChannel', (chanlName) => {
            this.actChannel = chanlName;
        });
    }
    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true,
        };
        common_1.Common.myEmitter.on('inlist', (value) => {
            if (webviewView != undefined) {
                webviewView.webview.postMessage({ type: "in", item: JSON.parse(value.toString()) });
                webviewView.webview.html = ladderConfigView.getWebviewContent();
            }
        });
        common_1.Common.myEmitter.on('outlist', (value) => {
            if (webviewView != undefined) {
                webviewView.webview.postMessage({ type: "out", item: JSON.parse(value.toString()) });
                webviewView.webview.html = ladderConfigView.getWebviewContent();
            }
        });
        common_1.Common.myEmitter.on('inoutlist', (value) => {
            if (webviewView != undefined) {
                webviewView.webview.postMessage({ type: "inout", item: JSON.parse(value.toString()) });
                webviewView.webview.html = ladderConfigView.getWebviewContent();
            }
        });
        common_1.Common.myEmitter.on('locallist', (value) => {
            if (webviewView != undefined) {
                webviewView.webview.postMessage({ type: "local", item: JSON.parse(value.toString()) });
                webviewView.webview.html = ladderConfigView.getWebviewContent();
            }
        });
        common_1.Common.myEmitter.on('poulist', (value) => {
            if (webviewView != undefined) {
                webviewView.webview.postMessage({ type: "pou", item: value });
                webviewView.webview.html = ladderConfigView.getWebviewContent();
            }
        });
        common_1.Common.myEmitter.on('pounamelist', (value) => {
            if (webviewView != undefined) {
                webviewView.webview.postMessage({ type: "pouname", item: value });
                webviewView.webview.html = ladderConfigView.getWebviewContent();
            }
        });
        webviewView.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case 'add':
                    this.curEdit = message.id;
                    if (this.actChannel != "") {
                        common_1.Common.myEmitter.emit("add", this.actChannel, message.type, this.curEdit);
                    }
                    return;
                case 'del':
                    this.curEdit = message.id;
                    if (this.actChannel != "") {
                        common_1.Common.myEmitter.emit("del", this.actChannel, message.type, this.curEdit);
                    }
                    return;
                case 'new':
                    this.curEdit = message.id;
                    if (this.actChannel != "") {
                        common_1.Common.myEmitter.emit("new", this.actChannel, message.type, this.curEdit);
                    }
                    return;
                case 'pouchange':
                    if (this.actChannel != "") {
                        common_1.Common.myEmitter.emit("pouchange", this.actChannel, message.type);
                    }
                    return;
                case 'pounamechange':
                    if (this.actChannel != "") {
                        common_1.Common.myEmitter.emit("pounamechange", this.actChannel, message.type);
                    }
                    return;
                case 'change':
                    if (this.actChannel != "") {
                        common_1.Common.myEmitter.emit("change", this.actChannel, message.type, message.id, message.value);
                    }
                    return;
            }
        });
        webviewView.webview.html = ladderConfigView.getWebviewContent();
    }
    static register() {
        return vscode.window.registerWebviewViewProvider("ladderConfigView", new LadderConfigViewProvider(), {
            webviewOptions: {
                retainContextWhenHidden: true,
            }
        });
    }
}
exports.LadderConfigViewProvider = LadderConfigViewProvider;
//# sourceMappingURL=LadderConfigEditor.js.map