colors = []
colors.push('rgb(95, 114, 120)');
colors.push('rgb(134, 175, 73)');
colors.push('rgb(138, 154, 154)');

var wrapper = document.getElementById("wrapper");

function ImageHover(element, icon) {
    element.setAttribute('src', 'style/content/icon/' + icon + '.png');
}

function ImageUnhover(element, icon) {
    element.setAttribute('src', 'style/content/icon/' + icon + '_black.png');
}

function LoadMainGoal(Goal) {
    var GoalData = document.getElementsByClassName("mainsummary")[0];
    var MainGoalTitle = document.getElementById("maingoaltitle");
    MainGoalTitle.innerText = "Objetivo Principal: " + Goal.Title;

    var FinalDate = GoalData.getElementsByTagName("span")[0];
    var FinalYear = Goal.FinalDate.match(/[0-9]{4}/);
    FinalDate.innerText = FinalYear;

    var Total = GoalData.getElementsByClassName("total")[0];
    Total.setAttribute("onClick", "ShowModal('View/modal/GoalDetailsModal')");
    while (Total.firstChild) {
        Total.removeChild(Total.firstChild)
    }

    var Achieved = GoalData.getElementsByClassName("achieved")[0];
    Achieved.setAttribute("onClick", "ShowModal('View/modal/GoalDetailsModal')");
    while (Achieved.firstChild) {
        Achieved.removeChild(Achieved.firstChild)
    }

    var Remaining = GoalData.getElementsByClassName("remaining")[0];
    Remaining.setAttribute("onClick", "ShowModal('View/modal/GoalDetailsModal')");
    while (Remaining.firstChild) {
        Remaining.removeChild(Remaining.firstChild)
    }

    var TotalAmount = document.createElement("p");
    var TotalIcon = document.createElement("img");
    TotalIcon.src = "style/content/icon/piggy.png";
    TotalAmount.appendChild(TotalIcon);
    var AmountValue = document.createElement("span");
    AmountValue.innerText = "R$ " + Goal.FinalValue;
    TotalAmount.appendChild(AmountValue);
    var TotalDescription = document.createElement("p");
    TotalDescription.innerText = "Valor total da meta";
    Total.appendChild(TotalAmount);
    Total.appendChild(TotalDescription);

    var AchievedAmount = document.createElement("p");
    var AchievedIcon = document.createElement("img");
    AchievedIcon.src = "style/content/icon/piggy.png";
    AchievedAmount.appendChild(AchievedIcon);
    var AmountValue = document.createElement("span");
    AmountValue.innerText = "R$ " + Goal.Accumulated;
    AchievedAmount.appendChild(AmountValue);
    var AchievedDescription = document.createElement("p");
    AchievedDescription.innerText = "Valor acumulado desde a criação do objetivo";
    Achieved.appendChild(AchievedAmount);
    Achieved.appendChild(AchievedDescription);

    var RemainingAmount = document.createElement("p");
    var RemainingIcon = document.createElement("img");
    RemainingIcon.src = "style/content/icon/remaining.png";
    RemainingAmount.appendChild(RemainingIcon);

    AmountValue = document.createElement("span");
    AmountValue.innerText = "R$ " + (Goal.FinalValue - Goal.Accumulated);
    RemainingAmount.appendChild(AmountValue);

    var RemainingDescription = document.createElement("p");
    RemainingDescription.innerText = "Valor restante para atingir o objetivo";
    Remaining.appendChild(RemainingAmount);
    Remaining.appendChild(RemainingDescription);

    if (Goal.Transactions.length > 0) {
        var TransactionCategories = [];
        var TransactionValues = [];

        for (var i = 0; i < Goal.Transactions.length; i++) {
            TransactionCategories.push(Goal.Transactions[i].Timestamp);
            TransactionValues.push(Goal.Transactions[i].Value);
        }

        var chart = Highcharts.chart('maingoal', {
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: TransactionCategories
            },
            yAxis: {
                title: {
                    text: 'R$'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: Goal.Title,
                data: TransactionValues
            }]
        });
        chart.reflow();
    } else {
        var NoTransactions = document.createElement("p");
        NoTransactions.innerText = "Não há transações registradas para este objetivo";
        var ChartDiv = document.getElementById("maingoal");
        ChartDiv.appendChild(NoTransactions);
    }
}


function RenderGoals(Goals) {
    Objetivo_hasContent = 0;
    Metas_hasContent = 0;
    for (var i = 0; i < Goals.length; i++) {
        Goal = Goals[i];
        var Card = document.createElement("div");
        Card.setAttribute("id", Goal.ID);

        if (Goal.GoalMain === true) {
            LoadMainGoal(Goal);
        }

        (Goal.Type === "Objetivo") ? Card.classList.add("objetivo") : Card.classList.add("meta");

        var DeleteButton = document.createElement("img");
        DeleteButton.src = "style/content/icon/garbage_black.png";
        DeleteButton.setAttribute("onmouseover", "ImageHover(this, 'garbage')");
        DeleteButton.setAttribute("onmouseout", "ImageUnhover(this, 'garbage')");
        DeleteButton.setAttribute("onClick", "ShowModal('View/modal/Confirmation', " + Goal.ID + ", 'delete')");

        var AddButton = document.createElement("img");
        AddButton.src = "style/content/icon/plus_black.png";
        AddButton.setAttribute("onmouseover", "ImageHover(this, 'plus')");
        AddButton.setAttribute("onmouseout", "ImageUnhover(this, 'plus')");
        AddButton.setAttribute("onClick", "ShowModal('View/modal/AddAmount')");
        AddButton.setAttribute("onClick", "ShowModal('View/modal/AddAmount', " + Goal.ID + ", 'ADD')");

        var Info = document.createElement("div");
        Info.setAttribute("onClick", "ShowModal('View/modal/GoalDetailsModal')");
        Info.classList.add("holder");

        var Title = document.createElement("p");
        Title.innerText = Goal.Title;

        var Graph = document.createElement("div");
        Graph.setAttribute("id", Goal.Title);
        Graph.classList.add("graph");

        if (Goal.Type === "Objetivo") {
            var EndDate = document.createElement("span");
            var FinalDate = Goal.FinalDate.replace(/([0-9]{2}\:?){3}/, "")
            FinalDate = FinalDate.replace(/[0-9]{4}/, function (x) {
                return x.substring(2, x.length);
            })
            EndDate.innerText = FinalDate;
            Info.appendChild(EndDate);
        }

        Info.appendChild(Title);
        Info.appendChild(Graph);

        Card.appendChild(AddButton);
        Card.appendChild(DeleteButton);
        Card.appendChild(Info);

        if (Goal.Type === "Objetivo") {
            var ObjetivoWrapper = document.getElementsByClassName("objetivos")[0];
            if (Objetivo_hasContent === 0) {
                while (ObjetivoWrapper.firstChild) {
                    ObjetivoWrapper.removeChild(ObjetivoWrapper.firstChild);
                }
                Objetivo_hasContent++;
            }
            ObjetivoWrapper.appendChild(Card);
            RenderGraph(Goal)
        } else if (Goal.Type === "Meta") {
            var MetasWrapper = document.getElementsByClassName("metas")[0];
            if (Metas_hasContent === 0) {
                while (MetasWrapper.firstChild) {
                    MetasWrapper.removeChild(MetasWrapper.firstChild);
                }
                Metas_hasContent++;
            }
            MetasWrapper.appendChild(Card);
            RenderGraph(Goal)
        }
    }
    if (Objetivo_hasContent === 0) {
        var ObjetivoWrapper = document.getElementsByClassName("objetivos")[0];
        var InfoData = ObjetivoWrapper.getElementsByClassName("infodata")[0];
        while (InfoData.firstChild) {
            InfoData.removeChild(InfoData.firstChild);
        }
        var NoObjectives = document.createElement("p");
        NoObjectives.innerText = "Oops... parece que não você não possui nenhum objetivo. Que tal começar agora?"
        InfoData.appendChild(NoObjectives);
        InfoData.setAttribute("onClick", "Activate(document.getElementById('metas'))")
    }
    if (Metas_hasContent === 0) {
        var MetaWrapper = document.getElementsByClassName("metas")[0];
        var InfoData = MetaWrapper.getElementsByClassName("infodata")[0];
        while (InfoData.firstChild) {
            InfoData.removeChild(InfoData.firstChild);
        }
        var NoObjectives = document.createElement("p");
        NoObjectives.innerText = "Oops... parece que não você não possui nenhuma meta. Que tal começar agora?"
        InfoData.appendChild(NoObjectives);
        InfoData.setAttribute("onClick", "Activate(document.getElementById('metas'))")
    }
};

function RenderGraph(Goal) {
    switch (Goal.Type) {
        case "Objetivo":
            var chart = Highcharts.chart(Goal.Title, {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    backgroundColor: "transparent",
                    height: 350,
                },
                title: {
                    style: {
                        color: 'black',
                    },
                    text: (((Goal.Accumulated * 100) / Goal.FinalValue)).toFixed(1) + "%",
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 40
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        colors: colors,
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%'],
                        size: '110%'
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Quantidade',
                    innerSize: '50%',
                    data: [
                        ['', ((Goal.FinalValue - Goal.Accumulated) <= 0) ? 0 : (Goal.FinalValue - Goal.Accumulated)],
                        ['', Goal.Accumulated]
                    ]
                }],
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                }
            });
            chart.reflow();
            break;
        case "Meta":
            var chart = Highcharts.chart(Goal.Title, {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    backgroundColor: "transparent",
                    height: 250
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        colors: colors,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                            distance: -50,
                            filter: {
                                property: 'percentage',
                                operator: '>',
                                value: 4
                            }
                        }
                    }
                },
                series: [{
                    data: [{
                        name: '',
                        y: Goal.FinalValue
                    },
                    {
                        name: '',
                        y: Goal.Accumulated
                    }
                    ]
                }],
                exporting: {
                    enabled: false
                }
            });
            chart.reflow();
            break;
    }
}