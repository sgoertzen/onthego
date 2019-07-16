import React from 'react';
import { storiesOf } from '@storybook/react';
import PostTile from './PostTile';
import { Post } from '../classes/Post';
import travelImage from "../../testdata/Travel.jpg";

storiesOf('PostTile', module)
.add('Single Image', () => {
    return <PostTile post={
        new Post("Sample title", 
        [travelImage], 
        0,
        "Sally",
        new Date("06/06/2019"))} />
})
.add('Multiple Image', () => {
    return <PostTile post={
        new Post("Sample title", 
        [travelImage, travelImage, travelImage], 
        0,
        "Sally",
        new Date("12/12/2018"))} />
})

