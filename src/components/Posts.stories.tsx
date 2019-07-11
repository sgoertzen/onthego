import React from 'react';
import { storiesOf } from '@storybook/react';
import Posts from './Posts';
import { Post } from '../classes/Post';


storiesOf('Posts', module)
    .add('Single Post', () => <Posts posts={[new Post("Sample title", "https://www.goertzensonthego.com/android-chrome-512x512.png")]} />)
    .add("Multiple Posts", () => {
        let tiles = [
            new Post("Alpha", ""),
            new Post("Beta", ""),
            new Post("Charlie", ""),
            new Post("Delta", "")
        ]
        return <Posts posts={tiles} />

    })
    .add('No Posts', () => <Posts posts={[]} />)
