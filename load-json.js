var loadedJSON = null;
var rawData = [];

inputField = document.querySelector("#JSONFile");
inputField.onchange = function () {
    echartslayer.chart.showLoading();   // Show Loading Animation

    if ('files' in inputField && inputField.files.length == 1) {
        var file = inputField.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var contents = e.target.result;
            try {
                loadedJSON = JSON.parse(contents.toString());
            }
            catch (e) {
                alert("Unable to parse JSON");
            }
            try {
                var locationData = [];
                var dateData = [];

                
                for (var i = 0; i < loadedJSON.locations.length; i++) {
                    if (loadedJSON.locations[i].accuracy > 5) {
                        rawData.push(
                            [
                                loadedJSON.locations[i].timestampMs * 1,
                                [loadedJSON.locations[i].longitudeE7 * 0.0000001, loadedJSON.locations[i].latitudeE7 * 0.0000001],
                                loadedJSON.locations[i].accuracy * 1
                            ]);
                        locationData.push([loadedJSON.locations[i].longitudeE7 * 0.0000001, loadedJSON.locations[i].latitudeE7 * 0.0000001]);
                        dateData.push(loadedJSON.locations[i].timestampMs);
                    }
                }


                dateStart = 0;
                dateEnd = dateData[dateData.length - 1] - dateData[0];

                var timer = 0;
                $(function () {
                    $("#slider-range").slider({
                        range: true,
                        min: dateStart,
                        max: dateEnd,
                        values: [(dateEnd - dateStart) / 3, (dateEnd - dateStart) / 3 * 2],
                        slide: function (event, ui) {
                            selectStart = 0;
                            selectEnd = 0;
                            timer++;
                            if (timer > 10) {
                                timer = 0;
                                selectStart = ui.values[0] * 1 + dateData[0] * 1;
                                selectEnd = ui.values[1] * 1 + dateData[0] * 1;

                                var selectedLocData = [];
                                var selectedAccuracyData = [];
                                var selectedDateData = [];

                                for (var i = 0; i < rawData.length; i++) {
                                    if (rawData[i][0] > selectStart && rawData[i][0] < selectEnd) {
                                        selectedDateData.push(rawData[i][0]);
                                        selectedLocData.push(rawData[i][1]);
                                        selectedAccuracyData.push(rawData[i][2]);
                                    }
                                }
                                newOption = {
                                    xAxis: {
                                        data: selectedDateData
                                    },
                                    series: [
                                        {
                                            name: "mapdots",
                                            data: selectedLocData
                                        },
                                        {
                                            name: "accuracy",
                                            data: selectedAccuracyData
                                        }
                                    ]
                                }
                                echartslayer.chart.setOption(newOption);
                            }
                        }
                    });
                });


                newOption = {
                    xAxis: {
                        data: dateData
                    },
                    series: [
                        {
                            name: "mapdots",
                            data: locationData
                        },
                        {
                            name: "accuracy",
                            data: []
                        }
                    ]
                }
                echartslayer.chart.setOption(newOption);    // update option


                echartslayer.chart.hideLoading();           // Hide Loading Animation
            }
            catch (e) {
                alert("File content error");
                echartslayer.chart.hideLoading();
            }
        }
        reader.readAsText(file, "UTF-8");
    }
    else {
        alert("Failed to load file");
    }
}
