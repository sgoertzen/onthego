/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import LocationEntry from './LocationEntry';
import { firebaseConfig } from '../../config/firebase.config'
import * as firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);

storiesOf('admin/Location Entry', module)
    .add('Basic Form', () => {
        return <LocationEntry />
    })
    .add('Filled Form', () => {
        return <LocationEntry
            name="Antarctica"
            latitude={15.5}
            longitude={31.156}
            arrival={new Date("12/15/2025")}
            departure={new Date("12/15/2026")}
        />
    })