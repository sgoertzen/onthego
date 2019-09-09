/// <reference types="storybook__react" />
import React from 'react'
import { storiesOf } from '@storybook/react'
import LocationList from './LocationList'
import { TravelLocation } from '../../classes/TravelLocation'
import { TimeStamp } from '../../classes/TimeStamp'
import * as firebase from "firebase/app"

storiesOf('admin/Location List', module)
    .add('No entries', () => {
        return <LocationList locs={[]} history={{ push: () => { } }} />
    })
    .add('With locations', () => {
        const locs: TravelLocation[] = []
        locs.push(new TravelLocation("1", "Alpha", [new firebase.firestore.GeoPoint(45.8464, -93.902)], new TimeStamp(0), new TimeStamp(10000)))
        locs.push(new TravelLocation("2", "Beta", [new firebase.firestore.GeoPoint(35.9271, -106.2675)], new TimeStamp(10000), new TimeStamp(2562367819120)))
        locs.push(new TravelLocation("3", "Charlie", [new firebase.firestore.GeoPoint(38.1227, -90.9633)], new TimeStamp(2562367819120), new TimeStamp(3562367819120)))
        return <LocationList locs={locs} history={{ push: () => { } }} />
    })