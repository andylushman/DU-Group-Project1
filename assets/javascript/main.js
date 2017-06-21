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
  var map = new google.Map($("#MAPDIVID"), options)
  //Add marker
  var marker = new google.maps.Marker({
    position: {lat: 39.758259, lng: -105.007198},
    map: map
  })
};


//=======================
//MAIN PROCESS
//=======================
