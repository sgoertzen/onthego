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
import { Media, ImageSize, MediaType } from '../../../src/classes/Media'
import { IPost } from '../../../src/classes/Post'

const db = admin.firestore()
const COUNT_OF_POSTS_IN_FEED = 20

exports = module.exports = functions.firestore.document('posts/{postid}').onWrite((change, context) => {
    // Feed details
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

    // Fetch the most recent posts and add them to the feed
    return db.collection("posts").orderBy("posted", "desc").limit(COUNT_OF_POSTS_IN_FEED).get().then(async (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const post = doc.data() as IPost
            post.id = doc.id
            feed.addItem({
                title: post.title,
                id: post.id,
                link: `https://www.goertzensonthego.com/post/${post.id}`,
                content: buildContent(post),
                author: [{ name: post.author }],
                date: post.posted.toDate()
            });
        })

        feed.addCategory("Travel")
        feed.addCategory("Explore")

        // Create write stream for uploading rss file
        const gcs = new Storage.Storage()
        const bucket = gcs.bucket("goertzensonthego.appspot.com")
        const file = bucket.file("feed.rss")
        const stream = file.createWriteStream()

        stream.write(feed.rss2())
        stream.end()
    }).catch((reason) => {
        console.log("Error on database promise:  " + reason)
    })
})

// Combines the post text along with images
function buildContent(post: IPost): string {
    let content = post.details
    for (const media of post.media) {
        if (media.filetype === MediaType.Image) {
            content += `<img src="${Media.imageThumbnail(media, ImageSize.Size_1600)}"/>`
        }
    }
    return content
}
