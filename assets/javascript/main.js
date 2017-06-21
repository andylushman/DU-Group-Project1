//=======================
//GLOBAL VARIABLES
//=======================




//=======================
//FUNCTIONS
//=======================

function initMap() {
  //Map Options
  var option = {
    zoom: 8,
    center: {lat: 39.7392, lng: -104.9903}
  }
  //Putting the new map on the page
  var map = new google.Map($(".map"), options)
  //Add marker
  var marker = new google.maps.Marker({
    position: {lat: 39.758259, lng: -105.007198},
    map: map,
    icon: "https:developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
  });
  //Add InfoWindow
  var infoWindow: new google.maps.infoWindow({
    content: "<h1>Denver Beer Co</h1"
  });
  //Add listener for Info Window
  marker.addListener("click", function(){
    infoWindow.open(map, marker);
  });

};


//=======================
//MAIN PROCESS
//=======================
