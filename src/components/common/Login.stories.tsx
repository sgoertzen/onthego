import React from 'react';
import { storiesOf } from '@storybook/react';
import Login, { LoginControl } from './Login';

storiesOf('Login', module)
    .add('link', () => <Login control={LoginControl.Link} />)
    .add('button', () => <Login control={LoginControl.Button} />)
    .add('admin link', () => <Login control={LoginControl.Link} adminLogin={true} />)
    .add('admin button', () => <Login control={LoginControl.Button} adminLogin={true} />)
    .add('username', () => <Login control={LoginControl.Link} username="pdante" />)
    .add('link + intro', () => <Login control={LoginControl.Link} intro="Please do the login" />)
    .add('button + intro', () => <Login control={LoginControl.Button} intro="Please do the login" />)
