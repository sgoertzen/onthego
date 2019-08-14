import React from 'react';
import { storiesOf } from '@storybook/react';
import PostTile from './PostTile';
import { Post } from '../../classes/Post';
import travelImage from "../../../testdata/Travel.jpg";
import { TimeStamp } from '../../classes/TimeStamp';
import { Media, MediaType } from '../../classes/Media';

storiesOf('locations/Post Tile', module)
    .add('Single Image', () => {
        return <PostTile post={
            new Post("Sample title",
                [new Media("travel.png", travelImage, MediaType.Image)],
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
                [
                    new Media("travel.png", travelImage, MediaType.Image),
                    new Media("travel.png", travelImage, MediaType.Image),
                    new Media("travel.png", travelImage, MediaType.Image)],
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
    .add('No Comments', () => {
        return <PostTile post={
            new Post("Sample title",
                [new Media("travel.png", travelImage, MediaType.Image)],
                0,
                "Sally",
                new TimeStamp(new Date("06/06/2019").getTime()),
                ""
            )}
            onPostClick={() => { }}
        />
    })
    .add('Multiple Comments', () => {
        return <PostTile post={
            new Post("Sample title",
                [
                    new Media("travel.png", travelImage, MediaType.Image),
                    new Media("travel.png", travelImage, MediaType.Image),
                    new Media("travel.png", travelImage, MediaType.Image)],
                8,
                "Sally",
                new TimeStamp(new Date("12/12/2018").getTime()),
                ""
            )}
            onPostClick={() => { }}
        />
    })

