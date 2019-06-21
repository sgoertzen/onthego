import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class CoutryButtons extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }

  render() {
    return <div>Location buttons here</div>
  }
}
export default CoutryButtons;