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

            // create loc data array
            var locationData = [];
            for(var i=0; i<loadedJSON.locations.length; i++){
                locationData.push([loadedJSON.locations[i].longitudeE7 * 0.0000001, loadedJSON.locations[i].latitudeE7 * 0.0000001]);
            }
            // create new option
            newOption = {
                series: [
                    {
                        // data: [
                        //     [-77.04579, 38.89695],
                        //     [-77.045, 38.896]
                        // ]
                        data: locationData
                    }
                ]
            }
            // update option
            echartslayer.chart.setOption(newOption);
            echartslayer.chart.hideLoading();   // Hide Loading Animation
        }
        reader.readAsText(file, "UTF-8");
    }
    else {
        alert("Failed to load file");
    }
}
