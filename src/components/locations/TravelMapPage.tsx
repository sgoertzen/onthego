import React from "react";
import TravelMap from "./TravelMap";
import { TravelLocation, ITravelLocation } from "../../classes/TravelLocation";
import { FirestoreHelper } from "../../util/FirestoreHelper";


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
            return <div>Loading</div>
        }
        return (
            <TravelMap fullscreen={true} locations={this.state.locs} onLocChange={() => { }} />
        )
    }
}

export default TravelMapPage