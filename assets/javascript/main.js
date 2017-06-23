//=======================
//GLOBAL VARIABLES
//=======================
var map;
var infowindow;




//=======================
//FUNCTIONS
//=======================

//Initalize Function
function initMap() {
  //Denver coordinates
  var denver = {lat:39.7392,lng:-104.9903};
  //Map that is loaded on page
  map = new google.maps.Map(document.getElementById("map"), {
    center: denver,
    zoom: 15
  });
  //
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  //Search based on bar
  service.nearbySearch({
    location: denver,
    radius: 10000,
    type: ["bar"]
  }, callback); //Calls callback function
}; // End initMap()

//Callback function
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]); //Puts each location in the createMarker function
    };
  };
}; //End callback()

//Create Marker Function
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var image = {
    url: "./assets/images/beer-512.png",
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25)
  };
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: image,
  });
  //When a marker is clicked, run this function
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent("<h4>" + place.name + "</h4><h5> Place ID:" + place.place_id + "</h5>");
    infowindow.open(map, this);
  });
}; //end createMarker()




//=======================
//MAIN PROCESS
//=======================
