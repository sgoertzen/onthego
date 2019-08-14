import * as functions from 'firebase-functions'
// import * as admin from 'firebase-admin'
// import  '../../../service-account.json'
import { firestore } from "firebase";
// import { app } from 'firebase-admin';

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

exports = module.exports = functions.firestore.document('locations/{locationid}').onWrite((change, context) => {
    // Exit if this is not a create or delete event
    if (change.before.exists && change.after.exists) {
        console.log("Exiting comment count as not an add or delete")
        return null;
    }
    console.log(`Updating location ${context.params.locationid}`)

    const location = change.before.exists ? change.before.data() : change.after.data() as ITravelLocation
    if (!location) {
        console.log("No comment found in change")
        return
    }
    console.log(`Loc name ${location.name}`)
    return null;//snapshot.ref.update({ distanceInMiles: 1000})
});
