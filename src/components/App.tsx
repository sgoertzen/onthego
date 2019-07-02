import React from 'react';
import './App.css';
import TravelMap from './TravelMap';

interface travelLocation {
    name: string,
    lat: number,
    lng: number,
    arrive?: Date,
    depart?: Date
}
const locations: travelLocation[] = [
    { name: 'Ohio', lat: 41.1740136, lng: -81.519837, arrive: new Date('2000-01-01T03:24:00'), depart: new Date('2012-01-01T03:24:00') },
    { name: 'Lafayette, CA', lat: 37.8937188, lng: -122.1579631, arrive: new Date('2012-01-01T03:24:00'), depart: new Date('2019-07-28T03:24:00') },
    { name: 'Cuba', lat: 21.5001927, lng: -81.8118274, arrive: new Date('2019-07-28T03:24:00'), depart: new Date('2019-08-06T03:24:00') },
    { name: 'France', lat: 48.8588376, lng: 2.2768492, arrive: new Date('2019-08-06T03:24:00'), depart: new Date('2019-09-06T03:24:00') }
];

const App: React.FC = () => {
    return (
        <div className="App">
            <TravelMap locations={locations} />
        </div>
    );
}

export default App;
