// ****************************************************************************
//  Process Panorama
//
//  Description: Adds the lat/long and filename from a panorama to our database 
//     
//  Trigger: Any file uploaded to panoramas/
//     
// ****************************************************************************
import * as functions from 'firebase-functions'

import * as Storage from '@google-cloud/storage'
import * as admin from 'firebase-admin'
import * as firebase from 'firebase/app'

const gcs = new Storage.Storage();

const db = admin.firestore();

exports = module.exports = functions.storage.object().onFinalize(async (object) => {
    if (!validateIsPanorama(object)) {
        return false
    }
    const filePath = object.name ? object.name : ""

    const bucket = gcs.bucket(object.bucket)
    bucket.file(filePath).getMetadata().then(data => {
        const metadata = data[0]
        if (metadata && metadata.lat && metadata.long) {
            console.log(`Found coords of ${metadata.lat}, ${metadata.long} `)
        }
        // Write all of this to the database
        db.collection("panoramas").add({
            filename: filePath,
            coords: new firebase.firestore.GeoPoint(metadata.lat, metadata.long)
        }).then(() => {
            console.debug(`Saved panorama to the database successfully`)
        }).catch(reason => {
            console.log(`Error saving panorama to the database: ${reason}`)
        })
    }).catch((reason) => {
        console.log("Error fetching metadata for panorama:  " + reason)
    })

    const promises: Promise<void>[] = []
    return Promise.all(promises)
})

function validateIsPanorama(object: any): boolean {

    const filePath = object.name
    const contentType = object.contentType
    if (!filePath || !contentType) {
        console.log('No filepath or content type.')
        return false
    }
    if (!filePath.includes('panorama')) {
        console.log('Skipping file as it is not a panorama: ', filePath)
        return false
    }
    if (!contentType.startsWith('image/')) {
        console.log('Not an image: ', contentType)
        return false
    }
    return true
}
