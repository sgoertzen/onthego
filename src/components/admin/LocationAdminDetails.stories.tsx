
import React from 'react';
import { storiesOf } from '@storybook/react';
import LocationAdminDetails from './LocationAdminDetails';


storiesOf('admin/Location Details', module)
    .add('Basic', () => {
        const history = {
            push: (loc: string) => { alert('Would go to: ' + loc) }
        }
        const match = {
            params: {
                locationid: "12345"
            }
        }
        return <LocationAdminDetails match={match} history={history} />
    })