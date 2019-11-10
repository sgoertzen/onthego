/// <reference types="storybook__react" />
import React from 'react'
import { storiesOf } from '@storybook/react'
import SelectionMap from './SelectionMap'
import * as firebase from "firebase/app"

storiesOf('admin/Selection Map', module)
    .add('With click alert', () => {
        return (
            <SelectionMap onChange={(coordinates) => {
                if (coordinates.length > 0) {
                    alert('Total coordinates: ' + coordinates.length)
                }
            }} coordinates={[]} />
        )
    })
    .add('Egypt', () => {
        return (
            <SelectionMap onChange={() => { }} coordinates={[new firebase.firestore.GeoPoint(27.06443478849777, 29.798397045724073)]} />
        )
    })
    .add('Multiple Points', () => {
        return (
            <SelectionMap
                onChange={() => { }}
                coordinates={[
                    new firebase.firestore.GeoPoint(27.06443478849777, 29.798397045724073),
                    new firebase.firestore.GeoPoint(27.96443478849777, 29.398397045724073),
                ]} />
        )
    })