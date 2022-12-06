"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebviewContent = void 0;
function getWebviewContent() {
    let htmlStr = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">
        <style type="text/css">
            .txt {
                width: 60%;
                padding: 3px;
                border: 1px solid #3c3c3c;
                color: #8e8e8e;
                background-color: #3c3c3c;                
            }
            .txt:focus {
                border: 1px solid #0e639c;
                color:#cccccc;
            }

            svg text {
                user-select: none;
            }
    
            #tableList {
                width: 100%;
            }
    
            #tableList>tr>td {
                text-align: left;
                user-select: none;
            }

            #tableList>th {
                text-align: left;
                padding: 0px;
                user-select: none;
            }

            #path {
                text-align: left;
                padding: 0px;
                user-select: none;
            }
    
            #doc {
                text-align: left;
                padding: 2px 10px;
                user-select: none;
            }
    
            .b_button {
                border: none;
                margin-top: 5px;
                width: 100%;
                text-align: center;
                outline: 1px solid transparent;
                outline-offset: 2px !important;
                color: var(--vscode-button-foreground);
                background: var(--vscode-button-background);
            }
    
            .b_button:hover {
                cursor: pointer;
                background: var(--vscode-button-hoverBackground);
            }
    
            .b_button:focus {
                outline-color: var(--vscode-focusBorder);
            }
    
            g.FBThumbnail>line {
                stroke: var(--vscode-menu-foreground) !important;
                stroke-width: 2px !important;
            }
    
            g.FBThumbnail>text {
                fill: var(--vscode-menu-foreground) !important;
            }
    
            g.FBThumbnail>rect {
                fill: var(--vscode-list-hoverBackground) !important;
                fill-opacity: 0.5 !important;
                stroke: var(--vscode-menu-foreground) !important;
            }
        </style>
    </head>
    
    <body>
        <div style='overflow-y:scroll;overflow-x:hidden; height: 200px;'>    
            <table id="tableList">
            </table>
        </div>
        <div style='padding: 5px 0px' onclick="insertFB()" class="b_button">Insert</div>      
        <div style='margin-top: 5px; padding:5px 0px'>
            <svg id="thumbnail" xmlns="http://www.w3.org/2000/svg" version="1.1"></svg>
        </div>
        <div style='padding: 5px 0px' id="doc">
        </div>
        <script>
            const vscode = acquireVsCodeApi();
        
            window.addEventListener('message', event => {
                const tableItem = document.getElementById("tableList");
                const viewSvg = document.getElementById("thumbnail");
                const doc = document.getElementById("doc");
                const message = event.data;
                var lastPath = "";
                var curPath = "";
                var defaultIdx = 0;
                if (message.type == "table") {
                    tableItem.innerHTML = ""
                    let items = message.item;
                    for (let i = 0; i < items.length; i++) {
                        if (String(items[i].name).startsWith("__")) continue;
                        lastPath = curPath
                        curPath = items[i].path
                        if (String(items[i].path).split(":")[0] == "Local") {
                            if( curPath != lastPath ) {
                                th = document.createElement("th");
                                th.id = items[i].id; 
                                th.innerHTML = "Local:";
                                tableItem.appendChild(th);
                            } else {
                            }
                        } else if (String(items[i].path).split(":")[0] == "Remote"){
                            if( curPath != lastPath ) {
                                if (String(lastPath).split(":")[0] != "Remote") {
                                    th = document.createElement("th");
                                    th.id = items[i].id; 
                                    th.innerHTML = "Remote:";
                                    tableItem.appendChild(th);
                                }
                                tr = document.createElement("tr");
                                th = document.createElement("th");
                                th.id = "path"; 
                                th.innerHTML = String(items[i].path).substring(7)
                                tr.appendChild(th);
                                tableItem.appendChild(tr);
                            } else {
                            }
                        } else {
                        }
                        tr = document.createElement("tr");
                        tr.id = items[i].id;
                        td = document.createElement("td");
                        if (items[i].type == "Method"  ){
                            td.innerHTML = "[M] "+items[i].name;
                            td.style.padding="0px 20px";
                        } else if  (items[i].type == "Action") {
                            td.innerHTML = "[A] "+items[i].name;
                            td.style.padding="0px 20px";
                        } else if  (items[i].type == "Function") {
                            td.innerHTML = "[Func] "+items[i].name;
                            td.style.padding="0px 5px";
                        } else if  (items[i].type == "FB") {
                            td.innerHTML = "[FB] "+items[i].name;
                            td.style.padding="0px 5px";
                        } else if  (items[i].type == "Class") {
                            td.innerHTML = "[Cls] "+items[i].name;
                            td.style.padding="0px 5px";
                        }else if (items[i].type == "empty") {
                            td.innerHTML = "Please save and compile your project to ensure you get the latest local library.";
                            td.style.padding="20px 20px";
                            td.style.backgroundColor = "var(--vscode-list-hoverBackground)";
                            td.style.opacity = "0.4"
                            td.style.border = "1px solid  #52312c"
                        } else { 
                            td.innerHTML = items[i].name;
                            td.style.padding="5px 0px";
                        }
                        tr.appendChild(td);
                        tableItem.appendChild(tr);
                        
                        if ((items[i].type == "Class") || (items[i].type == "empty")){
                            defaultIdx++;
                        } else {
                            tr.onclick = function () {
                                vscode.postMessage({
                                    command: "onclick",
                                    id: this.id
                                })
                                for (let j = 0; j < tableItem.rows.length; j++) {
                                    if (tableItem.rows[j] == this) {
                                        tableItem.rows[j].style.backgroundColor = "var(--vscode-list-hoverBackground)";
                                        tableItem.rows[j].style.outline = "1px none " + "#0090f1"
                                        tableItem.rows[j].style.outline = "-1px"
                                    } else {
                                        tableItem.rows[j].style.backgroundColor = "";
                                        tableItem.rows[j].style.outline = "1px none " + "#0090f1"
                                    }
                                }
                            }
                        }

                        if (i == defaultIdx) {
                            vscode.postMessage({
                                command: "onclick",
                                id: tr.id
                            })
                            tr.style.backgroundColor = "var(--vscode-list-hoverBackground)";
                        }
                    }
                } else if (message.type == "view") {
                    viewSvg.innerHTML = message.value;
                    var bbox = viewSvg.getBBox();
                    const svgscale = 0.7
                    const lineoffset = 30
                    viewSvg.style.width = bbox.width + 2*lineoffset
                    viewSvg.style.height = bbox.height * svgscale
                    viewSvg.setAttribute("viewBox", "0 0 " + bbox.width + " " + bbox.height);
                    viewSvg.setAttribute("preserveAspectRatio", "xMinYMin meet");
                } else if (message.type == "doc") {
                    doc.innerHTML = message.value
                }
            });

            function insertFB() {
                vscode.postMessage({
                    command: "selectfb"
                })
            }

            
        </script>
    </body>
    
    </html>`;
    return htmlStr;
}
exports.getWebviewContent = getWebviewContent;
//# sourceMappingURL=FBListView.js.map