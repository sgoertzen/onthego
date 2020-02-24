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
import { videoHelper } from '../util/videoHelper'
import { renditionManager } from '../util/renditionManager'

const gcs = new Storage.Storage()
const VIDEO_FOLDER = 'postvideos'

exports = module.exports = functions.pubsub.schedule('every 10 minutes').onRun(async () => {
    return new Promise((resolve, reject) => {
    
        console.log('Starting backfill renditions');

        gcs.getBuckets().then(async value => {
            const filenames: string[] = []
            const buckets = value[0]
            for (const b of buckets) {
                    if (b.name === 'goertzensonthego.appspot.com') {
                    await b.getFiles({ directory: VIDEO_FOLDER }).then(async (gfr: Storage.GetFilesResponse) => {
                        const files = gfr[0]
                        for (const f of files) {
                            filenames.push(f.name)
                        }
                        const filesNeedingRenditions = videoHelper.findFilesNeedingRenditions(filenames)
                        if (filesNeedingRenditions.length > 0) {
                            console.debug(`${filesNeedingRenditions.length} files still need renditions`)
                            const file = `${VIDEO_FOLDER}/${filesNeedingRenditions[0]}`
                            console.debug(`Attempting to create renditions for ${file}`)
                            await renditionManager.createRenditions(file, b.name, 'video/')
                                .then((renditions) => {
                                    const rendString = renditions ? renditions.join(',') : ''
                                    resolve(`Created renditions for ${file}: ${rendString}`)
                                    
                                })
                                .catch((msg) => reject(`Unable to create renditions for ${file}.  ${msg}`))
                        } else {
                            resolve('No files found that need renditions')
                        }
                    }).catch((msg_1) => {
                        reject(`Unable to list files: ${msg_1}`)
                    })
                }
            }
        }).catch(msg_2 => { reject(`Unable to fetch bucket list ${msg_2}`)})
    })
})