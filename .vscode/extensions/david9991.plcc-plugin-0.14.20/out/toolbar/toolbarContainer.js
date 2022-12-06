"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolbarsvg = void 0;
const blockElement_1 = require("./blockElement");
const BlockUpElement_1 = require("./BlockUpElement");
const BranchDownElement_1 = require("./BranchDownElement");
const BranchElement_1 = require("./BranchElement");
const BranchUpElement_1 = require("./BranchUpElement");
const CoilElement_1 = require("./CoilElement");
const CoilRElement_1 = require("./CoilRElement");
const CoilSElement_1 = require("./CoilSElement");
const FBElement_1 = require("./FBElement");
const LDElement_1 = require("./LDElement");
const LDRElement_1 = require("./LDRElement");
const LNDElement_1 = require("./LNDElement");
const OrAboveElement_1 = require("./OrAboveElement");
const OrBelowElement_1 = require("./OrBelowElement");
const OrnBelowElement_1 = require("./OrnBelowElement");
const DeleteElement_1 = require("./DeleteElement");
class toobarContainer {
    constructor() {
        this.block = new blockElement_1.blockElement();
        this.blockinsertup = new BlockUpElement_1.BlockUpElement();
        this.ld = new LDElement_1.LDElement();
        this.ldn = new LNDElement_1.LDNElement();
        this.orabove = new OrAboveElement_1.OrAboveElement();
        this.orbelow = new OrBelowElement_1.OrBelowElement();
        this.ornbelow = new OrnBelowElement_1.OrnBelowElement();
        this.ldr = new LDRElement_1.LDRElement();
        this.coil = new CoilElement_1.CoilElement();
        this.coils = new CoilSElement_1.CoilSElement();
        this.coilr = new CoilRElement_1.CoilRelement();
        this.fb = new FBElement_1.FBElement();
        this.branch = new BranchElement_1.BranchElement();
        this.branchup = new BranchUpElement_1.BranchUpElement();
        this.branchdown = new BranchDownElement_1.BranchDownElement();
        this.delete = new DeleteElement_1.DeleteElement();
        this.toobBarSvg =
            "<ul id='toolbarUL' class='toolbarUL'>"
                + this.blockinsertup.GenerateSVG()
                + this.block.GenerateSVG()
                + this.ld.GenerateSVG()
                + this.ldn.GenerateSVG()
                + this.orabove.GenerateSVG()
                + this.orbelow.GenerateSVG()
                + this.ornbelow.GenerateSVG()
                + this.ldr.GenerateSVG()
                + this.coil.GenerateSVG()
                + this.coils.GenerateSVG()
                + this.coilr.GenerateSVG()
                + this.fb.GenerateSVG()
                + this.branch.GenerateSVG()
                + this.branchup.GenerateSVG()
                + this.branchdown.GenerateSVG()
                + this.delete.GenerateSVG()
                + "</ul>";
    }
    GenerateSVG() {
        return this.toobBarSvg;
    }
}
let toolbarsvg = new toobarContainer();
exports.toolbarsvg = toolbarsvg;
//# sourceMappingURL=toolbarContainer.js.map