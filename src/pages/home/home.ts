import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Settings } from '../../providers/settings/settings';
import { Storage } from '@ionic/storage';

declare var google;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public settings: Settings) {
    this.initMap();
  }

  initMap() {

    navigator.geolocation.getCurrentPosition((location) => {
      map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: location.coords.latitude, lng: location.coords.longitude},
        zoom: 15
      });
  
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      var NEWRADIUS = 2500;

      var customLocations = [
        {
          "location": {
            "lat": 43.645694,
            "lng": -79.380248
          },
          "name" : "Pilot Coffee Roasters",
          "deal" : "5x points until 11pm!",
          "address" : "65 Front St W, Toronto"
        },

        {
          "location": {
            "lat": 43.656201,
            "lng": -79.378750
          },
          "name" : "Imperial Pub",
          "deal" : "2x points on all Domestic Beer!",
          "address" : "54 Dundas St E, Toronto"
        },
        {
          "location": {
            "lat": 43.648503,
            "lng": -79.373453
          },
          "name" : "C'est What",
          "deal" : "3x points on all comfort food!",
          "address" : "67 Front St E, Toronto"
        }
      ];

      for (var i = 0; i < customLocations.length; i++) {
        this.createSmallBusinessMarker(customLocations[i]);
      }

      service.nearbySearch({
        location: {lat: location.coords.latitude, lng: location.coords.longitude},
        radius: NEWRADIUS,
        type: 'restaurant'
      }, (results,status) => {
        console.log("RADIUS USED: " + NEWRADIUS)
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results[i].types.length; j++ ) {
              var TypeList = results[i].types[j];
              this.createFoodMarker(results[i]);
            };
          }
        }
      });

  
      service.nearbySearch({
        location: {lat: location.coords.latitude, lng: location.coords.longitude},
        radius: NEWRADIUS,
        type: 'meal_takeaway'
      }, (results,status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results[i].types.length; j++ ) {
              var TypeList = results[i].types[j];
              this.createFoodMarker(results[i]);
            };
          }
        }
      });

      service.nearbySearch({
        location: {lat: location.coords.latitude, lng: location.coords.longitude},
        radius: NEWRADIUS,
        type: 'store'
      }, (results,status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results[i].types.length; j++ ) {
              var TypeList = results[i].types[j];
              this.createStoreMarker(results[i]);
            };
          }
        }
      });
    });
  }

  createFoodMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc
    });
    
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent('<div><strong>' + place.name + '</strong>' + '<br>' + '2 Rewards Points / $1 '+ '<br>' +
      place.vicinity + '</div>');
      infowindow.open(map, this);
    });
  };

  createStoreMarker(place) {
    var placeLoc = place.geometry.location;

    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc,
    });

    if (place.types[0] === 'supermarket') {
      this.createFoodMarker(place);
    }
    else {
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong>' +
        '<br>' + '1 Reward Point / $1 '+ '<br>' +
        place.vicinity + '</div>');
        infowindow.open(map, this);
      });
    };
  };

  createSmallBusinessMarker(place) {
    var placeLoc = place.location;
    var image = {
      url: '../../assets/img/pin.png',
      size: new google.maps.Size(30, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 17),
      scaledSize: new google.maps.Size(30, 45)
    };
    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc,
      icon: image
    });
    
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent('<div><strong>' + place.name + '</strong>' + '<br>' + place.deal + '</br>' +
      place.address + '</div>');
      infowindow.open(map, this);
    });
  };

}
