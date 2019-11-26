var echartslayer;

// My token (not public token)
mapboxgl.accessToken = "pk.eyJ1IjoiZWxlbWVudG1vIiwiYSI6ImNrM2Y4dm55MjAwNnczbG80M2hrZ3Q3dzEifQ._AmTHcuM701F6x6iBmt_yA";

var map = new mapboxgl.Map(
    {
        container: "container",
        // style: {
        //     "version": 8,
        //     "sources": {},
        //     "layers": []
        // },
        style: "mapbox://styles/mapbox/dark-v10",
        center: [-77.045, 38.896],
        zoom: 13
    }
);

map.addControl(new mapboxgl.NavigationControl());


map.on(
    "load",
    function () {
        // map.addSource(
        //     "google.tile",{
        //         "type": "raster",
        //         "tiles": ["https://www.google.com/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"],
        //         "tileSize": 256 
        //     }
        // )
        // map.addLayer({
        //     "id": "google",
        //     "type": "raster",
        //     "source": "google.tile"
        // })
        option = {
            backgroundColor: '#10152077',
            GLMap: {},
            series: [
                {
                    type: "scatterGL",
                    progressive: 1e6,
                    coordinateSystem: 'GLMap',
                    symbolSize: 2,
                    blendMode: 'lighter',
                    large: true,
                    itemStyle: {
                        normal: {
                            color: '#20AADD'
                        },
                        silent: true,
                    },
                    data: new Float32Array()
                }
            ]
        }
        echartslayer = new EchartsLayer(map);
        echartslayer.chart.setOption(option);
    }
);