import * as functions from 'firebase-functions'

import { basename, join, dirname } from 'path'
import * as Storage from '@google-cloud/storage'
import * as sharp from 'sharp'

const gcs = new Storage.Storage();
const THUMB_PREFIX = "thumb_";

function validateImage(object:any):boolean {
    
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
    return true
}

exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => {
    if (!validateImage(object)) {
        return false
    }
    const filePath = object.name ? object.name : ""
    const contentType = object.contentType
    const fileName = basename(filePath)
    // const workingDir = join(tmpdir(), 'thumbs')
    //const tmpFilePath = join(workingDir, fileName)


    // ********************* Copy of previous working code *********************
    
    // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
    // const thumbFileName = `${THUMB_PREFIX}${fileName}`;
    // const thumbFilePath = join(dirname(filePath), thumbFileName);
    // // Create write stream for uploading thumbnail
    // const bucket = gcs.bucket(object.bucket)
    // const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({metadata});

    // // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
    // const pipeline = sharp();
    // await pipeline.resize(200, 200,{fit: sharp.fit.inside}).pipe(thumbnailUploadStream);
    // await bucket.file(filePath).createReadStream().pipe(pipeline);

    // console.log('Creating thumbnail: ', thumbFileName)

    // return new Promise((resolve, reject) =>
    //     thumbnailUploadStream.on('finish', resolve).on('error', reject));

    // ********************* Start of code to copy it locally *********************
    // 1. Ensure thumbnail dir exists
    // await fs.ensureDir(workingDir).catch((error) => {
    //     console.log('1. Working directory ' + workingDir + ' unavilable', error)
    //     return false
    // })

    // 2. Download Source File
    // const bucket = gcs.bucket(object.bucket)
    // await bucket.file(filePath).download({
    //     destination: tmpFilePath
    // }).catch((reason: any) => {
    //     console.log("Error saving file ", tmpFilePath, reason)
    // })


    // *********************  Older code that has error *********************
    // // Create the temp directory where the storage file will be downloaded.
    // await mkdirp(tempLocalDir)
    // // Download file from bucket.
    // await file.download({destination: tempLocalFile});
    // console.log('The file has been downloaded to', tempLocalFile);

    // Generate a thumbnail using ImageMagick.
    // await spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile], {capture: ['stdout', 'stderr']});
    // console.log('Thumbnail created at', tempLocalThumbFile);
    // // Uploading the Thumbnail.
    // await bucket.upload(tempLocalThumbFile, {destination: thumbFilePath, metadata: metadata});
    // console.log('Thumbnail uploaded to Storage at', thumbFilePath);
    // // Once the image has been uploaded delete the local files to free up disk space.
    // fs.unlinkSync(tempLocalFile);
    // fs.unlinkSync(tempLocalThumbFile);
    // // Get the Signed URLs for the thumbnail and original image.
    // const config = {
    //     action: 'read',
    //     expires: '03-01-2500',
    // };
    // const results = await Promise.all([
    //     thumbFile.getSignedUrl(config),
    //     file.getSignedUrl(config),
    // ]);
    // console.log('Got Signed URLs.');
    // const thumbResult = results[0];
    // const originalResult = results[1];
    // const thumbFileUrl = thumbResult[0];
    // const fileUrl = originalResult[0];
    // // Add the URLs to the Database
    // await admin.database().ref('images').push({path: fileUrl, thumbnail: thumbFileUrl});
    // return console.log('Thumbnail URLs saved to database.');




    const resizes = [
        {size:200, fit: sharp.fit.cover},
        {size:1600, fit:sharp.fit.inside}
    ]
    const metadata = { contentType: contentType };
    const promises:Promise<void>[] = []

    console.log("Put in on Aug 10 at 11:47am")
    for (const resize of resizes) {
        // We add a 'thumb_' prefix to thumbnails file name.
        const thumbFileName = `${THUMB_PREFIX}${resize.size}_${fileName}`
        const thumbFilePath = join(dirname(filePath), thumbFileName)
        console.log('Creating thumbnail: ', thumbFileName)

        // Create write stream for uploading thumbnail
        const bucket = gcs.bucket(object.bucket)
        const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({ metadata })

        // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
        const pipeline = sharp()
        pipeline.resize(resize.size, resize.size, {fit: resize.fit}).pipe(thumbnailUploadStream)
        bucket.file(filePath).createReadStream().pipe(pipeline).on('end', () => {
            console.log('Created thumbnail: ', thumbFileName)
        })
        promises.push(
            new Promise((resolve, reject) =>
                thumbnailUploadStream.on('finish', resolve).on('error', reject)))
    }

    return Promise.all(promises)
})
