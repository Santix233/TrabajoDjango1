"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmp = exports.lls = exports.fbs = exports.fs = exports.ws = exports.ls = exports.mon = exports.ladderService = exports.FBService = exports.cmpConnect = exports.llsConnect = exports.monConnect = exports.fbsConnect = exports.fsConnect = exports.lsConnect = exports.wsConnect = exports.lsService = void 0;
const common_1 = require("./common");
const configurations_1 = require("./configurations");
const ws_1 = require("ws");
class wsService {
    constructor() {
        this.isOpen = false;
        this.timeout = undefined;
    }
    Connect() {
        if (this.timeout)
            clearTimeout(this.timeout);
        this.ws = new ws_1.WebSocket(common_1.Common.wsPath + '/ws');
        console.log("ws " + ': Connecting ws channel!!');
        this.ws.onopen = () => {
            this.isOpen = true;
            console.log("ws " + ': WebSocket Link to success!!');
        };
        this.ws.onclose = () => {
            this.isOpen = false;
            if (this.timeout)
                clearTimeout(this.timeout);
            this.timeout = setTimeout(() => { this.Connect(); }, 1000);
        };
        this.ws.onerror = (error) => {
            console.log("ws error: " + error.message);
            this.ws.close();
        };
    }
    wait() {
        return new Promise((resolve) => {
            this.ws.onmessage = (param) => {
                resolve(param.data);
            };
        });
    }
    ;
    async Send(path) {
        if (this.isOpen) {
            await this.ws.send(path);
            return this.wait();
        }
    }
}
class lsService {
    constructor() {
        this.isOpen = false;
        this.timeout = undefined;
    }
    wait() {
        return new Promise((resolve) => {
            this.ws.onmessage = (param) => {
                resolve(param.data);
            };
        });
    }
    ;
    Connect(cb) {
        if (this.timeout)
            clearTimeout(this.timeout);
        console.log(common_1.Common.wsPath + '/compile-service');
        if (configurations_1.getcon.getTestingMode()) {
            this.ws = new ws_1.WebSocket("ws://127.0.0.1:5000" + '/compile-service');
        }
        else {
            this.ws = new ws_1.WebSocket(configurations_1.getcon.getHelperAddress() + ':' + common_1.Common.port + '/compile-service');
        }
        console.log("lls " + ': Connecting compile channel!!');
        this.ws.onopen = () => {
            if (common_1.Common.runningCmd == "compile")
                common_1.Common.runningCmd = "";
            this.isOpen = true;
            console.log("lls " + ': WebSocket Link to success!!');
            cb();
        };
        this.ws.onclose = () => {
            this.isOpen = false;
            if (this.timeout)
                clearTimeout(this.timeout);
            this.timeout = setTimeout(() => { this.Connect(cb); }, 1000);
        };
        this.ws.onerror = (error) => {
            console.log("lls error: " + error.message);
            this.ws.close();
        };
    }
    Close() {
        this.ws.close();
    }
    async Send(path) {
        if (this.isOpen) {
            await this.ws.send(path);
            return this.wait();
        }
    }
}
exports.lsService = lsService;
class localService {
    constructor() {
        this.isOpen = false;
        this.timeout = undefined;
    }
    Connect() {
        if (this.timeout)
            clearTimeout(this.timeout);
        this.ls = new ws_1.WebSocket(common_1.Common.wsPath + '/local-service');
        this.ls.onopen = () => {
            this.isOpen = true;
            console.log('local-service' + ': WebSocket Link to success!!');
        };
        this.ls.onclose = () => {
            this.isOpen = false;
            if (this.timeout)
                clearTimeout(this.timeout);
            this.timeout = setTimeout(() => { this.Connect(); }, 1000);
        };
        this.ls.onerror = () => {
            console.log("local error");
            this.ls.close();
        };
    }
    wait() {
        return new Promise((resolve) => {
            this.ls.onmessage = (param) => {
                resolve(param.data);
            };
        });
    }
    ;
    async Send(path) {
        if (this.isOpen) {
            await this.ls.send(path);
            return this.wait();
        }
    }
}
class flashService {
    constructor() {
        this.isOpen = false;
        this.timeout = undefined;
    }
    Connect() {
        if (this.timeout)
            clearTimeout(this.timeout);
        console.log('Connecting to downloader');
        this.fs = new ws_1.WebSocket(common_1.Common.wsPath + '/downloader');
        this.fs.onopen = () => {
            this.isOpen = true;
            console.log('downloader' + ': WebSocket Link to success!!');
        };
        this.fs.onclose = () => {
            this.isOpen = false;
            if (this.timeout)
                clearTimeout(this.timeout);
            this.timeout = setTimeout(() => { this.Connect(); }, 1000);
        };
        this.fs.onerror = () => {
            console.log("local error");
            this.fs.close();
        };
    }
    wait() {
        return new Promise((resolve) => {
            this.fs.onmessage = (param) => {
                let str = String(param.data);
                if (str.substring(0, 4) === "dllr") {
                    resolve(str.substring(4));
                }
            };
        });
    }
    ;
    async Send(path) {
        if (this.isOpen) {
            await this.fs.send(path);
            return this.wait();
        }
    }
}
class monitorService {
    constructor() {
        this.isOpen = false;
        this.timeout = undefined;
    }
    Connect() {
        if (this.timeout)
            clearTimeout(this.timeout);
        console.log('Connecting to monitor');
        this.fs = new ws_1.WebSocket(common_1.Common.wsPath + '/monitor');
        this.fs.onopen = () => {
            this.isOpen = true;
            console.log('monitor' + ': WebSocket Link to success!!');
        };
        this.fs.onclose = () => {
            this.isOpen = false;
            if (this.timeout)
                clearTimeout(this.timeout);
            this.timeout = setTimeout(() => { this.Connect(); }, 1000);
        };
        this.fs.onerror = () => {
            console.log("local error");
            this.fs.close();
        };
    }
    wait() {
        return new Promise((resolve, reject) => {
            this.fs.onmessage = (param) => {
                let str = String(param.data);
                switch (str.substring(0, 4)) {
                    case "gtsr":
                        var data = JSON.parse(str.substring(4));
                        resolve(data);
                        break;
                    case "stpr":
                    case "strr":
                    case "monr":
                    case "cksr":
                    case "lgsr":
                    case "lgdr":
                    case "lger":
                        resolve(str.substring(4));
                        break;
                }
                resolve(undefined);
            };
        });
    }
    ;
    async Send(path) {
        if (this.isOpen) {
            await this.fs.send(path);
            return this.wait();
        }
    }
}
class ladderService {
    constructor(path) {
        this.isOpen = false;
        this.path = "";
        this.path = path;
    }
    Connect() {
        this.lds = new ws_1.WebSocket(common_1.Common.wsPath + this.path);
        this.lds.onopen = () => {
            this.isOpen = true;
            console.log("ladder" + ':WebSocket Link to success!!');
        };
        this.lds.onclose = () => {
            this.isOpen = false;
        };
        this.lds.onerror = (error) => {
            console.log("ladderService Error: " + error.data);
            this.lds.close();
        };
    }
    Close() {
        this.lds.close();
    }
    wait() {
        return new Promise((resolve) => {
            this.lds.onmessage = (param) => {
                let str = String(param.data).substring(0, 4);
                if (str == "dspr") {
                    resolve(String(param.data).substring(4));
                }
                else if (str == "inlr") {
                    resolve(String(param.data).substring(4));
                }
                else if (str == "oulr") {
                    resolve(String(param.data).substring(4));
                }
                else if (str == "iolr") {
                    resolve(String(param.data).substring(4));
                }
                else if (str == "lolr") {
                    resolve(String(param.data).substring(4));
                }
                else if (str == "pour") {
                    resolve(String(param.data).substring(4));
                }
                else if (str == "pnar") {
                    resolve(String(param.data).substring(4));
                }
                else if (str == "gbpr") {
                    resolve(String(param.data).substring(4));
                }
                else if (str == "eofr") {
                    return;
                }
            };
        });
    }
    ;
    async Send(path) {
        if (this.isOpen) {
            await this.lds.send(path);
            return this.wait();
        }
    }
}
exports.ladderService = ladderService;
class FBService {
    constructor() {
        this.isOpen = false;
        this.path = "";
        this.timeout = undefined;
        this.path = "/fblist";
    }
    Connect(cb) {
        if (this.timeout)
            clearTimeout(this.timeout);
        this.fbs = new ws_1.WebSocket(common_1.Common.wsPath + this.path);
        this.fbs.onopen = () => {
            this.isOpen = true;
            console.log('FB' + ':WebSocket Link to success!!');
            cb();
        };
        this.fbs.onclose = () => {
            console.log("FBService closed!");
            this.isOpen = false;
            if (this.timeout)
                clearTimeout(this.timeout);
            this.timeout = setTimeout(() => { this.Connect(cb); }, 1000);
        };
        this.fbs.onerror = (error) => {
            console.log("FBService Error" + error);
            this.fbs.close();
        };
    }
    Close() {
        this.fbs.close();
    }
    wait() {
        return new Promise((resolve) => {
            this.fbs.onmessage = (param) => {
                let str = String(param.data).substring(0, 4);
                if (String(param.data) == 'destroywin') {
                    this.fbs.close();
                }
                else if (str == "fblr") {
                    resolve(String(param.data).substring(4));
                }
                else if (str == "thbr") {
                    resolve(String(param.data).substring(4));
                }
                else if (str == "docr") {
                    resolve(String(param.data).substring(4));
                }
                else if (str == "eofr") {
                    return;
                }
            };
        });
    }
    ;
    async Send(path) {
        if (this.isOpen) {
            await this.fbs.send(path);
            return this.wait();
        }
    }
}
exports.FBService = FBService;
var ws = new wsService();
exports.ws = ws;
var ls = new localService();
exports.ls = ls;
var fs = new flashService();
exports.fs = fs;
var mon = new monitorService();
exports.mon = mon;
var fbs = new FBService();
exports.fbs = fbs;
var lls = new lsService();
exports.lls = lls;
var cmp = new lsService();
exports.cmp = cmp;
function wsConnect() {
    ws.Connect();
}
exports.wsConnect = wsConnect;
function lsConnect() {
    ls.Connect();
}
exports.lsConnect = lsConnect;
function fsConnect() {
    fs.Connect();
}
exports.fsConnect = fsConnect;
function monConnect() {
    mon.Connect();
}
exports.monConnect = monConnect;
function llsConnect(cb) {
    lls.Connect(cb);
}
exports.llsConnect = llsConnect;
function cmpConnect(cb) {
    cmp.Connect(cb);
}
exports.cmpConnect = cmpConnect;
function fbsConnect(cb) {
    fbs.Connect(cb);
}
exports.fbsConnect = fbsConnect;
//# sourceMappingURL=wsclient.js.map