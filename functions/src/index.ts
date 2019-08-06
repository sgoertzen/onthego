import * as functions from 'firebase-functions';

import { basename, join, dirname } from 'path'
import * as sharp from 'sharp';
import * as Storage from '@google-cloud/storage';
// npm i video-thumbnail-generator
import ThumbnailGenerator from 'video-thumbnail-generator';
const gcs = new Storage.Storage();

const THUMB_MAX_WIDTH = 200;
const THUMB_MAX_HEIGHT = 200;
const THUMB_PREFIX = "thumb_";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.generateVideoThumbnail = functions.storage.object().onFinalize(async (object) => {
    const filePath = object.name
    const contentType = object.contentType
    if (!filePath || !contentType) {
        console.log('No filepath or content type.')
        return false
    }

    if (!filePath.includes('postvideos')){
        console.log('Skipping non post video: ', filePath)
        return false;
    }

    const fileName = basename(filePath)

    if (!contentType.startsWith('video/')) {
        console.log('Not a video: ', contentType)
        return false;
    }
    if (fileName.includes(THUMB_PREFIX)) {
        console.log('Already a thumbnail', fileName)
        return false;
    }

    // TODO: Implement the package from https://www.npmjs.com/package/video-thumbnail-generator
    // const metadata = {
    //     contentType: "image/png",
    // };
    // const bucket = gcs.bucket(object.bucket)
    const tg = new ThumbnailGenerator({
        sourcePath: '/tmp/test.mp4',
        thumbnailPath: '/tmp/',
        tmpDir: '/some/writeable/directory' //only required if you can't write to /tmp/ and you need to generate gifs
    });

    tg.generate({
        size: '200x200'
    })
        .then(console.log);
    return false;
})

exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => {
    
    const filePath = object.name
    const contentType = object.contentType
    if (!filePath || !contentType) {
        console.log('No filepath or content type.')
        return false
    }

    if (!filePath.includes('postimages')){
        console.log('Skipping non post image: ', filePath)
        return false;
    }

    const fileName = basename(filePath)

    if (!contentType.startsWith('image/')) {
        console.log('Not an image: ', contentType)
        return false;
    }
    if (fileName.includes(THUMB_PREFIX)) {
        console.log('Already a thumbnail', fileName)
        return false;
    }

    const metadata = {
        contentType: contentType,
    };

    // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
    const thumbFileName = `${THUMB_PREFIX}${fileName}`;
    const thumbFilePath = join(dirname(filePath), thumbFileName);
    // Create write stream for uploading thumbnail
    const bucket = gcs.bucket(object.bucket)
    const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({metadata});

    // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
    const pipeline = sharp();
    await pipeline.resize(THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT).pipe(thumbnailUploadStream);

    await bucket.file(filePath).createReadStream().pipe(pipeline);

    console.log('Created thumbnail: ', thumbFileName)

    return new Promise((resolve, reject) =>
        thumbnailUploadStream.on('finish', resolve).on('error', reject));
})