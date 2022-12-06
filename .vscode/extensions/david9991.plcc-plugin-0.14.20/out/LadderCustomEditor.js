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
exports.LadderCustomEditorProvider = void 0;
const vscode = __importStar(require("vscode"));
const LadderView = __importStar(require("./ladderView"));
const wsclient_1 = require("./wsclient");
const svg = __importStar(require("./svgelement"));
const toolbarContainer_1 = require("./toolbar/toolbarContainer");
const BlockArrowContainer_1 = require("./blockarrow/BlockArrowContainer");
const common_1 = require("./common");
const fss = __importStar(require("fs"));
const path = __importStar(require("path"));
class LadderDocument {
    constructor(uri) {
        this.svgStr = "";
        this.uri = uri;
    }
    dispose() {
        return;
    }
    async save(cancellation) {
        console.log("Save", this.ldr.isOpen);
        this.ldr.Send("save");
        return;
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
    registerws(ldr) {
        this.ldr = ldr;
    }
}
class LadderCustomEditorProvider {
    constructor(context) {
        this.context = context;
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
        let document = new LadderDocument(uri);
        return document;
    }
    resolveCustomEditor(document, webviewPanel, token) {
        fss.readFile(path.join(__dirname.substring(0, __dirname.length - 3)) + "package.json", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            let str = JSON.parse(data.toString());
            webviewPanel.webview.postMessage({ type: "toobarlist", item: str.contributes.keybindings });
        });
        const f = async () => {
            webviewPanel.webview.options = {
                enableScripts: true,
            };
            let waitHelper = () => {
                return new Promise(resolve => {
                    let intv = setInterval(() => {
                        if (wsclient_1.ws.isOpen) {
                            clearInterval(intv);
                            resolve();
                        }
                    }, 100);
                });
            };
            await waitHelper();
            let param = await wsclient_1.ws.Send('evtq/ld/"' + document.uri.fsPath + '"');
            let name = String(param).split('"');
            if (String(name[0]).split("/")[0] == "window") {
                var channelName = String(param).split('"')[1];
                let lds = new wsclient_1.ladderService(channelName);
                lds.Connect();
                document.registerws(lds);
                let waitLadder = () => {
                    return new Promise(resolve => {
                        let intv = setInterval(() => {
                            if (lds.isOpen) {
                                clearInterval(intv);
                                resolve();
                            }
                        }, 100);
                    });
                };
                await waitLadder();
                common_1.Common.myEmitter.emit("actChannel", channelName);
                let inList = await lds.Send("inlq" + "/" + "dsp" + "/" + "all");
                common_1.Common.myEmitter.emit("inlist", inList);
                let outList = await lds.Send("oulq" + "/" + "dsp" + "/" + "all");
                common_1.Common.myEmitter.emit("outlist", outList);
                let inoutList = await lds.Send("iolq" + "/" + "dsp" + "/" + "all");
                common_1.Common.myEmitter.emit("inoutlist", inoutList);
                let localList = await lds.Send("lolq" + "/" + "dsp" + "/" + "all");
                common_1.Common.myEmitter.emit("locallist", localList);
                let poutype = await lds.Send("pouq" + "/" + "default");
                common_1.Common.myEmitter.emit("poulist", poutype);
                let pouname = await lds.Send("pnaq" + "/" + "default");
                common_1.Common.myEmitter.emit("pounamelist", pouname);
                common_1.Common.myEmitter.on('select', async function selectfunc(actChannel, fbname) {
                    if (channelName == actChannel) {
                        let cbparam = await lds.Send("setq" + "/" + fbname);
                        webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                    }
                });
                common_1.Common.myEmitter.on('add', async function addfunc(actChannel, type, varid) {
                    if (channelName == actChannel) {
                        if (type == "in") {
                            let inList = await lds.Send("inlq" + "/" + "add" + "/" + varid);
                            common_1.Common.myEmitter.emit("inlist", inList);
                        }
                        else if (type == "out") {
                            let outList = await lds.Send("oulq" + "/" + "add" + "/" + varid);
                            common_1.Common.myEmitter.emit("outlist", outList);
                        }
                        else if (type == "inout") {
                            let inoutList = await lds.Send("iolq" + "/" + "add" + "/" + varid);
                            common_1.Common.myEmitter.emit("inoutlist", inoutList);
                        }
                        else if (type == "local") {
                            let localList = await lds.Send("lolq" + "/" + "add" + "/" + varid);
                            common_1.Common.myEmitter.emit("locallist", localList);
                        }
                    }
                });
                common_1.Common.myEmitter.on('new', async function newfunc(actChannel, type, varid) {
                    if (channelName == actChannel) {
                        if (type == "in") {
                            let inList = await lds.Send("inlq" + "/" + "new" + "/" + varid);
                            common_1.Common.myEmitter.emit("inlist", inList);
                        }
                        else if (type == "out") {
                            let outList = await lds.Send("oulq" + "/" + "new" + "/" + varid);
                            common_1.Common.myEmitter.emit("outlist", outList);
                        }
                        else if (type == "inout") {
                            let inoutList = await lds.Send("iolq" + "/" + "new" + "/" + varid);
                            common_1.Common.myEmitter.emit("inoutlist", inoutList);
                        }
                        else if (type == "local") {
                            let localList = await lds.Send("lolq" + "/" + "new" + "/" + varid);
                            common_1.Common.myEmitter.emit("locallist", localList);
                        }
                    }
                });
                common_1.Common.myEmitter.on('del', async function delfunc(actChannel, type, varid) {
                    if (channelName == actChannel) {
                        if (type == "in") {
                            let inList = await lds.Send("inlq" + "/" + "del" + "/" + varid);
                            common_1.Common.myEmitter.emit("inlist", inList);
                        }
                        else if (type == "out") {
                            let outList = await lds.Send("oulq" + "/" + "del" + "/" + varid);
                            common_1.Common.myEmitter.emit("outlist", outList);
                        }
                        else if (type == "inout") {
                            let inoutList = await lds.Send("iolq" + "/" + "del" + "/" + varid);
                            common_1.Common.myEmitter.emit("inoutlist", inoutList);
                        }
                        else if (type == "local") {
                            let localList = await lds.Send("lolq" + "/" + "del" + "/" + varid);
                            common_1.Common.myEmitter.emit("locallist", localList);
                        }
                    }
                });
                common_1.Common.myEmitter.on('pouchange', async function poufunc(actChannel, type) {
                    if (channelName == actChannel) {
                        let cbparam = await lds.Send("pouq" + "/" + type);
                        common_1.Common.myEmitter.emit("poulist", cbparam);
                    }
                });
                common_1.Common.myEmitter.on('pounamechange', async function pounamefunc(actChannel, name) {
                    if (channelName == actChannel) {
                        let cbparam = await lds.Send("pnaq" + "/" + name);
                        common_1.Common.myEmitter.emit("pounamelist", cbparam);
                    }
                });
                common_1.Common.myEmitter.on('change', async function changefunc(actChannel, type, id, value) {
                    if (channelName == actChannel) {
                        if (type == "in") {
                            let inList = await lds.Send("inlq" + "/" + "chg" + "/" + id + "/" + value);
                            common_1.Common.myEmitter.emit("inlist", inList);
                        }
                        else if (type == "out") {
                            let outList = await lds.Send("oulq" + "/" + "chg" + "/" + id + "/" + value);
                            common_1.Common.myEmitter.emit("outlist", outList);
                        }
                        else if (type == "inout") {
                            let inoutList = await lds.Send("iolq" + "/" + "chg" + "/" + id + "/" + value);
                            common_1.Common.myEmitter.emit("inoutlist", inoutList);
                        }
                        else if (type == "local") {
                            let localList = await lds.Send("lolq" + "/" + "chg" + "/" + id + "/" + value);
                            common_1.Common.myEmitter.emit("locallist", localList);
                        }
                    }
                });
                common_1.Common.myEmitter.on('onload', async function (parm) {
                    let strs = parm;
                    console.log("load:" + strs);
                });
                /** ShortcutKey bengin*/
                common_1.Common.myEmitter.on("sk-blockinsertup", async () => {
                    let cbparam = await lds.Send('istq/blockup');
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-block", async () => {
                    let cbparam = await lds.Send('istq/block');
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-ld", async () => {
                    let cbparam = await lds.Send('istq/ld');
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-ldn", async () => {
                    let cbparam = await lds.Send("istq/ldn");
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-orbove", async () => {
                    let cbparam = await lds.Send("istq/orabove");
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-or", async () => {
                    let cbparam = await lds.Send("istq/or");
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-orn", async () => {
                    let cbparam = await lds.Send("istq/orn");
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-ldr", async () => {
                    let cbparam = await lds.Send("istq/ldr");
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-coil", async () => {
                    let cbparam = await lds.Send("istq/coil");
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-coils", async () => {
                    let cbparam = await lds.Send("istq/coils");
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-coilr", async () => {
                    let cbparam = await lds.Send("istq/coilr");
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-fb", async () => {
                    vscode.commands.executeCommand('plcc.OpenFBList');
                });
                common_1.Common.myEmitter.on("sk-newbranch", async () => {
                    let cbparam = await lds.Send("istq/newbranch");
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-branchup", async () => {
                    let cbparam = await lds.Send("istq/branchup");
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-branchdown", async () => {
                    let cbparam = await lds.Send("istq/branchdown");
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                common_1.Common.myEmitter.on("sk-delete", async () => {
                    let cbparam = await lds.Send("delq");
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                /** ShortcutKey end*/
                webviewPanel.webview.html = LadderView.getWebviewContent(toolbarContainer_1.toolbarsvg.GenerateSVG(), BlockArrowContainer_1.blockarrowsvg.GenerateSVG());
                var cbparam;
                var curblockpos;
                webviewPanel.webview.onDidReceiveMessage(async (message) => {
                    switch (message.command) {
                        case 'block':
                            cbparam = await lds.Send('istq/block');
                            break;
                        case 'blockinsertup':
                            cbparam = await lds.Send('istq/blockup');
                            break;
                        case 'blockup':
                            cbparam = await lds.Send("mvbq" + "/" + "above");
                            break;
                        case 'blockdown':
                            cbparam = await lds.Send("mvbq" + "/" + "below");
                            break;
                        case 'ld':
                            cbparam = await lds.Send('istq/ld');
                            break;
                        case 'ldn':
                            cbparam = await lds.Send("istq/ldn");
                            break;
                        case 'coils':
                            cbparam = await lds.Send("istq/coils");
                            break;
                        case 'coilr':
                            cbparam = await lds.Send("istq/coilr");
                            break;
                        case 'coil':
                            cbparam = await lds.Send("istq/coil");
                            break;
                        case 'orabove':
                            cbparam = await lds.Send("istq/orabove");
                            break;
                        case 'or':
                            cbparam = await lds.Send("istq/or");
                            break;
                        case 'orn':
                            cbparam = await lds.Send("istq/orn");
                            break;
                        case 'ldr':
                            cbparam = await lds.Send("istq/ldr");
                            break;
                        case 'fb':
                            vscode.commands.executeCommand('plcc.OpenFBList');
                            break;
                        case 'newbranch':
                            cbparam = await lds.Send("istq/newbranch");
                            break;
                        case 'branchdown':
                            cbparam = await lds.Send("istq/branchdown");
                            break;
                        case 'branchup':
                            cbparam = await lds.Send("istq/branchup");
                            break;
                        case 'resize':
                            cbparam = await lds.Send("resize" + "/" + message.width + "/" + message.height);
                            break;
                        case "selectinput":
                            cbparam = await lds.Send("selectinput" + "/" + message.inputId + "/" + message.inputValue);
                            break;
                        case "selectitem":
                            cbparam = await lds.Send("selectitem" + "/" + message.X + "/" + message.Y);
                            break;
                        case 'mousemove':
                            cbparam = await lds.Send("mousemove" + "/" + message.X + "/" + message.Y);
                            break;
                        case 'delete':
                            cbparam = await lds.Send("delq");
                            break;
                        case 'edit':
                            cbparam = await lds.Send("edtq" + "/" + message.inputId + "/" + message.inputValue);
                            break;
                    }
                    curblockpos = await lds.Send("gbpq");
                    webviewPanel.webview.postMessage({ type: "curblockpos", item: curblockpos });
                    webviewPanel.webview.postMessage({ type: "ladder", item: svg.GetStr(JSON.parse(String(cbparam))) });
                });
                webviewPanel.onDidDispose(async () => {
                    console.log("Ladder windows disposed.");
                    await lds.Send("destroywin");
                    lds.Close();
                });
                webviewPanel.onDidChangeViewState(() => {
                    if (webviewPanel.active == true) {
                        const f = async function refresh() {
                            let inList = await lds.Send("inlq" + "/" + "dsp" + "/" + "all");
                            common_1.Common.myEmitter.emit("inlist", inList);
                            let outList = await lds.Send("oulq" + "/" + "dsp" + "/" + "all");
                            common_1.Common.myEmitter.emit("outlist", outList);
                            let inoutList = await lds.Send("iolq" + "/" + "dsp" + "/" + "all");
                            common_1.Common.myEmitter.emit("inoutlist", inoutList);
                            let localList = await lds.Send("lolq" + "/" + "dsp" + "/" + "all");
                            common_1.Common.myEmitter.emit("locallist", localList);
                            let poutype = await lds.Send("pouq" + "/" + "default");
                            common_1.Common.myEmitter.emit("poulist", poutype);
                            let pouname = await lds.Send("pnaq" + "/" + "default");
                            common_1.Common.myEmitter.emit("pounamelist", pouname);
                        }();
                        common_1.Common.myEmitter.emit("actChannel", channelName);
                    }
                });
                webviewPanel.webview.html = LadderView.getWebviewContent(toolbarContainer_1.toolbarsvg.GenerateSVG(), BlockArrowContainer_1.blockarrowsvg.GenerateSVG());
            }
        };
        f();
    }
    static register(context) {
        return vscode.window.registerCustomEditorProvider(LadderCustomEditorProvider.viewType, new LadderCustomEditorProvider(context), {
            webviewOptions: {
                retainContextWhenHidden: true,
            },
            supportsMultipleEditorsPerDocument: false,
        });
    }
}
exports.LadderCustomEditorProvider = LadderCustomEditorProvider;
LadderCustomEditorProvider.viewType = 'LadderEditor';
//# sourceMappingURL=LadderCustomEditor.js.map