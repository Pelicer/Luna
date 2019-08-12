function ShowPassword(ImgElement) {
    var Input = document.getElementById("password");
    Input.setAttribute("Type", Input.getAttribute("Type") == "password" ? "Text" : "password");
    if (ImgElement.getAttribute("isvisible") == "False") {
        ImgElement.setAttribute("isvisible", "True");
        ImgElement.setAttribute("src", "style/content/icon/view_off.png")
    } else {
        ImgElement.setAttribute("isvisible", "False");
        ImgElement.setAttribute("src", "style/content/icon/view_on.png")
    }
}

function CheckEmail(Email) {
    var Pattern = new RegExp("\@[a-zA-Z0-9]*.com");
    var EmailChecked = document.getElementById("email-checked");
    var Tooltip = document.getElementById("email-tooltip");
    var IsValid = Pattern.test(Email.value);
    if (!IsValid) {
        Email.style.border = "1px solid red";
        Tooltip.style.display = "inline-block";
        EmailChecked.style.display = "none";
    } else {
        var EmailChecked = document.getElementById("email-checked");
        EmailChecked.style.display = "block";
        Email.style.border = "none";
        Tooltip.style.display = "none";
    }
}

function LoadRegistrationPage() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "registration.html", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState = 4) {
            if (xhr.status == 200) {
                var body = document.getElementById("content");
                body.innerHTML = xhr.responseText;
            }
        }
    }
    xhr.send();
}

function CheckPasswordStrenth(e) {
    var pass = e.value;
    var pattern = new RegExp(/[@#$%^&*!()_+\-=\[\]{};':"\\|,.<>\/?]+/)
    var strenth = document.getElementById("strength");
    var informative = document.getElementById("informative");
    var check = document.getElementById("checkpassword");
    check.value = "";

    if (pass.length > 0) {
        strenth.style.display = "block";
        informative.style.display = "block";
        if (pattern.test(pass)) {
            strenth.style.width = "50%";
            strenth.style.backgroundColor = "rgb(243, 140, 35)";
            if (pass.length >= 8) {
                strenth.style.width = "100%";
                strenth.style.backgroundColor = "rgb(68, 136, 61)";
                informative.innerHTML = "Senha forte"
            } else {
                informative.innerHTML = "Uma senha com ao menos 8 caracteres é mais segura"
            }
        } else {
            strenth.style.width = "25%";
            strenth.style.backgroundColor = "rgb(175, 31, 36)";
            informative.innerHTML = "Coloque caracters especiais para uma senha mais forte"
        }

    } else {
        strenth.style.display = "none";
        informative.style.display = "none";
    }

}

function BlockPaste() {
    if (event.ctrlKey == true && (event.which == '118' || event.which == '86')) {
        event.preventDefault();
    }
}