/// <reference types="storybook__react" />
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
    // .add('Filled Form', () => {
    //     const loc = new TravelLocation("", "Antarctica", new firebase.firestore.GeoPoint(15.5, 31.156), new TimeStamp(), new TimeStamp())
    //     loc.countrycode = "AT"
    //     return <LocationEntry loc={loc} onLocationCreated={() => { }} />
    // })