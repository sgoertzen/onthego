/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import LocationPage from '../components/LocationPage';

storiesOf('Location Page', module)
    .add('no selection', () => <LocationPage />)
    .add('cuba selected', () => {
        let match = {
            params: {
                locationName: "Cuba"
            }
        }
        return <LocationPage match={match} />
    })