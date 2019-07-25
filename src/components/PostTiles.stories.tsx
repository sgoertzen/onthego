import React from 'react';
import { storiesOf } from '@storybook/react';
import PostTiles from './PostTiles';
import { Post } from '../classes/Post';
import travelImage from "../../testdata/Travel.jpg";
import thumbImage from "../../testdata/thumb_Travel.jpg";
import { TimeStamp } from '../classes/TimeStamp';
import { Media, MediaType } from '../classes/Media';


storiesOf('Post Tiles', module)
    .add('Single Post', () => {
        let posts = [
            new Post(
                "Sample title",
                [new Media("travel.png", travelImage, thumbImage, MediaType.Image)],
                0,
                "bob",
                new TimeStamp(new Date(6 / 6 / 2019).getTime()),
                ""
            )]
        return <PostTiles posts={posts} onPostClick={() => { }} />
    })
    .add("Multiple Posts", () => {
        // We use dates based off the current day/time, as the labels will remain consistent then 
        // since they show as "One Month Ago".  This avoids UI changes when the code doesn't change.
        let oneMonthAgoDate = new Date()
        oneMonthAgoDate.setMonth(oneMonthAgoDate.getMonth() - 1)
        let oneHourAgoDate = new Date()
        oneHourAgoDate.setHours(oneHourAgoDate.getHours() - 1)

        let oneMonthAgo = new TimeStamp(oneMonthAgoDate.getTime())
        let oneHourAgo = new TimeStamp(oneHourAgoDate.getTime())

        let tiles = [
            new Post("Alpha", [new Media("travel.png", travelImage, thumbImage, MediaType.Image)], 3, "bob", oneMonthAgo, ""),
            new Post("Beta", [new Media("travel.png", travelImage, thumbImage, MediaType.Image)], 3, "bob", oneMonthAgo, ""),
            new Post("Charlie", [new Media("travel.png", travelImage, thumbImage, MediaType.Image)], 3, "bob", oneHourAgo, ""),
            new Post("Delta", [new Media("travel.png", travelImage, thumbImage, MediaType.Image)], 3, "bob", oneHourAgo, "")
        ]
        return <PostTiles posts={tiles} onPostClick={() => { }} />

    })
    .add('No Posts', () => <PostTiles posts={[]} onPostClick={() => { }} />)
