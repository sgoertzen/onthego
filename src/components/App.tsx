import React from 'react';
import './App.css';
import TravelMap from './TravelMap';
import * as firebase from "firebase/app";
import "firebase/firestore";
import { ITravelLocation, TravelLocation } from '../classes/TravelLocation';
import LocationButtons from './LocationButtons';
import { firebaseConfig } from '../config/firebase.config'
import { IPost, Post } from '../classes/Post';
import Posts from './Posts';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const locations: ITravelLocation[] = [];

interface IAppState {
    locs: TravelLocation[]
    posts: Post[]
}
// const initialState = {
//   locs : TravelLocation[] = [];
// };
// type State = Readonly<typeof initialState>;

export interface ILocChangeCallback {
    (locId: string): void;
}

class App extends React.Component {

    public state: IAppState;

    constructor(props: any) {
        super(props);
        var arr: TravelLocation[] = [];
        var arr2: Post[] = [];
        this.state = { locs: arr, posts: arr2 }
        this.loadLocations()
        this.locationChanged = this.locationChanged.bind(this);
    }

    loadLocations(): void {
        var db = firebase.firestore();
        db.collection("locations").orderBy("arrive").get().then((querySnapshot) => {
            // Loop over the results and update our travel locations array
            querySnapshot.forEach((doc) => {
                let loc = doc.data() as ITravelLocation
                loc.id = doc.id
                locations.push(loc)
            });
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
        this.loadPosts(locationId)
    }

    render() {
        return (
            <div className="App">
                <TravelMap locations={this.state.locs} onLocChange={this.locationChanged} />
                <LocationButtons locs={this.state.locs} onLocChange={this.locationChanged} />
                <Posts posts={this.state.posts} />
            </div>
        );
    }
}

export default App;
