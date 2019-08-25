import React from 'react';
import * as firebase from "firebase/app";
import { Button, Typography, Link } from '@material-ui/core';
import "firebase/auth";

export enum LoginControl {
    Link,
    Button
}

interface loginProps {
    control: LoginControl
    username?: string
    adminLogin?: boolean
    intro?: string
}

class Login extends React.Component {

    public props: loginProps

    constructor(props: loginProps) {
        super(props);
        this.props = props;
        this.login = this.login.bind(this)
    }

    login() {
        const provider = new firebase.auth.GoogleAuthProvider();
        if (this.props.adminLogin) {
            provider.addScope('https://www.googleapis.com/auth/drive.photos.readonly');
        }
        firebase.auth().signInWithPopup(provider).catch(function(error) {
            console.log("Error during auth: " + error.code + ", " + error.message + ", " + error.email + ", " + error.credential)
        });
    }

    logout() {
        firebase.auth().signOut().catch((reason) => { console.log("Unable to sign out", reason) })
    }

    render() {
        const username = this.props.username
        const isAdmin = this.props.adminLogin
        const isLink = this.props.control === LoginControl.Link
        const text = isAdmin ? "Admin Login" : "Login"
        if (username) {
            return (
                <Typography className="footer-user">Logged in as {username} &nbsp;-&nbsp; <Link onClick={this.logout}>Logout</Link></Typography>
            )
        } else {
            return (
                <div>
                    {this.props.intro && <Typography>{this.props.intro}</Typography>}
                    {isLink ?
                        <Typography className="footer-user"><Link onClick={this.login}>{text}</Link></Typography>
                        : <Button variant="outlined" onClick={this.login} id="login_button" >{text}</Button>}
                </div>
            )
        }
    }
}

export default Login;