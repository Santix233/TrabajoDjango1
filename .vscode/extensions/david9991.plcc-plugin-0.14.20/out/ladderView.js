"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebviewContent = void 0;
function getWebviewContent(toolbarStr, blockarrowStr) {
    let htmlStr = `<!DOCTYPE html>
  <html lang="en" id="ladderView">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">
  
      <style type="text/css">
            *{
                margin: 0;
                padding: 0;
            }
          
            .toolbar {
                display:flex;
                position: absolute; 
                width:100%;
                top:0px; 
                left:0px; 
                height:45px; 
                -webkit-user-select:none;
                overflow-x: scroll; 
                overflow-y: hidden;
                
            }     
            .nav {
                padding:0px 20px 0px 20px;
                flex-shrink: 0;
            }
         
            .toolbarUL {
                display: block;
              }
              
            .toolbarUL li {
                display: inline-block;
                list-style: none;
                margin: 0px;
                pading:0px;
            }

            .toolbarUL svg {
                display: inline-block;
                margin:0 5px 0 5px;
                width: 45px;
                height: 45px;
            }

            .toolbarUL svg:hover {
                background-color: #454545;
                opacity: 0.3 !important;
                border-radius: 3px;
            }

            .toolbar::-webkit-scrollbar { 
                display: none;
            }

            .aright{
                right:0px;
            }
            .aleft {
                left:0px;
            }
            .aright,
            .aleft {
                display:none;
                position:absolute;
                top:0px;
                width:25px; 
                height:45px;
                line-height:40px;
                color: white;
                z-index:999;
                background-color:#303031;
            }
            .aright > svg,
            .aleft > svg {
                margin-top:10px;
                width:25px;
                height:25px;
            }

          .canvas {
            margin:50px 0 0 0; 
            overflow-x: scroll; 
            overflow-y:scroll;
          }

          .arrowbar {
            position:fixed; 
            top:40%; 
            left:0px; 
            width:25px; 
            height:100px; 
            -webkit-user-select:none;
          }
          .arrowbar ul {
            width: auto;
            padding: 0px;
            margin: 0px;
          }

          .arrowbar li {
            margin-top: 15px;
            list-style: none;
          }
          
          .undisabled {
            pointer-events: auto;
            opacity: 1;
          }

          .disabled {
            pointer-events: none;
            opacity: 0.2;
          }

          .arrowbar svg {
            display: inline-block;
            margin-left: 3px;
            width: 20px;
            height: 20px;
          }

          .arrowbar svg:hover {
            background-color: #454545;
            opacity: 0.3 !important;
            border-radius: 3px;
          }

          g.LD>rect,
          g.LDN>rect,
          g.LDR>rect,
          g.COIL>rect,
          g.COILS>rect,
          g.COILR>rect,
          g.OR>rect,
          g.ORAbove>rect,
          g.ORN>rect,
          g.BranchFirst>rect,
          g.BranchSecond>rect,
          g.BranchDown>rect,
          g.BranchUp>rect {
              fill: var(--vscode-list-hoverBackground) !important;
              fill-opacity: 0.5 !important;
              stroke: var(--vscode-menu-foreground) !important;
          }
  
          g.FB>rect {
              fill: var(--vscode-list-hoverBackground) !important;
              fill-opacity: 0.5 !important;
              stroke: var(--vscode-menu-foreground) !important;
          }
  
          g.Block>rect {
              fill: none;
              fill-opacity: 0.5;
              stroke-color: var(--vscode-list-activeSelectionForeground) !important;
          }
  
          input {
            width: 98% !important; 
            height: 14px !important;
            border: none;
            background-color: transparent;
            font-size: 12px
            font-family: sans-serif;
            font-weight: thick;  
            color: var(--vscode-input-placeholderForeground);
            box-shadow: none;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          g.LD>text,
          g.LDN>text,
          g.LDR>text,
          g.COIL>text,
          g.COILS>text,
          g.COILR>text,
          g.OR>text,
          g.g.ORAbove>text,
          g.ORN>text,
          g.BranchFirst>text,
          g.BranchSecond>text,
          g.BranchDown>text,
          g.BranchUp>text {
              fill: var(--vscode-menu-foreground) !important;
          }
  
          g.FB>text {
              fill: var(--vscode-menu-foreground) !important;
          }
  
          g.Block>text {
              fill: var(--vscode-menu-foreground) !important;
          }
  
          g.LD>line,
          g.LDN>line,
          g.LDR>line,
          g.COIL>line,
          g.COILS>line,
          g.COILR>line,
          g.OR>line,
          g.g.ORAbove>line,
          g.ORN>line,
          g.BranchFirst>line,
          g.BranchSecond>line,
          g.BranchDown>line,
          g.BranchUp>line {
              stroke: var(--vscode-menu-foreground) !important;
              stroke-width: 2px !important;
              stoke-opacity: 1 !important;
          }

          g.BranchFirst>rect,
          g.BranchSecond>rect,
          g.BranchDown>rect,
          g.BranchUp>rect {
            fill: var(--vscode-menu-foreground) !important;
            fill-opacity: 1 !important;
            stroke-color:  var(--vscode-menu-foreground) !important;
          }
          
          g.FB>line {
              stroke: var(--vscode-menu-foreground) !important;
              stroke-width: 2px !important;
              stoke-opacity: 1 !important;
          }
  
          line {
              stroke: var(--vscode-menu-foreground) !important;
              stroke-width: 2px !important;
              stoke-opacity: 1 !important;
          }
  
          g.Line>line {
              stroke: var(--vscode-menu-foreground) !important;
              stroke-width: 2px !important;
              stoke-opacity: 1 !important;
          }
  
          g.BlockHeadS>line {
              stroke: var(--vscode-menu-foreground) !important;
              stroke-width: 4px !important;
              stoke-opacity: 0.3 !important;
          }
  
          g.BlockHeadE>line {
              stroke: var(--vscode-menu-foreground) !important;
              stroke-width: 4px !important;
              stoke-opacity: 0.1 !important;
          }
  
          g.LDCursor>rect {
              fill: var(--vscode-list-hoverBackground) !important;
              fill-opacity: 0.5 !important;
              stroke-color: var(--vscode-list-hoverBackground) !important;
          }
  
          g.FBCursor>rect {
              fill: var(--vscode-list-hoverBackground) !important;
              fill-opacity: 0.5 !important;
              stroke-color: var(--vscode-list-hoverBackground) !important;
          }
  
          g.BlockCursor>rect {
              fill: var(--vscode-list-hoverBackground) !important;
              fill-opacity: 0.5 !important;
              stroke-color: none;
          }
  
          /* 设置滚动条的样式 */
          ::-webkit-scrollbar {
              width: 12px;
          }
  
          /* 滚动槽 */
          ::-webkit-scrollbar-track {
              -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
              border-radius: 10px;
          }
  
          /* 滚动条滑块 */
          ::-webkit-scrollbar-thumb {
              border-radius: 10px;
              background: #cccccc;
              -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
          }
  
          ::-webkit-scrollbar-thumb:window-inactive {
              background: rgba(255, 0, 0, 0.4);
          }

      </style>
  
      <script>
          const vscode = acquireVsCodeApi();
        
          window.addEventListener('message', event => {
              const divCanvas = document.getElementById('canvas');
              const svgCanvas = document.getElementById('ladderSvg');

              const abovebtn = document.getElementById('blockup');
              const belowbtn = document.getElementById('blockdown');  

              var H = document.documentElement.clientHeight;
              var W = document.documentElement.clientWidth;
  
              divCanvas.style.width = (W - 50) + "px";
              divCanvas.style.height = (H - 60) + "px";
  
              const message = event.data;
              if (message.type == "ladder") {
                svgCanvas.innerHTML = message.item;
                var bbox = svgCanvas.getBBox();
                svgCanvas.style.width = bbox.width + "px";
                svgCanvas.style.height = (bbox.height + 100) + "px";
            } else if (message.type == "curblockpos"){
                if (message.item == "head") {
                    abovebtn.style.display = "block";
                    belowbtn.style.display = "block";
                    abovebtn.className="disabled";
                    belowbtn.className="undisabled";
                } else if (message.item == "tail") {
                    abovebtn.style.display = "block";
                    belowbtn.style.display = "block";
                    abovebtn.className="undisabled";
                    belowbtn.className="disabled"
                } else if (message.item == "headtail") {
                    abovebtn.style.display = "block";
                    belowbtn.style.display = "block";
                    abovebtn.className="disabled";
                    belowbtn.className="disabled";
                } else if (message.item == "middle") {
                    abovebtn.style.display = "block";
                    belowbtn.style.display = "block";
                    abovebtn.className="undisabled";
                    belowbtn.className="undisabled";
                } else {
                    abovebtn.style.display = "none";
                    belowbtn.style.display = "none";
                }
              } else if(message.type == "toobarlist") { 
                    var skList= message.item;
                    var isMac;
                    
                    if(navigator.userAgent.indexOf('Mac') >= 0){
                        isMac = true;
                    }
                    
                    if(message.item !=''){
                        for(var i=0; i<skList.length; i++){  

                            if(skList[i].command == 'plcc.blockinsertup'){
                                 var title= document.getElementById('blockinsertupTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                             }

                             if(skList[i].command == 'plcc.block'){
                                var title= document.getElementById('blockTitle');  
                                if(isMac){
                                    title.innerHTML= skList[i].mac; 
                                }
                                else {
                                    title.innerHTML= skList[i].key; 
                                }
                            }  

                             if(skList[i].command == 'plcc.ld'){
                                 var title= document.getElementById('ldTitle');
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }

                            if(skList[i].command == 'plcc.ldn'){
                                 var title= document.getElementById('ldnTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }

                            if(skList[i].command == 'plcc.orbove'){
                                 var title= document.getElementById('oraboveTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }

                            if(skList[i].command == 'plcc.or'){
                                var title= document.getElementById('orTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }

                            if(skList[i].command == 'plcc.orn'){
                                var title= document.getElementById('ornTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }

                            if(skList[i].command == 'plcc.ldr'){
                                var title= document.getElementById('ldrTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }

                            if(skList[i].command == 'plcc.coil'){
                                var title= document.getElementById('coilTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }

                            if(skList[i].command == 'plcc.coils'){
                                var title= document.getElementById('coilsTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }

                            if(skList[i].command == 'plcc.coilr'){
                                var title= document.getElementById('coilrTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }

                            if(skList[i].command == 'plcc.fb'){
                                var title= document.getElementById('fbTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }                           

                            if(skList[i].command == 'plcc.branchup'){
                                var title= document.getElementById('branchupTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }

                            if(skList[i].command == 'plcc.newbranch'){
                                var title= document.getElementById('newbranchTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }
                            if(skList[i].command == 'plcc.branchdown'){
                                var title= document.getElementById('branchdownTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }

                            if(skList[i].command == 'plcc.delete'){
                                var title= document.getElementById('deleteTitle');  
                                 if(isMac){
                                     title.innerHTML= skList[i].mac; 
                                 }
                                 else {
                                     title.innerHTML= skList[i].key; 
                                 }
                            }

                        }
                    }
              }
          });
  
          window.onload = function () {
            /* 控制toolbar*/
            GetToolbar();
            Menu_click();
            getScroll();
              var divCanvas = document.getElementById('canvas');
              var H = document.documentElement.clientHeight;
              var W = document.documentElement.clientWidth;
              divCanvas.style.height = (H - 60) + "px";
              vscode.postMessage({
                  command: 'resize',
                  width: W,
                  height: H
              })
          }

        
          window.onresize = function () {
              GetToolbar();
              getScroll();
              var divCanvas = document.getElementById('canvas');
              var H = document.documentElement.clientHeight;
              var W = document.documentElement.clientWidth;
              divCanvas.style.height = (H - 60) + "px";
              vscode.postMessage({
                  command: 'resize',
                  width: W,
                  height: H,
              })
          }
  
        window.onkeyup = function () {
            let event = window.event;
            let keycode = event.keyCode;
            if (keycode == 13) {
                /* Enter */
                if (event.target.id == "") {
                    //do nothing
                } else {
                    vscode.postMessage({
                        command: 'edit',
                        inputId:event.target.id,
                        inputValue:event.target.value,
                    })
                }
            }  
        }

        function selectinput(evt) {
            evt.stopPropagation()
            return false;
        }

        function compinput(id,value) {
            if (id == "") {
                //do nothing
            } else {
                vscode.postMessage({
                    command: 'edit',
                    inputId:id,
                    inputValue:value,
                })
            }
        }

        function M_up() {
            let event = window.event;
            let x = event.offsetX;
            let y = event.offsetY;
            vscode.postMessage({
                command: 'selectitem',
                X: x,
                Y: y,
            })
        }
  
        function M_down() {
            let event = window.event;
            let x = event.offsetX;
            let y = event.offsetY;
            vscode.postMessage({
                command: 'mousedown',
                X: x,
                Y: y
            })
        }

        function M_move() {
            let event = window.event;
            let x = event.offsetX;
            let y = event.offsetY;
            vscode.postMessage({
                command: 'mousemove',
                X: x,
                Y: y
            })
        }

        function M_dblclick() {
            let event = window.event;
            let x = event.offsetX;
            let y = event.offsetY;
            vscode.postMessage({
                command: 'dblclick',
                X: x,
                Y: y
            })
        }

        function Menu_click(){
            var lis= document.getElementsByTagName("li");
            var len = lis.length;

            for(var i=0;i<len;i++){
              lis[i].onclick = function(){  
                vscode.postMessage({
                  command:this.type
                })  
                
                for(var j=0;j<len;j++){
                  lis[j].style.backgroundColor=""; 
                  lis[j].style.opacity="1";
                }                       
                this.style.backgroundColor="#454545"; 
                this.style.borderRadius="3px";
                this.style.opacity="0.8";
              };              
            }
           
            var divCanvas = document.getElementById('canvas');
            divCanvas.onclick= function(){
                for(var j=0;j<len;j++){
                    lis[j].style.backgroundColor=""; 
                    lis[j].style.opacity="1";
                  }    
            }
        }

        function GetToolbar(){
            var W = document.documentElement.clientWidth;
            var nav = document.getElementById('nav');
            var tbLeft = document.getElementById('aright');
            var tbRight = document.getElementById('aleft');

            var tbUL =  document.getElementById('toolbarUL');
            if(W > tbUL.offsetWidth){
                tbLeft.style.display ="none";
                tbRight.style.display ="none";  
            } else {
                tbLeft.style.display ="block";
                tbRight.style.display ="block";
            }
        }

        function getScroll(){
            var toolbar = document.getElementById('toolbar');
            var tbUL =  document.getElementById('toolbarUL');
            var nav = document.getElementById('nav');

            var buttonL = document.getElementById('aright');
            var buttonR = document.getElementById('aleft');

            nav.style.width = tbUL.offsetWidth + "px";

            buttonL.addEventListener("click",(event)=> {
                event.preventDefault();
                toolbar.scrollLeft += 30;
            })

            buttonR.addEventListener("click",(event)=> {
                event.preventDefault();
                toolbar.scrollLeft -= 30;
            })
        }
      </script>
  </head>
  
  <body>
    <span id="aright" class="aright">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"> 
        <g
            inkscape:label="Layer 1"
            inkscape:groupmode="layer"
            id="layer1"
            transform="translate(0,0) scale(0.18)">
            <path
                d="m 47.99164,20.917669 41.970254,38.633237 c 1.293229,1.139659 2.044035,2.817924 2.037931,4.54757 -0.0061,1.729647 -0.768738,3.40257 -2.069979,4.533073 L 47.687948,106.96758 c -2.006581,1.88474 -4.873406,2.46919 -7.464441,1.48711 -2.536992,-0.98189 -4.312481,-3.3124 -4.573012,-6.06998 l 0.271644,-76.969259 c 0.225932,-2.75586 2.017833,-5.07377 4.615743,-6.037548 2.597903,-0.963767 5.460531,-0.35909 7.453758,1.539766 z"
                fill="#cccccc"
                p-id="3135"
                id="path87"
                style="stroke-width:0.125" />
        </g>
    </svg>
    </span>
    <span id="aleft" class="aleft">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"> 
        <g
            inkscape:label="Layer 1"
            inkscape:groupmode="layer"
            id="layer1"
            transform="translate(0,0) scale(0.18)">
            <path
                d="M 79.946448,107.0245 37.84011,68.539627 c -1.297243,-1.135088 -2.053968,-2.810693 -2.053968,-4.54035 0,-1.729657 0.756725,-3.405262 2.053968,-4.54035 L 79.946448,20.974058 c 1.999916,-1.891811 4.864661,-2.486382 7.459146,-1.513449 2.540441,0.972932 4.324144,3.297157 4.594406,6.053798 v 76.969743 c -0.216204,2.75664 -1.999914,5.08086 -4.594406,6.0538 -2.594485,0.97293 -5.45923,0.37836 -7.459146,-1.51345 z"
                fill="#cccccc"
                p-id="3135"
                id="path87"
                style="stroke-width:0.125" />
        </g>
    </svg>
    </span>
       <div id="toolbar" class="toolbar">
            <div id="nav" class="nav"> <nobr>${toolbarStr}</nobr></div>
       </div>
       <div id="arrowbar" class="arrowbar"> ${blockarrowStr} </div>       
       <div id="canvas" class="canvas">
            <svg id="ladderSvg" xmlns="http://www.w3.org/2000/svg" version="1.1" onmousemove="M_move()" onclick="M_up()"> </svg>
       </div>
  </body>
  
  </html>`;
    return htmlStr;
}
exports.getWebviewContent = getWebviewContent;
//# sourceMappingURL=ladderView.js.map