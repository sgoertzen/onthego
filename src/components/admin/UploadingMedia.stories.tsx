/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import UploadingMedia from './UploadingMedia';
import travelImage from "../../../testdata/Travel.jpg";
import thumbImage from "../../../testdata/thumb_Travel.jpg";
import { MediaType } from '../../classes/Media';

storiesOf('Admin/Uploading Media', module)
    .add('75% Upload', () => {
        return (
            <UploadingMedia
                filename="something.png"
                percentUploaded={75}
                filetype={MediaType.Image}
                url=""
                thumbnail="" />
        )
    })
    .add('Completed No URL', () => {
        return (
            <UploadingMedia
                filename="something.png"
                percentUploaded={100}
                filetype={MediaType.Image}
                url=""
                thumbnail="" />
        )
    })
    .add('Completed with URL', () => {
        return (
            <UploadingMedia
                filename="something.png"
                percentUploaded={100}
                filetype={MediaType.Image}
                url={travelImage}
                thumbnail={thumbImage} />
        )
    })
    .add('Completed Video', () => {
        return (
            <UploadingMedia
                filename="something.avi"
                percentUploaded={100}
                filetype={MediaType.Image}
                url={travelImage}
                thumbnail={thumbImage} />
        )
    })