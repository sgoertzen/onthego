import React from 'react';
import './App.css';
import TravelMap from './TravelMap';
import * as firebase from "firebase/app";
import { ITravelLocation, TravelLocation } from '../classes/TravelLocation';
import LocationButtons from './LocationButtons';
import { IPost, Post } from '../classes/Post';
import Posts from './Posts';
import { IGeoPoint, GeoPoint } from '../classes/GeoPoint';
import TripStats from './TripStats';
import { TimeStamp } from '../classes/TimeStamp';
import { differenceInDays } from 'date-fns';

interface ILocationPageProps {
    match?: {
        params?: {
            locationName?: string
        }
    }
}

interface ILocationPageState {
    locs: TravelLocation[]
    posts: Post[]
    selectedLocationName?: string
    selectedLocation?: ITravelLocation
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
        console.log(props)
        this.props = props;
        var emptyLocations: TravelLocation[] = [];
        var emptyPosts: Post[] = [];
        this.locationChanged = this.locationChanged.bind(this);
        this.loadLocations = this.loadLocations.bind(this);
        this.locationsLoaded = this.locationsLoaded.bind(this);
        // console.log(props.selectedLocation)
        // if (this.props.selectedLocation) {
        //     console.log(this.props.selectedLocation)
        // }
        let locName: string | undefined
        if (this.props.match && this.props.match.params) {
            locName = this.props.match.params.locationName;
        }
        this.state = { locs: emptyLocations, posts: emptyPosts, selectedLocationName: locName }
        this.loadLocations()
    }

    loadLocations(): void {
        firebase.firestore().collection("locations").orderBy("arrive").get().then(this.locationsLoaded);
    }

    locationsLoaded(querySnapshot: firebase.firestore.QuerySnapshot): void {
        const locations: ITravelLocation[] = [];
        querySnapshot.forEach((doc) => {
            let loc = doc.data() as ITravelLocation
            loc.id = doc.id
            locations.push(loc)
        })
        this.setState({ locs: locations })

        if (this.state.selectedLocationName) {
            console.log("Looking for: " + this.state.selectedLocationName)
            // Loop over locations and find the one matching this name
            locations.forEach(loc => {
                console.log("Searching: " + loc.name)
                if (this.state.selectedLocationName && loc.name.toLowerCase() === this.state.selectedLocationName.toLowerCase()) {
                    this.setState({ selectedLocation: loc })
                }
            });
        }
        if (!this.state.selectedLocation) {
            // Find the location we are in and use it
            let now = new TimeStamp()
            locations.forEach(loc => {
                if (loc.arrive < now && loc.depart > now) {
                    this.setState({ selectedLocation: loc })
                }
            });
            //let currentLocation = this.state.locs[0];
            //this.setState({selectedLocation: currentLocation})
        }
        if (!this.state.selectedLocation) {
            console.log("No location specified or no matching location.  Setting default")
        }
        if (this.state.selectedLocation) {
            //this.loadPosts("320gdIkX54IKNqRoFHpE")
            this.loadPosts(this.state.selectedLocation.id)
        }
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
        console.log("Selected location of: " + locationId)
        let locations = this.state.locs
        locations.forEach(loc => {
            if (loc.id === locationId) {
                this.setState({ selectedLocation: loc })
            }
        });
    }

    render() {
        let center: IGeoPoint
        if (this.state.selectedLocation) {
            center = this.state.selectedLocation.coords
        } else {
            center = new GeoPoint()
        }

        let daysOnTheRoad = differenceInDays(new Date(), new Date(2019, 6, 27))

        return (
            <div className="App">
                <LocationButtons locs={this.state.locs} onLocChange={this.locationChanged} />
                <TravelMap locations={this.state.locs} onLocChange={this.locationChanged} center={center} />
                <TripStats daysOnTheRoad={daysOnTheRoad} countriesVisited={1} milesTraveled={1456} />
                <Posts posts={this.state.posts} />
            </div>
        );
    }
}

export default LocationPage;
