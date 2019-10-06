
function ShowModal(Page, GoalID, Operation) {
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
                switch (Page) {
                    case "View/modal/NewMeta", "View/modal/NewObjective":
                        GetCategories_Request(modal.getElementsByTagName("select")[0]);
                        break;
                    case "View/modal/Confirmation", "View/modal/AddAmount":
                        modal.setAttribute("GoalID", GoalID);
                        modal.setAttribute("Operation", Operation)
                }
            }
        }
    };
    xhr.send();
}

function CloseModal() {
    var modal = document.getElementById("ModalContent");
    modal.style.display = "none";
}

function ValidateModalFields(modal) {
    switch (modal) {
        case "meta":
            var Title = document.getElementById("Title");
            var Category = document.getElementById("Categories");
            var Amount = document.getElementById("CategoryAmount");
            var Ready = true;

            if (Title.value === "" || Title.value === null || Title.value === undefined) {
                Title.style.border = "1px solid red";
                var Warning = document.getElementById("TitleWarning");
                Warning.style.display = "inline-block";
                Ready = false;
            } else {
                Title.style.border = "1px solid rgba(138, 154, 154, 0.4)";
                var Warning = document.getElementById("TitleWarning");
                Warning.style.display = "none";
            }
            if (Category.selectedIndex === 0) {
                Category.style.border = "1px solid red";
                var Warning = document.getElementById("CategoryWarning");
                Warning.style.display = "inline-block";
                Ready = false;
            } else {
                Category.style.border = "1px solid rgba(138, 154, 154, 0.4)";
                var Warning = document.getElementById("CategoryWarning");
                Warning.style.display = "none";
            }
            if (Amount.value === null || Amount.value === undefined || Amount.value === 0 || Amount.value === "") {
                Amount.style.border = "1px solid red";
                var Warning = document.getElementById("AmountWarning");
                Warning.style.display = "inline-block";
                Ready = false;
            } else {
                var Warning = document.getElementById("AmountWarning");
                Warning.style.display = "none";
                Amount.style.border = "1px solid rgba(138, 154, 154, 0.4)";
            }

            if (Ready) {
                RegisterGoal_Request(Title.value, Category.options[Category.selectedIndex].value, Amount.value)
            }

            break;
        case "objetivo":
            var Name = document.getElementById("Name");
            var Category = document.getElementById("Categories");
            var LimitDate = document.getElementById("LimitDate");
            var ObjectiveAmount = document.getElementById("ObjectiveAmount");
            var Switch = document.getElementById("isMain");
            var Ready = true;

            if (Name.value === "" || Name.value === null || Name.value === undefined) {
                Name.style.border = "1px solid red";
                var Warning = document.getElementById("NameWarning");
                Warning.style.display = "inline-block";
                Ready = false;
            } else {
                Name.style.border = "1px solid rgba(138, 154, 154, 0.4)";
                var Warning = document.getElementById("NameWarning");
                Warning.style.display = "none";
            }
            if (LimitDate.value === null || LimitDate.value === undefined || LimitDate.value === "") {
                LimitDate.style.border = "1px solid red";
                var Warning = document.getElementById("LimitDateWarning");
                Warning.style.display = "inline-block";
                Ready = false;
            } else {
                var Warning = document.getElementById("LimitDateWarning");
                Warning.style.display = "none";
                LimitDate.style.border = "1px solid rgba(138, 154, 154, 0.4)";
            }
            if (Category.selectedIndex === 0) {
                Category.style.border = "1px solid red";
                var Warning = document.getElementById("CategoryWarning");
                Warning.style.display = "inline-block";
                Ready = false;
            } else {
                Category.style.border = "1px solid rgba(138, 154, 154, 0.4)";
                var Warning = document.getElementById("CategoryWarning");
                Warning.style.display = "none";
            }
            if (ObjectiveAmount.value === null || ObjectiveAmount.value === undefined || ObjectiveAmount.value === "") {
                ObjectiveAmount.style.border = "1px solid red";
                var Warning = document.getElementById("ObjectiveAmountWarning");
                Warning.style.display = "inline-block";
                Ready = false;
            } else {
                var Warning = document.getElementById("ObjectiveAmountWarning");
                Warning.style.display = "none";
                ObjectiveAmount.style.border = "1px solid rgba(138, 154, 154, 0.4)";
            }

            var isMain = (Switch.checked == true) ? 1 : 0;

            if (Ready) {
                RegisterObjective_Request(Name.value, Category.options[Category.selectedIndex].value, ObjectiveAmount.value, LimitDate.value, isMain)
            }
            break;
        case "add":
            var Amount = document.getElementById("Amount");

            if (Amount.value === "" || Amount.value === null || Amount.value === undefined) {
                Amount.style.border = "1px solid red";
                var Warning = document.getElementById("AmountWarning");
                Warning.style.display = "inline-block";
            } else {
                Amount.style.border = "1px solid rgba(138, 154, 154, 0.4)";
                var Warning = document.getElementById("AmountWarning");
                Warning.style.display = "none";
                return true;
            }
            break;
    }

}

function TakeAction(modal) {
    var GoalID = modal.getAttribute("goalid");
    var Operation = modal.getAttribute("operation");

    switch (Operation) {
        case "delete":
            DeleteGoal_Request(GoalID);
            break;
        case "ADD":
            if (ValidateModalFields('add')) {
                var Amount = document.getElementById("Amount");
                RegisterTransaction_Request(GoalID, 'ADD', Amount.value);
            }
            break;
    }
}