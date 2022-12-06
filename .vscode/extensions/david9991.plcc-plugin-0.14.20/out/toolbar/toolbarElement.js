"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolbarElement = void 0;
class toolbarElement {
    constructor() {
        this._gWidth = 43;
        this._scale = this._gWidth / 128;
    }
    get toolbarElement() {
        return this._toorbarElement;
    }
    set toolbarElement(newElement) {
        this._toorbarElement = newElement;
    }
    get gWidth() {
        return this._gWidth;
    }
    set gWidth(newWidth) {
        this._gWidth = newWidth;
    }
    get scale() {
        return this._scale;
    }
    set scale(newScale) {
        this._scale = newScale;
    }
    GenerateSVG() {
        return this._toorbarElement;
    }
    ;
}
exports.toolbarElement = toolbarElement;
//# sourceMappingURL=toolbarElement.js.map