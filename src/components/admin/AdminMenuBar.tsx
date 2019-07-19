import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import { Tab, AppBar } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';


// interface buttonProps {
// }


class AdminMenuBar extends React.Component {

    public props: RouteComponentProps<any>

    constructor(props: RouteComponentProps) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <AppBar position="static">
                <Tabs value="locations">
                    <Tab label="Locations" key="locations" onClick={() => { this.props.history.push('/admin') }}></Tab>
                    <Tab label="Add Location" key="add-loc" onClick={() => { this.props.history.push('/admin/locationentry') }}></Tab>
                    <Tab label="Back to main page" key="leave" onClick={() => { this.props.history.push('/') }}></Tab>
                </Tabs>
            </AppBar>
        );
    }
}
export default AdminMenuBar;