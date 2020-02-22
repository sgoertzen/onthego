import * as functions from 'firebase-functions'

import { basename, join, dirname } from 'path'
import * as Storage from '@google-cloud/storage'
import * as fs from 'fs-extra';
import { tmpdir } from 'os'
import { videoHelper } from './videoHelper';


export class renditionManager {
    static async createRenditions(object: functions.storage.ObjectMetadata) {
        if (!renditionManager.validateVideo(object)) {
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
        const gcs = new Storage.Storage();
        const bucket = gcs.bucket(object.bucket)
        await bucket.file(filePath).download({
            destination: tmpFilePath
        }).catch((reason: any) => {
            console.log("Error saving file ", tmpFilePath, reason)
        })

        // 3. Kick off async method to save renditions
        return videoHelper.createRenditions(tmpFilePath).then(async (renditions: string[]) => {
            for (const file of renditions) {
                await renditionManager.uploadRendition(bucket, bucketDir, workingDir, file)
            }
        })
    }

    static async uploadRendition(bucket: Storage.Bucket, bucketDir: string, workingDir: string, file: string) {
        const fileWIthPath = join(workingDir, file);
        await bucket.upload(fileWIthPath, {
            destination: join(bucketDir, file)
        });
        console.debug("Rendition uploaded: ", file);
    }

    static validateVideo(object: functions.storage.ObjectMetadata) {
        const contentType = object.contentType
        const filePath = object.name

        if (!filePath || !contentType) {
            console.debug('No filepath or content type.')
            return false
        }
        if (!filePath.includes('postvideos')) {
            console.debug('Skipping file as it is not a video: ', filePath)
            return false;
        }
        if (!contentType.startsWith('video/')) {
            console.debug('Not a video: ', contentType)
            return false;
        }

        const fileName = basename(filePath)

        if (fileName.includes(videoHelper.RENDITION_PREFIX)) {
            console.debug('Already a rendition', fileName)
            return false;
        }
        return true;
    }
}