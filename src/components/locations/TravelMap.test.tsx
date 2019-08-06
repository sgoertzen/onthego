import React from 'react';
import ReactDOM from 'react-dom';
import TravelMap from './TravelMap';
import { ITravelLocation, TravelLocation } from '../../classes/TravelLocation';

it('renders without crashing', () => {
    let locations: ITravelLocation[] = []
    const div = document.createElement('div');
    ReactDOM.render(<TravelMap locations={locations} onLocChange={() => { }} />, div);
    ReactDOM.unmountComponentAtNode(div);
});