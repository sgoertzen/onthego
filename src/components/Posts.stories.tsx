import React from 'react';
import { storiesOf } from '@storybook/react';
import Posts from './Posts';
import { Post, Media } from '../classes/Post';
import travelImage from "../../testdata/Travel.jpg";


storiesOf('Posts', module)
    .add('Single Post', () => <Posts posts={[new Post("Sample title", [new Media("travel.png", travelImage)], 0, "bob", new Date(6 / 6 / 2019))]} />)
    .add("Multiple Posts", () => {
        let tiles = [
            new Post("Alpha", [new Media("travel.png", travelImage)], 3, "bob", new Date(6 / 6 / 2019)),
            new Post("Beta", [new Media("travel.png", travelImage)], 3, "bob", new Date(6 / 6 / 2019)),
            new Post("Charlie", [new Media("travel.png", travelImage)], 3, "bob", new Date(6 / 6 / 2019)),
            new Post("Delta", [new Media("travel.png", travelImage)], 3, "bob", new Date(6 / 6 / 2019))
        ]
        return <Posts posts={tiles} />

    })
    .add('No Posts', () => <Posts posts={[]} />)
