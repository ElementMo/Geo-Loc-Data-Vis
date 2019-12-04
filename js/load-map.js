var chart = echarts.init(document.getElementById('container'));
var ui_color = 'rgb(48, 170, 238)'
var ui_color_dark = 'rgb(4, 17, 23, 50)'
var ui_color_light = 'rgb(100, 200, 255)'

// My token (not public token)
mapboxgl.accessToken = "pk.eyJ1IjoiZWxlbWVudG1vIiwiYSI6ImNrM2Y4dm55MjAwNnczbG80M2hrZ3Q3dzEifQ._AmTHcuM701F6x6iBmt_yA";

var dotSize = 2;
if (window.devicePixelRatio > 1) {
    dotSize = 4;
}

var option = {
    mapbox3D: {
        style: "mapbox://styles/mapbox/dark-v10",
        center: [-95, 38],
        pitch: 2,
        zoom: 3.9,
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        inactiveColor: '#ccc',
        tooltip: {
            show: true
        },
        orient: 'horizontal',
        x: '8px',
        y: '8px',
        textStyle: {
            fontSize: 0.1,
            color: 'ui_color_light'
        },
        data: ['STILL', 'VEHICLE', 'USING PHONE', 'RUN', 'WALK', 'BIKE', 'METRO']
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        scale: '100%',
        type: 'value',
        splitLine: {
            show: false
        },
    },
    grid: [{
        show: true,
        left: 0,
        right: 0,
        top: window.innerHeight - 200,
        bottom: 0,
        borderColor: 'transparent',
    }],

    series: [{
            name: "mapdots",
            type: "scatter3D",
            progressive: 1e6,
            coordinateSystem: 'mapbox3D',
            symbolSize: dotSize,
            blendMode: 'lighter',
            large: true,
            postEffect: {
                enable: false
            },
            itemStyle: {
                normal: {
                    color: ui_color //'#30AAEE' //20AADD
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
            itemStyle: {
                color: ui_color
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: ui_color
                }, {
                    offset: 1,
                    color: ui_color_dark
                }])
            },
            data: []
        },
        {
            name: "Statistics",
            type: "pie",
            radius: ['8%', '16%'],
            center: ["190px", "160px"],
            avoidLabelOverlap: true,
            itemStyle: {
                normal: {
                    color: ui_color,
                    shadowBlur: 5
                }
            },
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

window.addEventListener("mousewheel", function(event) {
    event.preventDefault();
}, { passive: false });
window.addEventListener("DOMMouseScroll", function(event) {
    event.preventDefault();
}, { passive: false });