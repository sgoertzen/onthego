import React from 'react';
import { Typography, Box, Link } from '@material-ui/core';
import * as firebase from "firebase/app";
import "firebase/auth";

interface footerProps {
    username?: string
}

class Footer extends React.Component {

    public props: footerProps

    constructor(props: footerProps) {
        super(props);
        this.props = props;
    }

    adminLogin() {
        var provider = new firebase.auth.GoogleAuthProvider();
        // If uncommenting this line, make sure you look into: https://developers.google.com/identity/protocols/googlescopes?authuser=0
        provider.addScope('https://www.googleapis.com/auth/drive.photos.readonly');
        firebase.auth().signInWithPopup(provider).catch(function(error) {
            console.log("Error during auth: " + error.code + ", " + error.message + ", " + error.email + ", " + error.credential)
        });
    }

    logout() {
        firebase.auth().signOut()
    }

    render() {
        let link: any
        let username = this.props.username
        if (username) {
            link =
                <Typography>Logged in as {username} &nbsp;-&nbsp; <Link onClick={this.logout}>Logout</Link></Typography>
        } else {
            link = <Typography><Link onClick={this.adminLogin}>Admin Login</Link></Typography>
        }
        return (
            <Box display="flex" justifyContent="center" width="100%">
                <Typography>&copy; 2019 Shawn Goertzen</Typography>
                <Typography> &nbsp;-&nbsp; </Typography>
                {link}
            </Box>
        );
    }
}
export default Footer;