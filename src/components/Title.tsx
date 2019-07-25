import React from 'react';
import { Typography } from '@material-ui/core';
import { IHistoryProps } from '../classes/IHistoryProps';
// import { Link } from 'react-router-dom'

interface titleProps {
    history?: IHistoryProps
}

class Title extends React.Component {

    public props: titleProps

    constructor(props: titleProps) {
        super(props);
        this.props = props;
        this.goHome = this.goHome.bind(this)
    }

    goHome() {
        if(this.props.history) {
            this.props.history.push("/")
        }
    }

    render() {
        return (
            <Typography variant="h3" color="textSecondary" onClick={this.goHome}>
                Goertzens on the go
            </Typography>
        );
    }
}
export default Title;