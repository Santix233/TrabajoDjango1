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
exports.killAll = exports.updateHelper = void 0;
const vscode = __importStar(require("vscode"));
const cp = __importStar(require("child_process"));
const common_1 = require("./common");
const wsclient_1 = require("./wsclient");
const configurations_1 = require("./configurations");
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const https = __importStar(require("https"));
const i18n_1 = __importDefault(require("./i18n"));
const md5File = __importStar(require("md5-file"));
const zlib = __importStar(require("zlib"));
var background;
const version = "r68";
function updateHelper() {
    return new Promise((resolve, reject) => {
        if (os.platform() === "darwin") {
            common_1.Common.executableHelper = "plcc-helper-darwin";
            common_1.Common.executableTools = "plcc-tools-darwin";
            common_1.Common.binPath = os.homedir() + "/.plcc-helper";
            common_1.Common.tmpPath = os.tmpdir();
        }
        else if (os.platform() === "linux") {
            common_1.Common.executableHelper = "plcc-helper-linux";
            common_1.Common.executableTools = "plcc-tools-linux";
            common_1.Common.binPath = os.homedir() + "/.plcc-helper";
            common_1.Common.tmpPath = os.tmpdir();
        }
        else if (os.platform() === "win32") {
            common_1.Common.executableHelper = "plcc-helper-windows.exe";
            common_1.Common.executableTools = "plcc-tools-windows.exe";
            common_1.Common.binPath = os.homedir() + "\\Temp";
            common_1.Common.tmpPath = os.homedir() + "\\Temp";
        }
        fs.mkdir(common_1.Common.binPath, (err) => {
            if (err && err.code !== "EEXIST") {
                throw err;
            }
            return vscode.window.withProgress({
                location: vscode.ProgressLocation.Window,
                title: "Launching PLCC IEC61131-3 extension..."
            }, async (progress) => {
                https.get(configurations_1.getcon.getDownloadAddress() + "/version", { headers: { "X-Plcc-Extension-Key": "5c3f31dba0cd26f6bc8bc5c0b1cb9538aced4dcda93a2e576b80d7118d071be4" } }, (res) => {
                    res.on('data', async (d) => {
                        let sums = String(d).split('\n');
                        for (var i = 0; i < sums.length; i++) {
                            if (sums[i].substring(40) == common_1.Common.executableHelper) {
                                console.log("T1: Checking", common_1.Common.executableHelper, "with md5sum", sums[i].substring(0, 32));
                                console.log("T1: File exists", fs.existsSync(common_1.Common.binPath + "/" + common_1.Common.executableHelper));
                                if (fs.existsSync(common_1.Common.binPath + "/" + common_1.Common.executableHelper)
                                    && fs.statSync(common_1.Common.binPath + "/" + common_1.Common.executableHelper).isFile()
                                    && md5File.sync(common_1.Common.binPath + "/" + common_1.Common.executableHelper) === sums[i].substring(0, 32)) {
                                    console.log("T1: File is up to date");
                                    executeHelper();
                                    resolve();
                                }
                                else {
                                    console.log("T1: File needs to be updated");
                                    let updating = () => {
                                        return vscode.window.withProgress({
                                            location: vscode.ProgressLocation.Notification,
                                            title: "A new version of the helper is detected, updating..."
                                        }, () => {
                                            var timeout = undefined;
                                            return new Promise((resolve, reject) => {
                                                if (timeout)
                                                    clearTimeout(timeout);
                                                const file = fs.createWriteStream(common_1.Common.binPath + "/" + common_1.Common.executableHelper);
                                                const gunzip = zlib.createGunzip();
                                                const request1 = https.get(configurations_1.getcon.getDownloadAddress() + "/" + common_1.Common.executableHelper + ".gz", {
                                                    headers: { "X-Plcc-Extension-Key": "5c3f31dba0cd26f6bc8bc5c0b1cb9538aced4dcda93a2e576b80d7118d071be4" }
                                                }, function (response) {
                                                    file.on('finish', function () {
                                                        file.close();
                                                        vscode.window.showInformationMessage("Helper updated successfully!, please reload the window.", i18n_1.default.__("Reload")).then((value) => {
                                                            if (value == i18n_1.default.__("Reload")) {
                                                                vscode.commands.executeCommand("workbench.action.reloadWindow");
                                                            }
                                                        });
                                                        setTimeout(() => {
                                                            executeHelper();
                                                            resolve({});
                                                        }, 2000);
                                                        resolve({});
                                                    });
                                                    response.pipe(gunzip).pipe(file);
                                                }).on('error', (e) => {
                                                    vscode.window.showErrorMessage("Failed to download the helper, please try again later.");
                                                    console.log("Error:", e);
                                                    reject();
                                                });
                                            });
                                        });
                                    };
                                    await updating();
                                    executeHelper();
                                    resolve();
                                }
                            }
                        }
                    });
                });
            });
        });
    });
}
exports.updateHelper = updateHelper;
function executeHelper() {
    fs.chmod(common_1.Common.binPath + "/" + common_1.Common.executableHelper, 0o755, (err) => {
        if (err) {
            console.log('error: ' + err);
        }
        else {
            var args = ["-port", common_1.Common.port, "-compile-server", configurations_1.getcon.getCompileAddress()];
            var repos = String(configurations_1.getcon.getRepositoryAddresses()).split(',');
            for (var i = 0; i < repos.length; i++) {
                args.push("-repo");
                args.push(repos[i]);
            }
            if (background)
                background.kill('SIGTERM');
            background = cp.execFile(common_1.Common.binPath + "/" + common_1.Common.executableHelper, args, (err, stdout, stderr) => {
            });
        }
    });
    if (configurations_1.getcon.getTestingMode()) {
        common_1.Common.wsPath = 'ws://127.0.0.1:5000';
    }
    else {
        common_1.Common.wsPath = configurations_1.getcon.getHelperAddress() + ":" + common_1.Common.port;
    }
    wsclient_1.wsConnect();
    wsclient_1.lsConnect();
    wsclient_1.fsConnect();
    wsclient_1.monConnect();
}
function killAll() {
    if (background) {
        background.kill('SIGTERM');
    }
}
exports.killAll = killAll;
//# sourceMappingURL=helper.js.map