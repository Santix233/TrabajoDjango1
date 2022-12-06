"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LDRElement = void 0;
const toolbarElement_1 = require("./toolbarElement");
class LDRElement extends toolbarElement_1.toolbarElement {
    constructor() {
        super();
        this.toolbarElement = `
        <li type="ldr">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"> 
                <title id="ldrTitle"></title>
                <g
                inkscape:label="Layer 1"
                inkscape:groupmode="layer"
                id="layer1"
                transform="translate(0,0) scale(${this.scale})">
                <rect
                    style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                    id="rect1698-6-3-7-2"
                    width="15"
                    height="50.426311"
                    x="79.02285"
                    y="38.77029" />
                <rect
                    style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:1.0072335;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                    id="rect1715-7-6-3-1"
                    width="20"
                    height="5.4000001"
                    x="94.054001"
                    y="61.077" />
                <rect
                    style="display:inline;opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:2.99999976;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                    id="rect1698-6-3-7-2-7"
                    width="15"
                    height="50.425999"
                    x="35.545631"
                    y="38.959835" />
                <rect
                    style="display:inline;opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:1.0072335;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                    id="rect1715-7-6-3-1-9"
                    width="20"
                    height="5"
                    x="15.448"
                    y="61.477001" />
                <path
                    style="stroke-width:0.0437548;fill:#dddddd;fill-opacity:1"
                    inkscape:connector-curvature="0"
                    d="m 87.047779,9.9117603 12,11.9999247 -12,12.000038 z"
                    p-id="2111"
                    id="path8102" />
                <rect
                    style="opacity:1;vector-effect:none;fill-opacity:1;fill-rule:evenodd;stroke-width:1.40922117;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;fill:#dddddd"
                    id="rect8668"
                    width="53.033012"
                    height="3.5355339"
                    x="34.111969"
                    y="19.458017" />
                </g>
            </svg>
        </li>
        `;
    }
}
exports.LDRElement = LDRElement;
//# sourceMappingURL=LDRElement.js.map