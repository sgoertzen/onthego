import React from 'react';
import { Typography, Box } from '@material-ui/core';
import "firebase/auth";
import './Footer.css'


class Footer extends React.Component {
    render() {
        return (
            <Box className="footer" justifyContent="center" width="100%">
                <Typography className="footer-copy">&copy;2019 Goertzen Family</Typography>
            </Box>
        );
    }
}
export default Footer;