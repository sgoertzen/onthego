import React from "react"
import TravelMap from "../locations/TravelMap"
import * as firebase from "firebase/app"


interface IPanoramasPage {
}

class PanoramasPage extends React.Component {
    public state: IPanoramasPage

    constructor(props: any) {
        super(props)
        this.state = { locs: [] }
    }


    render() {
        const center = new firebase.firestore.GeoPoint(18.9920112, -9.4377394)
        return (
            <TravelMap fullscreen={true} locations={[]} onLocChange={() => { }} center={center} />
        )
    }
}

export default PanoramasPage