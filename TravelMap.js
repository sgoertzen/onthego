import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const handleApiLoaded = (map, maps, places) => {
  const markers = [];
  const infowindows = [];

  // places.forEach((place) => {
  //   markers.push(new maps.Marker({
  //     position: {
  //       lat: place.geometry.location.lat,
  //       lng: place.geometry.location.lng,
  //     },
  //     map,
  //   }));

  //   infowindows.push(new maps.InfoWindow({
  //     content: getInfoWindowString(place),
  //   }));
  // });

  // markers.forEach((marker, i) => {
  //   marker.addListener('click', () => {
  //     infowindows[i].open(map, marker);
  //   });
  // });
};

class TravelMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: null,
    };
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    const markers = this.props.locations.map(loc => {
      return (
        <MapMarker
            lat={loc.lat}
            lng={loc.lng}
            text={loc.name}
          />
      );
    });
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          bootstrapURLKeys={{ key: 'AIzaSyBDe1KUNj3px_7kkfl7cfkrEpihDwvunt4' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {markers}
        </GoogleMapReact>
      </div>
    );
  }
}

export default TravelMap;