import React from 'react';
import './App.css';
import TravelMap from './TravelMap';
import * as firebase from "firebase/app";
//import "firebase/firestore";
import { ITravelLocation, TravelLocation } from '../classes/TravelLocation';
import LocationButtons from './LocationButtons';
import { IPost, Post } from '../classes/Post';
import Posts from './Posts';
import { IGeoPoint, GeoPoint } from '../classes/GeoPoint';
// import TripStats from './TripStats';

interface ILocationPageProps {
    id?: string
}

interface ILocationPageState {
    locs: TravelLocation[]
    posts: Post[]
    id?: string
}
// const initialState = {
//   locs : TravelLocation[] = [];
// };
// type State = Readonly<typeof initialState>;

class LocationPage extends React.Component {

    public state: ILocationPageState;
    public props: ILocationPageProps

    constructor(props: ILocationPageProps) {
        super(props);
        this.props = props;
        var arr: TravelLocation[] = [];
        var arr2: Post[] = [];
        this.state = { locs: arr, posts: arr2 }
        this.loadLocations()
        this.locationChanged = this.locationChanged.bind(this);
        console.log(props.id)
        if (this.props.id) {
            console.log(this.props.id)
        }
        //this.props.id
    }

    loadLocations(): void {
        var db = firebase.firestore();
        const locations: ITravelLocation[] = [];
        db.collection("locations").orderBy("arrive").get().then((querySnapshot) => {
            // Loop over the results and update our travel locations array
            querySnapshot.forEach((doc) => {
                let loc = doc.data() as ITravelLocation
                loc.id = doc.id
                locations.push(loc)
            });
            // TODO: Make the respond to the selected location
            this.loadPosts("320gdIkX54IKNqRoFHpE")
            this.setState({ locs: locations });
        });
    }

    loadPosts(locationId: string): void {
        var db = firebase.firestore();
        var postsRef = db.collection("posts")
        postsRef.where("locationid", "==", locationId).get().then((querySnapshot) => {
            let posts: IPost[] = [];
            querySnapshot.forEach(function(doc) {
                posts.push(doc.data() as IPost)
            });
            this.setState({
                posts: posts
            })
        })
    }

    locationChanged(locationId: string): void {
        // TODO: Recenter the map on this location
        this.loadPosts(locationId)
    }

    render() {
        let center: IGeoPoint
        if (this.state.locs.length > 0) {
            center = this.state.locs[0].coords
        } else {
            center = new GeoPoint()
        }
        return (
            <div className="App">
                <LocationButtons locs={this.state.locs} onLocChange={this.locationChanged} />
                <TravelMap locations={this.state.locs} onLocChange={this.locationChanged} center={center} />
                {/* <TripStats/> */}
                <Posts posts={this.state.posts} />
            </div>
        );
    }
}

export default LocationPage;
