import React from 'react'
import { storiesOf } from '@storybook/react'
import PanoramaEntry from './PanoramaEntry'
import * as firebase from "firebase/app";
import "firebase/firestore"
import { Panorama } from '../../classes/Panorama'

storiesOf('admin/Panorama Edit', module)
    .add('Empty Form', () => {
        return (
            <PanoramaEntry />
        )
    })
    .add('With data', () => {
        const p1 = new Panorama("123", "My awesome panorama!", "pano123.jpg", "", new firebase.firestore.GeoPoint(48.9603792, 31.3424444))

        return (
            <PanoramaEntry pano={p1} />
        )
    })