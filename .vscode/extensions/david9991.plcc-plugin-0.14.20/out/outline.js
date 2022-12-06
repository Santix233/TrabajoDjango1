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
exports.show = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
class NodeDependenciesProvider {
    constructor() { }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element) {
            if (element.label === "Project") {
                return Promise.resolve([new Dependency("POU", vscode.TreeItemCollapsibleState.None)]);
            }
            else {
                return Promise.resolve([]);
            }
        }
        else {
            return Promise.resolve([new Dependency("Project", vscode.TreeItemCollapsibleState.Collapsed)]);
        }
    }
}
class Dependency extends vscode.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.iconPath = {
            light: path.join(__filename, '..', '..', 'images', 'build-light.svg'),
            dark: path.join(__filename, '..', '..', 'images', 'build-dark.svg')
        };
    }
}
function show() {
    if (vscode.workspace.workspaceFolders) {
        var tv = vscode.window.createTreeView("projView", {
            treeDataProvider: new NodeDependenciesProvider()
        });
    }
}
exports.show = show;
//# sourceMappingURL=outline.js.map