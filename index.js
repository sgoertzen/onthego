import React, { Component } from 'react';
import { render } from 'react-dom';
import Title from './Title';
import './style.css';
import TravelMap from './map';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      locations: [
        {name:'Lafayette, CA', lat: 37.8937188,lng: -122.1579631},
        {name:'Cuba', lat: 21.5001927,lng:-81.8118274},
        {name:'France', lat: 48.8588376, lng:2.2768492}
      ]
    };
  }

  render() {
    return (
      <div>
        <Title/>
        <div>
        <TravelMap zoom={10} center={this.state.locations[0]}/>
        </div>
        <p>
          This is where the world travel information will go! :)
        </p>
      </div>
      
    );
  }
}

render(<App />, document.getElementById('root'));
