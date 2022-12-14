"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoilRelement = void 0;
const toolbarElement_1 = require("./toolbarElement");
class CoilRelement extends toolbarElement_1.toolbarElement {
    constructor() {
        super();
        this.toolbarElement = `
        <li type="coilr">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"> 
                <title id="coilrTitle"></title>
                <g
                    inkscape:label="Layer 1"
                    inkscape:groupmode="layer"
                    id="layer1"
                    transform="translate(0,0) scale(${this.scale})">
                    <rect
                        style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:1.0072335;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                        id="rect1715-7-6-3-1"
                        width="20.000031"
                        height="5.4000001"
                        x="94.054001"
                        y="61.077" />
                    <rect
                        style="display:inline;opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:1.0072335;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                        id="rect1715-7-6-3-1-9"
                        width="20.000031"
                        height="5.4000001"
                        x="15.448"
                        y="61.077" />
                    <path
                        inkscape:connector-curvature="0"
                        id="path826"
                        style="font-style:normal;font-variant:normal;font-weight:600;font-stretch:normal;font-size:61.28886414px;line-height:1.25;font-family:'URW Bookman';-inkscape-font-specification:'URW Bookman Semi-Bold';letter-spacing:0px;word-spacing:0px;fill:#dddddd;fill-opacity:1;stroke:none;stroke-width:2;stroke-opacity:1"
                        d="m 51.150609,37.952552 c -4.542347,0 -7.592207,1.215626 -10.836741,4.225749 -3.049861,2.89435 -4.801909,8.393614 -4.801909,15.397939 v 12.387815 c 0,6.309681 1.427594,11.51951 4.023221,14.529633 3.244533,3.588993 6.748629,5.094055 11.615429,5.094055 V 84.84101 C 46.478481,83.799044 44.856215,80.152164 44.466871,69.790394 V 57.749901 c 0.389344,-10.361771 2.01161,-14.00865 6.683738,-15.108504 z" />
                    <path
                        inkscape:connector-curvature="0"
                        id="path828"
                        style="font-style:normal;font-variant:normal;font-weight:600;font-stretch:normal;font-size:61.28886414px;line-height:1.25;font-family:'URW Bookman';-inkscape-font-specification:'URW Bookman Semi-Bold';letter-spacing:0px;word-spacing:0px;fill:#dddddd;fill-opacity:1;stroke:none;stroke-width:2;stroke-opacity:1"
                        d="m 78.301481,42.879273 c 4.672128,1.099854 6.294394,4.746733 6.683739,15.108504 V 70.02827 c -0.389345,10.36177 -2.011611,14.00865 -6.683739,15.050616 v 4.746733 c 4.607237,0 7.592208,-1.15774 10.901632,-4.22575 3.04986,-2.894349 4.801909,-8.393613 4.801909,-15.397938 V 57.814116 c 0,-6.309682 -1.427595,-11.51951 -4.023222,-14.529634 -3.244533,-3.588992 -6.748629,-5.094054 -11.680319,-5.094054 z" />
                    <g
                        aria-label="R"
                        style="font-style:normal;font-weight:normal;font-size:40px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#dddddd;fill-opacity:1;stroke:none"
                        id="text9389-9">
                        <path
                            d="m 71.351939,65.128835 c 4.2,-0.96 6.68,-3.72 6.68,-7.4 0,-2.52 -1.48,-4.92 -3.68,-5.96 -1.96,-0.92 -4.4,-1.32 -8.2,-1.32 h -15.56 v 3.28 l 0.8,0.08 c 2.32,0.32 2.76,0.84 2.72,3.36 v 13.8 c 0.04,2.52 -0.4,3.04 -2.72,3.36 l -0.8,0.08 v 3.28 h 14.04 v -3.28 l -0.8,-0.08 c -2.32,-0.32 -2.76,-0.84 -2.72,-3.36 v -5 h 2.08 l 8.64,11.72 h 9.28 v -3.28 c -2.32,-0.2 -3.16,-0.68 -4.72,-2.76 z m -10.24,-2.96 v -6.2 c 0,-0.96 0.08,-1.16 0.52,-1.4 0.52,-0.28 1.32,-0.4 2.64,-0.4 2.2,0 3.4,0.28 4.28,1 0.8,0.68 1.32,1.8 1.32,2.96 0,1.36 -0.72,2.6 -1.92,3.24 -1,0.56 -2.12,0.8 -4,0.8 z"
                            style="font-style:normal;font-variant:normal;font-weight:600;font-stretch:normal;font-size:40px;font-family:'URW Bookman';-inkscape-font-specification:'URW Bookman Semi-Bold';fill:#dddddd;fill-opacity:1"
                            id="path9440" />
                    </g>
                </g>
           </svg>
        </li>
        `;
    }
}
exports.CoilRelement = CoilRelement;
//# sourceMappingURL=CoilRElement.js.map