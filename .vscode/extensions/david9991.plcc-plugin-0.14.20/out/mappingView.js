"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebviewContent = void 0;
const i18n_1 = __importDefault(require("./i18n"));
function getWebviewContent() {
    let htmlStr = `<html>
  <body>
      <table>
          <thead>
              <td style="min-width: 180px">` + i18n_1.default.__('Name') + `</td>
              <td style="min-width: 120px">` + i18n_1.default.__('Type') + `</td>
              <td style="min-width: 200px">` + i18n_1.default.__('Address') + `</td>
              <td style="min-width: 200px">` + i18n_1.default.__('Description') + `</td>
          </thead>
          <tbody id="address-list">
          </tbody>
      </table>
  </body>
  <script>
  const list = document.getElementById('address-list');
  const vscode = acquireVsCodeApi();
  var newlist;
  window.addEventListener('message', event => {
      list.innerHTML = "";
      newlist = event.data;
      for (var i = 0; i < event.data.length; i++) {
          let tr = document.createElement('tr');
          let td = document.createElement('td');
          td.colSpan = 4;
          td.style = "font-size: 13px; font-weight: bold; background: var(--vscode-list-hoverBackground)"
          td.innerHTML = event.data[i].NetworkType;
          tr.appendChild(td);
          list.appendChild(tr);
          for (var j = 0; j < event.data[i].IOVariable.length; j++) {
              let tr = document.createElement('tr');
              let name = document.createElement('td');
              let type = document.createElement('td');
              let addr = document.createElement('td');
              let desc = document.createElement('td');
              tr.appendChild(name);
              tr.appendChild(type);
              tr.appendChild(addr);
              tr.appendChild(desc);
              let addrinput = document.createElement('input');
              addrinput.type = "text";
              addrinput.style = "width: 50px";
              addrinput.setAttribute('i', i);
              addrinput.setAttribute('j', j);
              addrinput.setAttribute('p', String(event.data[i].IOVariable[j].Address).substring(0, 3));
              addrinput.value = String(event.data[i].IOVariable[j].Address).substring(3);
              addrinput.onchange = function() {
                  newlist[this.getAttribute('i')].IOVariable[this.getAttribute('j')].Address = this.getAttribute('p') + this.value;
                  vscode.postMessage(newlist);
              }
              let addrinputdiv = document.createElement('div');
              addrinputdiv.style = "width: 50px; float: left";
              addrinputdiv.appendChild(addrinput);
              let addrlabel = document.createElement('nobr');
              addrlabel.innerHTML = String(event.data[i].IOVariable[j].Address).substring(0, 3);
              let addrlabeldiv = document.createElement('div');
              addrlabeldiv.style = "width: 50px; float: left";
              addrlabeldiv.appendChild(addrlabel);
              addr.appendChild(addrlabeldiv);
              addr.appendChild(addrinputdiv);
              name.innerHTML = event.data[i].IOVariable[j].Name;
              type.innerHTML = event.data[i].IOVariable[j].Type;
              desc.innerHTML = event.data[i].IOVariable[j].Description;
              list.appendChild(tr);
          } 
      }
  });
  </script>
  </html>`;
    return htmlStr;
}
exports.getWebviewContent = getWebviewContent;
//# sourceMappingURL=mappingView.js.map