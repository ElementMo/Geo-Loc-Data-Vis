var echartslayer;

var map = new mapboxgl.Map(
    {
        container: "container",
        style: {
            "version": 8,
            "sources": {},
            "layers": []
        },
        center: [-77.045, 38.896],
        zoom: 13
    }
);

map.addControl(new mapboxgl.NavigationControl());

map.on(
    "load",
    function () {
        map.addSource(
            "google.tile",
            { "type": "raster", "tiles": ['https://www.google.com/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'], "tileSize": 256 }
        )
        map.addLayer({
            "id": "google",
            "type": "raster",
            "source": "google.tile"
        })
        option = {
            backgroundColor: '#101520BB',
            GLMap: {},
            series: [
                {
                    data: [],
                    type: "scatter",
                    coordinateSystem: 'GLMap',
                    symbolSize: 4,
                    itemStyle: {
                        normal: {
                            opacity: 0.5,
                            color: '#20AADD'
                        }
                    },
                    blendMode: 'screen'
                }
            ]
        }
        echartslayer = new EchartsLayer(map);
        echartslayer.chart.setOption(option);
    }
);