import React from 'react';
import { Typography } from '@material-ui/core';
import { IHistoryProps } from '../../classes/IHistoryProps';
import './Header.css'
// import { Link } from 'react-router-dom'

interface titleProps {
    history?: IHistoryProps
}

class Header extends React.Component {

    public props: titleProps

    constructor(props: titleProps) {
        super(props);
        this.props = props;
        this.goHome = this.goHome.bind(this)
    }

    goHome() {
        if (this.props.history) {
            this.props.history.push("/")
        }
    }

    render() {
        return (
            <Typography variant="h4" onClick={this.goHome} className="header">
                Goertzens on the go
            </Typography>
        );
    }
}
export default Header;