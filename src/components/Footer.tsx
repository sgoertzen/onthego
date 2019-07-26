import React from 'react';
import { Typography, Box } from '@material-ui/core';
import "firebase/auth";
import './Footer.css'

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
            <Box className="footer" justifyContent="center" width="100%">
                <Typography className="footer-copy">&copy;2019 Goertzen Family</Typography>
            </Box>
        );
    }
}
export default Footer;