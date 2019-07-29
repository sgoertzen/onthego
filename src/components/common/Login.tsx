import React from 'react';
import * as firebase from "firebase/app";
import { Button } from '@material-ui/core';
import "firebase/auth";

interface loginProps {
}

class Login extends React.Component {

    public props: loginProps

    constructor(props: loginProps) {
        super(props);
        this.props = props;
    }

    show() {
        console.log("auth name: " + firebase.auth.name);
        var provider = new firebase.auth.GoogleAuthProvider();
        // If uncommenting this line, make sure you look into: https://developers.google.com/identity/protocols/googlescopes?authuser=0
        // provider.addScope('https://www.googleapis.com/auth/drive.photos.readonly');
        // firebase.auth().signInWithRedirect(provider);
        // firebase.auth().getRedirectResult().then(function(result) {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // Don't really need to do anything with the result, it will be stored as a cookie
            //if (result.credential) {
            //console.log("Credential:")
            //console.log(result.credential.toJSON())
            // This gives you a Google Access Token. You can use it to access the Google API.
            //var token = result.credential.accessToken;
            // ...
            //}
            // The signed-in user info.
            // var user = result.user;
            // console.log("User logged in : ")
            // console.log(user)
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log("Error during auth: " + errorCode + ", " + errorMessage + ", " + email + ", " + credential)
        });
    }

    render() {
        return <div>
            <Button
                onClick={this.show}
                id="login_button"
            >Admin Login</Button>
        </div>
    }
}

export default Login;