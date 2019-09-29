function SessionLogin(email){
    sessionStorage.setItem("logged", "true")
    sessionStorage.setItem("email", email)
}

function VerifyLogin(){
    if(sessionStorage.getItem("logged") !== "true"){
        window.location.replace("view/landing.html?q=Por favor, realize o login antes de acessar a página&err=true")
    }else{
        return true;
    }
}

function Logout(){
    sessionStorage.setItem("logged", "false");
    window.location.replace("../view/landing.html")
}