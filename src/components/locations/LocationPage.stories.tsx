/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import LocationPage from './LocationPage';

storiesOf('locations/Location Page', module)
    .add('no selection', () => <LocationPage />)
    .add('cuba selected', () => {
        const match = {
            params: {
                locationName: "Cuba"
            }
        }
        return <LocationPage match={match} />
    })