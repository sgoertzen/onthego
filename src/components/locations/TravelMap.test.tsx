import React from 'react';
import ReactDOM from 'react-dom';
import TravelMap from './TravelMap';
import { ITravelLocation, TravelLocation } from '../../classes/TravelLocation';
import firebase from 'firebase';
import { TimeStamp } from '../../classes/TimeStamp';

it('renders without crashing', () => {
    let locations: ITravelLocation[] = [
        new TravelLocation("1", "Alpha", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(10000))
    ]
    const div = document.createElement('div');
    ReactDOM.render(<TravelMap locations={locations} onLocChange={() => { }} />, div);
    ReactDOM.unmountComponentAtNode(div);
});