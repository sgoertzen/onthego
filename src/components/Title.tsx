import React from 'react';
import { Typography } from '@material-ui/core';

interface titleProps {
}

class Title extends React.Component {

    public props: titleProps

    constructor(props: titleProps) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Typography variant="h3" color="textSecondary">Goertzens on the go</Typography>
        );
    }
}
export default Title;