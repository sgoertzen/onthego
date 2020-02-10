
import React from 'react';
import { storiesOf } from '@storybook/react';
import UploadingMedia from './UploadingMedia';
import travelImage from "../../../testdata/Travel.jpg";
import { MediaType } from '../../classes/Media';

storiesOf('admin/Uploading Media', module)
    .add('75% Upload', () => {
        return (
            <UploadingMedia
                filename="something.png"
                percentUploaded={75}
                filetype={MediaType.Image}
                url=""
                removeCallback={() => { }} />
        )
    })
    .add('Percent with high precision', () => {
        return (
            <UploadingMedia
                filename="something.png"
                percentUploaded={75.948476737834535}
                filetype={MediaType.Image}
                url=""
                removeCallback={() => { }} />
        )
    })
    .add('Completed No URL', () => {
        return (
            <UploadingMedia
                filename="something.png"
                percentUploaded={100}
                filetype={MediaType.Image}
                url=""
                removeCallback={() => { }} />
        )
    })
    .add('Completed with URL', () => {
        return (
            <UploadingMedia
                filename="something.png"
                percentUploaded={100}
                filetype={MediaType.Image}
                url={travelImage}
                removeCallback={() => { }} />
        )
    })
    .add('Completed Video', () => {
        return (
            <UploadingMedia
                filename="something.avi"
                percentUploaded={100}
                filetype={MediaType.Image}
                url={travelImage}
                removeCallback={() => { }} />
        )
    })