"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockarrowsvg = void 0;
const BlockUpElement_1 = require("./BlockUpElement");
const BlockDownElement_1 = require("./BlockDownElement");
class blockarrowContainer {
    constructor() {
        this.blockup = new BlockUpElement_1.blockupElement();
        this.blockdown = new BlockDownElement_1.blockdownElement();
        this.blockarrowSvg =
            "<ul>"
                + this.blockup.GenerateSVG()
                + this.blockdown.GenerateSVG()
                + "</ul>";
    }
    GenerateSVG() {
        return this.blockarrowSvg;
    }
}
let blockarrowsvg = new blockarrowContainer();
exports.blockarrowsvg = blockarrowsvg;
//# sourceMappingURL=BlockArrowContainer.js.map