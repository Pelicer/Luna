
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
}

function WatchSize(WindowSize) {
    if (WindowSize.matches) {
        var items = document.getElementById("hamburguermenu");
        items.style.display = "none";
        items.style.height = "0";
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
    var parentNode = document.getElementById("content");
    parentNode.classList.add('loading');
    parentNode.innerHTML = '';
    var img = document.createElement("img");
    img.setAttribute("src", "style/content/loading.gif");
    parentNode.appendChild(img);
}

var WindowSize = window.matchMedia("(min-width: 768px)")
WatchSize(WindowSize)
WindowSize.addListener(WatchSize)

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


document.addEventListener("DOMContentLoaded", function (){
    LoadModule("dashboard");
});