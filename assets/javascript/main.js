//CORS plugin is needed...
//=======================
//GLOBAL VARIABLES
//=====================
// 
var currentPlaceId = "ChIJgwMHsdl-bIcRN8G1_C4crgI";
var currentPlaceImage = "assets/images/tulips.jpg";
var currentPlaceName;
var currentPlaceReview;
var currentPlaceAuthor;

 var googlePlacesKey = "AIzaSyAayhY8ruruLoqLHOu49qli99n4lw2FjBQ";
 var googlePlacesQuery = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + currentPlaceId + "&key=" + googlePlacesKey;
// Array of markers
var markers = [
  {
    coords:{lat:39.758241,lng:-105.007269},
    iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content:"<h1>Denver Beer Co</h1>"
  },
  {
    coords:{lat:39.758641,lng:-105.009066},
    iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
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

  // Listen for click on map
  google.maps.event.addListener(map, "click", function(event){
    // Add marker
    addMarker({coords:event.latLng});
  });

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
}

function newCard() {
  $("#results").append('<div class="row"><div class="col-lg-10 col-lg-offset-1 collapse">');  
  $("#results").append('<button type="button" class="btn btn-success btn-block" data-toggle="collapse" data-target="#demo">  '+ currentPlaceName + '<span class="caret">  </span></button>');
  $("#results").append('<div id="demo" class="collapse">');
  $("#results").append('<img src="' + currentPlaceImage + '" class="place-image" id="placeImage" style="width:100%">');
  $("#results").append('<p>&quot;' + currentPlaceReview + '&quot;</p></p class="author"> -' +currentPlaceAuthor+ "</p></div></div></div>");

}
// newCard();

$.ajax ({
  url: googlePlacesQuery,
  headers: {
    "Access-Control-Allow-Origin": true
  }, 
  method: 'get'
}).done(function (response){
    console.log(response.result.name);
    currentPlaceName = response.result.name;
    currentPlaceImage = response.result.photos[0].html_attributions;
    currentPlaceReview = response.result.reviews[0].text;
    currentPlaceAuthor = response.result.reviews[0].author_name;
    newCard();
});

//=======================
//MAIN PROCESS
//=======================
