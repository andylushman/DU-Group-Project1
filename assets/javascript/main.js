//=======================
//GLOBAL VARIABLES
//=======================
var map;
var infowindow;




//=======================
//FUNCTIONS
//=======================



function initMap() {
  var denver = {lat:39.7392,lng:-104.9903};

  map = new google.maps.Map(document.getElementById("map"), {
    center: denver,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: denver,
    radius: 10000,
    type: ["bar"]
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent("<h4>" + place.name + "</h4><h5> Place ID:" + place.place_id + "</h5>");
    infowindow.open(map, this);
  });
}




//=======================
//MAIN PROCESS
//=======================
