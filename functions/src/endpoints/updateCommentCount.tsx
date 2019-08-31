// ****************************************************************************
//  Update Comment Count
//
//  Description: Calculates the number of comments for a post and sets that
//   value on post
//     
//  Trigger: Any change to a comment in the database
//     
// ****************************************************************************
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { IComment } from '../../../src/classes/Comment'

const db = admin.firestore();

exports = module.exports = functions.firestore.document('comments/{commentid}').onWrite((change, context) => {
    // Exit if this is not a create or delete event
    if (change.before.exists && change.after.exists) {
        console.debug("Exiting comment count as not an add or delete")
        return null;
    }

    const comment = change.before.exists ? change.before.data() : change.after.data() as IComment
    if (!comment) {
        console.log("No comment found in change")
        return
    }
    console.debug(`Will update count on post: ${comment.postid}`)

    // Fetch all the comments for this post
    return db.collection("comments").where("postid", "==", comment.postid).get().then(async (querySnapshot) => {
        // Now update the post with the number of comments
        await db.doc(`posts/${comment.postid}`).update({
            commentcount: querySnapshot.size
        }).catch((reason) => {
            console.error(`Unable to update the comment count: ${reason}`)
        })
    })
});
