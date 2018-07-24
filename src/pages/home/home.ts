import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { Settings } from '../../providers/settings/settings';

declare var google;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 5005,
  maximumAge: 0
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  latitude: number;
  longitude: number;
  options: any;

  constructor(public geolocation: Geolocation, public navCtrl: NavController, public settings: Settings, public platform: Platform) {
      this.options = {
        enableHighAccuracy: true,
        timeout: 10000
      };
      platform.ready().then(() => {
        this.geolocation.getCurrentPosition(this.options).then((position: Geoposition) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log(this.latitude, this.longitude);
          this.initMap( this.latitude, this.longitude);

        }, error => {
          console.log(error);
          this.initMap( 43.647595, -79.382628);

        });
      });
  }
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

  initMap(LAT, LONG) {

    map = new google.maps.Map(this.mapElement.nativeElement, {
      //center: {lat: 42.346903, lng: -71.135101},
      center: {lat: LAT, lng: LONG},
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    var NEWRADIUS = 1000;

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
    };


    service.nearbySearch({
      location: {lat: LAT, lng: LONG},
      radius: NEWRADIUS,
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
      location: {lat: LAT, lng: LONG},
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
      location: {lat: LAT, lng: LONG},
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

  }
}
   
