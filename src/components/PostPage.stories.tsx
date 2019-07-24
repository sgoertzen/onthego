/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import PostPage from './PostPage';
import { Post, Media } from '../classes/Post';
import defaultImage from '../images/default.png'
import { TimeStamp } from '../classes/TimeStamp';


storiesOf('Post Page', module)
    .add('no post', () => <PostPage />)
    .add('single post', () => {
        let post = new Post(
            "Test Post",
            [new Media("default.png", defaultImage)],
            0,
            "Jane Doe",
            new TimeStamp(new Date("12/15/2020").getTime()),
            "This was a cool place to visit")
        return <PostPage post={post} />
    })