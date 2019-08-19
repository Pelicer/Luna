colors = []
colors.push('rgb(95, 114, 120)');
colors.push('rgb(134, 175, 73)');
colors.push('rgb(138, 154, 154)');

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

function Activate(e) {
    var leftMenuIcons = document.getElementsByClassName("icon");
    e.classList.add("active");
    for (let i = 0; i < leftMenuIcons.length; i++) {
        if (leftMenuIcons[i] !== e) {
            leftMenuIcons[i].classList.remove("active");
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
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
                data: [
                    { name: '', y: 61.41 },
                    { name: '', y: 11.84 }
                ]
            }],
            exporting: {
                enabled: false
            }
        });
    }

})