import React from 'react';
import { Typography, Box } from '@material-ui/core';
import "firebase/auth";
import './Footer.css'


class Footer extends React.Component {
    render() {
        return (
            <Box className="footer" justifyContent="center" width="100%">
                <Typography className="footer-copy">&copy;2019 Goertzen Family</Typography>
                <span className="footer-spacer">&nbsp; &nbsp;</span>
                <a className="footer-rss" href="https://firebasestorage.googleapis.com/v0/b/goertzensonthego.appspot.com/o/feed.rss?alt=media&token=85a3fa53-7b2d-4f9a-ae73-1736a14a71cd">
                    <img alt="Subscribe to What's New" src="/rss.png" width="15" height="15" />RSS Feed
                </a>
            </Box>
        );
    }
}
export default Footer;