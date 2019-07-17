import React from 'react';
import { ITravelLocation } from '../classes/TravelLocation';
import { ILocChangeCallback } from './App';
import Tabs from '@material-ui/core/Tabs';
import { Tab, AppBar } from '@material-ui/core';


interface footerProps {
}

class Footer extends React.Component {

    public props: footerProps

    constructor(props: footerProps) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <AppBar position="static">
                <Tabs value={0}>
                    <Tab label="Admin login" />
                </Tabs>
            </AppBar>
        );
    }
}
export default Footer;