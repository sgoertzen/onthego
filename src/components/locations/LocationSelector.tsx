import React from 'react';
import { ITravelLocation } from '../../classes/TravelLocation';
import { ILocChangeCallback } from '../../classes/ILocChangeCallback';
import { Select, MenuItem } from '@material-ui/core';

interface buttonProps {
    locs: ITravelLocation[]
    selectedLocation?: ITravelLocation
    onLocChange: ILocChangeCallback
}

class LocationSelector extends React.Component {

    public props: buttonProps

    constructor(props: buttonProps) {
        super(props);
        this.props = props;
        this.tabChange = this.tabChange.bind(this);
        this.optionChange = this.optionChange.bind(this);
    }

    tabChange(event: React.ChangeEvent<{}>, newValue: number) {
        this.props.onLocChange(this.props.locs[newValue].id)
    }

    optionChange(event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) {
        for (let loc of this.props.locs) {
            if (loc.name === event.target.value) {
                this.props.onLocChange(loc.id)
                return;
            }
        }
    }

    render() {
        let counter = 0
        let selectedValue = ""
        let options: any[] = []
        for (let loc of this.props.locs) {
            if (loc === this.props.selectedLocation) {
                options.push(<MenuItem value={loc.name} key={counter}>Jump to:</MenuItem>)
                selectedValue = loc.name
            } else {
                options.push(<MenuItem value={loc.name} key={counter}>{loc.name}</MenuItem>)
            }
            if (loc === this.props.selectedLocation) {
                selectedValue = loc.name
            }
            counter++
        }
        if (this.props.locs.length === 0) {
            options.push(
                <MenuItem key="nolocs" disabled={true}>Loading Locations</MenuItem>
            )
        }
        return (
            <div>
                <div className="LocationSelectorDropdown">
                    <Select value={selectedValue} onChange={this.optionChange} fullWidth>
                        {options}
                    </Select>
                </div>
            </div>
        );
    }
}
export default LocationSelector;