import React from 'react';
import LocationButton from './LocationButton'
import { ITravelLocation } from '../classes/TravelLocation';


interface buttonProps {
    locs: ITravelLocation[]
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
                <LocationButton location={loc} key={loc.name} />
            );
        });
        return buttons
    }
}
export default LocationButtons;