// ****************************************************************************
//  Create missing videos renditions
//
//  Description: Finds all videos that don't have proper renditions.  Creates
//    renditions for the first video in the list.  
//     
//  Trigger: On a schedule
//     
// ****************************************************************************
import * as functions from 'firebase-functions'
import * as Storage from '@google-cloud/storage'
import { imageHelper } from '../util/imageHelper'

const gcs = new Storage.Storage()
const IMAGE_FOLDER = 'postimages'

exports = module.exports = functions.pubsub.schedule('every 5 minutes').onRun(async () => {
    return new Promise((resolve, reject) => {

        console.log('Starting backfill renditions');

        gcs.getBuckets().then(async value => {
            const filenames: string[] = []
            const buckets = value[0]
            for (const b of buckets) {
                if (b.name === 'goertzensonthego.appspot.com') {
                    await b.getFiles({ directory: IMAGE_FOLDER }).then(async (gfr: Storage.GetFilesResponse) => {
                        const files = gfr[0]
                        for (const f of files) {
                            filenames.push(f.name)
                        }
                        const neededRenditions = imageHelper.findMissingRenditions(filenames)
                        if (neededRenditions.length > 0) {
                            console.debug(`${neededRenditions.length} renditions still need`)
                            const neededRendition = neededRenditions[0]
                            const file = `${IMAGE_FOLDER}/${neededRendition.original}`
                            console.debug(`Attempting to create renditions for ${file}`)
                            imageHelper.createImageRenditions()
                            resolve(`Created rendition of ${neededRendition.rendition} for ${neededRendition.original}`)
                        } else {
                            resolve('No files found that need renditions')
                        }
                    }).catch((msg_1) => {
                        reject(`Unable to list files: ${msg_1}`)
                    })
                }
            }
        }).catch(msg_2 => { reject(`Unable to fetch bucket list ${msg_2}`) })
    })
})