import React, { Component } from 'react';


class MapMarker extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }

  render() {
    const markerStyle = {
      color: '#1c17b5',
      bottom: 150,
      left: '-45px',
      width: 120,
      backgroundColor: 'white',
      boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
      padding: 10,
      fontSize: 14,
      zIndex: 100,
      textAlign: 'center',
    };

    return <div style={markerStyle}>{this.state.text}</div>
  }
}
export default MapMarker;