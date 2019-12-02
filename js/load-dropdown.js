let button_grp = document.getElementsByClassName("mapboxgl-ctrl-group");
if (button_grp.length == 0) {
    console.error("Unable to attach button for changing map type.  Can't find element with class name: mapboxgl-ctrl-group");
} else {
    let dropdown = document.createElement("div");
    let dropdown_btn = document.createElement("button");
    dropdown_btn.setAttribute("onclick", "showDropDown()");
    dropdown_btn.setAttribute("class", "dropbtn");
    dropdown_btn.setAttribute("id", "dropdown_btn");
    dropdown_btn.setAttribute("type", "button");
    dropdown_btn.setAttribute("title", "Map theme");
    button_grp[0].appendChild(dropdown_btn);
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function showDropDown() {
    console.log(document.getElementById("myDropdown"));
    console.log(document.getElementById("myDropdown").classList.toggle("show"));
    // $(".myDropdown").toggleClass("show");
}

function changeMap(target) {
    console.log(target.id)
    console.log(target);
    target.classList.add("selected");
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var dropdown_elems = dropdowns[0].childNodes;
    console.log(dropdown_elems);
    var i;
    for (i = 0; i < dropdown_elems.length; i++) {
        var elem = dropdown_elems[i];
        if (typeof elem.classList !== 'undefined' && elem != target && elem.classList.contains('selected')) {
            elem.classList.remove('selected');
        }
    }
    map.setStyle('mapbox://styles/mapbox/' + target.id);
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}