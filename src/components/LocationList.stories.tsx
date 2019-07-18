/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import LocationList from './LocationList';
import { TravelLocation } from '../classes/TravelLocation';
import { GeoPoint } from '../classes/GeoPoint';
import { TimeStamp } from '../classes/TimeStamp';

storiesOf('Location List', module)
    .add('No entries', () => {
        return <LocationList locs={[]} />
    })
    .add('With locations', () => {
        const locs: TravelLocation[] = []
        locs.push(new TravelLocation("1", "Alpha", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(10000)))
        locs.push(new TravelLocation("2", "Beta", new GeoPoint(35, -106), new TimeStamp(10000), new TimeStamp(2562367819120)))
        locs.push(new TravelLocation("3", "Charlie", new GeoPoint(38, -90), new TimeStamp(2562367819120), new TimeStamp(3562367819120)))
        return <LocationList locs={locs} />
    })