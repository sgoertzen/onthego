import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class CoutryButtons extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <button>{this.props.text}</button>
  }
}
export default CoutryButtons;