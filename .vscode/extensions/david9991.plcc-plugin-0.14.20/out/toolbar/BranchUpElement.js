"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchUpElement = void 0;
const toolbarElement_1 = require("./toolbarElement");
class BranchUpElement extends toolbarElement_1.toolbarElement {
    constructor() {
        super();
        this.toolbarElement = `
        <li type="branchup">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"> 
                <title id="branchupTitle"></title>
                <g inkscape:label="Layer 1"
                    inkscape:groupmode="layer"
                    id="layer1"
                    transform="translate(0,0) scale(${this.scale})">
                        <rect
                        style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:2.49359632;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                        id="rect9525"
                        width="35.67564"
                        height="6"
                        x="16.631975"
                        y="58.023823" />
                        <ellipse
                        style="opacity:1;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke:#dddddd;stroke-width:1;stroke-opacity:1;paint-order:stroke fill markers"
                        id="path9529"
                        cx="59.972847"
                        cy="60.761124"
                        rx="9.2040224"
                        ry="9.4268513" />
                        <rect
                        style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:2.49359632;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                        id="rect9533"
                        width="3"
                        height="15.319409"
                        x="58.503349"
                        y="70.504364" />
                        <rect
                        style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:2.49359632;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                        id="rect9535"
                        width="44.318527"
                        height="3"
                        x="58.503349"
                        y="85.823776" />
                        <path
                        style="stroke-width:0.1953125;fill:#dddddd;fill-opacity:1"
                        inkscape:connector-curvature="0"
                        d="m 73.765575,62.617662 1.74496,1.550371 9.574426,-8.588958 9.615284,8.543248 1.737551,-1.558666 -11.104662,-9.866627 -0.510021,0.0012 z"
                        p-id="6303"
                        id="path46280" />
                        <rect
                        style="opacity:1;vector-effect:none;fill:#dddddd;fill-opacity:1;fill-rule:evenodd;stroke-width:2.49359632;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
                        id="rect50780"
                        width="2.1465738"
                        height="22.475895"
                        x="84.068497"
                        y="55.490688" />
                        <path
                        d="m 77.745242,33.294802 h -2 c -0.828428,0 -1.499999,0.67157 -1.499999,1.5 0,0.82843 0.671571,1.5 1.499999,1.5 h 2 c 0.828428,0 1.499999,-0.67157 1.499999,-1.5 0,-0.82843 -0.671571,-1.5 -1.499999,-1.5 z m 16,0 h -3 c -0.828427,0 -1.499999,0.67157 -1.499999,1.5 0,0.82843 0.671572,1.5 1.499999,1.5 h 3 c 0.828429,0 1.5,-0.67157 1.5,-1.5 0,-0.82843 -0.671571,-1.5 -1.5,-1.5 z m -8,0 h -3 c -0.828428,0 -1.5,0.67157 -1.5,1.5 0,0.82843 0.671572,1.5 1.5,1.5 h 3 c 0.828427,0 1.499999,-0.67157 1.499999,-1.5 0,-0.82843 -0.671572,-1.5 -1.499999,-1.5 z m 15.999988,0 h -2.999987 c -0.828429,0 -1.5,0.67157 -1.5,1.5 0,0.82843 0.671571,1.5 1.5,1.5 h 2.999987 c 0.82843,0 1.5,-0.67157 1.5,-1.5 0,-0.82843 -0.67157,-1.5 -1.5,-1.5 z"
                        p-id="3429"
                        id="path19044"
                        inkscape:connector-curvature="0"
                        style="fill:#dddddd;fill-opacity:1;stroke-width:0.1953125"
                        sodipodi:nodetypes="ssssssssssssssssssssssssssss" />
                        <path
                        inkscape:connector-curvature="0"
                        style="opacity:0.59100001;fill:#dddddd;fill-opacity:1;stroke-width:0.1953125"
                        d="m 45.994451,23.03491 m 0.13889,0 H 69.51111 q 0.13889,0 0.13889,0.13889 v 23.377779 q 0,0.13889 -0.13889,0.13889 H 46.133341 q -0.13889,0 -0.13889,-0.13889 V 23.1738 q 0,-0.13889 0.13889,-0.13889 z"
                        p-id="6112"
                        id="path28184" />
                        <path
                        inkscape:connector-curvature="0"
                        style="fill:#999999;stroke-width:0.1953125"
                        d="M 69.23334,23.45158 V 46.273799 H 46.411111 V 23.45158 H 69.23334 m 0.27777,-0.83333 H 46.133341 a 0.55555556,0.55555556 0 0 0 -0.55556,0.55555 v 23.377779 a 0.55555556,0.55555556 0 0 0 0.55556,0.55555 H 69.51111 a 0.55555556,0.55555556 0 0 0 0.55556,-0.55555 V 23.1738 a 0.55555556,0.55555556 0 0 0 -0.55556,-0.55555 z"
                        p-id="6113"
                        id="path28186" />
                        <path
                        inkscape:connector-curvature="0"
                        style="fill:#dddddd;fill-opacity:1;stroke-width:0.1953125"
                        d="m 40.483341,17.5238 m 0.13889,0 H 64 q 0.13889,0 0.13889,0.13889 v 23.377782 q 0,0.13889 -0.13889,0.13889 H 40.622231 q -0.13889,0 -0.13889,-0.13889 V 17.66269 q 0,-0.13889 0.13889,-0.13889 z"
                        p-id="6114"
                        id="path28188" />
                        <path
                        inkscape:connector-curvature="0"
                        style="fill:#999999;stroke:#dddddd;stroke-width:0.1953125;stroke-opacity:1"
                        d="M 63.72223,17.94047 V 40.762689 H 40.900001 V 17.94047 H 63.72223 M 64,17.10714 H 40.622231 a 0.55555556,0.55555556 0 0 0 -0.55556,0.55555 v 23.377782 a 0.55555556,0.55555556 0 0 0 0.55556,0.555547 H 64 a 0.55555556,0.55555556 0 0 0 0.55556,-0.555547 V 17.66269 A 0.55555556,0.55555556 0 0 0 64,17.10714 Z"
                        p-id="6115"
                        id="path28190" />
                        <path
                        inkscape:connector-curvature="0"
                        style="fill:#808080;stroke-width:0.1953125"
                        d="m 51.45834,25.86825 h 0.83333 v 5.958329 h -0.83333 z"
                        p-id="6116"
                        id="path28192" />
                        <path
                        inkscape:connector-curvature="0"
                        style="fill:#808080;stroke-width:0.1953125"
                        d="m 48.322231,31.182139 -0.83334,-0.0389 c 0.10833,-2.26945 0.91945,-4.974999 4.166669,-4.974999 v 0.83333 c -0.75556,0 -3.136109,0 -3.333329,4.180559 z"
                        p-id="6118"
                        id="path28196" />
                        <path
                        inkscape:connector-curvature="0"
                        style="fill:#808080;stroke-width:0.1953125"
                        d="m 55.22223,33.776579 c -0.19723,-4.18056 -2.56667,-4.18056 -3.33334,-4.18056 v -0.83333 c 3.25833,0 4.07222,2.70556 4.16667,4.975 z"
                        p-id="6120"
                        id="path28200" />
                        <path
                        inkscape:connector-curvature="0"
                        style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.1953125"
                        d="m 51.99167,23.51547 m -2.163889,0 a 2.16389,2.16389 0 1 0 4.327779,0 2.16389,2.16389 0 1 0 -4.327779,0 z"
                        p-id="6121"
                        id="path28202" />
                        <path
                        inkscape:connector-curvature="0"
                        style="fill:#808080;stroke-width:0.1953125"
                        d="m 51.99167,26.09602 a 2.5805556,2.5805556 0 1 1 2.58056,-2.58055 2.5833334,2.5833334 0 0 1 -2.58056,2.58055 z m 0,-4.32777 a 1.7472222,1.7472222 0 1 0 1.74722,1.74722 1.75,1.75 0 0 0 -1.74722,-1.74722 z"
                        p-id="6122"
                        id="path28204" />
                        <path
                        inkscape:connector-curvature="0"
                        style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.1953125"
                        d="m 47.788891,32.607129 m -1.68055,0 a 1.6805556,1.6805556 0 1 0 3.36111,0 1.6805556,1.6805556 0 1 0 -3.36111,0 z"
                        p-id="6123"
                        id="path28206" />
                        <path
                        inkscape:connector-curvature="0"
                        style="fill:#808080;stroke-width:0.1953125"
                        d="m 47.788891,34.704359 a 2.0972222,2.0972222 0 1 1 2.09722,-2.09723 2.1,2.1 0 0 1 -2.09722,2.09723 z m 0,-3.36111 a 1.2638889,1.2638889 0 1 0 1.26389,1.26388 1.2666667,1.2666667 0 0 0 -1.26389,-1.26388 z"
                        p-id="6124"
                        id="path28208" />
                        <path
                        inkscape:connector-curvature="0"
                        style="fill:#b3b3b3;fill-opacity:1;stroke-width:0.1953125"
                        d="m 55.63889,35.396019 m -1.68055,0 a 1.6805556,1.6805556 0 1 0 3.36111,0 1.6805556,1.6805556 0 1 0 -3.36111,0 z"
                        p-id="6125"
                        id="path28210" />
                        <path
                        inkscape:connector-curvature="0"
                        style="fill:#808080;stroke-width:0.1953125"
                        d="m 55.63889,37.493249 a 2.0972222,2.0972222 0 1 1 2.09722,-2.09723 2.1,2.1 0 0 1 -2.09722,2.09723 z m 0,-3.36111 a 1.2638889,1.2638889 0 1 0 1.26389,1.26388 1.2666667,1.2666667 0 0 0 -1.26389,-1.26666 z"
                        p-id="6126"
                        id="path28212" />
                </g>
            </svg>
        </li>
        `;
    }
}
exports.BranchUpElement = BranchUpElement;
//# sourceMappingURL=BranchUpElement.js.map