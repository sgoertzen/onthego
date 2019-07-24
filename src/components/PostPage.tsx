import React from 'react';
import './PostTile.css';
import { IPost } from '../classes/Post';
import PostHeader from './PostHeader';
import PostMedia, { IGalleryItem, MediaType } from './PostMedia';
import PostComments from './PostComments';
import { MediaHelper } from '../util/MediaHelper'

import * as firebase from "firebase/app";
import "firebase/firestore";

interface postDetailsProps {
    post?: IPost
    match?: {
        params?: {
            postid?: string
        }
    }
}
interface postDeatilsState {
    post?: IPost
    loading: boolean
}

class PostPage extends React.Component {

    public props: postDetailsProps
    public state: postDeatilsState

    constructor(props: postDetailsProps) {
        super(props);
        this.props = props;
        this.state = { post: undefined, loading: true }
        this.fetchPost = this.fetchPost.bind(this)
        this.postLoaded = this.postLoaded.bind(this)

        if (this.props.match && this.props.match.params && this.props.match.params.postid) {
            this.fetchPost(this.props.match.params.postid)
        } else {
            console.log("No post id provided")
        }
    }

    fetchPost(postID: string): void {
        console.log("Fetching post for ", postID)
        firebase.firestore().collection("posts").doc(postID).get().then(this.postLoaded)
    }

    postLoaded(docSnapshot: firebase.firestore.DocumentSnapshot): void {
        console.log("post fetched")
        let post = docSnapshot.data() as IPost
        post.id = docSnapshot.id

        this.setState({
            post: post,
            loading: false
        })
    }

    getPostDate(post: IPost): Date {
        if (post.posted) {
            return post.posted
        }
        return new Date();
    }

    buildMediaItems(post: IPost): IGalleryItem[] {
        let galleryItems: IGalleryItem[] = []
        if (post.media) {
            for (let media of post.media) {
                galleryItems.push(
                    {
                        url: media.url,
                        thumbnail: media.url,
                        type: MediaHelper.isImage(media.filename) ? MediaType.Image : MediaType.Video

                    }
                )
            }
        }
        return galleryItems
    }

    render() {
        console.log(this.state)
        if (this.state.loading) {
            return <div>Loading</div>
        }
        if (!this.state.post) {
            return <div>No post found</div>
        }
        let post = this.state.post
        return (
            <div>
                <PostHeader title={post.title} author={post.author} date={post.posted} details={post.details} />
                <PostMedia items={this.buildMediaItems(post)} />
                <PostComments />
            </div>
        );
    }
}
export default PostPage;