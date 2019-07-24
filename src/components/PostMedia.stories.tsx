import React from 'react';
import { storiesOf } from '@storybook/react';
import PostMedia, { MediaType } from './PostMedia';
//import defaultImage from '../images/default.png'
import travelImage from "../../testdata/Travel.jpg";
import travelThumbnail from "../../testdata/Travel-Thumbnail.jpg"
//import testVideo from "../../testdata/test.mp4"

storiesOf('Post Media', module)
    .add('Empty', () => <PostMedia items={[]} />)
    .add('Single Image', () => {
        let items = [
            { url: travelImage, thumbnail: travelThumbnail, type: MediaType.Image }
        ]
        return (
            <PostMedia items={items} />
        )
    })
    .add('Multiple Images', () => {
        let items = [
            { url: travelImage, thumbnail: travelThumbnail, type: MediaType.Image },
            { url: travelImage, thumbnail: travelThumbnail, type: MediaType.Image },
            { url: travelImage, thumbnail: travelThumbnail, type: MediaType.Image }
        ]
        return (
            <PostMedia items={items} />
        )
    })
    .add('Single Video', () => {
        let items = [
            {url:"/test.mp4", thumbnail:travelThumbnail, type: MediaType.Video}
        ]
        return (
            <PostMedia items={items}/>
        )
    })
    .add('Image and Video', () => {
        let items = [
            { url: travelImage, thumbnail: travelThumbnail, type: MediaType.Image },
            {url:"/test.mp4", thumbnail:travelThumbnail, type: MediaType.Video}
        ]
        return (
            <PostMedia items={items}/>
        )
    })
