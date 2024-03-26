const TABLES = {
     "NOT": [[
          ["A", "<i>res</i>"],
          [0, 1],
          [1, 0]
     ], "Протилежне значення операнда", "NOT a"],

     "Buffer": [[
          ["A", "<i>res</i>"],
          [0, 0],
          [1, 1]
     ], "Буфер, там входить, зберігається і виходить одне значення", "a"],

     "Buffer + NOT": [[
          ["A", "<i>res</i>"],
          [0, 1],
          [1, 0]
     ], "Буфер, там входить, зберігається одне значення, а виходить протилежне значення", "NOT a"],

     "AND": [[
          ["A", "B", "<i>res</i>"],
          [0, 0, 0],
          [0, 1, 0],
          [1, 0, 0],
          [1, 1, 1],
     ], "Якщо оба операнди є 1", "a AND b"],

     "OR": [[
          ["A", "B", "<i>res</i>"],
          [0, 0, 0],
          [0, 1, 1],
          [1, 0, 1],
          [1, 1, 1],
     ], "Якщо хоча б один операнд є 1", "a OR b"],

     "NAND": [[
          ["A", "B", "<i>res</i>"],
          [0, 0, 1],
          [0, 1, 1],
          [1, 0, 1],
          [1, 1, 0],
     ], "Зворотня дія AND", "NOT (a AND b)"],
     
     "NOR": [[
          ["A", "B", "<i>res</i>"],
          [0, 0, 1],
          [0, 1, 0],
          [1, 0, 0],
          [1, 1, 0],
     ], "Зворотня дія OR", "NOT (a OR b)"],

     "XOR": [[
          ["A", "B", "<i>res</i>"],
          [0, 0, 0],
          [0, 1, 1],
          [1, 0, 1],
          [1, 1, 0],

     ], "0 якщо два операнди однакові, 1 якщо два операнди відрізняються", "(a AND b) AND (A OR b)"],

     "XNOR": [[
          ["A", "B", "<i>res</i>"],
          [0, 0, 1],
          [0, 1, 0],
          [1, 0, 0],
          [1, 1, 1],
     ], "Зворотня дія XOR", "(a AND b) AND NOT(A OR b)"],
}

const CUSTOM_TRUTH_TABLES = {}

const actions = [     
     ["not", [false, true]],
     ["and", [true, true]],
     ["or", [true, true]],
     ["nand", [true, true]],
     ["nor", [true, true]],
     ["xor", [true, true]],
     ["xnor", [true, true]],
     ["joke", [true, false]],
     ["----------", [false, false]],
     ["–", [false, true]],
     ["⋀", [true, true]],
     ["⋁", [true, true]],
     ["→", [true, true]],
     ["~", [true, true]],
     ["↑", [true, true]],
     ["↓", [true, true]],
     ["⊕", [true, true]],
     
]

var leftMouseButtonDown = false

window.updateSelectInput = function(hisid, hisvalue) {
     var selectElement = document.getElementById(hisid)
     var seltype = selectElement.dataset.seltype
     const action = actions.find(action => action[0] === hisvalue);

     if (action){
          if (action[1][seltype-1] == true) {
               selectElement.style.display = "inline-block"
          } else {
               selectElement.style.display = "none"
          }
     }
}

window.setupSelectors = function(uniqueTableId){
     for (element of document.getElementsByClassName(`function-selector-${uniqueTableId}`)){
          element.value = CUSTOM_TRUTH_TABLES[uniqueTableId].FUNCS[Number(element.dataset.column)][0]
          updateSelectInput(`formula-input-first-${uniqueTableId}-${String(element.dataset.column)}`, element.value)
          updateSelectInput(`formula-input-second-${uniqueTableId}-${String(element.dataset.column)}`, element.value)
          element.onchange = function(){
               CUSTOM_TRUTH_TABLES[uniqueTableId].FUNCS[Number(element.dataset.column)][0] = element.value
               updateSelectInput(`formula-input-first-${uniqueTableId}-${String(element.dataset.column)}`, element.value)
               updateSelectInput(`formula-input-second-${uniqueTableId}-${String(element.dataset.column)}`, element.value)
               
          }
     }
}

function createNewCustomTruthTable() { 
     let customTruthTablesDiv = document.getElementById("custom-truth-tables")
     var uniqueTableId = String(Math.floor(Math.random(111111, 999999) * 1000000))

     CUSTOM_TRUTH_TABLES[uniqueTableId] = {
          "ARGS": {
               "A": [0, 0, 1, 1],
          },
          "FUNCS": [
               ["joke", ["A", "B"], [1, 1, 0, 0]],
          ]
     }

     let newTableHtml = ""
     newTableHtml += `<div class="custom-truth-table ${uniqueTableId}" id="${uniqueTableId}">` // start div
     newTableHtml += `<section>` 
     newTableHtml += `<span id="${uniqueTableId}-title" class="custom-truth-table-title ${uniqueTableId}">Таблиця істинності ${uniqueTableId}</span>` // create title
     newTableHtml += `<button id="${uniqueTableId}-button-addarg" class="custom-truth-table-manage-button addarg">ДОДАТИ АРГУМЕНТ</button>` // add argument button
     newTableHtml += `<button id="${uniqueTableId}-button-addfunc" class="custom-truth-table-manage-button addfunc">ДОДАТИ ФУНКЦІЮ</button>` // add function button
     newTableHtml += `<button id="${uniqueTableId}-button-delete" class="custom-truth-table-manage-button delete">ВИДАЛИТИ ТАБЛИЦЮ</button>` // add function button
     newTableHtml += `</section>`
     newTableHtml += `<div id="${uniqueTableId}-dtable"></div>`
 
     newTableHtml += `</div>`
 
     customTruthTablesDiv.innerHTML += newTableHtml
 
     var generalDiv = document.getElementById(uniqueTableId)
     var title = document.getElementById(`${uniqueTableId}-title`)
     var dtable = document.getElementById(`${uniqueTableId}-dtable`) 

     function regenerateTableArguments() {
          var ncolumns = Object.keys(CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS).length
          var ncombinations = Math.pow(2, ncolumns)

          const combinations = [];

          for (let index = 0; index < ncombinations; index++) {
               const binaryString = index.toString(2);
               const combination = binaryString.padStart(ncolumns, "0").split("").map(Number);
               combinations.push(combination);
          }

          CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS = {}

          for (let lIndex = 0; lIndex < ncolumns; lIndex++) {
               let newArg = String.fromCharCode(Object.keys(CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS).length + 65);
               CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS[newArg] = Array(ncolumns)
               for (const [i, row] of combinations.entries()) {
                    CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS[newArg][i] = row[lIndex]
               }
          }
     }

     function generateDefaultFunctions(column) {
          var thishtml = ""
          thishtml += `<input class="formula-input first" id="formula-input-first-${uniqueTableId}-${column}" data-seltype="1" type="text">`
          thishtml += `<select class="function-selector-${uniqueTableId}" data-column=${column} id="${uniqueTableId}" name="functionsChoose">`
          for (value of actions) { thishtml += `<option value="${String(value[0])}">${String(value[0]).toLocaleUpperCase()}</option>` }
          thishtml += "</select>"
          thishtml += `<input class="formula-input second" id="formula-input-second-${uniqueTableId}-${column}" data-seltype="2" type="text">`
          return thishtml
     }

     function setupTableButtons() {
          let addArgumentButton = document.getElementById(`${uniqueTableId}-button-addarg`)
          addArgumentButton.onclick = function() { 
               let args = Object.keys(CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS);

               if ( args.length >= 6 ) { return } 

               let newArg = String.fromCharCode(args.length + 65);
               CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS[newArg] = Array(CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS[args[0]].length).fill(0);
               regenerateTableArguments()
               updateTable();

               if ( Object.keys(CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS).length >= 6 ) { addArgumentButton.disabled = true } 
          }

          let addFunctionButton = document.getElementById(`${uniqueTableId}-button-addfunc`)
          addFunctionButton.onclick = function() {
               let funcs = Object.keys(CUSTOM_TRUTH_TABLES[uniqueTableId].FUNCS);
               let newFunc = "not"
               CUSTOM_TRUTH_TABLES[uniqueTableId].FUNCS.push([newFunc, Array(CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS[Object.keys(CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS)[0]].length).fill(0)])
               console.log(CUSTOM_TRUTH_TABLES[uniqueTableId].FUNCS)
               updateTable();
          }

          let deleteButton = document.getElementById(`${uniqueTableId}-button-delete`)
          deleteButton.onclick = function() {
               generalDiv.remove()
          }
     }

     function setupCellsButtons() {

     }
 
     function updateTable() {
          let table = "<table border='1'><thead><tr>";
 
          Object.keys(CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS).forEach((arg, index) => {
               table += `<th class="custom-truth-table-cell-header">`
               // table += `<button class="cell-header-moveleft-button" id="${uniqueTableId}-arg-cell-${index}-${arg}-moveleft" unique="${uniqueTableId}">‹</button>`
               // table += `<button id="${uniqueTableId}-arg-cell-${index}-${arg}-moveright">›</button>`
               table += `<span class="custom-truth-table-cell-header-title">${arg}</span>`
               table += `<button id="${uniqueTableId}-arg-cell-${index}-${arg}-delete">×</button>`
               table += `</th>`
               // let moveLeft = document.getElementById(`${uniqueTableId}-arg-cell-${index}-${arg}-move-left`); 
               // let moveRight = document.getElementById(`${uniqueTableId}-arg-cell-${index}-${arg}-move-right`)
          });
          Object.keys(CUSTOM_TRUTH_TABLES[uniqueTableId].FUNCS).forEach((func, index) => {
               table += `<th>${generateDefaultFunctions(index)}</th>`;
          });
 
          table += "</tr></thead><tbody>";
 
          for (let i = 0; i < CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS.A.length; i++) {
               table += "<tr>";

               Object.keys(CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS).forEach(arg => {
                    table += `<td><input data-notinputing=true readonly class="table_input" type="number" value="${CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS[arg][i]}" min=0 max=1 data-truevalue="${CUSTOM_TRUTH_TABLES[uniqueTableId].ARGS[arg][i]}"></td>`;
               });

               Object.values(CUSTOM_TRUTH_TABLES[uniqueTableId].FUNCS).forEach(func => {
                    table += `<td><input class="table_input" type="number" value="${func[i]}" min=0 max=1 data-iscustom=true data-truevalue="${func[i]}"></td>`;
               });

               table += "</tr>";
          }
 
          table += "</tbody></table>";
     
          dtable.innerHTML = table;

          setupCellsButtons()
          setupSelectors(uniqueTableId)
     }
 
     updateTable()
     setupTableButtons()
 }
 

function setupColorHighlighting(forceChange) {
     const inputEnabled = document.getElementById('input-toggle').checked;
     const cells = document.querySelectorAll('.table_input');

     if (forceChange === true | forceChange === false) {
          cells.forEach(cell => {
               if (!inputEnabled) {
                    cell.style["background-color"] = "white"
                    cell.value = cell.dataset.truevalue
               } else {
                    cell.value = ""
               }
          });
          return
     } 

     cells.forEach(cell => {
          cell.onchange = function() {
               if (inputEnabled) {
                    if ( cell.value === cell.dataset.truevalue ) {
                         cell.style["background-color"] = "rgb(204, 255, 204)"
                    } else {
                         cell.style["background-color"] = "rgb(255, 102, 102)"
                    }
               }
          }
          cell.addEventListener("mousedown", function(event) { if (cell.readOnly) { event.preventDefault(); } });
          cell.addEventListener("keydown", function(event) { if (cell.readOnly) { event.preventDefault(); } });
     });
     
}

function applyInputMode(inputEnabled) {
     // let isfrom = document.getElementById("truth-tables")
     const cells = document.querySelectorAll('.table_input');
     cells.forEach(cell => {
          if (cell.dataset.iscustom) { cell.readOnly = false } else { cell.readOnly = !inputEnabled }
     });
     setupColorHighlighting(inputEnabled)
}

function toggleInput() {
     const inputEnabled = document.getElementById('input-toggle').checked;
     localStorage.setItem('inputEnabled', inputEnabled);
     applyInputMode(inputEnabled)
}

function toggleBlur() {
     const blurEnabled = document.getElementById('blur-toggle').checked;
     localStorage.setItem('blurEnabled', blurEnabled);
     applyBlur(blurEnabled);
 }
 
function applyBlur(blurEnabled) {
     const cells = document.querySelectorAll('.table_data td');
     cells.forEach(cell => {
         cell.style.filter = blurEnabled ? 'blur(10px)' : 'none';
     });
}

window.onload = function(){
     document.body.onmousedown = function(event){ if (event.button == 0){ leftMouseButtonDown = true } }

     document.body.onmouseup = function(event){ if (event.button == 0){ leftMouseButtonDown = false } }

     function generateTruthTables(tables) {
          let html = '';
          for (const [title, [data, description, moreinfo]] of Object.entries(tables)) {
               html += `<section class="truth_table">`
               html += `<span class="table_title">${title}</span>`;
               html += `<span class="table_descr" onmouseenter="this.innerText='${moreinfo}'" onmouseleave="this.innerText='${description}'">${description}</span>`;
               html += '<table class="table_data">';
               for (let i = 0; i < data.length; i++) {
                    html += '<tr>';
                    for (const cell of data[i]) {
                         const cellTag = i === 0 ? 'th' : 'td';
                         const havefilter = i === 0 ? '' : `style="filter:blur(5px)" onmousedown="this.style.filter='none'" onmouseover="if( leftMouseButtonDown === true ){ this.style.filter='none' }"`
                         html += `<${cellTag} ${havefilter}>${cellTag === "th" ? cell : `<input readonly class="table_input" type="number" value=${cell} min=0 max=1 data-truevalue=${cell}>`}</${cellTag}>`;
                    }
                    html += '</tr>';
               }
               html += '</table>';
               html += `</section>`
          }
          return html;
     }

     const tablesHTML = generateTruthTables(TABLES);
     document.getElementById("truth-tables").innerHTML = tablesHTML;

     const blurEnabled = localStorage.getItem('blurEnabled') === 'true';
     document.getElementById('blur-toggle').checked = blurEnabled;
     applyBlur(blurEnabled);

     const inputEnabled = localStorage.getItem('inputEnabled') === 'true';
     document.getElementById('input-toggle').checked = inputEnabled;
     applyInputMode(inputEnabled)
     setupColorHighlighting()
}
