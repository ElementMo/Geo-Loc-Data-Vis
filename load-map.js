var chart = echarts.init(document.getElementById('container'));

// My token (not public token)
mapboxgl.accessToken = "pk.eyJ1IjoiZWxlbWVudG1vIiwiYSI6ImNrM2Y4dm55MjAwNnczbG80M2hrZ3Q3dzEifQ._AmTHcuM701F6x6iBmt_yA";

var option = {
    mapbox3D: {
        style: "mapbox://styles/mapbox/dark-v10",
        center: [-77.045, 38.896],
        row: 1,
        zoom: 13
    },
    backgroundColor: '#10152077',
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: '1%',
        y: '4%',
        itemStyle: {
            normal: {
                color: '#555555'
            }
        },
        data: ['STILL', 'VEHICLE', 'USING PHONE', 'RUN', 'WALK', 'BIKE', 'METRO']
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: false
        }
    },
    grid: [{
        show: true,
        left: 0,
        right: 0,
        top: window.innerHeight - 200,
        bottom: 0,
        borderColor: 'transparent',
        backgroundColor: '#404a5900',
        z: 0
    }],

    series: [{
            name: "mapdots",
            type: "scatter3D",
            progressive: 1e6,
            coordinateSystem: 'mapbox3D',
            symbolSize: 2,
            blendMode: 'lighter',
            large: true,
            postEffect: {
                enable: false
            },
            itemStyle: {
                normal: {
                    color: '#20AADD'
                },
                silent: true,
            },
            dimensions: ['lng', 'lat'],
            data: [],
            z: 99
        },
        {
            name: "accuracy",
            type: "line",
            smooth: true,
            symbol: 'none',
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            },
            data: []
        },
        {
            name: "Statistics",
            type: "pie",
            radius: ['8%', '16%'],
            center: ["16%", "15%"],
            avoidLabelOverlap: true,
            label: {
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                }
            },
            data: []
        }
    ]
}
chart.setOption(option);

var map = chart.getModel().getComponent('mapbox3D').getMapbox();
map.addControl(new mapboxgl.NavigationControl());