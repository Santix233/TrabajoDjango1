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
exports.MappingCustomEditorProvider = void 0;
const vscode = __importStar(require("vscode"));
const mappingView = __importStar(require("./mappingView"));
const yaml = __importStar(require("yaml"));
const fss = __importStar(require("fs"));
class MappingDocument {
    constructor(uri) {
        this.uri = uri;
    }
    dispose() {
        return;
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
class MappingCustomEditorProvider {
    constructor() {
        this._onDidChangeCustomDocument = new vscode.EventEmitter();
        this.onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;
    }
    saveCustomDocument(document, cancellation) {
        fss.writeFileSync(document.uri.fsPath, yaml.stringify(document.obj));
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
        const document = new MappingDocument(uri);
        let data = fss.readFileSync(uri.fsPath);
        let obj = yaml.parse(data.toString());
        document.obj = obj;
        return document;
    }
    resolveCustomEditor(document, webviewPanel, token) {
        webviewPanel.webview.options = {
            enableScripts: true,
        };
        webviewPanel.webview.onDidReceiveMessage((e) => {
            document.obj = e;
            this.saveCustomDocument(document, token);
        });
        webviewPanel.webview.html = mappingView.getWebviewContent();
        webviewPanel.webview.postMessage(document.obj);
    }
    static register() {
        return vscode.window.registerCustomEditorProvider(MappingCustomEditorProvider.viewType, new MappingCustomEditorProvider(), {
            webviewOptions: {
                retainContextWhenHidden: true,
            },
            supportsMultipleEditorsPerDocument: false,
        });
    }
}
exports.MappingCustomEditorProvider = MappingCustomEditorProvider;
MappingCustomEditorProvider.viewType = 'MappingEditor';
//# sourceMappingURL=MappingEditor.js.map