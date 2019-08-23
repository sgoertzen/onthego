import React from 'react'
import { IHistoryProps } from '../../classes/IHistoryProps';
import { ITravelLocation } from '../../classes/TravelLocation';
import { FirestoreHelper } from '../../util/FirestoreHelper';
import LocationEntry from './LocationEntry';

interface locationEntryPageProps {
    history?: IHistoryProps
    match: {
        params: {
            locationid?: string
        }
    }
}

interface locationEntryPageState {
    editing: boolean
    location?: ITravelLocation
}

class LocationEntryPage extends React.Component {
    public props: locationEntryPageProps
    public state: locationEntryPageState

    constructor(props:locationEntryPageProps) {
        super(props)
        this.props = props

        this.state = {
            editing: (this.props.match.params.locationid !== undefined)
        }
        this.backToList = this.backToList.bind(this)

        let locationid = this.props.match.params.locationid
        if (locationid) {
            let that = this
            FirestoreHelper.loadLocation(locationid, (loc) => {
                that.setState({ location: loc })
            })
        }
    }

    backToList() {
        if (this.props.history) {
            this.props.history.push(`/notadmin/`)
        }
    }

    render() {
        if (!this.state.location && this.state.editing) {
            return (<div>Loading...</div>)
        }
        return (
            <LocationEntry
                onLocationCreated={this.backToList}
                loc={this.state.location} />
        )
    }
}

export default LocationEntryPage