import React from 'react';
import ReactDOM from 'react-dom';
import TravelMap from './TravelMap';
import { GeoPoint } from '../classes/GeoPoint';
import { ITravelLocation } from '../classes/TravelLocation';

// interface travelLocation {
//     name: string,
//     lat: number,
//     lng: number,
//     arrive?: Date,
//     depart?: Date
// }

it('renders without crashing', () => {
    let locations: ITravelLocation[] = []
    const div = document.createElement('div');
    ReactDOM.render(<TravelMap locations={locations} onLocChange={() => { }} center={new GeoPoint()} />, div);
    ReactDOM.unmountComponentAtNode(div);
});