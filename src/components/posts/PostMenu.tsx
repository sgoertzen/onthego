import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import { Tab, AppBar } from '@material-ui/core';
import { IHistoryProps } from '../../classes/IHistoryProps';
import { TravelLocation } from '../../classes/TravelLocation';

interface IPostMenuProps {
    history?: IHistoryProps
    locationname?: string
}


class PostMenu extends React.Component {

    public props: IPostMenuProps

    constructor(props: IPostMenuProps) {
        super(props);
        this.props = props;
        this.goBack = this.goBack.bind(this)
    }

    goBack() {
        if (this.props.history && this.props.locationname) {
            this.props.history.push(`/location/${TravelLocation.encode(this.props.locationname)}`)
        }
    }

    render() {
        const buttonText = this.props.locationname ? `< Back to ${this.props.locationname}` : ""
        return (
            <AppBar position="static" style={{ background: '#3E442B' }}>
                <Tabs value={0}>
                    <Tab label={buttonText} key="leave" onClick={this.goBack} disabled={!this.props.locationname}></Tab>
                </Tabs>
            </AppBar>
        );
    }
}
export default PostMenu;