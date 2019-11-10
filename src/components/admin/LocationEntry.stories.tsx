/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import LocationEntry from './LocationEntry';
import * as firebase from "firebase/app";
import "firebase/firestore";
import { TravelLocation } from '../../classes/TravelLocation';
import { TimeStamp } from '../../classes/TimeStamp';


storiesOf('admin/Location Entry', module)
    .add('Basic Form', () => {
        return <LocationEntry onLocationCreated={() => { }} />
    })
    .add('Filled - Ukraine', () => {
        const loc = new TravelLocation("", "Ukraine", [new firebase.firestore.GeoPoint(48.9603792, 31.3424444)], new TimeStamp(), new TimeStamp())
        loc.countrycode = "UA"
        return <LocationEntry loc={loc} onLocationCreated={() => { }} />
    })