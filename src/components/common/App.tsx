import React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { TravelLocation } from '../../classes/TravelLocation'
import { firebaseConfig } from '../../config/firebase.config'
import { Post } from '../../classes/Post'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import LocationPage from '../locations/LocationPage'
import LocationList from '../admin/LocationList'
import PostEntryPage from '../admin/PostEntryPage'
import LocationEntryPage from '../admin/LocationEntryPage'
import Header from './Header'
import Footer from './Footer'
import AdminMenuBar from '../admin/AdminMenuBar'
import AdminFooter from '../admin/AdminFooter'
import PostPage from '../posts/PostPage'
import LocationAdminDetails from '../admin/LocationAdminDetails'

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
        const arr: TravelLocation[] = [];
        const arr2: Post[] = [];

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
                        <Route exact path="/post/:postid" render={(props) => <PostPage {...props} username={this.state.username} />} />
                        <Route exact path="/notadmin" component={LocationList} />
                        <Route exact path="/notadmin/locationentry" component={LocationEntryPage} />
                        <Route exact path="/notadmin/locationentry/:locationid" component={LocationEntryPage} />
                        <Route exact path="/notadmin/location/:locationid" component={LocationAdminDetails} />
                        <Route exact path="/notadmin/location/:locationid/postentry" component={PostEntryPage} />
                        <Route exact path="/notadmin/location/:locationid/postentry/:postid" component={PostEntryPage} />
                        <Redirect to="/" />
                    </Switch>
                    <Switch>
                        <Route path="/notadmin" render={(props) => <AdminFooter {...props} username={this.state.username} />} />
                        <Route component={Footer} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
