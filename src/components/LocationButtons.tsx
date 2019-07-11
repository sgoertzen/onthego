import React from 'react';
import LocationButton from './LocationButton'
import { ITravelLocation } from '../classes/TravelLocation';
import { ILocChangeCallback } from './App';


interface buttonProps {
    locs: ITravelLocation[]
    onLocChange: ILocChangeCallback
}

class LocationButtons extends React.Component {

    public props: buttonProps

    constructor(props: buttonProps) {
        super(props);
        this.props = props;
    }

    render() {
        const buttons = this.props.locs.map(loc => {
            return (
                <LocationButton location={loc} key={loc.name} onLocChange={this.props.onLocChange} />
            );
        });
        return buttons
    }
}
export default LocationButtons;