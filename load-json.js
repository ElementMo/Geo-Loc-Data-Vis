var loadedJSON = null;

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
            console.log(loadedJSON);

            try {
                var locationData = [];
                for (var i = 0; i < loadedJSON.locations.length; i++) {
                    locationData.push([loadedJSON.locations[i].longitudeE7 * 0.0000001, loadedJSON.locations[i].latitudeE7 * 0.0000001]);
                }
                newOption = {
                    series: [
                        {
                            data: locationData
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
