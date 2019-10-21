function FilterButton(btn) {
    if (btn.classList.contains("active")) {
        btn.classList.remove("active");
        sortTable("unload");
    } else {
        let filters = document.getElementsByClassName("filterbtn");
        for (let i = 0; i < filters.length; i++) {
            filters[i].classList.remove("active");
        }
        btn.classList.add("active");
        sortTable('type', null, btn.innerText)
    }
}


function sortTable(sortType, th, index) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tablecontent");
    switching = true;
    rows = table.rows;
    counter = 0;

    if (sortType == "status" && index === "Todos") {
        sortType = "unload";
    }

    switch (sortType) {
        case "column":
            var headers = rows[0].getElementsByTagName("th");
            for (let i = 0; i < headers.length; i++) {
                headers[i].style.color = "#5f7278";
            }
            th.style.color = "rgb(134, 175, 73)"

            while (switching) {
                switching = false;
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[index];
                    y = rows[i + 1].getElementsByTagName("TD")[index];
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
            break;
        case "keyword":
            index = index.toLowerCase();
            for (i = 1; i < rows.length; i++) {
                x = rows[i].getElementsByTagName("TD");
                for (j = 0; j < x.length; j++) {
                    var str = x[j].innerText.toLowerCase() + " ";
                    if (str.includes(index)) {
                        rows[i].style.display = "table-row";
                        counter++;
                        break;
                    } else {
                        if (j == (x.length - 1)) {
                            rows[i].style.display = "none";
                        }
                    }
                }
            }
            document.getElementById("qtyFound").innerText = counter + " resultados";
            break;
        case "type":
            for (i = 1; i < rows.length; i++) {
                x = rows[i].getElementsByTagName("TD")[2];
                if (x.innerText.toLowerCase() !== index.toLowerCase()) {
                    rows[i].style.display = "none";
                } else {
                    rows[i].style.display = "table-row";
                    counter++;
                }
            }
            document.getElementById("qtyFound").innerText = counter + " resultados";
            break;
        case "unload":
            for (i = 1; i < rows.length; i++) {
                rows[i].style.display = "table-row";
            }
            document.getElementById("qtyFound").innerText = Goals.Goals.length + " resultados";
            break;
        case "status":
            for (i = 1; i < rows.length; i++) {
                x = rows[i].getElementsByTagName("TD")[4];
                if (x.innerText.toLowerCase() !== index.toLowerCase()) {
                    rows[i].style.display = "none";
                } else {
                    rows[i].style.display = "table-row";
                    counter++;
                }
            }
            document.getElementById("qtyFound").innerText = counter + " resultados";
            break;
    }

}

function LoadGoalsInTable() {
    var table = document.getElementById("tablecontent");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd + "00:00:00.000";

    document.getElementById("qtyFound").innerText = Goals.Goals.length + " resultados";

    for (var i = 0; i < Goals.Goals.length; i++) {
        var Goal = Goals.Goals[i];

        var Row = document.createElement("tr");

        var ID = document.createElement("td");
        ID.innerText = Goal.ID;

        var Description = document.createElement("td");
        Description.innerText = Goal.Title;

        var Type = document.createElement("td");
        Type.innerText = Goal.Type;

        var DueDate = document.createElement("td");
        DueDate.innerText = Goal.FinalDate.replace(/([0-9]{2}\:){1,}[0-9]{2}$/, "");

        var Status = document.createElement("td");
        var StatusIcon = document.createElement("div");
        Status.appendChild(StatusIcon);

        if (Goal.Accumulated >= Goal.FinalValue) {
            StatusIcon.classList.add("ongoal");
            Status.append("Finalizado")
        } else if (new Date(Goal.FinalDate) < new Date(today)) {
            StatusIcon.classList.add("late");
            Status.append("Atrasado")
        } else {
            StatusIcon.classList.add("ongoing");
            Status.append("Em andamento")
        }

        var Qty = document.createElement("td");
        Qty.innerText = "R$ " + Goal.FinalValue;

        var Actions = document.createElement("td");

        var Edit = document.createElement("span");
        Edit.innerText = "Editar";
        if (Goal.Type == "Objetivo") {
            Edit.setAttribute("onclick", "ShowModal('View/modal/NewObjective', " + Goal.ID + ", 'edit')")
        }else{
            Edit.setAttribute("onclick", "ShowModal('View/modal/NewMeta', " + Goal.ID + ", 'edit')")
        }
        var Delete = document.createElement("span");
        Delete.innerText = "Excluir";
        Delete.setAttribute("onclick", "ShowModal('View/modal/Confirmation', " + Goal.ID + ", 'delete')")

        var View = document.createElement("span");
        View.innerText = "Visualizar";
        View.setAttribute("onClick", "ShowModal('View/modal/GoalDetailsModal', " + Goal.ID + ")");

        Actions.appendChild(Edit);
        Actions.appendChild(Delete);
        Actions.appendChild(View);

        Row.appendChild(ID);
        Row.appendChild(Description);
        Row.appendChild(Type);
        Row.appendChild(DueDate);
        Row.appendChild(Status);
        Row.appendChild(Qty);
        Row.appendChild(Actions);

        table.appendChild(Row);
    }
}