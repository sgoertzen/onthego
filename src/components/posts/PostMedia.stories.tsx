import React from 'react';
import { storiesOf } from '@storybook/react';
import PostMedia from './PostMedia';
import travelImage from '../../../testdata/Travel.jpg'
import { MediaType, Media } from '../../classes/Media'

storiesOf('posts/Post Media', module)
    .add('Empty', () => <PostMedia items={[]} />)
    .add('Single Image', () => {
        const items = [
            new Media("travel.jpg", travelImage, MediaType.Image)
        ]
        return (
            <PostMedia items={items} />
        )
    })
    .add('Multiple Images', () => {
        const items = [
            new Media("travel.jpg", travelImage, MediaType.Image),
            new Media("travel.jpg", travelImage, MediaType.Image),
            new Media("travel.jpg", travelImage, MediaType.Image)
        ]
        return (
            <PostMedia items={items} />
        )
    })
    .add('Single Video', () => {
        const items = [
            new Media("SampleVideo_720x480_1mb.mp4", "/SampleVideo_720x480_1mb.mp4", MediaType.Video)
        ]
        return (
            <PostMedia items={items} />
        )
    })
    .add('Image and Video', () => {
        const items = [
            new Media("travel.jpg", travelImage, MediaType.Image),
            new Media("SampleVideo_720x480_1mb.mp4", "/SampleVideo_720x480_1mb.mp4", MediaType.Video)
        ]
        return (
            <PostMedia items={items} />
        )
    })
