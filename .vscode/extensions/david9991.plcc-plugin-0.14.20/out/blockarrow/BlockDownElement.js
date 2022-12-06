"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockdownElement = void 0;
const BlockArrowElement_1 = require("./BlockArrowElement");
class blockdownElement extends BlockArrowElement_1.blockarrowElement {
    constructor() {
        super();
        this.blockarrowElement = `
      <li id="blockdown" type="blockdown" >
         <svg
         version="1.1"
         id="blockdownsvg"
         sodipodi:docname="arrowdown.svg"
         inkscape:version="1.2 (dc2aeda, 2022-05-15)"
         xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
         xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:svg="http://www.w3.org/2000/svg">
      <defs
         id="defs45" />
      <sodipodi:namedview
         id="namedview43"
         pagecolor="#ffffff"
         bordercolor="#000000"
         borderopacity="0.25"
         inkscape:showpageshadow="2"
         inkscape:pageopacity="0.0"
         inkscape:pagecheckerboard="0"
         inkscape:deskcolor="#d1d1d1"
         showgrid="false"
         inkscape:zoom="4.2546304"
         inkscape:cx="66.515766"
         inkscape:cy="81.323163"
         inkscape:window-width="1512"
         inkscape:window-height="916"
         inkscape:window-x="0"
         inkscape:window-y="38"
         inkscape:window-maximized="1"
         inkscape:current-layer="layer1" />
      <g
         inkscape:label="Layer 1"
         inkscape:groupmode="layer"
         id="layer1"
         transform="translate(0,0) scale(${this.scale})">
         <path
            sodipodi:type="star"
            style="fill:#dedede"
            id="path906"
            inkscape:flatsided="true"
            sodipodi:sides="3"
            sodipodi:cx="23.268766"
            sodipodi:cy="31.260059"
            sodipodi:r1="13.300496"
            sodipodi:r2="6.7345681"
            sodipodi:arg1="-0.52385475"
            sodipodi:arg2="0.5233428"
            inkscape:rounded="0"
            inkscape:randomized="0"
            d="M 34.785631,24.606863 23.272171,44.560555 11.748497,24.61276 Z"
            inkscape:transform-center-x="-0.38325395"
            inkscape:transform-center-y="10.71905"
            transform="matrix(4.3408177,0,0,3.2575425,-34.998084,-40.157902)" />
      </g>
      </svg>
   </li>`;
    }
}
exports.blockdownElement = blockdownElement;
//# sourceMappingURL=BlockDownElement.js.map