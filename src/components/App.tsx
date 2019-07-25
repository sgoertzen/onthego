import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { TravelLocation } from '../classes/TravelLocation';
import { firebaseConfig } from '../config/firebase.config'
import { Post } from '../classes/Post';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import LocationPage from './LocationPage';
import LocationList from './admin/LocationList';
import PostEntry from './admin/PostEntry'
import LocationEntry from './admin/LocationEntry'
import Title from './Title'
import Footer from './Footer';
import NotFound from './NotFound';
import AdminMenuBar from './admin/AdminMenuBar';
import PostPage from './PostPage';

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
        } else {
            this.setState({ username: null })
        }

    }

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Title}/>
                    <Switch>
                        <Route path="/admin" component={AdminMenuBar}></Route>
                    </Switch>
                    <Switch>
                        <Route exact path="/" component={LocationPage} />
                        <Route exact path="/location/:locationName" component={LocationPage} />
                        <Route exact path="/post/:postid" component={PostPage} />
                        <Route exact path="/admin" component={LocationList} />
                        <Route path="/admin/postentry/:locationid" component={PostEntry} />
                        <Route path="/admin/locationentry" component={LocationEntry} />
                        <Route component={NotFound} />
                    </Switch>
                    <Footer username={this.state.username} />
                </div>
            </Router>
        )
    }
}

export default App;
