import React from 'react';
import { storiesOf } from '@storybook/react';
import PostMedia from './PostMedia';
//import defaultImage from '../images/default.png'
import travelImage from "../../testdata/Travel.jpg";
import travelThumbnail from "../../testdata/Travel-Thumbnail.jpg"
//import testVideo from "../../testdata/test.mp4"

storiesOf('Post Media', module)
    .add('Empty', () => <PostMedia items={[]} />)
    .add('Single Image', () => {
        let items = [
            { original: travelImage, thumbnail: travelThumbnail }
        ]
        return (
            <PostMedia items={items} />
        )
    })
    .add('Multiple Images', () => {
        let items = [
            { original: travelImage, thumbnail: travelThumbnail },
            { original: travelImage, thumbnail: travelThumbnail },
            { original: travelImage, thumbnail: travelThumbnail }
        ]
        return (
            <PostMedia items={items} />
        )
    })
    // .add('Single Video', () => {
    //     let items = [
    //         {original:"/test.mp4", thumbnail:travelThumbnail}
    //     ]
    //     return (
    //         <PostMedia items={items}/>
    //     )
    // })
