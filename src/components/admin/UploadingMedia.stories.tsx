/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import UploadingMedia from './UploadingMedia';
import travel from '../../images/default.png'

storiesOf('Admin/Uploading Media', module)
    .add('10% Upload', () => {
        return (
            <UploadingMedia
                filename="something.png"
                percentUploaded={10} />
        )
    })
    .add('75% Upload', () => {
        return (
            <UploadingMedia
                filename="something.png"
                percentUploaded={75} />
        )
    })
    .add('Completed Image', () => {
        return (
            <UploadingMedia
                filename="something.png"
                url={travel}
                percentUploaded={100} />
        )
    })
    .add('Completed Video', () => {
        return (
            <UploadingMedia
                filename="something.avi"
                url={travel}
                percentUploaded={100} />
        )
    })