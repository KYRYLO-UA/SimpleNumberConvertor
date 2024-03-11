const TABLES = {
     "NOT": [[
          ["A", "result"],
          [0, 1],
          [1, 0]
     ], "Протилежне значення операнда", "NOT a"],

     "AND": [[
          ["A", "B", "result"],
          [0, 0, 0],
          [0, 1, 0],
          [1, 0, 0],
          [1, 1, 1],
     ], "Якщо оба операнди є 1", "a AND b"],

     "OR": [[
          ["A", "B", "result"],
          [0, 0, 0],
          [0, 1, 1],
          [1, 0, 1],
          [1, 1, 1],
     ], "Якщо хоча б один операнд є 1", "a OR b"],

     "NAND": [[
          ["A", "B", "result"],
          [0, 0, 1],
          [0, 1, 1],
          [1, 0, 1],
          [1, 1, 0],
     ], "Зворотня дія AND", "NOT (a AND b)"],
     
     "NOR": [[
          ["A", "B", "result"],
          [0, 0, 1],
          [0, 1, 0],
          [1, 0, 0],
          [1, 1, 0],
     ], "Зворотня дія OR", "NOT (a OR b)"],

     "XOR": [[
          ["A", "B", "result"],
          [0, 0, 0],
          [0, 1, 1],
          [1, 0, 1],
          [1, 1, 0],

     ], "0 якщо два операнди однакові, 1 якщо два операнди відрізняються", "(a AND b) AND (A OR b)"],

     "XNOR": [[
          ["A", "B", "result"],
          [0, 0, 1],
          [0, 1, 0],
          [1, 0, 0],
          [1, 1, 1],
     ], "Зворотня дія XOR", "(a AND b) AND NOT(A OR b)"],

     // "TESTING": [[
     //      ["A", "B", "C", "result"],
     //      [0, 0, 0, `<input type='text'></input>`],
     //      [0, 0, 1, `<input type='text'></input>`],
     //      [0, 1, 0, `<input type='text'></input>`],
     //      [1, 1, 1, `<input type='text'></input>`],
     // ], "Зворотня дія XOR", "(a AND b) AND NOT(A OR b)"]
}

var leftMouseButtonDown = false

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
                         const havefilter = i === 0 ? '' : `style="filter:blur(5px),transition:" onmousedown="this.style.filter='none'" onmouseover="if( leftMouseButtonDown === true ){ this.style.filter='none' }"`
                         html += `<${cellTag} ${havefilter}>${cell}</${cellTag}>`;
                    }
                    html += '</tr>';
               }
               html += '</table>';
               html += `</section>`
          }
          return html;
     }

     document.body.onmousedown = function(event){
          if (event.button == 0){
               leftMouseButtonDown = true
          }
     }

     document.body.onmouseup = function(event){
          if (event.button == 0){
               leftMouseButtonDown = false
          }
     }
     
     const tablesHTML = generateTruthTables(TABLES);
     document.getElementById("truth_tables").innerHTML = tablesHTML;

     const blurEnabled = localStorage.getItem('blurEnabled') === 'true';
     document.getElementById('blur-toggle').checked = blurEnabled;
     applyBlur(blurEnabled);
      
}

