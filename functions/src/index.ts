import * as functions from 'firebase-functions'

import { basename, join, dirname, extname } from 'path'
import * as sharp from 'sharp'
import * as Storage from '@google-cloud/storage'
import * as fs from 'fs-extra';
import * as ffmpeg from 'fluent-ffmpeg'
import { tmpdir } from 'os'
const gcs = new Storage.Storage();
const THUMB_PREFIX = "thumb_";

exports.generateVideoThumbnail = functions.storage.object().onFinalize(async (object) => {
    const filePath = object.name
    const contentType = object.contentType
    if (!filePath || !contentType) {
        console.log('No filepath or content type.')
        return false
    }
    if (!filePath.includes('postvideos')) {
        console.log('Skipping file as it is not a video: ', filePath)
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

    const extension = extname(fileName)
    const filename_without_extension = basename(filePath, extension)
    const thumbFileName = `${THUMB_PREFIX}${filename_without_extension}.png`
    const workingDir = join(tmpdir(), 'thumbs')
    const tmpFilePath = join(workingDir, fileName)
    const bucketDir = dirname(filePath);

    // 1. Ensure thumbnail dir exists
    await fs.ensureDir(workingDir).catch((error) => {
        console.log('1. Working directory ' + workingDir + ' unavilable', error)
        return false
    })

    // 2. Download Source File
    const bucket = gcs.bucket(object.bucket)
    await bucket.file(filePath).download({
        destination: tmpFilePath
    }).catch((reason: any) => {
        console.log("Error saving video file", reason)
    })

    let thumbnailGeneratedName = ""

    // 3. Create the screenshot
    ffmpeg(tmpFilePath)
        .on('filenames', (filenames:string[]) => {
            console.log('Will generate ' + filenames.join(', '))
            thumbnailGeneratedName = filenames[0]
        })
        .on('error', (err: any) => {
            console.log('Error while creating video screenshot', err.message)
        })
        .on('end', async () => {
            const tmpThumbPath = join(workingDir, thumbnailGeneratedName)
            console.log('Video screenshot conversion ended')
            console.log("expecting thumbnail at: ", tmpThumbPath)
            fs.exists(tmpThumbPath, (exists: boolean) => {
                console.log("Thumbnail exists in temp: ", exists)
            })

            // 4. Write the file back to firestore
            await bucket.upload(tmpThumbPath, {
                destination: join(bucketDir, thumbFileName)
            })
            console.log("Thumbnail uploaded: ", thumbnailGeneratedName)

            // 5. Cleanup remove the tmp/thumbs from the filesystem
            return fs.remove(workingDir)
        })
        .takeScreenshots({
            timemarks: ['0'], // number of seconds
            folder: workingDir,
            filename: thumbFileName,
            size: '200x200'
        })

    return true
})

exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => {

    const filePath = object.name
    const contentType = object.contentType
    if (!filePath || !contentType) {
        console.log('No filepath or content type.')
        return false
    }
    if (!filePath.includes('postimages')) {
        console.log('Skipping file as it is not an image: ', filePath)
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

    const metadata = { contentType: contentType };
    const sizes = [200, 1600];

    const uploadPromises = sizes.map(async size => {
        // We add a 'thumb_' prefix to thumbnails file name.
        const thumbFileName = `${THUMB_PREFIX}${size}_${fileName}`;
        const thumbFilePath = join(dirname(filePath), thumbFileName);
        console.log('Creating thumbnail: ', thumbFileName)

        // Create write stream for uploading thumbnail
        const bucket = gcs.bucket(object.bucket)
        const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({ metadata });

        // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
        const pipeline = sharp();
        await pipeline.resize(size, size).pipe(thumbnailUploadStream);
        await bucket.file(filePath).createReadStream().pipe(pipeline);
        console.log('Created thumbnail: ', thumbFileName)
    });

    // 4. Run the upload operations
    return Promise.all(uploadPromises)
})