import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

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
  constructor(public navCtrl: NavController) {
    this.initMap();
  }

  initMap() {
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location);
      map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: location.coords.latitude, lng: location.coords.longitude},
        zoom: 15
      });
  
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);

      service.nearbySearch({
        location: {lat: location.coords.latitude, lng: location.coords.longitude},
        radius: 5000,
        type: 'restaurant'
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
        radius: 5000,
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
        radius: 5000,
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
      infowindow.setContent('<div><strong>' + place.name + '</strong>' +
      '<br>' + '2 Rewards Points / $1 '+ '<br>' +
      place.vicinity + '</div>');
      infowindow.open(map, this);
    });
  };

  createStoreMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc
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


}
