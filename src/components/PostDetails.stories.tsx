/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import PostDetails from './PostDetails';
import { Post } from '../classes/Post';
import defaultImage from '../images/default.png'


storiesOf('Post Details', module)
    .add('no post', () => <PostDetails />)
    .add('single post', () => {
        let post = new Post("Test Post", [defaultImage], 0, "Jane Doe", new Date("12/15/2020"))
        return <PostDetails post={post} />
    })