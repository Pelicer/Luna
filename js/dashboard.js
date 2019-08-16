function Activate(e) {
    var leftMenuIcons = document.getElementsByClassName("icon");
    e.classList.add("active");
    for (let i = 0; i < leftMenuIcons.length; i++) {
        if (leftMenuIcons[i] !== e) {
            leftMenuIcons[i].classList.remove("active");
        }
    }
}