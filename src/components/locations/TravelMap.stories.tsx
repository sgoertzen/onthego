import React from 'react'
import { storiesOf } from '@storybook/react'
import TravelMap from './TravelMap'
import { TravelLocation } from '../../classes/TravelLocation'
import { TimeStamp } from '../../classes/TimeStamp'
import * as firebase from "firebase/app"


storiesOf('locations/Travel Map', module)
    .add('no locations', () => <TravelMap locations={[]} onLocChange={() => { }} />)
    .add('locations', () => {
        const locs: TravelLocation[] = []
        locs.push(new TravelLocation("1", "Alpha", [new firebase.firestore.GeoPoint(45, -93)], new TimeStamp(0), new TimeStamp(10000)))
        locs.push(new TravelLocation("2", "Beta", [new firebase.firestore.GeoPoint(35, -106)], new TimeStamp(10000), new TimeStamp(2562367819120)))
        locs.push(new TravelLocation("3", "Charlie", [new firebase.firestore.GeoPoint(38, -90)], new TimeStamp(2562367819120), new TimeStamp(3562367819120)))
        return <TravelMap locations={locs} onLocChange={() => { }} />
    })
    .add('locations (3rd selected)', () => {
        const locs: TravelLocation[] = []
        locs.push(new TravelLocation("1", "Alpha", [new firebase.firestore.GeoPoint(45, -93)], new TimeStamp(0), new TimeStamp(10000)))
        locs.push(new TravelLocation("2", "Beta", [new firebase.firestore.GeoPoint(35, -106)], new TimeStamp(10000), new TimeStamp(2562367819120)))
        locs.push(new TravelLocation("3", "Charlie", [new firebase.firestore.GeoPoint(38, -90)], new TimeStamp(2562367819120), new TimeStamp(3562367819120)))
        return <TravelMap locations={locs} onLocChange={() => { }} center={locs[2].coordinates[0]} />
    })
