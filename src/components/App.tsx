import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import { TravelLocation } from '../classes/TravelLocation';
import { firebaseConfig } from '../config/firebase.config'
import { Post } from '../classes/Post';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import LocationPage from './LocationPage';
import PostEntry from './PostEntry'
import LocationEntry from './LocationEntry'
import Title from './Title'
import Footer from './Footer';
import NotFound from './NotFound';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

interface IAppState {
    locs: TravelLocation[]
    posts: Post[]
    username?: string
}

class App extends React.Component {

    public state: IAppState;

    constructor(props: any) {
        super(props);
        var arr: TravelLocation[] = [];
        var arr2: Post[] = [];

        this.listenForUser = this.listenForUser.bind(this);
        this.state = { locs: arr, posts: arr2 }
        firebase.auth().onAuthStateChanged(this.listenForUser);
    }

    listenForUser(user: any) {
        if (user) {
            this.setState({ username: user.displayName })
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Title />
                    <Switch>
                        <Route exact path="/" component={LocationPage} />
                        <Route exact path="/location/:locationName" component={LocationPage} />
                        <Route path="/postentry" component={PostEntry} />
                        <Route path="/locationentry" component={LocationEntry} />
                        <Route component={NotFound} />
                    </Switch>
                    <Footer username={this.state.username} />
                </div>
            </Router>
        )
    }
}

export default App;
