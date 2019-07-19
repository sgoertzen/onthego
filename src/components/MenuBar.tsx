import React from 'react';
import { ITravelLocation } from '../classes/TravelLocation';
import { ILocChangeCallback } from '../classes/ILocChangeCallback';
import Tabs from '@material-ui/core/Tabs';
import { Tab, AppBar } from '@material-ui/core';


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
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<{}>, newValue: number) {
        this.props.onLocChange(this.props.locs[newValue].id)
    }

    render() {
        let counter = 0
        let selected = 0;
        const buttons = this.props.locs.map(loc => {
            if (loc === this.props.selectedLocation) {
                selected = counter
            }
            return (
                <Tab label={loc.name} key={"tab_" + counter++}></Tab>
            );
        });
        if (this.props.locs.length === 0) {
            buttons.push(
                <Tab label="Loading locations" disabled={true} key="nolocs"></Tab>
            )
        }
        return (
            <AppBar position="static">
                <Tabs value={selected} onChange={this.handleChange}>
                    {buttons}
                </Tabs>
            </AppBar>
        );
    }
}
export default MenuBar;