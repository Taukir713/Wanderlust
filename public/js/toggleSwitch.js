let toggleSwitch = document.querySelector(".form-check-input"); 
toggleSwitch.addEventListener("click" , function() { 
    let taxInfo = document.getElementsByClassName("tax-info"); 
    for(let info of taxInfo) { 
        if(info.style.display != "inline") {
            info.style.display = "inline"
        } else {
            info.style.display = "none"
        }
    }
})