import { ITravelLocation } from "../classes/TravelLocation";
import * as firebase from "firebase/app";
import { IPost } from "../classes/Post";
import { IComment } from "../classes/Comment";

export interface LocationsLoaded {
    (location: ITravelLocation[]): void
}

export interface LocationLoaded {
    (location: ITravelLocation): void
}

export interface PostsLoaded {
    (posts: IPost[]): void
}

export interface PostLoaded {
    (post: IPost): void
}
export interface CommentsLoaded {
    (comments: IComment[]): void
}

export class FirestoreHelper {
    static loadLocations(callback: LocationsLoaded): void {
        firebase.firestore().collection("locations").orderBy("arrive").get().then((snapshot) => {
            const locations: ITravelLocation[] = [];
            snapshot.forEach((doc) => {
                let loc = doc.data() as ITravelLocation
                loc.id = doc.id
                locations.push(loc)
            })
            callback(locations)

        })
    }

    static loadLocation(locationid: string, callback: LocationLoaded): void {
        firebase.firestore().collection("locations").doc(locationid).get().then((snapshot) => {
            let location = snapshot.data() as ITravelLocation
            location.id = snapshot.id
            callback(location)

        })
    }

    static loadPosts(locationid: string, callback: PostsLoaded): void {
        firebase.firestore().collection("posts").where("locationid", "==", locationid).orderBy("posted").get().then((snapshot) => {
            const posts: IPost[] = [];
            snapshot.forEach((doc) => {
                let loc = doc.data() as IPost
                loc.id = doc.id
                posts.push(loc)
            })
            callback(posts)
        })
    }

    static loadPost(postid: string, callback: PostLoaded): void {
        firebase.firestore().collection("posts").doc(postid).get().then((snapshot) => {
            let post = snapshot.data() as IPost
            post.id = snapshot.id
            callback(post)
        })
    }

    static loadComments(postid: string, callback: CommentsLoaded) {
        firebase.firestore().collection("comments").where("postid", "==", postid).orderBy("posted").get().then((snapshot) => {
            let comments: IComment[] = [];
            snapshot.forEach(function(doc) {
                let comment: IComment = doc.data() as IComment
                comment.commentid = doc.id
                comments.push(comment)
            })
            callback(comments)
        })

    }
}
