"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockarrowElement = void 0;
class blockarrowElement {
    constructor() {
        this._gWidth = 20;
        this._scale = this._gWidth / 128;
    }
    get blockarrowElement() {
        return this._blockarrowElement;
    }
    set blockarrowElement(newElement) {
        this._blockarrowElement = newElement;
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
        return this._blockarrowElement;
    }
    ;
}
exports.blockarrowElement = blockarrowElement;
//# sourceMappingURL=BlockArrowElement.js.map