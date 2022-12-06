"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoilElement = void 0;
const toolbarElement_1 = require("./toolbarElement");
class CoilElement extends toolbarElement_1.toolbarElement {
    constructor() {
        super();
        this.toolbarElement = `
        <li type="coil">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"> 
                <title id="coilTitle"></title>
                <g
                    inkscape:label="Layer 1"
                    inkscape:groupmode="layer"
                    id="layer1"
                    transform="translate(0,0) scale(${this.scale})">
                    <rect
                        style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.0072335;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:0.94117647"
                        id="rect1715-7-6-3-1"
                        width="20"
                        height="5.4000001"
                        x="94.054001"
                        y="61.077" />
                    <rect
                        style="display:inline;opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.0072335;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:0.94117647"
                        id="rect1715-7-6-3-1-9"
                        width="20"
                        height="5.4000001"
                        x="15.448"
                        y="61.077" />
                    <path
                        inkscape:connector-curvature="0"
                        id="path4541"
                        style="font-style:normal;font-variant:normal;font-weight:600;font-stretch:normal;font-size:61.28886414px;line-height:1.25;font-family:'URW Bookman';-inkscape-font-specification:'URW Bookman Semi-Bold';letter-spacing:0px;word-spacing:0px;fill:#dddddd;fill-opacity:1"
                        d="m 50.977568,38.322113 c -4.542347,0 -7.592207,1.215626 -10.836741,4.225749 -3.049861,2.89435 -4.801909,8.393614 -4.801909,15.397939 v 12.387815 c 0,6.309681 1.427594,11.51951 4.023221,14.529633 3.244533,3.588993 6.748629,5.094055 11.615429,5.094055 V 85.210571 C 46.30544,84.168605 44.683174,80.521725 44.29383,70.159955 V 58.119462 c 0.389344,-10.361771 2.01161,-14.00865 6.683738,-15.108504 z" />
                    <path
                        inkscape:connector-curvature="0"
                        id="path4543"
                        style="font-style:normal;font-variant:normal;font-weight:600;font-stretch:normal;font-size:61.28886414px;line-height:1.25;font-family:'URW Bookman';-inkscape-font-specification:'URW Bookman Semi-Bold';letter-spacing:0px;word-spacing:0px;fill:#dddddd;fill-opacity:1;stroke:none;stroke-width:2;stroke-opacity:0.94117647"
                        d="m 78.282563,42.458996 c 4.672127,1.099854 6.294393,4.746733 6.683738,15.108504 v 12.040493 c -0.389345,10.36177 -2.011611,14.00865 -6.683738,15.050616 v 4.746733 c 4.607236,0 7.592207,-1.15774 10.901631,-4.22575 3.04986,-2.894349 4.801909,-8.393613 4.801909,-15.397938 V 57.393839 c 0,-6.309682 -1.427595,-11.51951 -4.023222,-14.529634 -3.244533,-3.588992 -6.748629,-5.094054 -11.680318,-5.094054 z" />
                    <flowRoot
                        xml:space="preserve"
                        id="flowRoot824"
                        style="fill:black;fill-opacity:1;stroke:none;font-family:sans-serif;font-style:normal;font-weight:normal;font-size:40px;line-height:1.25;letter-spacing:0px;word-spacing:0px"><flowRegion
                            id="flowRegion826"><rect
                            id="rect828"
                            width="123.92857"
                            height="86.428574"
                            x="-167.14285"
                            y="-37.357143" /></flowRegion><flowPara
                            id="flowPara830" /></flowRoot>  
                </g>
            </svg>
        </li>
        `;
    }
}
exports.CoilElement = CoilElement;
//# sourceMappingURL=CoilElement.js.map