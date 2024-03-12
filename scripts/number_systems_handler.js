var dviykova_div, dviykova_input, visimkova_div, visimkova_input, desyatkova_div, desyatkova_input, shistnadcyatkova_div, shistnadcyatkova_input, reset_button, clear_button, historyList

function UpdateHistory(WithClear){
    newLolStorage = localStorage.getItem("convhistory")

    if (newLolStorage == undefined) { newLolStorage = [] } else { newLolStorage = JSON.parse(newLolStorage) }

    newLolStorage = newLolStorage.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
    })

    if (WithClear) { historyList.innerHTML = "" }

    for (key of newLolStorage) {
        let splitted = String(key).split(" / ")
        splitted0 = "'" + splitted[0] + "'"
        splitted1 = "'" + splitted[1] + "'"
        historyList.innerHTML = historyList.innerHTML + '<button class="h" onclick="UpdateInputs('+splitted0+', '+splitted1+', false)">' + splitted[0] + " | " + splitted[1] + "</button><br>"
    }
}

function UpdateInputs(InputType, InputValue, LogIt){
    if (LogIt === true){
        newLolStorage = localStorage.getItem("convhistory")

        if (newLolStorage == undefined) { newLolStorage = [] } else { newLolStorage = JSON.parse(newLolStorage) }

        newLolStorage.push(String(InputType) + " / " + String(InputValue))

        localStorage.setItem("convhistory", JSON.stringify(newLolStorage))

        UpdateHistory(true)
    }

    if (InputType == "Двійкова"){
        let decimal = parseInt(InputValue, 2)
        dviykova_input.value = decimal.toString(2)
        visimkova_input.value = decimal.toString(8)
        desyatkova_input.value = decimal
        shistnadcyatkova_input.value = decimal.toString(16)

    } else if (InputType == "Вісімкова"){
        let decimal = parseInt(InputValue, 8)
        dviykova_input.value = decimal.toString(2)
        visimkova_input.value = decimal.toString(8)
        desyatkova_input.value = decimal
        shistnadcyatkova_input.value = decimal.toString(16)

    } else if (InputType == "Десяткова"){
        let decimal = Number(InputValue)
        dviykova_input.value = decimal.toString(2)
        visimkova_input.value = decimal.toString(8)
        desyatkova_input.value = decimal
        shistnadcyatkova_input.value = decimal.toString(16)

    } else if (InputType == "Шістнадцяткова"){
        let decimal = parseInt(InputValue, 16)
        dviykova_input.value = decimal.toString(2)
        visimkova_input.value = decimal.toString(8)
        desyatkova_input.value = decimal
        shistnadcyatkova_input.value = decimal.toString(16)
    }
}

window.onload = function(){
    dviykova_div = document.getElementById("dviykova")
    dviykova_input = dviykova_div.getElementsByTagName("input")[0]

    visimkova_div = document.getElementById("visimkova")
    visimkova_input = visimkova_div.getElementsByTagName("input")[0]

    desyatkova_div = document.getElementById("desyatkova")
    desyatkova_input = desyatkova_div.getElementsByTagName("input")[0]

    shistnadcyatkova_div = document.getElementById("shistnadcyatkova")
    shistnadcyatkova_input = shistnadcyatkova_div.getElementsByTagName("input")[0]

    reset_button = document.getElementById("reset-button")
    clear_button = document.getElementById("clear-button")

    historyList = document.getElementById("historyList")

    dviykova_input.onchange = function(){
        UpdateInputs("Двійкова", dviykova_input.value, true)
    }
    visimkova_input.onchange = function(){
        UpdateInputs("Вісімкова", visimkova_input.value, true)
    }
    desyatkova_input.onchange = function(){
        UpdateInputs("Десяткова", desyatkova_input.value, true)
    }
    shistnadcyatkova_input.onchange = function(){
        UpdateInputs("Шістнадцяткова", shistnadcyatkova_input.value, true)
    }

    reset_button.onclick = function(){
        UpdateInputs("Двійкова", 0, false)
        UpdateInputs("Вісімкова", 0, false)
        UpdateInputs("Десяткова", 0, false)
        UpdateInputs("Шістнадцяткова", 0, false)
    }

    clear_button.onclick = function(){
        localStorage.removeItem("convhistory")
        UpdateHistory(true)
    }

    var footer_text = document.getElementById("footer-text")
    footer_text.onclick = function(){
        if (!String(footer_text.innerHTML).endsWith("Мабуть.")) {
            footer_text.innerHTML = footer_text.innerHTML + " Мабуть."
            footer_text.style.cursor = "default"
        }
    }


    UpdateHistory(true)
}