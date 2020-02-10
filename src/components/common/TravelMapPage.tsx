import React from "react"
import TravelMap from "../locations/TravelMap"
import { TravelLocation, ITravelLocation } from "../../classes/TravelLocation"
import { FirestoreHelper } from "../../util/FirestoreHelper"
import * as firebase from "firebase/app"
import { IPanorama } from "../../classes/Panorama"


interface ITravelMapPageState {
    locs: TravelLocation[]
    panos: IPanorama[]
}

class TravelMapPage extends React.Component {
    public state: ITravelMapPageState

    constructor(props: any) {
        super(props)
        this.state = { locs: [], panos: [] }
        this.locationsLoaded = this.locationsLoaded.bind(this)
        this.panoramasLoaded = this.panoramasLoaded.bind(this)
        FirestoreHelper.loadLocations(this.locationsLoaded)
        //FirestoreHelper.loadPanoramas(this.panoramasLoaded)
    }

    locationsLoaded(locations: ITravelLocation[]): void {
        this.setState({ locs: locations })
    }

    panoramasLoaded(panoramas: IPanorama[]): void {
        this.setState({ panos: panoramas })
    }

    render() {
        if (this.state.locs.length === 0) {
            return <div>Loading...</div>
        }
        const center = new firebase.firestore.GeoPoint(18.9920112, -9.4377394)
        return (
            <TravelMap fullscreen={true} locations={this.state.locs} panoramas={this.state.panos} onLocChange={() => { }} center={center} />
        )
    }
}

export default TravelMapPage