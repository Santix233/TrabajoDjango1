"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStr = void 0;
function GetStr(svgJson) {
    let svgList = [];
    if (svgJson != null) {
        for (let i = 0; i < svgJson.length; i++) {
            switch (svgJson[i].cmd) {
                case "rect":
                    svgList.push(`<rect transform="${svgJson[i].info.transform}" x="${svgJson[i].info.position.x}" y="${svgJson[i].info.position.y}" rx="${svgJson[i].info.rx}" ry="${svgJson[i].info.ry}" width="${svgJson[i].info.w}" height="${svgJson[i].info.h}" fill="${svgJson[i].info.color}" style ="stroke:${svgJson[i].info.stcolor}; stroke-width:${svgJson[i].info.stwidth}; fill-opacity:${svgJson[i].info.opacity}; stroke-opacity: 1"/>`);
                    break;
                case "line":
                    svgList.push(`<line x1="${svgJson[i].info.start.x}" y1="${svgJson[i].info.start.y}" x2="${svgJson[i].info.end.x}" y2="${svgJson[i].info.end.y}" style ="stroke:${svgJson[i].info.color};stroke-width:${svgJson[i].info.linew};stroke-opacity:1; opacity:1"/>`);
                    break;
                case "text":
                    if (svgJson[i].info.str != "!!!") {
                        svgList.push(`<foreignObject onclick="selectinput(evt)" x="${svgJson[i].info.position.x}" y="${svgJson[i].info.position.y}" width="${svgJson[i].info.w}" height="${svgJson[i].info.h}"> <input type="text" id="${svgJson[i].info.id}" onchange="compinput(this.id,this.value)"  style="text-align:${svgJson[i].info.textalign}" value="${svgJson[i].info.str}"/> </foreignObject>`);
                    }
                    else {
                        svgList.push(`<foreignObject onclick="selectinput(evt)" x="${svgJson[i].info.position.x}" y="${svgJson[i].info.position.y}" width="${svgJson[i].info.w}" height="${svgJson[i].info.h}"> <input type="text" id="${svgJson[i].info.id}" onchange="compinput(this.id,this.value)"  style="text-align:${svgJson[i].info.textalign}; border:solid 1px blue;" value="${svgJson[i].info.str}"/> </foreignObject>`);
                    }
                    break;
                case "label":
                    svgList.push(`<text alignment-baseline="${svgJson[i].info.alignmentbaseline}" text-anchor="${svgJson[i].info.textanchor}" x="${svgJson[i].info.position.x}"  y="${svgJson[i].info.position.y}" fill="${svgJson[i].info.color}" font-size="${svgJson[i].info.fontsize} " style="stroke:${svgJson[i].info.stcolor}; stroke-width:${svgJson[i].info.stwidth} ">${svgJson[i].info.str}</text>`);
                    break;
                case "circle":
                    svgList.push(`<circle cx="${svgJson[i].info.position.x}" cy="${svgJson[i].info.position.y}" r="${svgJson[i].info.r}" fill="${svgJson[i].info.color}" stroke="${svgJson[i].info.stcolor}" stroke-width="${svgJson[i].info.stwidth}"/>`);
                    break;
                case "path":
                    svgList.push(`<path d="${svgJson[i].info.d}" fill="${svgJson[i].info.color}" fill-opacity="${svgJson[i].info.opacity}" stroke="${svgJson[i].info.stcolor}" stroke-width="${svgJson[i].info.stwidth}" />`);
                    break;
                case "ellipse":
                    svgList.push(`<ellipse rx="${svgJson[i].info.rx}" ry="${svgJson[i].info.ry}" cx="${svgJson[i].info.cx}" cy="${svgJson[i].info.cy}" fill="${svgJson[i].info.color}" stroke="${svgJson[i].info.stcolor}" stroke-width="${svgJson[i].info.stwidth}"/>`);
                    break;
                default:
                    svgList.push(`<g class="${svgJson[i].cmd}">` + GetStr(svgJson[i].info).toString() + `</g>`);
                    break;
            }
        }
    }
    return svgList;
}
exports.GetStr = GetStr;
//# sourceMappingURL=svgelement.js.map