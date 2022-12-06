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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const Helper = __importStar(require("./helper"));
const Builder = __importStar(require("./builder"));
const Outline = __importStar(require("./outline"));
const LadderCustomEditor_1 = require("./LadderCustomEditor");
const MonitorCustomEditor_1 = require("./MonitorCustomEditor");
const MappingEditor_1 = require("./MappingEditor");
const wsclient_1 = require("./wsclient");
const ws_1 = require("ws");
const fs = __importStar(require("fs"));
const process_1 = __importDefault(require("process"));
const node_1 = require("vscode-languageclient/node");
const common_1 = require("./common");
const configurations_1 = require("./configurations");
const FBListEditor_1 = require("./FBListEditor");
const LadderConfigEditor_1 = require("./LadderConfigEditor");
const i18n_1 = __importStar(require("./i18n"));
const timers_1 = require("timers");
const get_port_1 = __importDefault(require("get-port"));
const path = __importStar(require("path"));
var websocket;
var webviewPanel = undefined;
function copyFileSync(source, target) {
    var targetFile = target;
    // If target is a directory, a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}
function copyFolderRecursiveSync(source, target) {
    var files = [];
    // Check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }
    // Copy
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        for (let file of files) {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            }
            else {
                copyFileSync(curSource, targetFolder);
            }
        }
    }
}
async function activate(context) {
    i18n_1.i18nConfiguration(context);
    i18n_1.default.setLocale('en');
    common_1.Common.port = await get_port_1.default({ host: '127.0.0.1', port: 60000 });
    console.log("Start connections");
    common_1.Common.initStorage(context);
    process_1.default.on('SIGINT', () => {
        deactivate();
    });
    process_1.default.on('SIGTERM', () => {
        deactivate();
    });
    var timeout = 0;
    vscode.workspace.onDidChangeConfiguration(() => {
        timeout = 4;
    });
    /*shortcut key begin*/
    vscode.commands.registerCommand("plcc.blockinsertup", () => {
        common_1.Common.myEmitter.emit("sk-blockinsertup");
    });
    vscode.commands.registerCommand("plcc.block", () => {
        common_1.Common.myEmitter.emit("sk-block");
    });
    vscode.commands.registerCommand("plcc.ld", () => {
        common_1.Common.myEmitter.emit('sk-ld');
    });
    vscode.commands.registerCommand("plcc.ldn", () => {
        common_1.Common.myEmitter.emit("sk-ldn");
    });
    vscode.commands.registerCommand("plcc.orbove", () => {
        common_1.Common.myEmitter.emit("sk-orbove");
    });
    vscode.commands.registerCommand("plcc.or", () => {
        common_1.Common.myEmitter.emit("sk-or");
    });
    vscode.commands.registerCommand("plcc.orn", () => {
        common_1.Common.myEmitter.emit("sk-orn");
    });
    vscode.commands.registerCommand("plcc.ldr", () => {
        common_1.Common.myEmitter.emit("sk-ldr");
    });
    vscode.commands.registerCommand("plcc.coil", () => {
        common_1.Common.myEmitter.emit("sk-coil");
    });
    vscode.commands.registerCommand("plcc.coils", () => {
        common_1.Common.myEmitter.emit("sk-coils");
    });
    vscode.commands.registerCommand("plcc.coilr", () => {
        common_1.Common.myEmitter.emit("sk-coilr");
    });
    vscode.commands.registerCommand("plcc.fb", () => {
        common_1.Common.myEmitter.emit("sk-fb");
    });
    vscode.commands.registerCommand("plcc.newbranch", () => {
        common_1.Common.myEmitter.emit("sk-newbranch");
    });
    vscode.commands.registerCommand("plcc.branchup", () => {
        common_1.Common.myEmitter.emit("sk-branchup");
    });
    vscode.commands.registerCommand("plcc.branchdown", () => {
        common_1.Common.myEmitter.emit("sk-branchdown");
    });
    vscode.commands.registerCommand("plcc.delete", () => {
        common_1.Common.myEmitter.emit("sk-delete");
    });
    /*shortcut key end*/
    let cmdNewAppProj = vscode.commands.registerCommand('plcc.NewAppProject', () => {
        const options = {
            openLabel: i18n_1.default.__("New App Project"),
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
            title: i18n_1.default.__("New App Project")
        };
        vscode.window.showOpenDialog(options).then(fileUri => {
            if (fileUri) {
                var src = vscode.Uri.file(path.join(context.extensionPath, "Templete/App"));
                copyFolderRecursiveSync(src.fsPath, fileUri[0].fsPath);
                vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.joinPath(fileUri[0], "/App"));
            }
        });
    });
    let cmdNewLibProj = vscode.commands.registerCommand('plcc.NewLibProject', () => {
        const options = {
            openLabel: i18n_1.default.__("New Lib Project"),
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
            title: i18n_1.default.__("New Lib Project")
        };
        vscode.window.showOpenDialog(options).then(fileUri => {
            if (fileUri) {
                var src = vscode.Uri.file(path.join(context.extensionPath, "Templete/Lib"));
                copyFolderRecursiveSync(src.fsPath, fileUri[0].fsPath);
                vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.joinPath(fileUri[0], "/Lib"));
            }
        });
    });
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
        try {
            let data = await fs.readFileSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/project.json");
            let project = JSON.parse(data.toString());
            vscode.commands.executeCommand('setContext', 'plcc:isIEC61131Proj', project.type === "PLCC-IEC61131-3");
        }
        catch (e) {
            return;
        }
    }
    let cmdLogout = vscode.commands.registerCommand('plcc.Logout', () => {
        common_1.Common.sessionId = "";
        vscode.window.showInformationMessage(i18n_1.default.__("You can reload the window"), i18n_1.default.__("Reload")).then(() => {
            vscode.commands.executeCommand("workbench.action.reloadWindow");
        });
    });
    let cmdCplProj = vscode.commands.registerCommand('plcc.CompileProject', async () => {
        let options = {
            prompt: "Configuration: ",
            placeHolder: "(Configuration)"
        };
        if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
            try {
                let data = await fs.readFileSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/project.json");
                let project = JSON.parse(data.toString());
                Builder.compile(project.configuration, project.target, project.libs);
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    vscode.window.showInputBox(options).then(value => {
                        if (!value) {
                            return;
                        }
                        Builder.compile(value, "", []);
                    });
                }
                else {
                    console.log(err);
                }
            }
        }
    });
    let cmdFlash = vscode.commands.registerCommand('plcc.FlashBinary', async () => {
        if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
            try {
                let data = await fs.readFileSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/project.json");
                let project = JSON.parse(data.toString());
                Builder.flash(project.target);
            }
            catch (e) {
                return;
            }
        }
    });
    let output = vscode.window.createOutputChannel("plc-logs");
    var logLoop = undefined;
    let cmdSLog = vscode.commands.registerCommand('plcc.StartLoging', async () => {
        output.show();
        if (common_1.Common.runningCmd == "") {
            common_1.Common.runningCmd = "lgsq";
            let param = await wsclient_1.mon.Send("lgsq");
            let loop = async () => {
                if (param != '') {
                    output.append(param + '\n');
                }
                param = await wsclient_1.mon.wait();
                if (logLoop != undefined)
                    timers_1.clearTimeout(logLoop);
                logLoop = timers_1.setTimeout(loop, 1);
            };
            loop();
        }
        else {
            vscode.window.showErrorMessage(i18n_1.default.__("Failed to start logging, Please make sure the monitor have been stopped."));
        }
    });
    let cmdELog = vscode.commands.registerCommand('plcc.StopLoging', async () => {
        if (logLoop != undefined)
            timers_1.clearTimeout(logLoop);
        wsclient_1.mon.Send("lgeq");
        if (common_1.Common.runningCmd == "lgsq")
            common_1.Common.runningCmd = "";
    });
    let cmdFBList = vscode.commands.registerCommand('plcc.OpenFBList', () => {
        //Jump to the FBList
        vscode.commands.executeCommand('fblistView.focus');
    });
    await Helper.updateHelper();
    Outline.show();
    LadderCustomEditor_1.LadderCustomEditorProvider.register(context);
    MonitorCustomEditor_1.MonitorCustomEditorProvider.register();
    MappingEditor_1.MappingCustomEditorProvider.register();
    FBListEditor_1.FBListViewProvider.register();
    LadderConfigEditor_1.LadderConfigViewProvider.register();
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
        fs.readFile(vscode.workspace.workspaceFolders[0].uri.fsPath + "/project.json", (err, data) => {
            let project = JSON.parse(data);
            if (project.type === "PLCC-IEC61131-3") {
                var timeout = undefined;
                let conn = () => {
                    wsclient_1.llsConnect(async () => {
                        if (timeout)
                            timers_1.clearTimeout(timeout);
                        let doLsp = () => {
                            vscode.window.withProgress({
                                location: vscode.ProgressLocation.Window,
                                title: i18n_1.default.__("Synchronizing with Language Server..."),
                                cancellable: false,
                            }, async (progress, token) => {
                                if (vscode.workspace?.workspaceFolders && vscode.workspace.workspaceFolders[0] != undefined) {
                                    let rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
                                    let fileEvents = vscode.workspace.createFileSystemWatcher(rootPath + '/**/*.*');
                                    fs.watchFile(common_1.Common.tmpPath + '/a-plccos-r8.def', {
                                        bigint: false,
                                        persistent: true,
                                        interval: 4000,
                                    }, (curr, prev) => {
                                        common_1.Common.myEmitter.emit("defchange", common_1.Common.tmpPath + '/a-plccos-r8.def');
                                    });
                                    var timeout = undefined;
                                    let reply = await Promise.race([
                                        new Promise(async (resolve) => {
                                            let reply = await wsclient_1.lls.Send("ullq" + rootPath);
                                            if (String(reply).substring(0, 4) != "ullr")
                                                return;
                                            reply = await wsclient_1.lls.Send("lspq" + "file://" + rootPath);
                                            if (String(reply).substring(0, 4) != "lspr")
                                                return;
                                            if (timeout)
                                                timers_1.clearTimeout(timeout);
                                            resolve(reply);
                                        }),
                                        new Promise((resolve) => {
                                            timeout = timers_1.setTimeout(() => {
                                                wsclient_1.cmp.Close();
                                                wsclient_1.lls.Close();
                                                resolve(undefined);
                                            }, 20000);
                                        })
                                    ]);
                                    if (reply == undefined) {
                                        wsclient_1.cmp.Close();
                                        wsclient_1.lls.Close();
                                        return;
                                    }
                                    fileEvents.onDidCreate((uri) => {
                                        wsclient_1.lls.Send("updq" + uri.fsPath);
                                    });
                                    fileEvents.onDidChange((uri) => {
                                        if (uri.fsPath.endsWith(".graph"))
                                            wsclient_1.lls.Send("updq" + uri.fsPath);
                                    });
                                    var ws;
                                    var ping = undefined;
                                    if (configurations_1.getcon.getTestingMode()) {
                                        let address = String(configurations_1.getcon.getCompileAddress()).split(":");
                                        if (address[1] == "//127.0.0.1") {
                                            ws = new ws_1.WebSocket(address[0] + ":" + address[1] + ":" + String(reply).substring(4));
                                        }
                                        else {
                                            ws = new ws_1.WebSocket(configurations_1.getcon.getCompileAddress() + "/ls/" + String(reply).substring(4));
                                        }
                                    }
                                    else {
                                        ws = new ws_1.WebSocket(configurations_1.getcon.getCompileAddress() + "/ls/" + String(reply).substring(4));
                                    }
                                    ws.onerror = () => {
                                        ws.close();
                                    };
                                    ws.onclose = () => {
                                        vscode.window.showErrorMessage("Connection to the Language Server has lost, please reload the window for better experience.", i18n_1.default.__("Reload")).then((value) => {
                                            if (value == i18n_1.default.__("Reload")) {
                                                vscode.commands.executeCommand("workbench.action.reloadWindow");
                                            }
                                        });
                                        if (ping)
                                            timers_1.clearTimeout(ping);
                                        fileEvents.dispose();
                                        wsclient_1.cmp.Close();
                                        wsclient_1.lls.Close();
                                        return;
                                    };
                                    ws.onopen = () => {
                                        ping = setInterval(async () => {
                                            ws.ping();
                                        }, 10000);
                                        websocket = ws_1.createWebSocketStream(ws);
                                        let serverOptions = () => {
                                            let result = {
                                                writer: websocket,
                                                reader: websocket
                                            };
                                            return Promise.resolve(result);
                                        };
                                        let clientOptions = {
                                            documentSelector: [{ scheme: 'file', language: 'st' }, { scheme: 'file', language: 'json' }],
                                            synchronize: {
                                                fileEvents: vscode.workspace.createFileSystemWatcher('**/*.graph')
                                            },
                                            errorHandler: {
                                                error: (error, message, count) => {
                                                    ws.close();
                                                    return node_1.ErrorAction.Shutdown;
                                                },
                                                closed: () => {
                                                    ws.close();
                                                    return node_1.CloseAction.DoNotRestart;
                                                }
                                            },
                                            revealOutputChannelOn: node_1.RevealOutputChannelOn.Never
                                        };
                                        let client = new node_1.LanguageClient('plcc-language-server', 'PLCC Language Server', serverOptions, clientOptions);
                                        try {
                                            client.start();
                                        }
                                        catch (e) {
                                            ws.close();
                                            return;
                                        }
                                    };
                                }
                            });
                        };
                        common_1.Common.authentication(wsclient_1.lls, doLsp, true);
                    });
                };
                conn();
            }
        });
    }
    wsclient_1.cmpConnect(() => { });
}
exports.activate = activate;
function deactivate() {
    Helper.killAll();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map