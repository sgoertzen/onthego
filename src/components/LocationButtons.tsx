import React from 'react';
import { ITravelLocation } from '../classes/TravelLocation';
import { ILocChangeCallback } from './App';
import Tabs from '@material-ui/core/Tabs';
import { Tab, AppBar } from '@material-ui/core';


interface buttonProps {
    locs: ITravelLocation[]
    onLocChange: ILocChangeCallback
}

class LocationButtons extends React.Component {

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
        const buttons = this.props.locs.map(loc => {
            return (
                <Tab label={loc.name}></Tab>
            );
        });
        if (this.props.locs.length === 0) {
            buttons.push(
                <Tab label="No locations added yet" disabled={true}></Tab>
            )
        }
        return (
            <AppBar position="static">
                <Tabs value={0} onChange={this.handleChange}>
                    {buttons}
                </Tabs>
            </AppBar>
        );
    }
}
export default LocationButtons;