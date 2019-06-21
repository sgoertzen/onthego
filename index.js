import React, { Component } from 'react';
import { render } from 'react-dom';
import Title from './Title';
import './style.css';
import TravelMap from './TravelMap';
import CountryButtons from './CountryButtons'

class App extends Component {
  constructor() {
    super();
    this.state = {
      locations: [
        {name:'Ohio', lat: 41.1740136,lng: -81.519837,arrive:null,depart:new Date('2012-01-01T03:24:00')},
        {name:'Lafayette, CA', lat: 37.8937188,lng: -122.1579631,arrive:new Date('2012-01-01T03:24:00'),depart:new Date('2019-07-28T03:24:00')},
        {name:'Cuba', lat: 21.5001927,lng:-81.8118274,arrive:new Date('2019-07-28T03:24:00'),depart:new Date('2019-08-06T03:24:00')},
        {name:'France', lat: 48.8588376, lng:2.2768492,arrive:new Date('2019-08-06T03:24:00'),depart:new Date('2019-09-06T03:24:00')}
      ]
    };
  }

  render() {
    return (
      <div>
        <Title/>
        <div>
        <TravelMap zoom={4} center={this.state.locations[0]} locations={this.state.locations}/>
        </div>
        <p>
          Ohio is just listed on here so we can see what the "traveled" path looks like.
        </p>
        <CountryButtons/>
      </div>
      
    );
  }
}

render(<App />, document.getElementById('root'));
