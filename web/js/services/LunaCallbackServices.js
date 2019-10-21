function CheckHttpError(n) {
    if (n >= 400 && n < 600) {
        return true;
    } else {
        return false;
    }
}

function GetRequestReponse(responseXML) {
    var DSL = {};
    DSL.BoolValue = responseXML.getElementsByTagName("a:BoolValue")[0].textContent;
    DSL.Value = responseXML.getElementsByTagName("a:Value")[0].textContent;
    return DSL;
}

function RegisterUser_Callback(xhr) {
    if (xhr.readyState == 4) {
        if (CheckHttpError(xhr.status)) {
            var qCommunication = document.getElementsByClassName("qCommunication")[0];
            qCommunication.style.display = "block";
            qCommunication.innerText = "Um erro inesperado ocorreu. Por favor, tente novamente";

        } else if (xhr.status == 200) {
            var DSL = GetRequestReponse(xhr.responseXML);
            if (DSL.BoolValue == "true") {
                window.location.replace("http://127.0.0.1:5500/View/landing.html?q=" + DSL.Value);
            } else {
                var qCommunication = document.getElementsByClassName("qCommunication")[0];
                qCommunication.innerText = DSL.Value;
                qCommunication.style.display = "block";
                qCommunication.classList.add("error");
            }
        }
    }
}

function UpdateUser_Callback(xhr) {
    if (xhr.readyState == 4) {
        if (CheckHttpError(xhr.status)) {
            var qCommunication = document.getElementsByClassName("qCommunication")[0];
            qCommunication.style.display = "block";
            qCommunication.innerText = "Um erro inesperado ocorreu. Por favor, tente novamente";

        } else if (xhr.status == 200) {
            var DSL = GetRequestReponse(xhr.responseXML);

            var userInfo = document.getElementsByClassName("userInfo")[0];
            var DSL = GetRequestReponse(xhr.responseXML)
            if (DSL.BoolValue == "true") {
                userInfo.innerText = DSL.Value;
                userInfo.style.display = "block";
                $('html, body').animate({ scrollTop: 0 }, 'fast');
                RenderGoals_Request();
                setTimeout(function () {
                    userInfo.style.display = "none";
                }, 5000)
            }
        }
    }
}

function GetProfiles_Callback(xhr) {
    if (xhr.readyState == 4) {
        if (CheckHttpError(xhr.status)) {
            var qCommunication = document.getElementsByClassName("qCommunication")[0];
            qCommunication.style.display = "block";
            qCommunication.innerText = "Um erro inesperado ocorreu. Por favor, tente novamente";

        } else if (xhr.status == 200) {
            var DSL = GetRequestReponse(xhr.responseXML);
            if (DSL.BoolValue) {
                var ProfileSelect = document.getElementById("profiles");
                var count = (DSL.Value.match(/,/g) || []).length;
                for (var i = 0; i <= count; i++) {
                    var opt = document.createElement("option");
                    if (DSL.Value.indexOf(",") !== -1) {
                        opt.innerText = DSL.Value.substring(0, DSL.Value.indexOf(","));
                        DSL.Value = (DSL.Value).substring(DSL.Value.indexOf(",") + 1, DSL.Value.length)
                        ProfileSelect.appendChild(opt);
                    } else {
                        opt.innerText = DSL.Value;
                        ProfileSelect.appendChild(opt);
                    }
                }
            }
        }
    }
}

function GetCategories_Callback(xhr, SelectElement) {
    if (xhr.readyState == 4) {
        if (CheckHttpError(xhr.status)) {
            var qCommunication = document.getElementsByClassName("qCommunication")[0];
            qCommunication.style.display = "block";
            qCommunication.innerText = "Um erro inesperado ocorreu. Por favor, tente novamente";

        } else if (xhr.status == 200) {
            var DSL = GetRequestReponse(xhr.responseXML);
            if (DSL.BoolValue) {
                var count = (DSL.Value.match(/,/g) || []).length;
                for (var i = 0; i < count; i++) {
                    var opt = document.createElement("option");
                    opt.innerText = DSL.Value.substring(0, DSL.Value.indexOf(","));
                    opt.value = DSL.Value.substring(0, DSL.Value.indexOf(","));
                    DSL.Value = (DSL.Value).substring(DSL.Value.indexOf(",") + 1, DSL.Value.length)
                    SelectElement.appendChild(opt);
                }
            }
        }
    }
}

function Login_Callback(xhr) {
    if (xhr.readyState == 4) {
        if (CheckHttpError(xhr.status)) {
            var qCommunication = document.getElementsByClassName("qCommunication")[0];
            qCommunication.style.display = "block";
            qCommunication.innerText = "Um erro inesperado ocorreu. Por favor, tente novamente";

        } else if (xhr.status == 200) {
            var DSL = GetRequestReponse(xhr.responseXML);
            if (DSL.BoolValue == "true") {
                SessionLogin(DSL.Value);
                window.location.replace("http://127.0.0.1:5500");
            } else {
                var qCommunication = document.getElementsByClassName("qCommunication")[0];
                qCommunication.innerText = DSL.Value;
                qCommunication.style.display = "block";
                qCommunication.classList.add("error");

                var LoginInput = document.getElementById("password");
                LoginInput.value = "";
                LoginInput.focus();

            }
        }
    }
}

function RegisterGoal_Callback(xhr) {
    if (xhr.readyState == 4) {
        var userInfo = document.getElementsByClassName("userInfo")[0];
        if (CheckHttpError(xhr.status)) {
            userInfo.innerText = "Um erro inesperado ocorreu. Por favor, tente novamente";

        } else if (xhr.status == 200) {
            var DSL = GetRequestReponse(xhr.responseXML);
            if (DSL.BoolValue == "true") {
                CloseModal();
                userInfo.innerText = DSL.Value;
                userInfo.style.display = "block";
            } else {
                var FormError = document.getElementById("formerror");
                FormError.innerText = DSL.Value;
                FormError.style.display = "block";
            }
        }
    }
}

function RegisterObjective_Callback(xhr) {
    if (xhr.readyState == 4) {
        var userInfo = document.getElementsByClassName("userInfo")[0];
        if (CheckHttpError(xhr.status)) {
            userInfo.innerText = "Um erro inesperado ocorreu. Por favor, tente novamente";

        } else if (xhr.status == 200) {
            var DSL = GetRequestReponse(xhr.responseXML);
            if (DSL.BoolValue == "true") {
                CloseModal();
                userInfo.innerText = DSL.Value;
                userInfo.style.display = "block";
            } else {
                var FormError = document.getElementById("formerror");
                FormError.innerText = DSL.Value;
                FormError.style.display = "block";
            }
        }
    }
}

function RenderGoals_Callback(xhr) {
    if (xhr.readyState == 4) {
        var DSL = GetRequestReponse(xhr.responseXML)
        if (DSL.BoolValue == "true") {
            if (DSL.Value.indexOf("{") == -1) {
                Goals = DSL.Value.toString();
            } else {
                Goals = JSON.parse(DSL.Value);
                RenderGoals(Goals.Goals);
            }
        } else {

        }
    }
}

function DeleteGoal_Callback(xhr) {
    if (xhr.readyState == 4) {
        var userInfo = document.getElementsByClassName("userInfo")[0];
        CloseModal();
        var DSL = GetRequestReponse(xhr.responseXML)
        if (DSL.BoolValue == "true") {
            userInfo.innerText = DSL.Value;
            userInfo.style.display = "block";
            $('html, body').animate({ scrollTop: 0 }, 'fast');
            RenderGoals_Request();
            setTimeout(function () {
                userInfo.style.display = "none";
            }, 5000)
        }
    }
}

function RegisterTransaction_Callback(xhr) {
    if (xhr.readyState == 4) {
        var userInfo = document.getElementsByClassName("userInfo")[0];
        CloseModal();
        var DSL = GetRequestReponse(xhr.responseXML)
        if (DSL.BoolValue == "true") {
            userInfo.innerText = DSL.Value;
            userInfo.style.display = "block";
            $('html, body').animate({ scrollTop: 0 }, 'fast');
            RenderGoals_Request();
            setTimeout(function () {
                userInfo.style.display = "none";
            }, 5000)
        }
    }

}