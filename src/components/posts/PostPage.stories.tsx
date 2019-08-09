/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import PostPage from './PostPage';
import { Post } from '../../classes/Post';
import travelImage from "../../../testdata/Travel.jpg";
import { TimeStamp } from '../../classes/TimeStamp';
import { Media, MediaType } from '../../classes/Media';


storiesOf('posts/Post Page', module)
    .add('no post', () => <PostPage />)
    .add('single post', () => {
        let post = new Post(
            "Test Post",
            [new Media("default.png", travelImage, MediaType.Image)],
            0,
            "Jane Doe",
            new TimeStamp(new Date("12/15/2020").getTime()),
            "This was a cool place to visit")
        return <PostPage post={post} />
    })