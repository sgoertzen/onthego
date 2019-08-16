import React from 'react';
import './LocationPage.css';
import TravelMap from './TravelMap';
import * as firebase from "firebase/app";
import { ITravelLocation, TravelLocation } from '../../classes/TravelLocation';
import LocationSelector from './LocationSelector';
import { IPost, Post } from '../../classes/Post';
import PostTiles from './PostTiles';
import TripStats from './TripStats';
import { differenceInDays } from 'date-fns';
import { IHistoryProps } from '../../classes/IHistoryProps';
import LocationDetails from './LocationDetails';

interface ILocationPageProps {
    match?: {
        params?: {
            locationName?: string
        }
    }
    history?: IHistoryProps
}

interface ILocationPageState {
    locs: TravelLocation[]
    posts: Post[]
    selectedLocationNameEncoded?: string
    selectedLocation?: ITravelLocation
    countriesVisited: number
    distanceTraveled: number
}

class LocationPage extends React.Component {

    public state: ILocationPageState;
    public props: ILocationPageProps

    constructor(props: ILocationPageProps) {
        super(props);
        this.props = props;
        let emptyLocations: TravelLocation[] = [];
        let emptyPosts: Post[] = [];
        this.locationChanged = this.locationChanged.bind(this);
        this.postClick = this.postClick.bind(this);
        this.loadLocations = this.loadLocations.bind(this);
        this.locationsLoaded = this.locationsLoaded.bind(this);
        let locName: string | undefined
        if (this.props.match && this.props.match.params && this.props.match.params.locationName) {
            locName = this.props.match.params.locationName.toLowerCase();
        }
        this.state = { locs: emptyLocations, posts: emptyPosts, selectedLocationNameEncoded: locName, countriesVisited: 0, distanceTraveled: 0 }
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

        // Try to find the location based on the name passed in
        if (this.state.selectedLocationNameEncoded) {
            // Loop over locations and find the one matching this name
            locations.forEach(loc => {
                if (this.state.selectedLocationNameEncoded && TravelLocation.encode(loc.name) === this.state.selectedLocationNameEncoded) {
                    this.setState({ selectedLocation: loc })
                }
            });
        }
        // Find the location where arrival/departure is around current date
        if (!this.state.selectedLocation) {
            // Find the location we are in and use it
            let now = new Date()
            locations.forEach(loc => {
                if (loc.arrive.toDate() < now && loc.depart.toDate() > now) {
                    this.setState({ selectedLocation: loc })
                }
            });
        }
        // Default to the first location if nothing found yet
        if (!this.state.selectedLocation) {
            this.setState({ selectedLocation: locations[0] })
        }
        if (this.state.selectedLocation) {
            this.loadPosts(this.state.selectedLocation.id)
        }
        this.setState({
            countriesVisited: this.computeCountriesVisited(locations),
            distanceTraveled: this.computeDistanceTraveled(locations)
        })
    }

    loadPosts(locationId: string): void {
        var db = firebase.firestore();
        var postsRef = db.collection("posts")
        postsRef.where("locationid", "==", locationId).orderBy("posted").get().then((querySnapshot) => {
            let posts: IPost[] = [];
            querySnapshot.forEach(function(doc) {
                let post: IPost = doc.data() as IPost
                post.id = doc.id
                posts.push(post)
            });
            this.setState({
                posts: posts
            })
        })
    }

    locationChanged(locationId: string): void {
        let locations = this.state.locs
        locations.forEach(loc => {
            if (loc.id === locationId) {
                if (this.props.history) {
                    this.props.history.push('/location/' + TravelLocation.encode(loc.name))
                    this.setState({ selectedLocation: loc })
                    this.loadPosts(loc.id)
                } else {
                    console.log('No history object found, falling back')
                    this.setState({ selectedLocation: loc })
                    this.loadPosts(loc.id)
                }
            }
        });
    }

    postClick(postID: string): void {
        if (this.props.history) {
            this.props.history.push("/post/" + postID)
        } else {
            alert("NO HISTORY")
        }
    }

    computeCountriesVisited(locs: ITravelLocation[]): number {
        let today = new Date()
        let visited = 0;
        for (let loc of locs) {
            if (today > loc.arrive.toDate()) {
                visited++;
            }
        }
        return visited;
    }

    computeDistanceTraveled(locations:ITravelLocation[]):number {
        let total = 0;
        let now = new Date()
        locations.forEach(loc => {
            if (loc.arrive.toDate() < now && loc.distance){
                total += loc.distance
            }
        });
        return total;
    }

    render() {
        let daysOnTheRoad = Math.max(differenceInDays(new Date(), new Date(2019, 6, 27)), 0)
 
        return (
            <div className="App">
                <div className="App-header"><LocationSelector locs={this.state.locs} onLocChange={this.locationChanged} selectedLocation={this.state.selectedLocation} /></div>
                <div className="App-details"><LocationDetails location={this.state.selectedLocation} /></div>
                <div className="App-map"><TravelMap locations={this.state.locs} onLocChange={this.locationChanged} selectedLocation={this.state.selectedLocation} /></div>
                <div className="App-stats"><TripStats daysOnTheRoad={daysOnTheRoad} countriesVisited={this.state.countriesVisited} milesTraveled={this.state.distanceTraveled} /></div>
                <div className="App-posts"><PostTiles posts={this.state.posts} onPostClick={this.postClick} /></div>
            </div>
        );
    }
}

export default LocationPage;
