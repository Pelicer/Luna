function ShowPassword(ImgElement){
    var Input = document.getElementById("password");
    Input.setAttribute("Type", Input.getAttribute("Type") == "password" ? "Text" : "password");
    if(ImgElement.getAttribute("isvisible") == "False"){
        ImgElement.setAttribute("isvisible", "True");
        ImgElement.setAttribute("src", "style/content/icon/view_off.png")
    }else{
        ImgElement.setAttribute("isvisible", "False");
        ImgElement.setAttribute("src", "style/content/icon/view_on.png")
    }
}

function CheckEmail(Email){
    var Pattern = new RegExp("\@[a-zA-Z0-9]*.com");
    var EmailChecked = document.getElementById("email-checked");
    var Tooltip = document.getElementById("email-tooltip");
    var IsValid = Pattern.test(Email.value);
    if(!IsValid){
        Email.style.border = "1px solid red"; 
        Tooltip.style.display = "inline-block";
        EmailChecked.style.display = "none";
    }else{
        var EmailChecked = document.getElementById("email-checked");
        EmailChecked.style.display = "block";        
        Email.style.border = "none"; 
        Tooltip.style.display = "none";
    }
}