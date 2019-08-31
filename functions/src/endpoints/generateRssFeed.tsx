// ****************************************************************************
//  Generate RSS Feed
//
//  Description: Generates an updated RSS feed whenever a post is added
//     
//  Trigger: Any change to a post in the database
//     
// ****************************************************************************
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as Storage from '@google-cloud/storage'
import { Feed } from 'feed'
import { Media, ImageSize } from '../../../src/classes/Media'
import { IPost } from '../../../src/classes/Post'

const db = admin.firestore();

exports = module.exports = functions.firestore.document('posts/{postid}').onWrite((change, context) => {
    const feed = new Feed({
        title: "Goertzens on the Go",
        description: "Lists of posts from our trip around the world",
        id: "https://www.goertzensonthego.com",
        link: "https://www.goertzensonthego.com",
        language: "en",
        favicon: "https://www.goertzensonthego.com/favicon.ico",
        copyright: "All rights reserved 2019, Goertzen Family",
        generator: "Goertzens on the Go feed",
    })

    return db.collection("posts").orderBy("posted", "desc").limit(20).get().then(async (querySnapshot) => {
        // Now update the post with the number of comments
        querySnapshot.forEach((doc) => {
            const post = doc.data() as IPost
            post.id = doc.id
            feed.addItem({
                title: post.title,
                id: post.id,
                link: `https://www.goertzensonthego.com/post/${post.id}`,
                content: post.details,
                author: [{ name: post.author }],
                date: post.posted.toDate(),
                image: post.media.length > 0 ? Media.imageThumbnail(post.media[0], ImageSize.Size_1600) : undefined
            });
        })

        feed.addCategory("Travel")
        feed.addCategory("Explore")

        // Create write stream for uploading thumbnail
        const gcs = new Storage.Storage()
        const bucket = gcs.bucket("goertzensonthego.appspot.com")
        const file = bucket.file("feed.rss")
        const stream = file.createWriteStream()

        stream.write(feed.rss2())
        stream.end()

        // TODO: MAKE PUBLIC
        // https://cloud.google.com/nodejs/docs/reference/storage/2.5.x/File#makePublic
    }).catch((reason) => {
        console.log("Error on database promise:  " + reason)
    })

});
