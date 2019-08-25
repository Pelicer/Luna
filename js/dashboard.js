colors = []
colors.push('rgb(95, 114, 120)');
colors.push('rgb(134, 175, 73)');
colors.push('rgb(138, 154, 154)');

function ShowDetailModal(Element) {
    var modal = document.getElementById("DetailsModal");
    modal.style.display = "block";
    LoadGoalSummary();
}

function CloseModal() {
    var modal = document.getElementById("DetailsModal");
    modal.style.display = "none";
}

var wrapper = document.getElementById("wrapper");

function LoadGoalSummary() {
    Highcharts.chart('progresschart', {
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


function LoadGraphs() {
    Highcharts.chart('maingoal', {
        chart: {
            type: 'bar'
        },
        colors: colors,
        title: {
            text: ''
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
        }]
    });

    var graphs = document.getElementsByClassName("graph");
    for (let i = 0; i < graphs.length; i++) {
        // Build the chart
        Highcharts.chart(graphs[i].getAttribute("id"), {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                backgroundColor: "transparent",
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
                        y: 61.41
                    },
                    {
                        name: '',
                        y: 11.84
                    }
                ]
            }],
            exporting: {
                enabled: false
            }
        });
    }
    var objectives = document.getElementsByClassName("objective");
    for (let i = 0; i < objectives.length; i++) {
        Highcharts.chart(objectives[i].getAttribute("id"), {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                backgroundColor: "transparent"
            },
            title: {
                style: {
                    color: 'black',
                },
                text: '68%',
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
                    ['', 58.9],
                    ['', 13.29]
                ]
            }],
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            }
        });
    }
};