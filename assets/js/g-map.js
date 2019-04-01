
    var map;
    var service;
    var infowindow;
    var request;
    var markers = [];
function initializeMap(request) {
    var center = new google.maps.LatLng(35.789600, -78.668460);
    
    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 13,
      
    });

    request = {
        location: center,
        radius: 12070,
        types: ['liquor_store', 'supermarket', 'convenience_store'],

    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    google.maps.event.addListener(map, 'rightclick', function(event) {
        map.setCenter(event.LatLng)
        clearResults(markers)

        var request = {
        location: center,
        radius: 12070,
        types: ['liquor_store', 'supermarket', 'convenience_store'],
    };
    service.nearbySearch(request, callback);
    })
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
        markers.push(createMarker(results[i]));
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
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Rating: ' + place.rating + '<br>' + 'Open now?: ' +
                place.opening_hours.open_now + '</div>');
          infowindow.open(map, this);
        });
        return marker;
      }
function clearResults(markers) {
    for (var m in markers) {
        markers[m].setMap(null)
    }
    markers = [];
}