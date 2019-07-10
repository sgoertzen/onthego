import React from 'react';
import * as firebase from "firebase/app";

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
        //provider.addScope('https://www.googleapis.com/auth/drive.photos.readonly');
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                console.log("user " + result.credential.toJSON())
                // This gives you a Google Access Token. You can use it to access the Google API.
                //var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            var user = result.user;
            console.log("User logged in : " + user)
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
            <button onClick={this.show}>Login</button>
        </div>
    }
}

export default Login;