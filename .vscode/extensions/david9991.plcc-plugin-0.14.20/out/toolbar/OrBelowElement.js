"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrBelowElement = void 0;
const toolbarElement_1 = require("./toolbarElement");
class OrBelowElement extends toolbarElement_1.toolbarElement {
    constructor() {
        super();
        this.toolbarElement = `
        <li type="or">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"> 
            <title id="orTitle"></title> 
                <g
                inkscape:label="Layer 1"
                inkscape:groupmode="layer"
                id="layer1"
                transform="translate(0,0)  scale(${this.scale})">
                <rect
                    style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                    id="rect1698-6-3-7-2"
                    width="15"
                    height="50.426311"
                    x="79.014343"
                    y="38.398777" />
                <rect
                    style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:1.0072335;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                    id="rect1715-7-6-3-1"
                    width="20"
                    height="5.4000001"
                    x="94.054001"
                    y="61.077" />
                <rect
                    style="display:inline;opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                    id="rect1698-6-3-7-2-7"
                    width="15"
                    height="50.426311"
                    x="35.992058"
                    y="38.968597" />
                <rect
                    style="display:inline;opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:1.0072335;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                    id="rect1715-7-6-3-1-9"
                    width="20"
                    height="5.4000001"
                    x="15.979"
                    y="61.077" />
                <rect
                    style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:1.23878396;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                    id="rect8689"
                    width="3.5"
                    height="39.975281"
                    x="15.979"
                    y="26.548592" />
                <rect
                    style="display:inline;opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:1.23878396;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                    id="rect8689-0"
                    width="3.5"
                    height="39.975281"
                    x="110.554"
                    y="26.501715" />
                </g>
            </svg>
        </li>
        `;
    }
}
exports.OrBelowElement = OrBelowElement;
//# sourceMappingURL=OrBelowElement.js.map