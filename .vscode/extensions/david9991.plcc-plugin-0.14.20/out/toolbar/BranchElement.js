"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchElement = void 0;
const toolbarElement_1 = require("./toolbarElement");
class BranchElement extends toolbarElement_1.toolbarElement {
    constructor() {
        super();
        this.toolbarElement = `
        <li type="newbranch">
             <svg xmlns="http://www.w3.org/2000/svg" version="1.1"> 
                <title id="newbranchTitle"></title>
                <g
                    inkscape:label="Layer 1"
                    inkscape:groupmode="layer"
                    id="layer1"
                    transform="translate(0,0) scale(${this.scale})">
                    <rect
                        style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:2.49359632;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                        id="rect9525"
                        width="90"
                        height="6"
                        x="19.131975"
                        y="45.733482" />
                    <ellipse
                        style="opacity:1;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1;stroke-opacity:1;paint-order:stroke fill markers"
                        id="path9529"
                        cx="64.062134"
                        cy="48.707554"
                        rx="9.2040224"
                        ry="9.4268513" />
                    <rect
                        style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:2.49359632;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                        id="rect9533"
                        width="3"
                        height="28.667624"
                        x="62.490185"
                        y="58.126877" />
                    <rect
                        style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:2.49359632;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                        id="rect9535"
                        width="37.499996"
                        height="3"
                        x="65.490189"
                        y="83.794502" />
                </g>
            </svg>
        </li>
        `;
    }
}
exports.BranchElement = BranchElement;
//# sourceMappingURL=BranchElement.js.map