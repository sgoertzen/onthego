import React from 'react';
import { storiesOf } from '@storybook/react';
import { TravelLocation } from '../../classes/TravelLocation';
import { GeoPoint } from '../../classes/GeoPoint';
import { TimeStamp } from '../../classes/TimeStamp';
import LocationDetails from './LocationDetails';


storiesOf('locations/Location Details', module)
    .add('In location', () => {
        let arrive = new TimeStamp(new Date("12/25/1990").getTime())
        let depart = new TimeStamp(new Date("12/25/2290").getTime())
        let loc = new TravelLocation("1", "Sapathastan", new GeoPoint(45, -93), arrive, depart)
        return <LocationDetails location={loc} />
    })
    .add('Past location', () => {
        let arrive = new TimeStamp(new Date("12/25/1990").getTime())
        let depart = new TimeStamp(new Date("12/25/2000").getTime())
        let loc = new TravelLocation("1", "Sapathastan", new GeoPoint(45, -93), arrive, depart)
        return <LocationDetails location={loc} />
    })
    .add('Future location', () => {
        let arrive = new TimeStamp(new Date("12/25/2290").getTime())
        let depart = new TimeStamp(new Date("12/25/2291").getTime())
        let loc = new TravelLocation("1", "Sapathastan", new GeoPoint(45, -93), arrive, depart)
        return <LocationDetails location={loc} />
    })
