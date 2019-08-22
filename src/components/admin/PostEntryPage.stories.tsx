/// <reference types="storybook__react" />
import React from 'react'
import { storiesOf } from '@storybook/react'
import { TravelLocation } from '../../classes/TravelLocation'
import { TimeStamp } from '../../classes/TimeStamp'
import PostEntryPage from './PostEntryPage'
import * as firebase from "firebase/app"; import { Post } from '../../classes/Post';
;

storiesOf('admin/Post Entry', module)
    .add('Basic Form', () => {
        return (
            <PostEntryPage
                match={{ params: { locationid: "locid1" } }} />
        )
    })
    .add('Filled in Form', () => {
        return (
            <PostEntryPage
                match={{ params: { locationid: "locid1" } }} />
        )
    })