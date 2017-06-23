//=======================
//GLOBAL VARIABLES
//=======================

// Array of markers
var markers = [
  {
    coords:{lat:39.758241,lng:-105.007269},
    iconImage:"https:developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    content:"<h1>Denver Beer Co</h1>"
  },
  {
    coords:{lat:39.758641,lng:-105.009066},
    iconImage:"https:developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    content:"<h1>Ale House</h1>"
  },
  // {
  //   coords:{lat:,lng:-}
  // }
];



//=======================
//FUNCTIONS
//=======================

function initMap(){
  // Map options
  var options = {
    zoom: 13,
    center: {lat:39.7392,lng:-104.9903}
  }

  // New map
  var map = new google.maps.Map(document.getElementById("map"), options);

  // Loop through markers
  for(var i = 0;i < markers.length;i++){
    // Add marker
    addMarker(markers[i]);
  }

  // Add Marker Function
  function addMarker(props){
    var marker = new google.maps.Marker({
      position:props.coords,
      map:map,
      //icon:props.iconImage
    });

    // Check for customicon
    if(props.iconImage){
      // Set icon image
      // var icon = new google.maps.Icon({
      //   url: ,
      //   scaledSize: new google.maps.Size(15, 15)
      // });
      marker.setIcon(props.iconImage);
    }

    // Check content
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content:props.content
      });

      marker.addListener("click", function(){
        infoWindow.open(map, marker);
      });
    }
  }
} //initMap();




//=======================
//MAIN PROCESS
//=======================
// var googleMapsAPIKey = "AIzaSyA6mcqCJFzPLd_-UydR4nQRyb5O8kvIShM";
// var googleMapsAPIQuery =  "https://maps.googleapis.com/maps/api/js/json?key=AIzaSyA6mcqCJFzPLd_-UydR4nQRyb5O8kvIShM&libraries=places";
// $.ajax ({
//   url: googleMapsAPIQuery,
//   headers: {
//     "Access-Control-Allow-Origin": true
//   },
//   method: 'get'
// }).done(function (response){
//   console.log(response);
// });
