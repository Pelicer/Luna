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

function LoadGoalSummary() {
    Highcharts.chart('maingoal', {
        chart: {
            type: 'line'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar']
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
            name: 'Farmácia',
            data: [150.0, 200.0, 350.0]
        }]
    });
}


function RenderGoals(Goals) {
    for (var i = 0; i < Goals.length; i++) {
        Goal = Goals[i];
        var Card = document.createElement("div");
        Card.setAttribute("id", Goal.ID);

        (Goal.Type === "Objetivo") ? Card.classList.add("objetivo") : Card.classList.add("meta");

        var DeleteButton = document.createElement("img");
        DeleteButton.src = "style/content/icon/garbage_black.png";
        DeleteButton.setAttribute("onmouseover", "ImageHover(this, 'plus')");
        DeleteButton.setAttribute("onmouseout", "ImageUnhover(this, 'plus')");
        DeleteButton.setAttribute("onClick", "ShowModal('View/modal/AddAmount')");

        var AddButton = document.createElement("img");
        AddButton.src = "style/content/icon/plus_black.png";
        AddButton.setAttribute("onmouseover", "ImageHover(this, 'plus')");
        AddButton.setAttribute("onmouseout", "ImageUnhover(this, 'plus')");
        AddButton.setAttribute("onClick", "ShowModal('View/modal/Confirmation')");

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
            EndDate.innerText = Goal.FinalDate;
            Info.appendChild(EndDate);
        }

        Info.appendChild(Title);
        Info.appendChild(Graph);

        Card.appendChild(AddButton);
        Card.appendChild(DeleteButton);
        Card.appendChild(Info);

        if (Goal.Type === "Objetivo") {
            var wrapper = document.getElementsByClassName("objetivos")[0];
            wrapper.appendChild(Card);
            RenderGraph(Goal)
        } else {
            var wrapper = document.getElementsByClassName("metas")[0];
            wrapper.appendChild(Card);
            RenderGraph(Goal)
        }
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
                    height: 300,
                },
                title: {
                    style: {
                        color: 'black',
                    },
                    text: (((Goal.Accumulated * 100) / Goal.FinalValue)) + "%",
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
                        ['', Goal.FinalValue],
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