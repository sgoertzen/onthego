import React from 'react';
import { storiesOf } from '@storybook/react';
import Posts from './Posts';
import { Post, Media } from '../classes/Post';
import travelImage from "../../testdata/Travel.jpg";


storiesOf('Posts', module)
    .add('Single Post', () => {
        let posts = [new Post("Sample title", [new Media("travel.png", travelImage)], 0, "bob", new Date(6 / 6 / 2019), "")]
        return <Posts posts={posts} onPostClick={() => {}} />
    })
    .add("Multiple Posts", () => {
        // We use dates based off the current day/time, as the labels will remain consistent then 
        // since they show as "One Month Ago".  This avoids UI changes when the code doesn't change.
        let oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
        let oneHourAgo = new Date()
        oneHourAgo.setHours(oneHourAgo.getHours() - 1)

        let tiles = [
            new Post("Alpha", [new Media("travel.png", travelImage)], 3, "bob", oneMonthAgo, ""),
            new Post("Beta", [new Media("travel.png", travelImage)], 3, "bob", oneMonthAgo, ""),
            new Post("Charlie", [new Media("travel.png", travelImage)], 3, "bob", oneHourAgo, ""),
            new Post("Delta", [new Media("travel.png", travelImage)], 3, "bob", oneHourAgo, "")
        ]
        return <Posts posts={tiles} onPostClick={() => {}}/>

    })
    .add('No Posts', () => <Posts posts={[]} onPostClick={() => {}}/>)
