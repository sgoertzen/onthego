import React from 'react';
import ReactDOM from 'react-dom';
import TravelMap from './TravelMap';

interface travelLocation {
    name: string,
    lat: number,
    lng: number,
    arrive?: Date,
    depart?: Date
}

it('renders without crashing', () => {
    let locations: travelLocation[] = []
  const div = document.createElement('div');
  ReactDOM.render(<TravelMap locations={locations}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});