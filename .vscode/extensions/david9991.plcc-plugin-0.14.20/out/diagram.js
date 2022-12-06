"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebviewContentLadder = void 0;
function getWebviewContentLadder(filename) {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">
  </head>
  <body style="margin:0px;padding:0px;overflow:hidden">
  <iframe src=https://le-107.k.pocograph.com/vscode-plugin?file="` + filename + `" frameborder=0 style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe>
  </body>
  </html>`;
}
exports.getWebviewContentLadder = getWebviewContentLadder;
;
//# sourceMappingURL=diagram.js.map