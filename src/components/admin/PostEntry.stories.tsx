
import React from 'react'
import { storiesOf } from '@storybook/react'
import { TravelLocation } from '../../classes/TravelLocation'
import { TimeStamp } from '../../classes/TimeStamp'
import PostEntry from './PostEntry'
import * as firebase from "firebase/app"; import { Post } from '../../classes/Post';
;

storiesOf('admin/Post Entry', module)
    .add('Basic Form', () => {
        const tl = new TravelLocation("1", "Alpha", [new firebase.firestore.GeoPoint(45, -93)], new TimeStamp(0), new TimeStamp(10000))
        return (
            <PostEntry
                loc={tl}
                onPostCreated={() => { alert('post created') }} />
        )
    })
    .add('Filled in Form', () => {
        const tl = new TravelLocation("1", "Alpha", [new firebase.firestore.GeoPoint(45, -93)], new TimeStamp(0), new TimeStamp(10000))
        const p1 = new Post("test title", [], 0, "Jeff Kaplan", new TimeStamp(10000), "This is some text!  \nWith a line break!")
        return (
            <PostEntry
                loc={tl}
                post={p1}
                onPostCreated={() => { alert('post created') }} />
        )
    })