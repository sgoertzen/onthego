import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
// import  '../../../service-account.json'
// import { app } from 'firebase-admin';


export interface IComment {
    author: string
    comment: string
    posted: ITimeStamp
    postid: string
    commentid: string
    edited: boolean
}

export interface ITimeStamp {
    toDate(): Date
    nanoseconds: number
}

admin.initializeApp();
const db = admin.firestore();

exports = module.exports = functions.firestore.document('comments/{commentid}').onWrite((change, context) => {
    console.log("In comment added cloud funtion")
    console.log('event type', context.eventType)

    // Exit if this is not a create or delete event
    if (change.before.exists && change.after.exists) {
        console.log("Exiting comment count as not an add or delete")
        return null;
    }

    const comment = change.before.exists ? change.before.data() : change.after.data() as IComment
    if (!comment) {
        console.log("No comment found in change")
        return
    }
    console.log(`Will update count on post: ${comment.postid}`)

    // Fetch all the comments for this post
    return db.collection("comments").where("postid", "==", comment.postid).get().then(async (querySnapshot) => {
        // Now update the post with the number of comments
        await db.doc(`posts/${comment.postid}`).update({
            commentcount: querySnapshot.size
        }).catch((reason) => {
            console.log(`Unable to update the comment count: ${reason}`)
        })
    })
});
