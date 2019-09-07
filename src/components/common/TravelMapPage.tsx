import React from "react"
import TravelMap from "../locations/TravelMap"
import { TravelLocation, ITravelLocation } from "../../classes/TravelLocation"
import { FirestoreHelper } from "../../util/FirestoreHelper"
import * as firebase from "firebase/app"


interface ITravelMapPageState {
    locs: TravelLocation[]
}

class TravelMapPage extends React.Component {
    public state: ITravelMapPageState

    constructor(props: any) {
        super(props)
        this.state = { locs: [] }
        this.locationsLoaded = this.locationsLoaded.bind(this)
        FirestoreHelper.loadLocations(this.locationsLoaded)
    }

    locationsLoaded(locations: ITravelLocation[]): void {
        this.setState({ locs: locations })
    }

    render() {
        if (this.state.locs.length === 0) {
            return <div>Loading...</div>
        }
        const center = new firebase.firestore.GeoPoint(18.9920112, -9.4377394)
        return (
            <TravelMap fullscreen={true} locations={this.state.locs} onLocChange={() => { }} center={center} />
        )
    }
}

export default TravelMapPage