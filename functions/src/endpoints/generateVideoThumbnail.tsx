// ****************************************************************************
//  Generate Video Thumbnail
//
//  Description: Creates a thumbnail for an uploaded video.  Uses the first 
//    frame of the video for the screenshot.  
//     
//  Trigger: Any file uploaded to postvideos/
//     
// ****************************************************************************
import * as functions from 'firebase-functions'

import { basename, join, dirname, extname } from 'path'
import * as Storage from '@google-cloud/storage'
import * as fs from 'fs-extra'
import * as ffmpeg from 'fluent-ffmpeg'
import { tmpdir } from 'os'
import { videoHelper } from '../util/videoHelper'

const gcs = new Storage.Storage()
const THUMB_PREFIX = "thumb_"

exports = module.exports = functions.storage.object().onFinalize(async (object) => {
    if (!validateVideo(object)) {
        return false
    }

    const filePath = object.name ? object.name : ""
    const fileName = basename(filePath)
    const filename_without_extension = basename(filePath, extname(fileName))
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
        console.log("Error saving file ", tmpFilePath, reason)
    })

    let thumbnailGeneratedName = ""


    // 3. Create the screenshot
    return new Promise((resolve, reject) => {

        ffmpeg(tmpFilePath)
            .on('filenames', (filenames: string[]) => {
                console.debug('Will generate ' + filenames.join(', '));
                thumbnailGeneratedName = filenames[0];
            })
            .on('error', (err: any) => {
                const message = `Error while creating video screenshot: ${err.message}`
                console.error(message);
                reject(message)
            })
            .on('end', async () => {
                const tmpThumbPath = join(workingDir, thumbnailGeneratedName);
                console.debug('Video screenshot conversion ended');
                console.debug("expecting thumbnail at: ", tmpThumbPath);
                // 4. Write the file back to firestore
                await bucket.upload(tmpThumbPath, {
                    destination: join(bucketDir, thumbFileName)
                });
                console.log("Thumbnail uploaded: ", thumbnailGeneratedName);
                // 5. Cleanup remove the tmp/thumbs from the filesystem
                return fs.remove(workingDir)
                    .then(() => { resolve("Complete") })
                    .catch(() => { reject("Unable to cleanup working directory") })
            })
            .takeScreenshots({
                timemarks: ['0'],
                folder: workingDir,
                filename: thumbFileName,
                size: '200x200'
            })

    })
})

function validateVideo(object: any) {
    const contentType = object.contentType
    const filePath = object.name

    if (!filePath || !contentType) {
        console.debug('No filepath or content type.')
        return false
    }
    if (!filePath.includes('postvideos')) {
        console.debug('Skipping file as it is not a video: ', filePath)
        return false
    }
    if (!contentType.startsWith('video/')) {
        console.debug('Not a video: ', contentType)
        return false
    }

    const fileName = basename(filePath)

    if (fileName.startsWith(videoHelper.RENDITION_PREFIX)) {
        console.debug('Skipping file as it is a rendition')
        return false
    }
    return true
}
