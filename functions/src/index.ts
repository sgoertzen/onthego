import * as functions from 'firebase-functions'

import { basename, join, dirname } from 'path'
import * as sharp from 'sharp'
import * as Storage from '@google-cloud/storage'
import * as fs from 'fs-extra';
import * as ffmpeg from 'fluent-ffmpeg'
import { tmpdir } from 'os'
const gcs = new Storage.Storage();

const THUMB_MAX_WIDTH = 200;
const THUMB_MAX_HEIGHT = 200;
const THUMB_PREFIX = "thumb_";

exports.generateVideoThumbnail = functions.storage.object().onFinalize(async (object) => {
    const filePath = object.name
    const contentType = object.contentType
    if (!filePath || !contentType) {
        console.log('No filepath or content type.')
        return false
    }
    if (!filePath.includes('postvideos')) {
        console.log('Skipping non post video: ', filePath)
        return false;
    }
    if (!contentType.startsWith('video/')) {
        console.log('Not a video: ', contentType)
        return false;
    }

    const fileName = basename(filePath)

    if (fileName.includes(THUMB_PREFIX)) {
        console.log('Already a thumbnail', fileName)
        return false;
    }

    const thumbFileName = `${THUMB_PREFIX}${fileName}`
    const workingDir = join(tmpdir(), 'thumbs')
    const tmpFilePath = join(workingDir, fileName)
    const tmpThumbPath = join(workingDir, thumbFileName)
    const bucketDir = dirname(filePath);
    console.log('workingDir: ', workingDir)
    console.log('tmpThumbPath: ', tmpThumbPath)
    console.log('bucketDir: ', bucketDir)

    // 1. Ensure thumbnail dir exists
    await fs.ensureDir(workingDir).catch((error) => {
        console.log('1. Working directory ' + workingDir + ' unavilable', error)
    })
    console.log("1. Completed")

    // 2. Download Source File
    const bucket = gcs.bucket(object.bucket)
    await bucket.file(filePath).download({
        destination: tmpFilePath
    }).catch((reason:any) => {
        console.log("2. Error saving video file", reason)
    })
    console.log("2. Completed")

    // 3. Create the screenshot
    ffmpeg(tmpFilePath)
        .on('error', (err:any) => {
            console.log('Error while creating video screenshot', err.message)
        })
        .on('end', () => {
            console.log('Video screenshot created')
        })
        .takeScreenshots({
            count: 1,
            timemarks: ['5'] // number of seconds
        }, tmpThumbPath)
        .run()
    console.log("3. Completed")

    // 4. Write the file back to firestore
    await bucket.upload(tmpThumbPath, {
        destination: join(bucketDir, thumbFileName)
    });
    console.log("4. Completed")

    // 5. Cleanup remove the tmp/thumbs from the filesystem
    return fs.remove(workingDir)
})

exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => {

    const filePath = object.name
    const contentType = object.contentType
    if (!filePath || !contentType) {
        console.log('No filepath or content type.')
        return false
    }

    if (!filePath.includes('postimages')) {
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
    const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({ metadata });

    // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
    const pipeline = sharp();
    await pipeline.resize(THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT).pipe(thumbnailUploadStream);

    await bucket.file(filePath).createReadStream().pipe(pipeline);

    console.log('Created thumbnail: ', thumbFileName)

    return new Promise((resolve, reject) =>
        thumbnailUploadStream.on('finish', resolve).on('error', reject));
})