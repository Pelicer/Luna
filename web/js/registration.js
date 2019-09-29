document.addEventListener("DOMContentLoaded", function () {
    GetProfiles_Request();
});

function RegisterNewUser() {
    var Email = document.getElementById("user");
    var Password = document.getElementById("password");
    var ConfirmPassword = document.getElementById("checkpassword");
    var Profile = document.getElementById("profiles");
    if (ValidateFields(Email, Password, ConfirmPassword, Profile)) {
        if (Email.value !== "" && Password.value !== "" && ConfirmPassword.value !== "" && (Password.value === ConfirmPassword.value) && Profile.SelectedIndex !== 0) {
            RegisterUser_Request(Email.value, Password.value, Profile.options[Profile.selectedIndex].text);
        }
    }
}

function ValidateFields(Email, Password, ConfirmPassword, Profile) {
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

    //Confirm Password
    if (ConfirmPassword.value === null || ConfirmPassword.value === undefined || ConfirmPassword.value === 0 || ConfirmPassword.value === "") {
        ConfirmPassword.style.border = "1px solid red";
        var Warning = document.getElementById("CheckPasswordWarning");
        Warning.style.display = "block";
        Validated = false;
    } else {
        var Warning = document.getElementById("CheckPasswordWarning");
        Warning.style.display = "none";
        ConfirmPassword.style.border = "1px solid rgba(138, 154, 154, 0.4)";
    }

    //Profiles
    if (Profile.selectedIndex === 0) {
        Profile.style.border = "1px solid red";
        var Warning = document.getElementById("ProfileWarning");
        Warning.style.display = "block";
        Validated = false;
    } else {
        var Warning = document.getElementById("ProfileWarning");
        Warning.style.display = "none";
        Profile.style.border = "1px solid rgba(138, 154, 154, 0.4)";
    }

    //Check if both passwords check
    if (Password.value !== ConfirmPassword.value) {
        ConfirmPassword.style.border = "1px solid red";
        Password.style.border = "1px solid red";
        Validated = false;
    }

    return Validated;
}