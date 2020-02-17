import React from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { IPanorama } from '../../classes/Panorama'
import DateFnsUtils from '@date-io/date-fns'

// Todo: may want to move this out of this class later
export interface ILocationCreated {
    (): void;
}

export interface IPanoramaEntryProps {
    pano?: IPanorama
}

interface IPanoramaEntryState {
    name: string
}

class PanoramaEntry extends React.Component<IPanoramaEntryProps> {

    public state: IPanoramaEntryState;
    public props: IPanoramaEntryProps

    constructor(props: IPanoramaEntryProps) {
        super(props)
        this.props = props
        this.state = {
            name: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(): void {
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {this.props.pano?.filename}
                {this.props.pano?.title}
                {this.props.pano?.url}
                {this.props.pano?.coords.latitude}
                {this.props.pano?.coords.longitude}
            </MuiPickersUtilsProvider>
        );
    }
}
export default PanoramaEntry;