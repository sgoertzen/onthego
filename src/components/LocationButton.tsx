import React from 'react';
import { ITravelLocation } from '../classes/TravelLocation';
import { ILocChangeCallback } from './App';
import Tab from '@material-ui/core/Tab';

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
        return <Tab onClick={() => { this.props.onLocChange(this.props.location.id) }}>{this.props.location.name}</Tab>
    }
}
export default LocationButton;