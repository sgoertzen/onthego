import React from 'react';
import { ITravelLocation } from '../classes/TravelLocation';
import { ILocChangeCallback } from './App';


// TODO: If I don't end up using any other parts of the location object, 
// I should adjust this to only take in a name.  Will wait until I have the button
// wired up before making this change.
interface buttonProps {
    location: ITravelLocation
    onLocChange: ILocChangeCallback
}

class LocationButton extends React.Component {

    public props: buttonProps

    constructor(props: buttonProps) {
        super(props);
        this.props = props;
    }

    render() {
        return <button onClick={() => { this.props.onLocChange(this.props.location.id) }}>{this.props.location.name}</button>
    }
}
export default LocationButton;