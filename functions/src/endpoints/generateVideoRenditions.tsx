// ****************************************************************************
//  Generate Video Renditions
//
//  Description: Resizes videos  
//     
//  Trigger: Any file uploaded to postvideos/
//     
// ****************************************************************************
import * as functions from 'firebase-functions'

import { basename, join, dirname } from 'path'
import * as Storage from '@google-cloud/storage'
import * as fs from 'fs-extra';
import { tmpdir } from 'os'
import { videos } from '../util/videoRenditions';

const gcs = new Storage.Storage();
const RENDITION_PREFIX = "rendition"

exports = module.exports = functions.storage.object().onFinalize(async (object:functions.storage.ObjectMetadata) => {
    if (!validateVideo(object)) {
        return false
    }

    const filePath = object.name ? object.name : ""
    const fileName = basename(filePath)
    const workingDir = join(tmpdir(), 'renditions')
    const tmpFilePath = join(workingDir, fileName)
    const bucketDir = dirname(filePath);
    console.log(`Video Rendition function started for ${filePath}`)

    // 1. Ensure thumbnail dir exists
    await fs.ensureDir(workingDir).catch((error) => {
        console.log('Working directory ' + workingDir + ' unavilable', error)
        return false
    })

    // 2. Download Source File
    const bucket = gcs.bucket(object.bucket)
    await bucket.file(filePath).download({
        destination: tmpFilePath
    }).catch((reason: any) => {
        console.log("Error saving file ", tmpFilePath, reason)
    })

    // 3. Kick off async method to save renditions
    return videos.createRenditions(tmpFilePath).then(async (renditions: string[]) => {
        for (const file of renditions) {
            await uploadRendition(bucket, bucketDir, workingDir, file)
        }
    })
})

async function uploadRendition(bucket: Storage.Bucket, bucketDir: string, workingDir: string, file: string) {
    const fileWIthPath = join(workingDir, file);
    await bucket.upload(fileWIthPath, {
        destination: join(bucketDir, file)
    });
    console.log("Rendition uploaded: ", file);
}

// TODO: Unit tese this function
function validateVideo(object: functions.storage.ObjectMetadata) {
    if (!object) {
        console.log('No video object found')
        return false
    }
    const contentType = object.contentType
    const filePath = object.name

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

    if (fileName.includes(RENDITION_PREFIX)) {
        console.log('Already a rendition', fileName)
        return false;
    }
    return true;
}
