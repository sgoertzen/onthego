// ****************************************************************************
//  Update Location Distances
//
//  Description: Calculates and sets the "distance" propery on a location in
//   the database.  The distance in miles is computed between the location and
//   the previous location.
//     
//  Trigger: Any change to a location in the database
//     
// ****************************************************************************

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { haversine } from '../util/haversine'
import { ITravelLocation } from '../../../src/classes/TravelLocation'
import { GeoPoint } from '@google-cloud/firestore'
import { ArrayHelper } from '../../../src/util/ArrayHelper'

const db = admin.firestore();

exports = module.exports = functions.firestore.document('locations/{locationid}').onWrite((change, context) => {
    // Exit immediately if this wasn't a create event or lat long wasn't changed 
    if (change.before.exists &&
        change.after.exists) {
        const before = change.before.data() as ITravelLocation
        const after = change.after.data() as ITravelLocation
        if (ArrayHelper.equals(before.coordinates, after.coordinates)) {
            // Matching lat long, exit early
            console.debug("Exiting as lat and long match")
            return null;
        }
    }
    console.debug("Updating distance for ", context.params.locationid)

    // Fetch all the locations, ordering by arrival date
    return db.collection("locations").orderBy("arrive").get().then(async (querySnapshot) => {
        const locations: ITravelLocation[] = [];
        querySnapshot.forEach((doc) => {
            const loc = doc.data() as ITravelLocation
            loc.id = doc.id
            locations.push(loc)
        })

        // Loop over all locations and calculate the distance, 
        // only update the database if the distance value is different
        let previous: ITravelLocation | null = null;
        const promises = []
        for (const current of locations) {
            if (previous !== null) { // No distance on the first location
                const dist = sumDistance(previous.coordinates, current.coordinates)
                if (dist !== current.distance) {
                    console.debug(`Setting distance of ${dist} on ${current.id}.  Previous distance was ${previous.distance}`)
                    promises.push(setDistance(current, dist))
                }
            }
            previous = current
        }
        await Promise.all(promises)
    })
})

export function sumDistance(c1:GeoPoint[], c2:GeoPoint[]):number{
    // Ensure we have at least one point each
    if (c1.length === 0 || c2.length === 0) {
        return 0
    }

    // Only take the first point of the second location
    c1.push(c2[0])

    let total = 0
    let previous: GeoPoint | null = null
    for (let current of c1) {
        if (previous !== null) {
            total += haversine.distanceMiles(previous, current)
        }
        previous = current
    }
    
    return total
}

async function setDistance(location: ITravelLocation, distance: number): Promise<void | FirebaseFirestore.WriteResult> {
    return db.doc(`locations/${location.id}`).update({
        distance: distance
    }).catch((reason) => {
        console.log(`Unable to update the comment count: ${reason}`)
    })
}
