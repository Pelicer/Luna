document.addEventListener("DOMContentLoaded", function () {
    const QueryString = new URLSearchParams(window.location.search);
    const DSL = QueryString.get('q');
    const IsError = QueryString.get('err');
    if (DSL !== null) {
        var responseBar = document.getElementsByClassName("qCommunication")[0];
        responseBar.innerText = DSL;
        responseBar.style.display = "block";
        if (IsError === "true") {
            responseBar.classList.add("error");
        }
    }

    var PasswordField = document.getElementById("password");
    if (PasswordField !== null) {
        PasswordField.addEventListener("keyup", function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                Login();
            }
        })
    }
});

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

function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark'
    });
}

function CheckPasswordStrenth(e) {
    var pass = e.value;
    var pattern = new RegExp(/[@#$%^&*!()_+\-=\[\]{};':"\\|,.<>\/?]+/)
    var parent = document.getElementById("password-info");
    var strenth = document.getElementById("strength");
    var informative = document.getElementById("informative");
    var check = document.getElementById("checkpassword");
    check.value = "";

    if (pass.length > 0) {
        parent.style.display = "block";
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

function Login() {
    var Email = document.getElementById("user");
    var Password = document.getElementById("password");
    if (ValidateFields(Email, Password)) {
        Login_Request(Email.value, Password.value);
    }
}

function BlockPaste() {
    if (event.ctrlKey == true && (event.which == '118' || event.which == '86')) {
        event.preventDefault();
    }
}

function ValidateFields(Email, Password) {
    var Validated = true;
    //Email
    if (Email.value === "" || Email.value === null || Email.value === undefined) {
        Email.style.border = "1px solid red";
        var Warning = document.getElementById("EmailWarning");
        Warning.style.display = "block";
        Validated = false;
    } else {
        var Warning = document.getElementById("EmailWarning");
        Warning.style.display = "none";
        Email.style.border = "1px solid rgba(138, 154, 154, 0.4)";
    }

    //Password
    if (Password.value === null || Password.value === undefined || Password.value === 0 || Password.value === "") {
        Password.style.border = "1px solid red";
        var Warning = document.getElementById("PasswordWarning");
        Warning.style.display = "block";
        Validated = false;
    } else {
        var Warning = document.getElementById("PasswordWarning");
        Warning.style.display = "none";
        Password.style.border = "1px solid rgba(138, 154, 154, 0.4)";
    }
    return Validated;
}