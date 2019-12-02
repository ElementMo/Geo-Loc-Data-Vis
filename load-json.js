var loadedJSON = null;
var rawData = [];

inputField = document.querySelector("#JSONFile");
inputField.onchange = function () {
    chart.showLoading();   // Show Loading Animation

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

                var initLocDict = {};

                for (var i = 0; i < loadedJSON.locations.length; i++) {
                    if (loadedJSON.locations[i].activity != null) {
                        rawData.push(
                            [
                                loadedJSON.locations[i].timestampMs * 1,
                                [loadedJSON.locations[i].longitudeE7 * 0.0000001, loadedJSON.locations[i].latitudeE7 * 0.0000001, 2],
                                loadedJSON.locations[i].activity.length,
                                loadedJSON.locations[i].activity
                            ]);
                        var shortLongitude = loadedJSON.locations[i].longitudeE7.toString().slice(0, 6);
                        var shortLatitude = loadedJSON.locations[i].latitudeE7.toString().slice(0, 5);
                        var shortLoc = shortLongitude + shortLatitude;
                        shortLoc.toString();
                        if (initLocDict[shortLoc] != null) {
                            initLocDict[shortLoc] += 1;
                        } else if (initLocDict[shortLoc] == null) {
                            initLocDict[shortLoc] = 0;
                        }
                        locationData.push([loadedJSON.locations[i].longitudeE7 * 0.0000001, loadedJSON.locations[i].latitudeE7 * 0.0000001, 2]);
                        dateData.push(loadedJSON.locations[i].timestampMs);

                    }
                }

                var res = Object.keys(initLocDict).sort(function (a, b) { return initLocDict[a] - initLocDict[b]; });
                var restoreLongitude = res[res.length - 1].slice(0, 6);
                var restoreLatitude = res[res.length - 1].slice(6, res.length - 1);
                console.log(restoreLongitude * 1 / 1000, restoreLatitude * 1 / 1000);

                map.setCenter([restoreLongitude * 1 / 1000, restoreLatitude * 1 / 1000]);
                map.setZoom(13);


                // Activity
                var tempActivityData = [];
                for (var i = 0; i < rawData.length; i++) {
                    tempActivityData.push(rawData[i][3]);
                }
                var activityData = [];
                activityData = getActivity(tempActivityData);

                // Active Amount
                var tempDateData = [];
                var tempActiveData = [];
                var tempActiveVal = 0;
                for (var i = 0; i < rawData.length; i++) {
                    tempActiveVal += rawData[i][2];
                    if(i%(parseInt(dateData.length/300)) == 0){
                        tempDateData.push(rawData[i][0]);
                        tempActiveData.push(tempActiveVal);
                        tempActiveVal = 0;
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
                        values: [0, (dateEnd - dateStart)],
                        slide: function (event, ui) {
                            selectStart = 0;
                            selectEnd = 0;
                            timer++;
                            if (timer > 10) {
                                timer = 0;
                                selectStart = ui.values[0] * 1 + dateData[0] * 1;
                                selectEnd = ui.values[1] * 1 + dateData[0] * 1;

                                var selectedLocData = [];
                                var selectedDateData = [];
                                var selectedActiveData = [];
                                var selectedActivityData = [];

                                var tempActivityData = [];
                                var activeVal = 0;

                                for (var i = 0; i < rawData.length; i++) {
                                    if (rawData[i][0] > selectStart && rawData[i][0] < selectEnd) {
                                        activeVal += rawData[i][2];
                                        if (i%(parseInt(dateData.length/300)) == 0) {
                                            selectedDateData.push(rawData[i][0]);
                                            selectedActiveData.push(activeVal);
                                            activeVal = 0;
                                        }
                                        selectedLocData.push(rawData[i][1]);
                                        tempActivityData.push(rawData[i][3]);
                                    }
                                }
                                selectedActivityData = getActivity(tempActivityData);

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
                                            data: selectedActiveData
                                        },
                                        {
                                            name: "Statistics",
                                            data: selectedActivityData
                                        }
                                    ]
                                }
                                chart.setOption(newOption);
                            }
                        }
                    });
                });


                newOption = {
                    xAxis: {
                        data: tempDateData
                    },
                    series: [
                        {
                            name: "mapdots",
                            data: locationData
                        },
                        {
                            name: "accuracy",
                            data: tempActiveData
                        },
                        {
                            name: "Statistics",
                            data: activityData
                        }
                    ]
                }
                chart.setOption(newOption);    // update option


                chart.hideLoading();           // Hide Loading Animation
            }
            catch (e) {
                alert("File content error");
                chart.hideLoading();
            }
        }
        reader.readAsText(file, "UTF-8");
    }
    else {
        alert("Failed to load file");
    }
}


function getActivity(activityArray) {
    var _activityData = [];
    var stillCount = 0;
    var vehicleCount = 0;
    var tiltingCount = 0;
    var runningCount = 0;
    var walkingCount = 0;
    var bikeCount = 0;
    var metroCount = 0;

    for (var i = 0; i < activityArray.length; i++) {

        var maxVal = 0;
        var maxIndex = 0;
        var secondIndex = 0;
        for (var j = 0; j < activityArray[i][0].activity.length; j++) {
            if (activityArray[i][0].activity[j].confidence * 1 > maxVal) {
                maxVal = activityArray[i][0].activity[j].confidence * 1;
                maxIndex = j;
            }
        }
        var type = activityArray[i][0].activity[maxIndex].type;
        if (type == "STILL") {
            stillCount++;
        } else if (type == "IN_VEHICLE" || type == "IN_CAR" || type == "IN_FOUR_WHEELER_VEHICLE" || type == "IN_ROAD_VEHICLE") {
            vehicleCount++;
        } else if (type == "TILTING") {
            tiltingCount++;
        } else if (type == "RUNNING") {
            runningCount++;
        } else if (type == "WALKING" || type == "ON_FOOT") {
            walkingCount++;
        } else if (type == "ON_BICYCLE") {
            bikeCount++;
        } else if (type == "IN_RAIL_VEHICLE") {
            metroCount++;
        }

    }
    _activityData.push(
        { value: stillCount, name: "STILL" },
        { value: vehicleCount, name: "VEHICLE" },
        { value: tiltingCount, name: "USING PHONE" },
        { value: runningCount, name: "RUN" },
        { value: walkingCount, name: "WALK" },
        { value: bikeCount, name: "BIKE" },
        { value: metroCount, name: "METRO" },
    );

    return _activityData;
}