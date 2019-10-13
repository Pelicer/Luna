function FilterButton(btn) {
    let filters = document.getElementsByClassName("filterbtn");
    for (let i = 0; i < filters.length; i++) {
        filters[i].classList.remove("active");
    }
    btn.classList.add("active");
}

function GetCategories() {

}

function LoadGoalsInTable() {
    var table = document.getElementById("tablecontent");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd + "00:00:00.000";

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
        var Delete = document.createElement("span");
        Delete.innerText = "Excluir";
        var View = document.createElement("span");
        View.innerText = "Visualizar";
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