import * as functions from 'firebase-functions'
import { firestore } from "firebase";
import * as admin from 'firebase-admin'
import { haversine } from '../util/haversine'

export interface ITravelLocation {
    id: string
    name: string
    coords: firestore.GeoPoint
    arrive: ITimeStamp
    depart: ITimeStamp
}
export interface ITimeStamp {
    toDate(): Date
    nanoseconds: number
}

const db = admin.firestore();

exports = module.exports = functions.firestore.document('locations/{locationid}').onWrite((change, context) => {
    // TODO: Exit immediately if this wasn't a create event or lat long wasn't changed 
    const locationid = context.params.locationid
    console.log(`Updating location ${locationid}`)

    const location = (change.after.exists ? change.after.data() : change.before.data()) as ITravelLocation
    if (!location) {
        console.log("No location found in change")
        return
    }

    return db.collection("locations").orderBy("arrive").get().then(async (querySnapshot) => {
        let thisIndex = -1, index = 0
        
        const locations: ITravelLocation[] = [];
        querySnapshot.forEach((doc) => {
            const loc = doc.data() as ITravelLocation
            loc.id = doc.id
            locations.push(loc)
            if (loc.id === locationid) {
                thisIndex = index;
            }
            index++
        })
        if( thisIndex === -1 ) {
            console.error(`No matching location found.  Looking for ${locationid}`)
            return;
        }

        // Update the changed location 
        if (thisIndex > 0) {
            await setDistance(locations[thisIndex-1], locations[thisIndex])
        }
        // Update the following location
        if (thisIndex+1 < locations.length) {
            await setDistance(locations[thisIndex], locations[thisIndex+1])
        }
    });
});

async function setDistance(previousLoc: ITravelLocation, location: ITravelLocation):Promise<void | FirebaseFirestore.WriteResult> {
    const dist = haversine.distanceMiles(previousLoc.coords, location.coords)
    
    console.debug(`Setting distance of ${dist} on ${location.id}`)
    return db.doc(`locations/${location.id}`).update({
        distance: dist
    }).catch((reason) => {
        console.log(`Unable to update the comment count: ${reason}`)
    })
}
