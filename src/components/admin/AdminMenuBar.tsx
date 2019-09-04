import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import { Tab, AppBar } from '@material-ui/core';
import { IHistoryProps } from '../../classes/IHistoryProps';

interface IAdminMenuProps {
    history: IHistoryProps
}


class AdminMenuBar extends React.Component<IAdminMenuProps> {

    public props: IAdminMenuProps

    constructor(props: IAdminMenuProps) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <AppBar position="static">
                <Tabs value={0}>
                    <Tab label="Locations" key="locations" onClick={() => { this.props.history.push('/notadmin') }}></Tab>
                    <Tab label="Back to main page" key="leave" onClick={() => { this.props.history.push('/') }}></Tab>
                </Tabs>
            </AppBar>
        );
    }
}
export default AdminMenuBar;