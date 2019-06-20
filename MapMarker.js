import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class MapMarker extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }

  render() {
    const markerStyle = {
      color: 'red',
      bottom: 150,
      left: '-45px',
      width: 220,
      backgroundColor: 'white',
      boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
      padding: 10,
      fontSize: 14,
      zIndex: 100,
    };

    return <div style={markerStyle}>{this.state.text}</div>
  }
}
export default MapMarker;