import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import { Tab, AppBar } from '@material-ui/core';

export interface IHistoryProps {
    push(location: string): void
}
interface IAdminMenuProps {
    history: IHistoryProps
}


class AdminMenuBar extends React.Component {

    public props: IAdminMenuProps

    constructor(props: IAdminMenuProps) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <AppBar position="static">
                <Tabs value={0}>
                    <Tab label="Locations" key="locations" onClick={() => { this.props.history.push('/admin') }}></Tab>
                    <Tab label="Add Location" key="add-loc" onClick={() => { this.props.history.push('/admin/locationentry') }}></Tab>
                    <Tab label="Back to main page" key="leave" onClick={() => { this.props.history.push('/') }}></Tab>
                </Tabs>
            </AppBar>
        );
    }
}
export default AdminMenuBar;