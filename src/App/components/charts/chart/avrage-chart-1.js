export default {
    type: 'area',
    height: 50,
    options: {
        chart: {
            width: '100%',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#4680ff'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.8,
                opacityTo: 0.4,
                stops: [0, 80, 100]
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        yaxis: {
            min: 0,
            max: 100,
        },
        tooltip: {
            show: false,
            fixed: {
                enabled: false
            },
            x: {
                show: false,
            },
            y: {
                title: {
                    formatter: (seriesName) => ''
                },
                show: false,
            },
            marker: {
                show: false
            }
        }
    },
    series: [{
        name: 'series1',
        data: [40, 60, 35, 55, 35, 75, 50]
    }]
}