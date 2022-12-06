"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteElement = void 0;
const toolbarElement_1 = require("./toolbarElement");
class DeleteElement extends toolbarElement_1.toolbarElement {
    constructor() {
        super();
        this.toolbarElement = `
        <li type="delete">
         <svg xmlns="http://www.w3.org/2000/svg" version="1.1"> 
            <title id="deleteTitle"></title>
            <g
            inkscape:label="Layer 1"
            inkscape:groupmode="layer"
            id="layer1"
            transform="translate(0,0) scale(${this.scale})">
            <path
               style="fill:#dddddd;stroke-width:0.12499999;fill-opacity:1"
               inkscape:connector-curvature="0"
               d="m 60.061933,74.93878 c 0.495042,0.49505 1.237621,0.742574 1.732672,0.742574 0.49505,0 1.237622,-0.247525 1.732672,-0.742574 L 73.923319,64.54274 84.319352,74.93878 c 0.495051,0.49505 1.237622,0.742574 1.732672,0.742574 0.495051,0 1.237631,-0.247525 1.732681,-0.742574 0.990092,-0.990099 0.990092,-2.475247 0,-3.465347 L 77.388663,61.077394 87.784705,50.681354 c 0.990092,-0.990098 0.990092,-2.475247 0,-3.465346 -0.990101,-0.990099 -2.475252,-0.990099 -3.465353,0 L 73.923319,57.612047 63.527277,47.216008 c -0.990101,-0.990099 -2.475252,-0.990099 -3.465344,0 -0.990101,0.990099 -0.990101,2.475248 0,3.465346 l 10.396033,10.39604 -10.396033,10.396039 c -0.74258,0.9901 -0.74258,2.475248 0,3.465347 z"
               p-id="8984"
               id="path4969" />
            <path
               style="fill:#dddddd;stroke-width:0.12499999;fill-opacity:1"
               inkscape:connector-curvature="0"
               d="m 46.695593,93.503137 h 61.881187 c 2.72277,0 4.9505,-2.22772 4.9505,-4.9505 V 33.354622 c 0,-2.722773 -2.22773,-4.950495 -4.9505,-4.950495 H 46.695593 c -1.237624,0 -2.475248,0 -32.425743,31.188118 -0.990099,0.990099 -0.990099,2.475248 0,3.465347 30.19802,30.445545 31.188119,30.445545 32.425743,30.445545 z M 47.438167,33.354622 H 108.57678 V 88.552637 H 47.438167 C 44.46787,86.324917 31.596583,73.453631 19.715395,61.077394 31.596583,48.701156 44.715394,35.582345 47.438167,33.354622 Z"
               p-id="8985"
               id="path4971" />
         </g>
      </svg>
     </li>    
        `;
    }
}
exports.DeleteElement = DeleteElement;
//# sourceMappingURL=DeleteElement.js.map