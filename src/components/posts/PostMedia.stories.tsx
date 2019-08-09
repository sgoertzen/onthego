import React from 'react';
import { storiesOf } from '@storybook/react';
import PostMedia from './PostMedia';
import travelImage from '../../../testdata/Travel.jpg'
import { MediaType, Media } from '../../classes/Media'

storiesOf('posts/Post Media', module)
    .add('Empty', () => <PostMedia items={[]} />)
    .add('Single Image', () => {
        let items = [
            new Media("travel.jpg", travelImage, MediaType.Image)
        ]
        return (
            <PostMedia items={items} />
        )
    })
    .add('Multiple Images', () => {
        let items = [
            new Media("travel.jpg", travelImage, MediaType.Image),
            new Media("travel.jpg", travelImage, MediaType.Image),
            new Media("travel.jpg", travelImage, MediaType.Image)
        ]
        return (
            <PostMedia items={items} />
        )
    })
    .add('Single Video', () => {
        let items = [
            new Media("SampleVideo_720x480_1mb.mp4", "/SampleVideo_720x480_1mb.mp4", MediaType.Video)
        ]
        return (
            <PostMedia items={items} />
        )
    })
    .add('Image and Video', () => {
        let items = [
            new Media("travel.jpg", travelImage, MediaType.Image),
            new Media("SampleVideo_720x480_1mb.mp4", "/SampleVideo_720x480_1mb.mp4", MediaType.Video)
        ]
        return (
            <PostMedia items={items} />
        )
    })
