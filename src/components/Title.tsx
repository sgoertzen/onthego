import React from 'react';
import { Typography } from '@material-ui/core';
// import { Link } from 'react-router-dom'

interface titleProps {
}

class Title extends React.Component {

    public props: titleProps

    constructor(props: titleProps) {
        super(props);
        this.props = props;
    }

    render() {
        // TODO: Move out of here and into App 
        return (
            <Typography variant="h3" color="textSecondary">
                {/* <Link replace={true} to="/"> */}
                Goertzens on the go
                {/* </Link> */}
            </Typography>
        );
    }
}
export default Title;