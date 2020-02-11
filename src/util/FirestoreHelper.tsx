import { ITravelLocation } from "../classes/TravelLocation"
import { IPost } from "../classes/Post"
import { IComment } from "../classes/Comment"
import * as firebase from 'firebase/app'
import { IPanorama } from "../classes/Panorama"

export enum ActivityType {
    Comment,
    Post
}

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

export interface RecentPostsLoaded {
    (posts: IPost[]): void
}

export interface PanoramasLoaded {
    (panoramas: IPanorama[]): void
}

export class FirestoreHelper {
    static loadLocations(callback: LocationsLoaded): void {
        firebase.firestore().collection("locations").orderBy("arrive").get().then((snapshot) => {
            const locations: ITravelLocation[] = [];
            snapshot.forEach((doc) => {
                const loc = doc.data() as ITravelLocation
                loc.id = doc.id
                locations.push(loc)
            })
            callback(locations)
        }).catch((reason) => { console.log("Unable to load locations", reason) })
    }

    static loadLocation(locationid: string, callback: LocationLoaded): void {
        firebase.firestore().collection("locations").doc(locationid).get().then((snapshot) => {
            const location = snapshot.data() as ITravelLocation
            location.id = snapshot.id
            callback(location)
        }).catch((reason) => { console.log("Unable to load location", reason) })
    }

    static loadPosts(locationid: string, callback: PostsLoaded): void {
        firebase.firestore().collection("posts").where("locationid", "==", locationid).orderBy("posted").get().then((snapshot) => {
            const posts: IPost[] = []
            snapshot.forEach((doc) => {
                const post = doc.data() as IPost
                post.id = doc.id
                posts.push(post)
            })
            callback(posts)
        }).catch((reason) => { console.log("Unable to load posts", reason) })
    }

    static loadPost(postid: string, callback: PostLoaded): void {
        firebase.firestore().collection("posts").doc(postid).get().then((snapshot) => {
            const post = snapshot.data() as IPost
            post.id = snapshot.id
            callback(post)
        }).catch((reason) => { console.log("Unable to load post", reason) })
    }

    static loadComments(postid: string, callback: CommentsLoaded) {
        firebase.firestore().collection("comments").where("postid", "==", postid).orderBy("posted").get().then((snapshot) => {
            const comments: IComment[] = []
            snapshot.forEach((doc) => {
                const comment: IComment = doc.data() as IComment
                comment.commentid = doc.id
                comments.push(comment)
            })
            callback(comments)
        }).catch((reason) => { console.log("Unable to load comments", reason) })
    }

    static loadRecentPosts(count: number, callback: RecentPostsLoaded) {
        const posts: IPost[] = []
        firebase.firestore().collection("posts").orderBy("posted", "desc").limit(count).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const post = doc.data() as IPost
                post.id = doc.id
                posts.push(post)
            })
            callback(posts)
        }).catch(reason => console.log("Unable to load posts", reason))
    }

    static loadPanoramas(callback: PanoramasLoaded) {
        const panoramas: IPanorama[] = []
        firebase.firestore().collection("panoramas").limit(1000).get().then(snapshot => {
            snapshot.forEach(doc => {
                const pano = doc.data() as IPanorama
                pano.id = doc.id
                panoramas.push(pano)
            })
            callback(panoramas)
        }).catch(reason => console.log("Unable to load posts", reason))
    }
}
