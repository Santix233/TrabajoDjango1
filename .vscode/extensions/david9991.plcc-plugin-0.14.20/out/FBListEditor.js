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
exports.FBListViewProvider = void 0;
const vscode = __importStar(require("vscode"));
const wsclient_1 = require("./wsclient");
const FBListView = __importStar(require("./FBListView"));
const common_1 = require("./common");
const svg = __importStar(require("./svgelement"));
class FBListViewProvider {
    constructor() {
        this.id = "";
        this.actChannel = "";
        common_1.Common.myEmitter.on('actChannel', (chanlName) => {
            this.actChannel = chanlName;
        });
    }
    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true,
        };
        common_1.Common.myEmitter.on('defchange', async function defchange(path) {
            let value = await wsclient_1.fbs.Send("rlfq" + "/" + path);
            if (webviewView != undefined) {
                webviewView.webview.postMessage({ type: "table", item: JSON.parse(String(value)) });
                webviewView.webview.html = FBListView.getWebviewContent();
            }
        });
        wsclient_1.fbsConnect(async () => {
            let value = await wsclient_1.fbs.Send("fblq");
            if (webviewView != undefined) {
                webviewView.webview.postMessage({ type: "table", item: JSON.parse(String(value)) });
                webviewView.webview.html = FBListView.getWebviewContent();
            }
        });
        webviewView.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case 'onclick':
                    this.id = message.id;
                    let hparam = await wsclient_1.fbs.Send("thbq" + "/" + message.id);
                    if (webviewView != undefined) {
                        webviewView.webview.postMessage({ type: "view", value: svg.GetStr(JSON.parse(String(hparam))) });
                    }
                    let hparam2 = await wsclient_1.fbs.Send("docq" + "/" + message.id);
                    if (webviewView != undefined) {
                        webviewView.webview.postMessage({ type: "doc", value: hparam2 });
                    }
                    return;
                case 'selectfb':
                    if (this.actChannel != "") {
                        common_1.Common.myEmitter.emit("select", this.actChannel, this.id);
                    }
                    return;
                case 'search':
                    vscode.window.showInformationMessage("hello world!" + message.value);
                    return;
            }
        });
        webviewView.webview.html = FBListView.getWebviewContent();
    }
    static register() {
        return vscode.window.registerWebviewViewProvider("fblistView", new FBListViewProvider(), {
            webviewOptions: {
                retainContextWhenHidden: true,
            }
        });
    }
}
exports.FBListViewProvider = FBListViewProvider;
//# sourceMappingURL=FBListEditor.js.map