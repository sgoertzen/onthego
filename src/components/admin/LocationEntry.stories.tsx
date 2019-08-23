/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import LocationEntry from './LocationEntry';
import { firebaseConfig } from '../../config/firebase.config'
import * as firebase from "firebase/app";
import "firebase/firestore";
import { TravelLocation } from '../../classes/TravelLocation';
import { TimeStamp } from '../../classes/TimeStamp';

firebase.initializeApp(firebaseConfig);

storiesOf('admin/Location Entry', module)
    .add('Basic Form', () => {
        return <LocationEntry onLocationCreated={() => { }} />
    })
    .add('Filled Form', () => {
        const loc = new TravelLocation("", "Antarctica", new firebase.firestore.GeoPoint(15.5, 31.156), new TimeStamp(), new TimeStamp())
        return <LocationEntry loc={loc} onLocationCreated={() => { }} />
    })