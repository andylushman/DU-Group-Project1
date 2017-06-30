//CORS plugin is needed...
//=======================
//GLOBAL VARIABLES
//=====================

var map;
var infoWindow;
var database = firebase.database();

<<<<<<< HEAD
var currentPlaceId = "ChIJs2kmHut4bIcRkQyaPSHmobk";
var currentPlaceImage = "fred";
var currentPlaceName = "Bob's Bar";
var currentPlaceReview = "Bob's is awesome";
var currentPlaceRating = "3.8";
var currentPlaceAuthor = "Don";
var currentPlaceHours = "11:00 - 2:00am";
var nextCard = 1;
var stopNumber =1;
var googlePlacesKey = "AIzaSyAayhY8ruruLoqLHOu49qli99n4lw2FjBQ";
var googlePlacesQuery = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" + currentPlaceId + "&key=" + googlePlacesKey;
=======
var currentPlaceId;
var currentPlaceImage;
var currentPlaceName;
var currentPlaceReview;
var currentPlaceAuthor;
var currentPlaceHours;
var nextCard = 0;
var latLong;

>>>>>>> 6a9543e7f2ba5998d23e7423438d58e8874d595a

//=======================
//FUNCTIONS
//=======================

//Initalize Function
function initMap() {
  //Denver coordinates
  var currentLocation = () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
        console.log(pos);
        latLong = pos;
        search();
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
  infoWindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  //Search based on bar
  function search(){
    service.nearbySearch({
      location: latLong,
      radius: 2000,
      type: ["bar"]
    }, callback); //Calls callback function
  }
}; // End initMap()



//Callback function
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]); //Puts each location in loop through the createMarker function
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
    var that = this;
    currentPlaceId = place.place_id;
<<<<<<< HEAD
    infoWindow.open(map, this);
    console.log(currentPlaceId);
    //Click on the addToCrawl button
    $("#addToCrawl").on("click", function(){
       dataPush();
      newCard(); 
    });
=======
    ajaxCall(popUp, that);

    function popUp(that){
      infoWindow.setContent("<h4>" + currentPlaceName + "</h4><p>&quot;" + currentPlaceReview + "&quot;</p><p class='author'> -" +currentPlaceAuthor+ "</p><h5>Hours of Operation</h5><p>" + currentPlaceHours + "</p><button class='btn btn-primary' id='addToCrawl'>Add To Crawl</button>");
      infoWindow.open(map, that);
      //Click on the addToCrawl button
      $("#addToCrawl").on("click", function(){
        newCard();
      });
    }
>>>>>>> 6a9543e7f2ba5998d23e7423438d58e8874d595a
  });
}; //end createMarker()

//Function to add new card
function newCard() {
  //To help with creating a new id for each card
  
  console.log(nextCard);
  //Create a new card div
  database.ref().on("child_added", function(snapshot) {

  $("#results").append('<div><button class="accordion btn btn-primary btn-block">'+ snapshot.val().name +'  <span class="caret"></span></button><div style="display: none" class="panel" id="card'+[nextCard]+'"</div>');
  $("#card"+[nextCard]).append(snapshot.val().photo);
  // $("#results").append('<img src="' + currentPlaceImage + '" class="place-image" id="placeImage" style="width:100%">');
<<<<<<< HEAD
  $("#card"+[nextCard]).append('<p>&quot;' + snapshot.val().review + '&quot;</p><p class="author"> -' +snapshot.val().author+ "</p>");
  $("#card"+[nextCard]).append('<h5>Rating: ' + snapshot.val().rating + ' out of 5.</h5></div>');
=======
  $("#card"+[nextCard]).append('<p>&quot;' + currentPlaceReview + '&quot;</p><p class="author"> -' +currentPlaceAuthor+ "</p>");
  $("#card"+[nextCard]).append('<h5>Hours of Operation</h5><p>' + currentPlaceHours + '</p>');
>>>>>>> 6a9543e7f2ba5998d23e7423438d58e8874d595a

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
      };
  }
});  
  nextCard ++;
  }

  // newCard();

//Function to call ajax
function ajaxCall(genericName, that){

<<<<<<< HEAD
 
=======
  var googlePlacesKey = "AIzaSyAayhY8ruruLoqLHOu49qli99n4lw2FjBQ";
  var googlePlacesQuery = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" + currentPlaceId + "&key=" + googlePlacesKey;
>>>>>>> 6a9543e7f2ba5998d23e7423438d58e8874d595a
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
<<<<<<< HEAD
      // newCard();
=======
      console.log(currentPlaceName);
      genericName(that);
>>>>>>> 6a9543e7f2ba5998d23e7423438d58e8874d595a
  });
} //end ajax()

//Add card to database
function dataPush() {
  console.log("it tried to push");
  console.log(currentPlaceName);
  database.ref().push({
    name: currentPlaceName,
    placeId: currentPlaceId,
    photo: currentPlaceImage,
    review: currentPlaceReview,
    author: currentPlaceAuthor,
    rating: currentPlaceRating,    
    hoursOfOperation: currentPlaceHours,
    nextDistance: 0,
    stopNumber: stopNumber,
    dateAdded: firebase.database.ServerValue.TIMESTAMP  
  });
}



//=======================
//MAIN PROCESS
//=======================
