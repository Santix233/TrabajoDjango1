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
            .add_button {
                border: none;
                margin-top: 5px;
                width: 100%;
                text-align: center;
                outline: 1px solid transparent;
                outline-offset: 2px !important;
                color: var(--vscode-button-foreground);
                background: var(--vscode-button-background);
            }
    
            .add_button:hover {
                cursor: pointer;
                background: var(--vscode-button-hoverBackground);
            }
    
            .add_button:focus {
                outline-color: var(--vscode-focusBorder);
            }
    
            .add_button:active {
                background: var(--vscode-button-activeBackground);
            }
    
            .varinput {
                width: 98% !important;
                height: 100% !important;
                border: none;
                background-color: transparent;
                font-size: 12px font-family: sans-serif;
                font-weight: thick;
                color: var(--vscode-input-placeholderForeground);
                box-shadow: none;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .title {
                text-align: left;

            }

            .poutype {
                text-align: left;
                padding: 2px 10px;
                user-select: none;
                background-color: transparent;
                color: var(--vscode-input-placeholderForeground);
            }
            
            .pouname {
                text-align: left;
                padding: 2px 10px;
                height: 100% !important;
                background-color: transparent;
                color: var(--vscode-input-placeholderForeground);
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 2px 0px;
                border-width: 1px;
                border-style:solid;
            }
        </style>
    </head>
    
    <body>
        <br>
        <label   style='font-size: 15px; font-weight: thick;'>POU Type:</label>
        <select name="poutype" class="poutype"  id="poutype">
          <option value="Function Block">Function Block</option>
          <option value="Program">Program</option>
        </select>
        <br>
        <br>
        <label style='font-size: 15px; font-weight: thick;'>POU Name:</label>
        <input  name="pouname" class="pouname"  id="pouname">
        <br>
        <br>
        <div style = 'width:100%'>
        <label style='font-size: 15px; font-weight: thick;'>INPUT:</label>
        <button id="in" style='float:right; width:40px;' class="add_button" onclick="addMember('in')">Add</button>
        </div>
        <div>
            <table>
            <thead>
                <tr>
                    <th class= "title">Type</th>
                    <th class="title">Name</th>
                    <th class="title">Add</th>
                    <th class="title">Del</th>
                </tr>
            </thead>
            <tbody id="intl" >
            </tbody>
            </table>
        </div>
        <br>
        <div style = 'width:100%'>
        <label style='font-size: 15px; font-weight: thick;'>OUTPUT:</label>
        <button id="out" style='float:right; width:40px;' class="add_button" onclick="addMember('out')">Add</button>
        </div>
        <div>
            <table>
            <thead>
                <tr>
                    <th class= "title">Type</th>
                    <th class="title">Name</th>
                    <th class="title">Add</th>
                    <th class="title">Del</th>
                </tr>
            </thead>
            <tbody id="outtl" >
            </tbody>
            </table>
        </div>
        <br>
        <div style = 'width:100%'>
        <label style='font-size: 15px; font-weight: thick;'>IN_OUT:</label>
        <button id="inout" style='float:right; width:40px;' class="add_button" onclick="addMember('inout')">Add</button>
        </div>
        <div>
            <table>
            <thead>
                <tr>
                    <th class= "title">Type</th>
                    <th class="title">Name</th>
                    <th class="title">Add</th>
                    <th class="title">Del</th>
                </tr>
            </thead>
            <tbody id="inouttl" >
            </tbody>
            </table>
        </div>
        <br>
        <div style = 'width:100%'>
        <label style='font-size: 15px; font-weight: thick;'>VAR:</label>
        <button id="local"  style='float:right; width:40px;' class="add_button" onclick="addMember('local')">Add</button>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th class= "title">Type</th>
                        <th class="title">Name</th>
                        <th class="title">Add</th>
                        <th class="title">Del</th>
                    </tr>
                </thead>
                <tbody id="localtl">
                </tbody>
            </table>
        </div>
        <script>
            const vscode = acquireVsCodeApi();

            document.getElementById("poutype").onchange = function() {
                vscode.postMessage({
                    command: "pouchange",
                    type: document.getElementById("poutype").value,
                })
            }

            document.getElementById("pouname").onchange = function() {
                vscode.postMessage({
                    command: "pounamechange",
                    type: document.getElementById("pouname").value,
                })
            }

            window.addEventListener('message', event => {
                const message = event.data;
                var curtable = "";
                let items = message.item;

                if (message.type == "pou") {
                    if (message.item == "Function Block") {
                        document.getElementById("poutype")[0].selected = true;
                    } else {
                        document.getElementById("poutype")[1].selected = true;
                    }
                } else if (message.type == "pouname") {
                    input = document.getElementById("pouname");
                    input.value = items;
                } else if (message.type == "local") {
                    localadd = document.getElementById("local");
                    if (items.length == 0) {
                        localadd.style.display = "block";
                    } else {
                        localadd.style.display = "none";
                    }
                    makeTbl(items,"local");
                } else if (message.type == "in") {
                    inadd = document.getElementById("in");
                    if (items.length == 0) {
                        inadd.style.display = "block";
                    } else {
                        inadd.style.display = "none";
                    }
                    makeTbl(items,"in");
                } else if (message.type == "out") {
                    outadd = document.getElementById("out");
                    if (items.length == 0) {
                        outadd.style.display = "block";
                    } else {
                        outadd.style.display = "none";
                    }  
                    makeTbl(items,"out");
                }else if (message.type == "inout") {
                    inoutadd = document.getElementById("inout");
                    if (items.length == 0) {
                        inoutadd.style.display = "block";
                    } else {
                        inoutadd.style.display = "none";
                    }  
                    makeTbl(items,"inout");
                }
            });

            function addMember(lstype) {
                vscode.postMessage({
                    command: "new",
                    type: lstype,
                    id: lstype+"#"+"0",
                })
            }

            function makeTbl(items,tbtype) {
                if (tbtype == "local") {
                    curtable = document.getElementById("localtl");
                } else if (tbtype == "in") {
                    curtable = document.getElementById("intl");
                } else if (tbtype == "out") {
                    curtable = document.getElementById("outtl");
                } else if (tbtype == "inout") {
                    curtable = document.getElementById("inouttl");
                }
                curtable.innerHTML = "";

                for (let i = 0; i < items.length; i++) {
                    tr = document.createElement("tr");
                    tr.id = items[i].name;
                    tdtype = document.createElement("td");
                    

                    input = document.createElement("input");
                    input.className = "varinput";
                    input.type = "text";
                    input.value = items[i].type;

                    input.onchange = function() {
                        vscode.postMessage({
                            command: "change",
                            type: tbtype,
                            id: items[i].id+"#type",
                            value: this.value,
                        })
                    }

                    tdtype.appendChild(input);

                    tdname = document.createElement("td");
                    input = document.createElement("input");
                    input.className = "varinput";
                    input.type = "text";
                    input.value = items[i].name;
                    input.onchange = function() {
                        vscode.postMessage({
                            command: "change",
                            type: tbtype,
                            id:  items[i].id +"#name",
                            value: this.value,
                        })  
                    }
                    tdname.appendChild(input);

                    tdadd = document.createElement("td");
                    addbtn = document.createElement("button");
                    addbtn.className = "add_button";
                    addbtn.innerText = "+";
                    tdadd.appendChild(addbtn);

                    tddel = document.createElement("td");
                    delbtn = document.createElement("button");
                    delbtn.className = "add_button";
                    delbtn.innerText = "-";
                    tddel.appendChild(delbtn);

                    addbtn.onclick = function () {
                        vscode.postMessage({
                            command: "add",
                            type: tbtype,
                            id: items[i].id,
                        });
                    }

                    delbtn.onclick = function () {
                        vscode.postMessage({
                            command: "del",
                            type: tbtype,
                            id: items[i].id,
                        });
                    }

                    tr.appendChild(tdtype);
                    tr.appendChild(tdname);
                    tr.appendChild(tdadd);
                    tr.appendChild(tddel);
                    curtable.appendChild(tr);
                }
            }
        </script>
    </body>
    
    </html>`;
    return htmlStr;
}
exports.getWebviewContent = getWebviewContent;
//# sourceMappingURL=LadderConfigView.js.map