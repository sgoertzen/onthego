import React, { Component } from 'react';
import LocationButton from './LocationButton.js'


class CoutryButtons extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const buttons = this.props.locations.map(loc => {
      return (
        <LocationButton text={loc.name}
          />
      );
    });
    return buttons
  }
}
export default CoutryButtons;