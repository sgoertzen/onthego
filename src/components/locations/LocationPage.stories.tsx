
import React from 'react';
import { storiesOf } from '@storybook/react';
import LocationPage from './LocationPage';
import { StorybookHelper } from '../../util/StorybookHelper';

storiesOf('locations/Location Page', module)
    .add('no selection', () => {
        StorybookHelper.initFirebase()
        return <LocationPage />
    })
    .add('cuba selected', () => {
        StorybookHelper.initFirebase()
        const match = {
            params: {
                locationName: "Cuba"
            }
        }
        return <LocationPage match={match} />
    })