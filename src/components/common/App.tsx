import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { TravelLocation } from '../../classes/TravelLocation';
import { firebaseConfig } from '../../config/firebase.config'
import { Post } from '../../classes/Post';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import LocationPage from '../locations/LocationPage';
import LocationList from '../admin/LocationList';
import PostEntry from '../admin/PostEntry'
import LocationEntry from '../admin/LocationEntry'
import Header from './Header'
import Footer from './Footer';
import AdminMenuBar from '../admin/AdminMenuBar';
import AdminFooter from '../admin/AdminFooter';
import PostPage from '../posts/PostPage';

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

    listenForUser(user: firebase.User | null) {
        if (user) {
            this.setState({ username: user.displayName })
        } else if (this.state.username !== undefined) {
            this.setState({ username: null })
        }

    }

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Header} />
                    <Switch>
                        <Route path="/notadmin" component={AdminMenuBar}></Route>
                    </Switch>
                    <Switch>
                        <Route exact path="/" component={LocationPage} />
                        <Route exact path="/location/:locationName" component={LocationPage} />
                        <Route exact path="/post/:postid" component={PostPage} />
                        <Route exact path="/notadmin" component={LocationList} />
                        <Route path="/notadmin/postentry/:locationid" component={PostEntry} />
                        <Route path="/notadmin/locationentry" component={LocationEntry} />
                        <Redirect to="/" />
                    </Switch>
                    <Switch>
                        <Route path="/notadmin">
                            <AdminFooter username={this.state.username} />
                        </Route>
                        <Route component={Footer} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
