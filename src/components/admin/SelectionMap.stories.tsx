/// <reference types="storybook__react" />
import React from 'react'
import { storiesOf } from '@storybook/react'
import SelectionMap from './SelectionMap';
;

storiesOf('admin/Selection Map', module)
    .add('With click alert', () => {
        return (
            <SelectionMap onChange={(lat, lng) => { alert('Map clicked at: ' + lat + ', ' + lng) }} label={1} />
        )
    })
    .add('Egypt', () => {
        return (
            <SelectionMap latitude={27.06443478849777} longitude={29.798397045724073} onChange={() => { }} label={2} />
        )
    })