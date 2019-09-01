
function Activate(e) {
    var leftMenuIcons = document.getElementsByClassName("icon");
    var hamburguerMenuItems = document.getElementsByClassName("menuitem");
    e.classList.add("active");
    for (let i = 0; i < leftMenuIcons.length; i++) {
        if (leftMenuIcons[i] !== e) {
            leftMenuIcons[i].classList.remove("active");
        }
    }
    for (let i = 0; i < hamburguerMenuItems.length; i++) {
        if (hamburguerMenuItems[i] !== e) {
            hamburguerMenuItems[i].classList.remove("active");
        }
    }
    LoadModule(e.getAttribute("id"));
    UnloadMenu();
}

function UnloadMenu() {
    var items = document.getElementById("hamburguermenu");
    items.style.display = "none";
    items.style.height = "0";
    var menu = document.getElementById("menu");
    menu.setAttribute("collapsed", 1);
}

var WindowSize = window.matchMedia("(min-width: 768px)")
WatchSize(WindowSize)
WindowSize.addListener(WatchSize)

function WatchSize(WindowSize) {
    if (WindowSize.matches) {
        UnloadMenu();
    }
}

function LoadModule(page) {
    var url = page + ".html";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-type', 'text/html');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var content = document.getElementById("content");
                content.classList.remove("loading")
                content.innerHTML = xhr.responseText;
                LoadGraphs();
            }
        }

    };
    xhr.timeout = 10000;
    xhr.ontimeout = function () {
        xhr.abort();
    }
    xhr.send();
    Loading();
}

function Loading() {
    var parentNode = document.getElementById("content");
    parentNode.classList.add('loading');
    parentNode.innerHTML = '';
    var img = document.createElement("img");
    img.setAttribute("src", "style/content/loading.gif");
    parentNode.appendChild(img);
}

function ShowMenu(icon) {
    var items = document.getElementById("hamburguermenu");
    if (icon.getAttribute("collapsed") == 1) {
        items.style.display = "block";
        items.style.height = "auto";
        icon.setAttribute("collapsed", 0);
    } else {
        items.style.display = "none";
        items.style.height = "0";
        icon.setAttribute("collapsed", 1);
    }
}

function ShowModal(Page) {
    var url = Page + ".html";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-type', 'text/html');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var modal = document.getElementById("ModalContent");
                modal.innerHTML = xhr.responseText;
                modal.style.display = "flex";
                LoadGoalSummary();
            }
        }

    };
    xhr.timeout = 10000;
    xhr.ontimeout = function () {
        xhr.abort();
    }
    xhr.send();
}

function CloseModal() {
    var modal = document.getElementById("ModalContent");
    modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    LoadModule("dashboard");
});