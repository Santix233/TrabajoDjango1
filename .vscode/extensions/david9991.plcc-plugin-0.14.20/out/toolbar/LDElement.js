"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LDElement = void 0;
const toolbarElement_1 = require("./toolbarElement");
class LDElement extends toolbarElement_1.toolbarElement {
    constructor() {
        super();
        this.toolbarElement = `
      <li type="ld">
         <svg xmlns="http://www.w3.org/2000/svg" version="1.1"> 
            <title id="ldTitle"></title>
            <g
            inkscape:label="Layer 1"
            inkscape:groupmode="layer"
            id="layer1"
            transform="translate(0,0) scale(${this.scale})">
            <rect
               y="38.892857"
               x="77.013168"
               height="50.426311"
               width="17"
               id="rect1698-6-3-7-2"
               style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" />
            <rect
               y="61.077"
               x="94.05426"
               height="5.4000001"
               width="20"
               id="rect1715-7-6-3-1"
               style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.0072335;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" />
            <rect
               y="38.892857"
               x="35.422749"
               height="50.425999"
               width="17"
               id="rect1698-6-3-7-2-7"
               style="display:inline;opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" />
            <rect
               y="61.077393"
               x="15.447569"
               height="5.4000001"
               width="20"
               id="rect1715-7-6-3-1-9"
               style="display:inline;opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.0072335;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" />
             </g>
         </svg>
      </li>`;
    }
}
exports.LDElement = LDElement;
//# sourceMappingURL=LDElement.js.map