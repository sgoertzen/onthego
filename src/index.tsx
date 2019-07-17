import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './components/App';
import PostEntry from './components/PostEntry'
import LocationEntry from './components/LocationEntry'
import Title from './components/Title'

const routing = (
    <Router>
        <div>
            <Title />
            <Route exact path="/" component={App} />
            <Route exact path="/location/:id" component={App} />
            <Route path="/postentry" component={PostEntry} />
            <Route path="/locationentry" component={LocationEntry} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

