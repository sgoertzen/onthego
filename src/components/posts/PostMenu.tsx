import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import { Tab, AppBar } from '@material-ui/core';
import { IHistoryProps } from '../../classes/IHistoryProps';

interface IPostMenuProps {
    history?: IHistoryProps
}


class PostMenu extends React.Component {

    public props: IPostMenuProps

    constructor(props: IPostMenuProps) {
        super(props);
        this.props = props;
        this.goBack = this.goBack.bind(this)
    }

    goBack() {
        if (this.props.history) {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <AppBar position="static">
                <Tabs value={0}>
                    <Tab label=" < Back to main page" key="leave" onClick={this.goBack}></Tab>
                </Tabs>
            </AppBar>
        );
    }
}
export default PostMenu;