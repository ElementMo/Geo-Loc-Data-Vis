var chart = echarts.init(document.getElementById('container'));
mapboxgl.accessToken = "pk.eyJ1IjoiZWxlbWVudG1vIiwiYSI6ImNrM2Y4dm55MjAwNnczbG80M2hrZ3Q3dzEifQ._AmTHcuM701F6x6iBmt_yA";

var option = {
    backgroundColor: '#10152077',
    title: {
        text: 'Test',
            left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    mapbox3D: {
        style: "mapbox://styles/mapbox/dark-v10",
        center: [-77.045, 38.896],
        zoom: 13
    },
    series: [{
        name: 'points',
        type: 'scatter3D',
        progressive: 1e7,
        coordinateSystem: 'mapbox3D',
        symbolSize: 2,  
        blendMode: 'lighter',
        large: true,
        itemStyle: {
            color: '#20AADD'
        },
        silent: true,
        dimensions: ['lng', 'lat'],
        data: [
            // [-77.045, 38.896]
        ]
    }]
};

chart.setOption(option);

var map = chart.getModel().getComponent('mapbox3D').getMapbox();
map.addControl(new mapboxgl.NavigationControl());