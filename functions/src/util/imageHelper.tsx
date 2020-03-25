
import * as Storage from '@google-cloud/storage'
import { basename, join, dirname } from 'path'
import * as sharp from 'sharp'

const gcs = new Storage.Storage();
const THUMB_PREFIX = "thumb_";

export class imageHelper {

    static createImageRenditions(filePath:string, contentType:string|undefined, bucketname:string):Promise<void[]>{
        const fileName = basename(filePath)
        const resizes = [
            { size: 200, fit: sharp.fit.cover },
            { size: 600, fit: sharp.fit.inside },
            { size: 1200, fit: sharp.fit.inside },
            { size: 1600, fit: sharp.fit.inside }
        ]
        const metadata = { contentType: contentType };
        const promises: Promise<void>[] = []
    
        for (const resize of resizes) {
            // We add a 'thumb_' prefix to thumbnails file name.
            const thumbFileName = `${THUMB_PREFIX}${resize.size}_${fileName}`
            const thumbFilePath = join(dirname(filePath), thumbFileName)
            console.debug('Creating thumbnail: ', thumbFileName)
    
            // Create write stream for uploading thumbnail
            const bucket = gcs.bucket(bucketname)
            const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({ metadata })
    
            // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
            // rotate() is needed here, it will read the EXIF orientation info and make the thumbnails match
            const pipeline = sharp().rotate()
            pipeline.resize(resize.size, resize.size, { fit: resize.fit }).pipe(thumbnailUploadStream)
            bucket.file(filePath).createReadStream().pipe(pipeline).on('end', () => {
                console.log('Created thumbnail: ', thumbFileName)
            })
            promises.push(
                new Promise((resolve, reject) =>
                    thumbnailUploadStream.on('finish', resolve).on('error', reject)))
        }    
        return Promise.all(promises)
    }
    
    static validateImage(filePath:string|undefined, contentType:string|undefined): boolean {
    
        if (!filePath || !contentType) {
            console.debug('No filepath or content type.')
            return false
        }
        if (!filePath.includes('postimages')) {
            console.debug('Skipping file as it is not an image: ', filePath)
            return false;
        }
        const fileName = basename(filePath)
        if (!contentType.startsWith('image/')) {
            console.debug('Not an image: ', contentType)
            return false;
        }
        if (fileName.includes(THUMB_PREFIX)) {
            console.debug('Already a thumbnail', fileName)
            return false;
        }
        return true
    }
}