var config = {};
var Goals = {};

function GetServicesConfig() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../config/config.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            config = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
}

function GetRequestObject(WSFunction) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://workstation/LunaCore/LunaService.svc", true);
    xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
    xhr.setRequestHeader("SOAPAction", "http://tempuri.org/ILunaService/" + WSFunction);
    return xhr;
}

function RegisterUser_Request(Email, Password, Profile) {
    var xhr = GetRequestObject("RegisterUser");
    var envelope = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<tem:RegisterUser>' +
        '<tem:email>{EMAIL}</tem:email>' +
        '<tem:password>{PASSWORD}</tem:password>' +
        '<tem:profile>{PROFILE}</tem:profile>' +
        '</tem:RegisterUser>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    envelope = envelope.replace("{EMAIL}", Email);
    envelope = envelope.replace("{PASSWORD}", Password);
    envelope = envelope.replace("{PROFILE}", Profile);
    xhr.onreadystatechange = function () {
        RegisterUser_Callback(this);
    };
    xhr.send(envelope);
}

function UpdateUser_Request(Email, Password, Profile) {
    var xhr = GetRequestObject("UpdateUser");
    var envelope = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' + 
    '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<tem:UpdateUser>' +
        '<tem:OldEmail>{OLDEMAIL}</tem:OldEmail>' +
        '<tem:email>{NEWEMAIL}</tem:email>' +
        '<tem:password>{PASSWORD}</tem:password>' +
        '<tem:profile>{PROFILE}</tem:profile>' +
        '</tem:UpdateUser>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    envelope = envelope.replace("{OLDEMAIL}", sessionStorage.getItem("email"));
    envelope = envelope.replace("{NEWEMAIL}", Email);
    envelope = envelope.replace("{PASSWORD}", Password);
    envelope = envelope.replace("{PROFILE}", Profile);
    xhr.onreadystatechange = function () {
        UpdateUser_Callback(this);
    };
    xhr.send(envelope);
}

function GetProfiles_Request() {
    var xhr = GetRequestObject("GetProfiles");
    var envelope = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<tem:GetProfiles/>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    xhr.onreadystatechange = function () {
        GetProfiles_Callback(this);
    };
    xhr.send(envelope);
}

function GetCategories_Request(SelectElement) {
    var xhr = GetRequestObject("GetCategories");
    var envelope = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<tem:GetCategories/>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    xhr.onreadystatechange = function () {
        GetCategories_Callback(xhr, SelectElement);
    };
    xhr.send(envelope);
}

function Login_Request(Email, Password) {
    var xhr = GetRequestObject("Login");
    var envelope = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<tem:Login>' +
        '<tem:email>{EMAIL}</tem:email>' +
        '<tem:password>{PASSWORD}</tem:password>' +
        '</tem:Login>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    envelope = envelope.replace("{EMAIL}", Email);
    envelope = envelope.replace("{PASSWORD}", Password);
    xhr.onreadystatechange = function () {
        Login_Callback(this);
    };
    xhr.send(envelope);
}

function RegisterGoal_Request(Title, Category, Value) {
    var xhr = GetRequestObject("RegisterMark");
    var envelope = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<tem:RegisterMark>' +
        '<tem:UserEmail>{EMAIL}</tem:UserEmail>' +
        '<tem:Title>{TITLE}</tem:Title>' +
        '<tem:Category>{CATEGORY}</tem:Category>' +
        '<tem:FinalValue>{VALUE}</tem:FinalValue>' +
        '</tem:RegisterMark>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    envelope = envelope.replace("{EMAIL}", sessionStorage.getItem("email"));
    envelope = envelope.replace("{TITLE}", Title);
    envelope = envelope.replace("{CATEGORY}", Category);
    envelope = envelope.replace("{VALUE}", Value);

    xhr.onreadystatechange = function () {
        RegisterGoal_Callback(xhr);
    };
    xhr.send(envelope);
}


function RegisterObjective_Request(Title, Category, Value, FinalDate, IsMain) {
    var xhr = GetRequestObject("RegisterGoal");
    var envelope = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<tem:RegisterGoal>' +
        '<tem:UserEmail>{EMAIL}</tem:UserEmail>' +
        '<tem:Title>{TITLE}</tem:Title>' +
        '<tem:Category>{CATEGORY}</tem:Category>' +
        '<tem:FinalValue>{VALUE}</tem:FinalValue>' +
        '<tem:FinalDate>{FINALDATE}</tem:FinalDate>' +
        '<tem:IsMain>{ISMAIN}</tem:IsMain>' +
        '</tem:RegisterGoal>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    envelope = envelope.replace("{EMAIL}", sessionStorage.getItem("email"));
    envelope = envelope.replace("{TITLE}", Title);
    envelope = envelope.replace("{CATEGORY}", Category);
    envelope = envelope.replace("{VALUE}", Value);
    envelope = envelope.replace("{FINALDATE}", FinalDate);
    envelope = envelope.replace("{ISMAIN}", IsMain);

    xhr.onreadystatechange = function () {
        RegisterObjective_Callback(xhr);
    };
    xhr.send(envelope);
}

function RenderGoals_Request() {
    var xhr = GetRequestObject("GetGoals");
    var envelope = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<tem:GetGoals>' +
        '<tem:Email>{EMAIL}</tem:Email>' +
        '</tem:GetGoals>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    envelope = envelope.replace("{EMAIL}", sessionStorage.getItem("email"));
    xhr.onreadystatechange = function () {
        RenderGoals_Callback(xhr);
    };
    xhr.send(envelope);
}

function DeleteGoal_Request(GoalID) {
    var xhr = GetRequestObject("DeleteGoal");
    var envelope = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<tem:DeleteGoal>' +
        '<tem:GoalID>{GOALID}</tem:GoalID>' +
        '</tem:DeleteGoal>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    envelope = envelope.replace("{GOALID}", GoalID);
    xhr.onreadystatechange = function () {
        DeleteGoal_Callback(xhr);
    };
    CloseModal();
    xhr.send(envelope);
}

function RegisterTransaction_Request(GoalID, Action, Value) {
    var xhr = GetRequestObject("RegisterTransaction");
    var envelope = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<tem:RegisterTransaction>' +
        '<tem:GoalID>{GOALID}</tem:GoalID>' +
        '<tem:Action>{ACTION}</tem:Action>' +
        '<tem:Value>{VALUE}</tem:Value>' +
        '</tem:RegisterTransaction>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';
    envelope = envelope.replace("{GOALID}", GoalID);
    envelope = envelope.replace("{ACTION}", Action);
    envelope = envelope.replace("{VALUE}", Value);
    xhr.onreadystatechange = function () {
        RegisterTransaction_Callback(xhr);
    };
    CloseModal();
    xhr.send(envelope);
}
GetServicesConfig();
