import React from 'react';
import { IPost } from '../../classes/Post';
import PostMenu from './PostMenu';
import PostHeader from './PostHeader';
import PostMedia from './PostMedia';
import * as firebase from "firebase/app";
import "firebase/firestore";
import { IHistoryProps } from '../../classes/IHistoryProps';
import { IComment } from '../../classes/Comment';
import PostComments from './PostComments';
import { ITravelLocation } from '../../classes/TravelLocation';

interface postDetailsProps {
    post?: IPost
    match?: {
        params?: {
            postid?: string
        }
    }
    history?: IHistoryProps
    username?: string
}
interface postDeatilsState {
    post?: IPost
    comments: IComment[]
    loading: boolean
    locationname?: string
}

class PostPage extends React.Component {

    public props: postDetailsProps
    public state: postDeatilsState

    constructor(props: postDetailsProps) {
        super(props);
        this.props = props;
        this.loadPost = this.loadPost.bind(this)
        this.postLoaded = this.postLoaded.bind(this)
        this.commentsChanged = this.commentsChanged.bind(this)
        this.loadLocation = this.loadLocation.bind(this)
        this.locationLoaded = this.locationLoaded.bind(this)

        let needToLoad = (!this.props.post && this.props.match && this.props.match.params && this.props.match.params.postid) as boolean;
        this.state = { post: this.props.post, loading: needToLoad, comments: [] }

        if (!this.props.post && this.props.match && this.props.match.params && this.props.match.params.postid) {
            this.loadPost(this.props.match.params.postid)
            this.fetchComments(this.props.match.params.postid)
        } else {
            console.log("No post id provided")
        }
    }

    loadPost(postID: string): void {
        firebase.firestore().collection("posts").doc(postID).get().then(this.postLoaded)
    }

    postLoaded(docSnapshot: firebase.firestore.DocumentSnapshot): void {
        let post = docSnapshot.data() as IPost
        post.id = docSnapshot.id

        this.setState({
            post: post,
            loading: false
        })
        this.loadLocation(post.locationid)
    }
    loadLocation(locationID: string): void {
        firebase.firestore().collection("locations").doc(locationID).get().then(this.locationLoaded)
    }
    locationLoaded(docSnapshot: firebase.firestore.DocumentSnapshot) {
        let location = docSnapshot.data() as ITravelLocation
        this.setState({
            locationname: location.name
        })
    }

    fetchComments(postID: string): void {
        var db = firebase.firestore();
        var postsRef = db.collection("comments")
        postsRef.where("postid", "==", postID).orderBy("posted").get().then((querySnapshot) => {
            let comments: IComment[] = [];
            querySnapshot.forEach(function(doc) {
                let comment: IComment = doc.data() as IComment
                comment.commentid = doc.id
                comments.push(comment)
            });
            this.setState({
                comments: comments
            })
        })
    }

    commentsChanged() {
        if (this.state.post) {
            this.fetchComments(this.state.post.id)
        } else {
            console.log("Warning: Comment change event occured but no post found.")
        }
    }

    getPostDate(post: IPost): Date {
        if (post.posted) {
            return post.posted.toDate()
        }
        return new Date();
    }

    render() {
        if (this.state.loading) {
            return <div>Loading</div>
        }
        if (!this.state.post) {
            return <div>No post found</div>
        }
        let post = this.state.post
        return (
            <div>
                <PostMenu history={this.props.history} locationname={this.state.locationname} />
                <PostHeader title={post.title} author={post.author} date={post.posted.toDate()} details={post.details} />
                <PostMedia items={post.media} />
                <PostComments comments={this.state.comments} username={this.props.username} postid={post.id} onChange={this.commentsChanged} />
            </div>
        );
    }
}
export default PostPage;