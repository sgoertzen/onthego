import React from 'react';
import { storiesOf } from '@storybook/react';
import PostMedia from './PostMedia';
import travelImage from "../../testdata/Travel.jpg";
import travelThumbnail from "../../testdata/thumb_Travel.jpg"
import { MediaType, Media } from '../classes/Media';

storiesOf('Post Media', module)
    .add('Empty', () => <PostMedia items={[]} />)
    .add('Single Image', () => {
        let items = [
            new Media("travel.jpg", travelImage, travelThumbnail, MediaType.Image)
        ]
        return (
            <PostMedia items={items} />
        )
    })
    .add('Multiple Images', () => {
        let items = [
            new Media("travel.jpg", travelImage, travelThumbnail, MediaType.Image),
            new Media("travel.jpg", travelImage, travelThumbnail, MediaType.Image),
            new Media("travel.jpg", travelImage, travelThumbnail, MediaType.Image)
        ]
        return (
            <PostMedia items={items} />
        )
    })
    .add('Single Video', () => {
        let items = [
            new Media("SampleVideo_720x480_1mb.mp4", "/SampleVideo_720x480_1mb.mp4", travelThumbnail, MediaType.Video)
        ]
        return (
            <PostMedia items={items} />
        )
    })
    .add('Image and Video', () => {
        let items = [
            new Media("travel.jpg", travelImage, travelThumbnail, MediaType.Image),
            new Media("SampleVideo_720x480_1mb.mp4", "/SampleVideo_720x480_1mb.mp4", travelThumbnail, MediaType.Video)
        ]
        return (
            <PostMedia items={items} />
        )
    })
