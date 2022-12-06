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
exports.flash = exports.compile = void 0;
const vscode = __importStar(require("vscode"));
const common_1 = require("./common");
const wsclient_1 = require("./wsclient");
const fss = __importStar(require("fs"));
const i18n_1 = __importDefault(require("./i18n"));
const promiseWithTimeout = (timeoutMs, promise, failureMessage, message, cb) => {
    let timeoutHandle = undefined;
    const timeoutPromise = new Promise((resolve, reject) => {
        const realTimeout = () => {
            if (timeoutHandle)
                clearTimeout(timeoutHandle);
            if (common_1.Common.preBeat !== common_1.Common.heartBeat) {
                common_1.Common.preBeat = common_1.Common.heartBeat;
                timeoutHandle = setTimeout(realTimeout, timeoutMs);
            }
            else {
                if (cb != undefined) {
                    cb();
                }
                reject(failureMessage);
            }
        };
        timeoutHandle = setTimeout(realTimeout, timeoutMs);
    });
    return Promise.race([
        promise(message),
        timeoutPromise,
    ]).then((result) => {
        if (cb != undefined) {
            cb();
        }
        vscode.window.showInformationMessage(result);
        if (timeoutHandle != undefined)
            clearTimeout(timeoutHandle);
        return result;
    }, (result) => {
        if (cb != undefined) {
            cb();
        }
        vscode.window.showErrorMessage(result);
    });
};
async function compile(cfg, target, libs) {
    if (common_1.Common.runningCmd != "") {
        vscode.window.showErrorMessage(i18n_1.default.__("Failed to start compile, Please make sure the log/monitor have been stopped."));
        return;
    }
    common_1.Common.runningCmd = "compile";
    let doCompile = () => {
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: i18n_1.default.__("Compiling the Project..."),
            cancellable: true,
        }, async (progress, token) => {
            token.onCancellationRequested(() => {
                common_1.Common.runningCmd = "";
                wsclient_1.cmp.Close();
            });
            var targets = 4;
            var recv;
            return promiseWithTimeout(120000, (msg) => {
                return new Promise(async (resolve, reject) => {
                    common_1.Common.heartBeat = common_1.Common.heartBeat + 1;
                    if (vscode.workspace.workspaceFolders) {
                        console.log(vscode.workspace.workspaceFolders[0].uri.fsPath);
                        recv = await wsclient_1.cmp.Send("ullq" + vscode.workspace.workspaceFolders[0].uri.fsPath);
                        if (String(recv).substring(0, 4) === 'ullr') {
                            progress.report({ increment: 10 });
                            try {
                                await fss.statSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/master.dcf");
                                recv = await wsclient_1.cmp.Send("encqmaster.dcf");
                            }
                            catch (e) {
                                recv = "skip";
                            }
                        }
                        else {
                            vscode.window.showErrorMessage(i18n_1.default.__(String(recv).substring(4)));
                            reject(i18n_1.default.__(String(recv).substring(4)));
                        }
                        if (String(recv).substring(0, 4) === 'encr' || String(recv).substring(0, 4) === 'skip') {
                            progress.report({ increment: 10 });
                            try {
                                await fss.statSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/master.eni");
                                recv = await wsclient_1.cmp.Send("encqmaster.eni");
                            }
                            catch (e) {
                                recv = "skip";
                            }
                        }
                        else {
                            vscode.window.showErrorMessage(i18n_1.default.__(String(recv).substring(4)));
                            reject(i18n_1.default.__(String(recv).substring(4)));
                        }
                        if (String(recv).substring(0, 4) === 'encr' || String(recv).substring(0, 4) === 'skip') {
                            progress.report({ increment: 10 });
                            try {
                                await fss.statSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/IODevice.yaml");
                                recv = await wsclient_1.cmp.Send("encqIODevice.yaml");
                            }
                            catch (e) {
                                recv = "skip";
                            }
                        }
                        else {
                            vscode.window.showErrorMessage(i18n_1.default.__(String(recv).substring(4)));
                            reject(i18n_1.default.__(String(recv).substring(4)));
                        }
                        if (String(recv).substring(0, 4) === 'encr' || String(recv).substring(0, 4) === 'skip') {
                            progress.report({ increment: 10 });
                            recv = await wsclient_1.cmp.Send("cplq");
                        }
                        else {
                            vscode.window.showErrorMessage(i18n_1.default.__(String(recv).substring(4)));
                            reject(i18n_1.default.__(String(recv).substring(4)));
                        }
                        if (String(recv).substring(0, 4) === 'cplr') {
                            common_1.Common.EmitOutput([String(recv).substring(4)]);
                            progress.report({ increment: 10 });
                            recv = await wsclient_1.ls.Send("chdq" + common_1.Common.tmpPath);
                        }
                        else {
                            common_1.Common.EmitOutput([i18n_1.default.__(String(recv).substring(4))]);
                            reject(i18n_1.default.__("Failed to compile the project"));
                        }
                        recv = await wsclient_1.cmp.Send("lnkq" + target);
                        for (;;) {
                            if (String(recv).substring(0, 4) === 'lnkf') {
                                --targets;
                                if (targets <= 0) {
                                    progress.report({ increment: 15 });
                                    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0]) {
                                        fss.copyFile(common_1.Common.tmpPath + '/vars-plccos-r8.yaml', vscode.workspace.workspaceFolders[0].uri.fsPath + '/vars.yaml', (err) => {
                                            if (err) {
                                                console.log('Yaml file not been updated.');
                                            }
                                            else {
                                                console.log('Yaml file had been updated.');
                                            }
                                        });
                                    }
                                    common_1.Common.runningCmd = "";
                                    resolve(msg);
                                }
                                else {
                                    progress.report({ increment: 15 });
                                }
                            }
                            else if (String(recv).substring(0, 4) === 'lnkr') {
                            }
                            else {
                                reject(String(recv).substring(0, 4));
                            }
                            recv = await wsclient_1.cmp.wait();
                        }
                    }
                });
            }, i18n_1.default.__("Compile failed!"), i18n_1.default.__("Compile complete!"), () => {
                common_1.Common.runningCmd = "";
            });
        });
    };
    let res = await common_1.Common.authentication(wsclient_1.cmp, doCompile, false);
    if (!res) {
        common_1.Common.runningCmd = "";
    }
}
exports.compile = compile;
function flash(target) {
    if (common_1.Common.runningCmd == "") {
        common_1.Common.runningCmd = "flsq";
        process.chdir(common_1.Common.tmpPath);
        var file = "";
        if (target === "r8") {
            file = "a-plccos-r8.out";
        }
        else if (target === "imxrt1052evk") {
            file = "a-plccos.out";
        }
        else {
            vscode.window.showErrorMessage(i18n_1.default.__("Invalid target."));
            return;
        }
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "PLC being programmed...",
            cancellable: true,
        }, (progress, token) => {
            token.onCancellationRequested(() => {
                common_1.Common.runningCmd = "";
            });
            return promiseWithTimeout(120000, (msg) => {
                return new Promise(async (resolve, reject) => {
                    let param = await wsclient_1.fs.Send('dllq' + common_1.Common.tmpPath + "/" + file);
                    if (common_1.Common.runningCmd == "flsq")
                        common_1.Common.runningCmd = "";
                    if (param == 'ok') {
                        resolve(i18n_1.default.__("PLC upgraded complete!"));
                    }
                    else {
                        resolve(i18n_1.default.__("PLC upgraded failed! Please confirm that the monitoring and logging have been stopped."));
                    }
                });
            }, i18n_1.default.__("PLC upgraded failed!"), i18n_1.default.__("PLC upgraded complete!"), () => {
                if (common_1.Common.runningCmd == "flsq")
                    common_1.Common.runningCmd = "";
            });
        });
    }
    else {
        vscode.window.showErrorMessage(i18n_1.default.__("Failed to program, please make sure monitor and logging have been stopped."));
    }
}
exports.flash = flash;
//# sourceMappingURL=builder.js.map