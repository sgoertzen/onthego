import { basename, join, dirname } from 'path'
import * as Storage from '@google-cloud/storage'
import * as fs from 'fs-extra';
import { tmpdir } from 'os'
import { videoHelper } from './videoHelper';
import { Rendition } from '../classes/Rendition';

export class renditionManager {
    // static async createRenditions(object: functions.storage.ObjectMetadata) {
    static async createRenditions(filepath: string, bucketname: string, contentType: string | undefined): Promise<string[] | void> {
        if (!renditionManager.validateVideo(filepath, contentType)) {
            return []
        }

        const fileName = basename(filepath)
        const workingDir = join(tmpdir(), 'renditions')
        const tmpFilePath = join(workingDir, fileName)
        const directory = dirname(filepath)

        // 1. Ensure thumbnail dir exists
        await fs.ensureDir(workingDir).catch((error) => {
            console.error('Working directory ' + workingDir + ' unavilable', error)
            return false
        })

        // 2. Download Source File
        const gcs = new Storage.Storage();
        const bucket = gcs.bucket(bucketname)
        await bucket.file(filepath).download({
            destination: tmpFilePath
        }).catch((reason: any) => {
            console.error("Error saving file ", tmpFilePath, reason)
        })

        // 3. Kick off async method to save renditions
        return new Promise<string[]>(async (resolve) => {

            const file240 = await videoHelper.createRendition(tmpFilePath, Rendition.R240p)
            await renditionManager.uploadRendition(bucket, directory, workingDir, file240)

            const file360 = await videoHelper.createRendition(tmpFilePath, Rendition.R360p)
            await renditionManager.uploadRendition(bucket, directory, workingDir, file360)

            const file480 = await videoHelper.createRendition(tmpFilePath, Rendition.R480p)
            await renditionManager.uploadRendition(bucket, directory, workingDir, file480)

            const file720 = await videoHelper.createRendition(tmpFilePath, Rendition.R720p)
            await renditionManager.uploadRendition(bucket, directory, workingDir, file720)

            resolve([file240, file360, file480, file720])
        })
    }

    static async uploadRendition(bucket: Storage.Bucket, bucketDir: string, workingDir: string, file: string) {
        console.debug(`Rendition uploading ${file}`)
        const fileWIthPath = join(workingDir, file)
        await bucket.upload(fileWIthPath, {
            destination: join(bucketDir, file),
            resumable: false
        });
        console.debug("Rendition uploaded: ", file);
    }

    static validateVideo(filepath: string, contentType: string | undefined) {
        if (!filepath || !contentType) {
            console.debug('No filepath or content type.')
            return false
        }
        if (!filepath.includes('postvideos')) {
            console.debug('Skipping file as it is not a video: ', filepath)
            return false;
        }
        if (!contentType.startsWith('video/')) {
            console.debug('Not a video: ', contentType)
            return false;
        }

        const fileName = basename(filepath)

        if (fileName.includes(videoHelper.RENDITION_PREFIX)) {
            console.debug('Already a rendition', fileName)
            return false;
        }
        return true;
    }
}