import React from 'react';
import { storiesOf } from '@storybook/react';
import PostTile from './PostTile';
import { Post, Media } from '../classes/Post';
import travelImage from "../../testdata/Travel.jpg";
import { TimeStamp } from '../classes/TimeStamp';

storiesOf('Post Tile', module)
    .add('Single Image', () => {
        return <PostTile post={
            new Post("Sample title",
                [new Media("travel.png", travelImage)],
                0,
                "Sally",
                new TimeStamp(new Date("06/06/2019").getTime()),
                ""
            )}
            onPostClick={() => { }}
        />
    })
    .add('Multiple Image', () => {
        return <PostTile post={
            new Post("Sample title",
                [new Media("travel.png", travelImage), new Media("travel.png", travelImage), new Media("travel.png", travelImage)],
                0,
                "Sally",
                new TimeStamp(new Date("12/12/2018").getTime()),
                ""
            )}
            onPostClick={() => { }}
        />
    })
    .add('No Images', () => {
        return <PostTile post={
            new Post("Sample title",
                [],
                0,
                "Sally",
                new TimeStamp(new Date("12/12/2018").getTime()),
                ""
            )}
            onPostClick={() => { }}
        />
    })

