function ValidateFields(modal) {
    switch (modal) {
        case "meta":
            var Category = document.getElementById("CategoryName");
            var Amount = document.getElementById("CategoryAmount");

            if (Category.value === "" || Category.value === null || Category.value === undefined) {
                Category.style.border = "1px solid red";
                var Warning = document.getElementById("CategoryWarning");
                Warning.style.display = "inline-block";
            } else {
                Category.style.border = "1px solid rgba(138, 154, 154, 0.4)";
                var Warning = document.getElementById("CategoryWarning");
                Warning.style.display = "none";
            }
            if (Amount.value === null || Amount.value === undefined || Amount.value === 0 || Amount.value === "") {
                Amount.style.border = "1px solid red";
                var Warning = document.getElementById("AmountWarning");
                Warning.style.display = "inline-block";
            } else {
                var Warning = document.getElementById("AmountWarning");
                Warning.style.display = "none";
                Amount.style.border = "1px solid rgba(138, 154, 154, 0.4)";
            }
            break;
        case "objetivo":
            var Name = document.getElementById("Name");
            var LimitDate = document.getElementById("LimitDate");
            var ObjectiveAmount = document.getElementById("ObjectiveAmount");

            if (Name.value === "" || Name.value === null || Name.value === undefined) {
                Name.style.border = "1px solid red";
                var Warning = document.getElementById("NameWarning");
                Warning.style.display = "inline-block";
            } else {
                Name.style.border = "1px solid rgba(138, 154, 154, 0.4)";
                var Warning = document.getElementById("NameWarning");
                Warning.style.display = "none";
            }
            if (LimitDate.value === null || LimitDate.value === undefined || LimitDate.value === "") {
                LimitDate.style.border = "1px solid red";
                var Warning = document.getElementById("LimitDateWarning");
                Warning.style.display = "inline-block";
            } else {
                var Warning = document.getElementById("LimitDateWarning");
                Warning.style.display = "none";
                LimitDate.style.border = "1px solid rgba(138, 154, 154, 0.4)";
            }
            if (ObjectiveAmount.value === null || ObjectiveAmount.value === undefined || ObjectiveAmount.value === "") {
                ObjectiveAmount.style.border = "1px solid red";
                var Warning = document.getElementById("ObjectiveAmountWarning");
                Warning.style.display = "inline-block";
            } else {
                var Warning = document.getElementById("ObjectiveAmountWarning");
                Warning.style.display = "none";
                ObjectiveAmount.style.border = "1px solid rgba(138, 154, 154, 0.4)";
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
            }
            break;
    }

}