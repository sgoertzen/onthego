import React from 'react';
import { ITravelLocation } from '../../classes/TravelLocation';
import { ILocChangeCallback } from '../../classes/ILocChangeCallback';
import Tabs from '@material-ui/core/Tabs';
import { Tab, AppBar, Select, MenuItem } from '@material-ui/core';
import './MenuBar.css'

interface buttonProps {
    locs: ITravelLocation[]
    selectedLocation?: ITravelLocation
    onLocChange: ILocChangeCallback
}

class MenuBar extends React.Component {

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
        let selectedIndex = 0;
        let selectedValue = ""
        // TODO: Fix this when I am back online and can look up the type!
        let buttons: any[] = []
        let options: any[] = []
        for (let loc of this.props.locs) {
            buttons.push(<Tab label={loc.name} key={counter} />)
            options.push(<MenuItem value={loc.name} key={counter}>{loc.name}</MenuItem>)
            if (loc === this.props.selectedLocation) {
                selectedIndex = counter
                selectedValue = loc.name
            }
            counter++
        }
        if (this.props.locs.length === 0) {
            buttons.push(
                <Tab label="Loading locations" disabled={true} key="nolocs"></Tab>
            )
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
                <div className="LocationSelectorTabs">
                    <AppBar position="static">
                        <Tabs value={selectedIndex} onChange={this.tabChange}>
                            {buttons}
                        </Tabs>
                    </AppBar>
                </div>
            </div>
        );
    }
}
export default MenuBar;