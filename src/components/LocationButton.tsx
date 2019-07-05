import React from 'react';
import { ITravelLocation } from '../classes/TravelLocation';
import { ILocChangeCallback } from './App';

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