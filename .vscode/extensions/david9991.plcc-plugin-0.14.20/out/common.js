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
exports.Common = exports.CommonType = void 0;
const vscode = __importStar(require("vscode"));
const Storage = __importStar(require("./storage"));
const i18n_1 = __importDefault(require("./i18n"));
const events_1 = require("events");
class MyEmitter extends events_1.EventEmitter {
}
class CommonType {
    constructor() {
        this.heartBeat = 0;
        this.preBeat = 0;
        this.tmpPath = "/tmp";
        this.binPath = "~/.plcc-helper";
        this.executableHelper = "";
        this.executableTools = "";
        this.port = 5000;
        this.wsPath = "";
        this.runningCmd = "";
        this.lock = false;
        this.logedin = false;
        this.logingin = false;
        this.myEmitter = new MyEmitter();
    }
    initStorage(context) {
        this.storage = new Storage.LocalStorageService(context.workspaceState);
    }
    EmitOutput(msg) {
        if (!this.term) {
            this.term = vscode.window.createOutputChannel("plcc-plugin");
        }
        this.term.show();
        this.term.clear();
        for (var i = 0; i < msg.length; i++) {
            this.term.append(String(msg[i]).substring(4));
        }
    }
    set sessionId(i) {
        this.storage.setValue("SID", i);
    }
    get sessionId() {
        return this.storage.getValue("SID");
    }
    async authentication(lls, cb, login) {
        if (this.logingin)
            return false;
        this.logingin = true;
        console.log(this.logedin, login);
        if (!this.logedin && !login)
            return false;
        var timeout = undefined;
        let doAuth = (lls, cb, login) => {
            if (timeout)
                clearTimeout(timeout);
            return Promise.race([new Promise(async (resolve, reject) => {
                    if (Common.sessionId != "") {
                        let reply = await lls.Send("sesq" + Common.sessionId);
                        if (String(reply).startsWith("sesrOK")) {
                            resolve(undefined);
                        }
                        else {
                            Common.sessionId = "";
                            reject(i18n_1.default.__("Invalid session, please login again."));
                        }
                    }
                    else if (login) {
                        // vscode.window.showInputBox({ title: "PLCC Login", prompt: "Username", placeHolder: "Test account: David", ignoreFocusOut: true }).then((u) => {
                        // vscode.window.showInputBox({ title: "PLCC Login", prompt: "Password", password: true, placeHolder: "Test password: 1234", ignoreFocusOut: true }).then(async (p) => {
                        let reply = await lls.Send("autq" + "David" + "/" + "1234");
                        if (String(reply).startsWith("autrOK")) {
                            Common.sessionId = String(reply).substring(8);
                            resolve(undefined);
                        }
                        else {
                            Common.sessionId = "";
                            reject(i18n_1.default.__(String(reply).substring(4)));
                        }
                        // });
                        // });
                    }
                    else {
                        reject(i18n_1.default.__("Please login first."));
                    }
                }), new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (timeout)
                            clearTimeout(timeout);
                        resolve("timeout");
                    }, 5000);
                })]);
        };
        return new Promise((resolve, reject) => {
            let delayAuth = async (lls, cb, login) => {
                vscode.window.withProgress({
                    location: vscode.ProgressLocation.Window,
                    title: "Connecting to PLCC Development Cloud...",
                    cancellable: false,
                }, async (progress, token) => {
                    try {
                        for (;;) {
                            let res = await doAuth(lls, cb, login);
                            if (res != "timeout") {
                                break;
                            }
                        }
                        if (timeout)
                            clearTimeout(timeout);
                        this.logingin = false;
                        this.logedin = true;
                        cb();
                        resolve(true);
                    }
                    catch (e) {
                        if (timeout)
                            clearTimeout(timeout);
                        timeout = setTimeout(delayAuth, 1000, lls, cb, true);
                    }
                });
            };
            delayAuth(lls, cb, login);
        });
    }
}
exports.CommonType = CommonType;
var Common = new CommonType();
exports.Common = Common;
//# sourceMappingURL=common.js.map