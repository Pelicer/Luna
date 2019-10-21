function FilterButton(btn) {
    let filters = document.getElementsByClassName("filterbtn");
    for (let i = 0; i < filters.length; i++) {
        filters[i].classList.remove("active");
    }
    btn.classList.add("active");
}