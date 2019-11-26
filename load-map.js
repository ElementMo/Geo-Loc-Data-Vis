var echartslayer;

// My token (not public token)
mapboxgl.accessToken = "pk.eyJ1IjoiZWxlbWVudG1vIiwiYSI6ImNrM2Y4dm55MjAwNnczbG80M2hrZ3Q3dzEifQ._AmTHcuM701F6x6iBmt_yA";

var map = new mapboxgl.Map({
    container: "container",
    style: "mapbox://styles/mapbox/dark-v10",
    center: [-77.045, 38.896],
    zoom: 13
});

// map.addControl(new mapboxgl.NavigationControl());



map.on(
    "load",
    function() {
        option = {
            backgroundColor: '#10152077',
            GLMap: {},
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            grid: [{
                show: true,
                left: 0,
                right: 0,
                top: window.innerHeight - 200,
                bottom: 0,
                borderColor: 'transparent',
                backgroundColor: '#404a5920',
                z: 0
            }],
            series: [{
                    name: "mapdots",
                    type: "scatterGL",
                    progressive: 1e6,
                    coordinateSystem: 'GLMap',
                    polyline: true,
                    symbolSize: 2,
                    blendMode: 'lighter',
                    large: true,
                    itemStyle: {
                        normal: {
                            color: '#20AADD'
                        },
                        silent: true,
                    },
                    data: []
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
                }
            ]
        }
        echartslayer = new EchartsLayer(map);
        echartslayer.chart.setOption(option);
    }
);