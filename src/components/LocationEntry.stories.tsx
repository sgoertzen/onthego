/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import LocationEntry from './LocationEntry';

storiesOf('Location Entry', module)
    .add('Basic Form', () => {
        return <LocationEntry onLocationCreated={() => { alert('location created') }} />
    })