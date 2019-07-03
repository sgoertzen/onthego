import React from 'react';
import './App.css';
import TravelMap from './TravelMap';
import * as firebase from "firebase/app";
import "firebase/firestore";
import { ITravelLocation, TravelLocation } from '../classes/TravelLocation';
import LocationButtons from './LocationButtons';
import {firebaseConfig2} from  '../config/firebase.config'

// Initialize Firebase
firebase.initializeApp(firebaseConfig2);

const locations: ITravelLocation[] = [
    // { name: 'Ohio', coords: {latitude: 41.1740136, longitude: -81.519837}, arrive: new Date('2000-01-01T03:24:00'), depart: new Date('2012-01-01T03:24:00') },
    // { name: 'Lafayette, CA', coords: {latitude: 37.8937188, longitude: -122.1579631}, arrive: new Date('2012-01-01T03:24:00'), depart: new Date('2019-07-28T03:24:00') },
    // { name: 'Cuba', coords: {latitude: 21.5001927, longitude: -81.8118274}, arrive: new Date('2019-07-28T03:24:00'), depart: new Date('2019-08-06T03:24:00') },
    // { name: 'France', coords: {latitude: 48.8588376, longitude: 2.2768492}, arrive: new Date('2019-08-06T03:24:00'), depart: new Date('2019-09-06T03:24:00') }
];

interface IMyComponentState {
    locs: TravelLocation[]
}
// const initialState = {
//   locs : TravelLocation[] = [];
// };
// type State = Readonly<typeof initialState>;


//class App extends React.FunctionComponent 


class App extends React.Component {

    public state: IMyComponentState;

    constructor(props: any) {
        super(props);
        var arr: TravelLocation[] = [];
        this.state = { locs: arr }
        this.loadData()
    }

    loadData(): void {
        var db = firebase.firestore();
        db.collection("locations").get().then((querySnapshot) => {
            // Loop over the results and update our travel locations array
            querySnapshot.forEach((doc) => {
                const tl: ITravelLocation = new TravelLocation();
                tl.name = doc.get("name")
                tl.coords = doc.get("coords")
                tl.arrive = doc.get("arrive")
                tl.depart = doc.get("depart")
                locations.push(tl);
            });
            this.setState({
                locs: locations
            });
        });
    }

    render() {
        return (
            <div className="App">
                <TravelMap locations={this.state.locs} />
                <LocationButtons locs={this.state.locs} />
            </div>
        );
    }
}

export default App;
