const CUSTOM_TRUTH_TABLES = {}
const TABLE_BUTTONS = [ ["delete", "видалити таблицю"] ]

function setupGuidePatternsCopy() {
     document.querySelectorAll(".guide-pattern").forEach((span, index) => {
          span.onclick = function() {
               navigator.clipboard.writeText(span.textContent);
               navigator.vibrate([100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100])
          }
     })
     
}

function generateTableHtml(uniqueId) {
     var html = ""

     return html
}

function generateButtonsHtml(uniqueId) {
     var html = ""
     for (action of TABLE_BUTTONS) { html += `<button class="table-button-${action[0]}" data-unique="${uniqueId}" data-tablebutton="${action[0]}">${String(action[1]).toUpperCase()}</button>` }
     return html
}

function generateTableByPattern(uniqueId) {
     let tablePattern = CUSTOM_TRUTH_TABLES[uniqueId]
     var htmlContent = ""
     
     htmlContent += `<div class="" data-unique="${uniqueId}">`

     htmlContent += `<span class="table-title" data-uniqie="${uniqueId}">Custom Truth Table (${uniqueId})</span>`
     htmlContent += `<section class="table-cotable">${generateTableHtml(uniqueId)}</section>`
     htmlContent += `<section class="table-buttons">${generateButtonsHtml(uniqueId)}</section>`

     htmlContent += `</div>`

     return htmlContent
}

function createNewTable() {
     const uniqueId = String(Math.floor(Math.random() * 1000000))
     var tablePattern = {
          ARGS: { "a": [0, 0, 1, 1], },
          FUNCS: [ ["not", [1, 1, 0, 0]] ]
     }

     CUSTOM_TRUTH_TABLES[uniqueId] = tablePattern

     document.getElementById("custom-tables-block").innerHTML += generateTableByPattern(uniqueId)
}

window.onload = function() {
     createNewTable()
     setupGuidePatternsCopy()
}