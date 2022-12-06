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
exports.MonitorCustomEditorProvider = void 0;
const timers_1 = require("timers");
const vscode = __importStar(require("vscode"));
const MonitorView = __importStar(require("./monitorView"));
const wsclient_1 = require("./wsclient");
const common_1 = require("./common");
class MonitorDocument {
    constructor(uri) {
        this.currentState = 'stop';
        this.names = [];
        this.samplerate = 0;
        this.timeout = undefined;
        this.monitorLoop = undefined;
        this.uri = uri;
    }
    dispose() {
        wsclient_1.mon.Send("stpq");
        if (common_1.Common.runningCmd == "strq")
            common_1.Common.runningCmd = "";
        return;
    }
    updateSampleRate() {
        if (this.timeout)
            clearTimeout(this.timeout);
        this.webview.postMessage({ event: 'samplerate', val: this.samplerate });
        this.samplerate = 0;
        if (this.currentState == 'start') {
            this.timeout = timers_1.setTimeout(() => {
                this.updateSampleRate();
            }, 1000);
        }
    }
    async processEvent(e) {
        switch (e.event) {
            case 'switchRec':
                if (this.currentState === 'stop') {
                    await this.updateView();
                    this.currentState = 'start';
                    this.webview.postMessage({ event: 'switchStop' });
                    this.updateSampleRate();
                    if (common_1.Common.runningCmd == "") {
                        common_1.Common.runningCmd = "strq";
                        let param = await wsclient_1.mon.Send("strq" + this.uri.fsPath);
                        var sp = String(param).split("\t");
                        let loop = async () => {
                            for (var i = 0, j = 0; i < this.names.length; i++) {
                                if (this.names[i].includes("-missing-")) {
                                    continue;
                                }
                                this.webview.postMessage({ event: 'update', id: this.names[i], val: sp[j + 1] });
                                this.webview.postMessage({ event: 'addpoint', id: i, val: sp[j + 1] });
                                j++;
                            }
                            this.samplerate++;
                            param = await wsclient_1.mon.wait();
                            sp = String(param).split("\t");
                            if (this.monitorLoop != undefined)
                                clearTimeout(this.monitorLoop);
                            this.monitorLoop = timers_1.setTimeout(loop, 1);
                        };
                        loop();
                    }
                    else {
                        vscode.window.showErrorMessage("Failed to start monitor, Please make sure the logging have been stopped.");
                    }
                }
                else {
                    if (this.monitorLoop != undefined)
                        clearTimeout(this.monitorLoop);
                    this.currentState = 'stop';
                    this.webview.postMessage({ event: 'switchStart' });
                    wsclient_1.mon.Send("stpq");
                    if (common_1.Common.runningCmd == "strq")
                        common_1.Common.runningCmd = "";
                }
                break;
            case 'remove':
                if (this.currentState != 'stop') {
                    break;
                }
                var newsyms = [];
                for (var i = 0; i < this.syms.length; i++) {
                    if (this.syms[i].name == String(e.name)) {
                    }
                    else {
                        newsyms.push(this.syms[i]);
                    }
                }
                wsclient_1.mon.Send("upsq" + this.uri.fsPath + "|" + JSON.stringify(newsyms));
                this.syms = await wsclient_1.mon.Send("gtsq" + this.uri.fsPath);
                this.updateView();
                break;
            case 'add':
                if (this.currentState != 'stop') {
                    break;
                }
                var newstr = String(e.name).split(":");
                if (newstr.length === 2 && this.notExist(newstr[0])
                    && (newstr[1] === "INT32" || newstr[1] === "INT16" || newstr[1] === "INT8" || newstr[1] === "FLOAT32" || newstr[1] === "FLOAT64")) {
                    this.syms.push({ name: newstr[0], ty: newstr[1] });
                    wsclient_1.mon.Send("upsq" + this.uri.fsPath + "|" + JSON.stringify(this.syms));
                    this.syms = await wsclient_1.mon.Send("gtsq" + this.uri.fsPath);
                    this.updateView();
                }
                break;
            case 'refresh':
                this.updateView();
                break;
            default:
        }
    }
    notExist(find) {
        for (var i = 0; i < this.syms.length; i++) {
            if (this.syms[i].name == find) {
                return false;
            }
        }
        return true;
    }
    async initView(webview) {
        this.webview = webview;
        this.updateView();
    }
    async updateView() {
        this.syms = await wsclient_1.mon.Send("gtsq" + this.uri.fsPath);
        var page = "";
        this.names = [];
        page += "<div><button id=btn-start class=\"button\" onclick=\"switchRec()\">Start</button><button id=btn-ref class=\"button\" onclick=\"refresh()\">Refresh</button><br>The full charts are saved to your temporary (e.g. /tmp) folder after the monitor stopped.<br>Sample rate: <span id=samplerate></span></div>";
        for (var i = 0; i < this.syms.length; i++) {
            var missingstyle = "";
            var missingtext = "";
            var missingtag = "";
            if (this.syms[i].missing) {
                missingstyle = "style=\"color:red\"";
                missingtext = " (missing in the compiled program)";
                missingtag = "missing-";
            }
            page += "<li><button onclick=remove(\"" + this.syms[i].name + "\") class=button1><b>-</b></button> <span " + missingstyle + ">" + this.syms[i].name + " -- " + this.syms[i].ty + missingtext + "</span>: <span id=\"data-" + this.syms[i].name + "\"></span></li>";
            page += "<div><canvas id=\"canvas-" + this.syms[i].name + "\" width=800 height=100></canvas></div>";
            this.names.push("data-" + missingtag + this.syms[i].name);
        }
        page += "<div><input type=\"text\" id=\"variable\" name=\"variable\" placeholder=\"Variable name...\"><select id=seltype style=\"width: 120px\"><option value=\"INT8\">BYTE</option><option value=\"INT16\">WORD</option><option value=\"INT32\">DWORD</option><option value=\"FLOAT32\">FLOAT</option><option value=\"FLOAT64\">DOUBLE</option></select><button id=add class=\"button1\" onclick=add()><b>+</b></button></div>";
        this.webview.postMessage({ event: 'page', code: page });
        for (var i = 0; i < this.syms.length; i++) {
            this.webview.postMessage({ event: 'stream', name: 'canvas-' + this.syms[i].name });
        }
    }
    async save(cancellation) {
    }
    async saveAs(targetResource, cancellation) {
    }
    async revert(_cancellation) {
    }
    async backup(destination, cancellation) {
        await this.saveAs(destination, cancellation);
        return {
            id: destination.toString(),
            delete: async () => { }
        };
    }
}
class MonitorCustomEditorProvider {
    constructor() {
        this._onDidChangeCustomDocument = new vscode.EventEmitter();
        this.onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;
    }
    saveCustomDocument(document, cancellation) {
        return document.save(cancellation);
    }
    saveCustomDocumentAs(document, destination, cancellation) {
        return document.saveAs(destination, cancellation);
    }
    revertCustomDocument(document, cancellation) {
        return document.revert(cancellation);
    }
    backupCustomDocument(document, context, cancellation) {
        return document.backup(context.destination, cancellation);
    }
    openCustomDocument(uri, openContext, token) {
        const document = new MonitorDocument(uri);
        return document;
    }
    resolveCustomEditor(document, webviewPanel, token) {
        let func = async () => {
            let waitHelper = () => {
                return new Promise(resolve => {
                    let intv = setInterval(() => {
                        if (wsclient_1.mon.isOpen) {
                            clearInterval(intv);
                            resolve();
                        }
                    }, 100);
                });
            };
            await waitHelper();
            webviewPanel.webview.options = {
                enableScripts: true,
            };
            webviewPanel.webview.html = MonitorView.getWebviewContent("");
            document.initView(webviewPanel.webview);
            webviewPanel.webview.onDidReceiveMessage((e) => {
                document.processEvent(e);
            });
        };
        func();
    }
    static register() {
        return vscode.window.registerCustomEditorProvider(MonitorCustomEditorProvider.viewType, new MonitorCustomEditorProvider(), {
            webviewOptions: {
                retainContextWhenHidden: true,
            },
            supportsMultipleEditorsPerDocument: false,
        });
    }
}
exports.MonitorCustomEditorProvider = MonitorCustomEditorProvider;
MonitorCustomEditorProvider.viewType = 'MonitorEditor';
//# sourceMappingURL=MonitorCustomEditor.js.map