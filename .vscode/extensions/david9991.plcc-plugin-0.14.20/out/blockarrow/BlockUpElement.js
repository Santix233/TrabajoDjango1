"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockupElement = void 0;
const BlockArrowElement_1 = require("./BlockArrowElement");
class blockupElement extends BlockArrowElement_1.blockarrowElement {
    constructor() {
        super();
        this.blockarrowElement = `
      <li id="blockup" type="blockup">
         <svg
         version="1.1"
         id="blockupsvg"
         sodipodi:docname="arrowup.svg"
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
         inkscape:cx="66.633285"
         inkscape:cy="71.921641"
         inkscape:window-width="1313"
         inkscape:window-height="458"
         inkscape:window-x="0"
         inkscape:window-y="38"
         inkscape:window-maximized="0"
         inkscape:current-layer="layer1" />
      <g
         inkscape:label="Layer 1"
         inkscape:groupmode="layer"
         id="layer1"
         transform="translate(0,0) scale(${this.scale})">
         <path
            sodipodi:type="star"
            style="fill:#dedede;fill-opacity:1"
            id="path257"
            inkscape:flatsided="true"
            sodipodi:sides="3"
            sodipodi:cx="57.114243"
            sodipodi:cy="40.426544"
            sodipodi:r1="18.966784"
            sodipodi:r2="8.8295822"
            sodipodi:arg1="0.52040219"
            sodipodi:arg2="1.5675998"
            inkscape:rounded="0"
            inkscape:randomized="0"
            d="M 73.570189,49.857381 40.718925,49.962394 57.053614,21.459858 Z"
            inkscape:transform-center-x="-1.2539783"
            inkscape:transform-center-y="-9.3058921"
            transform="matrix(3.0439589,0.02823383,-0.02001024,2.2725106,-106.94697,-25.378596)" />
      </g>
      </svg>
   </li>`;
    }
}
exports.blockupElement = blockupElement;
//# sourceMappingURL=BlockUpElement.js.map