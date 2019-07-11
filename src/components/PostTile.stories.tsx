import React from 'react';
import { storiesOf } from '@storybook/react';
import PostTile from './PostTile';
import { Post } from '../classes/Post';

storiesOf('PostTile', module)
    .add('Single Image', () => <PostTile post={new Post("Sample title", "https://www.goertzensonthego.com/android-chrome-512x512.png")} />)

