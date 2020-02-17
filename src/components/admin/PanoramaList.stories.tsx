
import React from 'react'
import { storiesOf } from '@storybook/react'
import PanoramaList from './PanoramaList'
import * as firebase from "firebase/app"
import { StorybookHelper } from '../../util/StorybookHelper'
import { IPanorama, Panorama } from '../../classes/Panorama'

storiesOf('admin/Panorama List', module)
    .add('No entries', () => {
        StorybookHelper.initFirebase()
        return <PanoramaList panos={[]} history={{ push: () => { } }} />
    })
    .add('With locations', () => {
        const panos: IPanorama[] = []
        panos.push(new Panorama("1", "Alpha", "", "", new firebase.firestore.GeoPoint(45.8464, -93.902)))
        panos.push(new Panorama("2", "Beta", "", "", new firebase.firestore.GeoPoint(35.9271, -106.2675)))
        panos.push(new Panorama("3", "Charlie", "", "", new firebase.firestore.GeoPoint(38.1227, -90.9633)))
        return <PanoramaList panos={panos} history={{ push: () => { } }} />
    })