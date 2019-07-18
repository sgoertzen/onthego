/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import LocationButtons from '../components/LocationButtons';
import { TravelLocation } from '../classes/TravelLocation';
import { GeoPoint } from '../classes/GeoPoint';
import { TimeStamp } from '../classes/TimeStamp';

storiesOf('Location Buttons', module)
    .add('no locations', () => <LocationButtons locs={[]} onLocChange={() => { }} />)
    .add('locations', () => {
        const locs: TravelLocation[] = []
        locs.push(new TravelLocation("1", "Alpha", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(10000)))
        locs.push(new TravelLocation("2", "Beta", new GeoPoint(35, -106), new TimeStamp(10000), new TimeStamp(2562367819120)))
        locs.push(new TravelLocation("3", "Charlie", new GeoPoint(38, -90), new TimeStamp(2562367819120), new TimeStamp(3562367819120)))
        return <LocationButtons locs={locs} onLocChange={(id: string) => { alert('switch to loc: ' + id) }} />
    })