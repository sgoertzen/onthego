/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import { TravelLocation } from '../classes/TravelLocation';
import { GeoPoint } from '../classes/GeoPoint';
import { TimeStamp } from '../classes/TimeStamp';
import PostEntry from './PostEntry';

storiesOf('Post Entry', module)
    .add('Basic Form', () => {
        let tl = new TravelLocation("1", "Alpha", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(10000))
        return (
            <PostEntry 
                loc={tl} 
                onPostCreated={() => { alert('post created') }} />
        )
    })
    .add('Filled in Form', () => {
        let tl = new TravelLocation("1", "Alpha", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(10000))
        return (
            <PostEntry
                title="test title"
                details="test details"
                loc={tl}
                onPostCreated={() => { alert('post created') }} />
        )
    })