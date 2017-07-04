//CORS plugin is needed...
//=======================
//GLOBAL VARIABLES
//=====================

var map;
var infoWindow;
var marker;
var service;

var currentPlaceId;
var currentPlaceImage;
var currentPlaceName;
var currentPlaceReview;
var currentPlaceAuthor;
var currentPlaceHours;
var nextCard = 0;
var latLong;
var markers = [];



//=======================
//FUNCTIONS
//=======================

//Initalize Function
function initMap() {
  //Denver coordinates
  var currentLocation = () => {
    // Try HTML5 geolocation.
    //Event Listen for when window loads, fire off autoComplete funtion
    google.maps.event.addDomListener(window, 'load', autoCompleteLocation);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        // infoWindow.setContent("<img src='./assets/images/starter-icon.png' alt='Smiley face' height='30' width='40px'>");
        infoWindow.open(map);
        map.setCenter(pos);
        console.log(pos);
        latLong = pos;
        search(latLong);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }//end currentLocation()

  //If no geolocation service, run this function
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }; //end handleLocationError()

  var denver = {lat:39.7392,lng:-104.9903};
  //Map that is loaded on page
  map = new google.maps.Map(document.getElementById("map"), {
    center: currentLocation(),
    zoom: 14
  });
  //
  var youAreHereImage = "<img src='./assets/images/starter-icon.png' alt='Smiley face' height='30' width='40px'>"
   infoWindow = new google.maps.InfoWindow({
    content: youAreHereImage
   });
    service = new google.maps.places.PlacesService(map);
}; // End initMap()

  //Search based on bar
  function search(latLng){
    console.log("search fire", latLng);
    service.nearbySearch({
      location: latLng,
      radius: 2000,
      type: ["bar"]
    }, callback); //Calls callback function
  }

//Callback function
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], "./assets/images/beer-512.png"); //Puts each location in loop through the createMarker function
    };
  };
}; //End callback()

//Create Marker Function
//@param place the place obj used for creating marker
//@param imgUrl marker icon
function createMarker(place, imgUrl) {
  var placeLoc = place.geometry.location;
  var image = {
    url: imgUrl,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25)
  };
    marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: image,
  });
    markers.push(marker);
  //When a marker is clicked, run this function
  google.maps.event.addListener(marker, 'click', function() {
    var that = this;
    currentPlaceId = place.place_id;
    ajaxCall(popUp, that);

    function popUp(that){
      infoWindow.setContent("<h4>" + currentPlaceName + "</h4><p>&quot;" + currentPlaceReview + "&quot;</p><p class='author'> -" +currentPlaceAuthor+ "</p><h5>Hours of Operation</h5><p>" + currentPlaceHours + "</p><button class='btn btn-primary' id='addToCrawl'>Add To Crawl</button>");
      infoWindow.open(map, that);
      //Click on the addToCrawl button
      $("#addToCrawl").on("click", function(){
        newCard();
      });
    }
  });
}; //end createMarker()

//Function to add new card
function newCard() {
  //To help with creating a new id for each card
  nextCard ++;
  console.log(nextCard);
  //Create a new card div
  $("#results").append('<button class="accordion btn btn-primary btn-block">'+currentPlaceName +'  <span class="caret"></span></button><div style="display: none" class="panel" id="card'+[nextCard]+'"</div>');
  $("#card"+[nextCard]).append(currentPlaceImage);
  // $("#results").append('<img src="' + currentPlaceImage + '" class="place-image" id="placeImage" style="width:100%">');
  $("#card"+[nextCard]).append('<p>&quot;' + currentPlaceReview + '&quot;</p><p class="author"> -' +currentPlaceAuthor+ "</p>");
  $("#card"+[nextCard]).append('<h5>Hours of Operation</h5><p>' + currentPlaceHours + '</p>');

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function(){
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
              panel.style.display = "none";
          } else {
              panel.style.display = "block";
          }
      }
  }
}// newCard();
var placeSearch, autocomplete;

//function to prepopulate text from startlocation input
function autoCompleteLocation () {
console.log("autocomplete testing");
var input = document.getElementById('startLocation');
autocomplete = new google.maps.places.SearchBox(input);
autocomplete.bindTo("bounds", map);
// google.maps.event.addDomListener(window, 'load', autoCompleteLocation);
// getAddressPlace();
autocomplete.addListener("places_changed", function() {
  var place = autocomplete.getPlaces();
  var bounds =  new google.maps.LatLngBounds();
  console.log("Helloooo World", place)

  markers.forEach(function(mark) {
    mark.setMap(null);
  });
  

  // marker = [];
  
  var image = {
        url: "./assets/images/starter-icon.png",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
  // places.forEach(function(place){
    console.log("Are we getting places ???", place[0].geometry)
    map.setCenter(place[0].geometry.location)
    map.setZoom(15)
    search(place[0].geometry.location);
     marker = new google.maps.Marker({
            map: map,
            position: place[0].geometry.location,
            icon: image,
          })
    if(!place[0].geometry) {
      console.log("no results found!");
      return 
    }
   
    if (place[0].geometry.viewport) {

      bounds.union(place[0].geometry.viewport);

    } 
    // })
  })
}//End autoCompleteLocation();

//function to get the address of the startLocation input

function getAddressPlace() {
    // $('#map').fadeIn();
         console.log(autocomplete.getPlace(),"autocomplete test");
     lat = autocomplete.getPlace().geometry.location.lat();
     lng = autocomplete.getPlace().geometry.location.lng();
    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 16,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Entered location'
    });   
    console.log("winner winner chicken dinner");
   
}
//Function to call ajax
function ajaxCall(genericName, that){

  var googlePlacesKey = "AIzaSyAayhY8ruruLoqLHOu49qli99n4lw2FjBQ";
  var googlePlacesQuery = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" + currentPlaceId + "&key=" + googlePlacesKey;
  console.log(googlePlacesQuery);

  $.ajax ({
    url: googlePlacesQuery,
    headers: {
      "Access-Control-Allow-Origin": true
    },
    method: 'get'
  }).done(function (response){
      console.log(response.result.photos[0].html_attributions);
      currentPlaceName = response.result.name;
      currentPlaceImage = response.result.photos[0].html_attributions.slice(15);
      currentPlaceReview = response.result.reviews[0].text;
      currentPlaceAuthor = response.result.reviews[0].author_name;
      currentPlaceHours = response.result.opening_hours.weekday_text;
      console.log(currentPlaceName);
      genericName(that);

  });
} //end ajax()


//=======================
//MAIN PROCESS
//=======================
