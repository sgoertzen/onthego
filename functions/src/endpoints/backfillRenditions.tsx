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
import { videoHelper } from '../util/videoHelper';

const gcs = new Storage.Storage()
const VIDEO_FOLDER = 'postvideos'

// Todo: This is kicked off manually for initial run, switch to schedule after 
// exports = module.exports = functions.pubsub.schedule('every 24 hours').onRun((context) => {
exports = module.exports = functions.https.onRequest((req, res) => {
    console.log('Listing videos needing renditions');

    // get list of videos
    gcs.getBuckets().then((value: Storage.GetBucketsResponse) => {
        const filenames: string[] = []
        const buckets = value[0]
        for (const b of buckets) {
            if (b.name === 'goertzensonthego.appspot.com') {
                b.getFiles({ directory: VIDEO_FOLDER }).then((gfr: Storage.GetFilesResponse) => {
                    const files = gfr[0]
                    for (const f of files) {
                        filenames.push(f.name)
                    }
                    const filesNeedingRenditions =
                        videoHelper.findFilesNeedingRenditions(filenames)
                    res.json({ "filesNeedingRenditions": filesNeedingRenditions })
                    res.end()
                }).catch((msg) => {
                    console.error(`Unable to list files: ${msg}`)
                    res.write(msg)
                    res.end()
                })
            }
        }
    }).catch((msg) => {
        console.error(`Unable to list buckets: ${msg}`)
        res.write(msg)
        res.end()
    })
})