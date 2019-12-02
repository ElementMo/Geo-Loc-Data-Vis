var loadedJSON = null;

inputField = document.querySelector("#JSONFile");
inputField.onchange = function () {
    myChart.showLoading();   // Show Loading Animation

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

                for (var i = 0; i < loadedJSON.locations.length; i++) {
                    locationData.push([loadedJSON.locations[i].longitudeE7 * 0.0000001, loadedJSON.locations[i].latitudeE7 * 0.0000001]);
                }
                newOption = {
                    series: [
                        {
                            name: 'points',
                            data: locationData
                        }
                    ]
                }
                myChart.setOption(newOption);    // update option

                
                myChart.setOption(newOption);

                myChart.hideLoading();           // Hide Loading Animation
            }
            catch (e) {
                alert("File content error");
                myChart.hideLoading();
            }
        }
        reader.readAsText(file, "UTF-8");
    }
    else {
        alert("Failed to load file");
    }
}
