var loadedJSON = null;

inputField = document.querySelector("#JSONFile");
inputField.onchange = function () {
    if ('files' in inputField && inputField.files.length == 1) {
        var file = inputField.files[0];
        var reader = new FileReader();
        reader.onload = function(e)
        {
            var contents = e.target.result;
            try
            {
                loadedJSON = JSON.parse(contents.toString());
            }
            catch (e)
            {
                alert("Unable to parse JSON");
            }
            console.log(loadedJSON);
        }
        reader.readAsText(file, "UTF-8");
    }
    else
    {
        alert("Failed to load file");
    }
}
