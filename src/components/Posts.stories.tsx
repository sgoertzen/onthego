import React from 'react';
import { storiesOf } from '@storybook/react';
import Posts from './Posts';
import { Post } from '../classes/Post';


storiesOf('Posts', module)
    .add('Single Image', () => <Posts posts={[new Post("Sample title", "https://www.goertzensonthego.com/android-chrome-512x512.png")]} />)
