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

interface postDetailsProps {
    post?: IPost
    match?: {
        params?: {
            postid?: string
        }
    }
    history?: IHistoryProps
}
interface postDeatilsState {
    post?: IPost
    comments: IComment[]
    loading: boolean
}

class PostPage extends React.Component {

    public props: postDetailsProps
    public state: postDeatilsState

    constructor(props: postDetailsProps) {
        super(props);
        this.props = props;
        this.fetchPost = this.fetchPost.bind(this)
        this.postLoaded = this.postLoaded.bind(this)

        let needToLoad = (!this.props.post && this.props.match && this.props.match.params && this.props.match.params.postid) as boolean;
        this.state = { post: this.props.post, loading: needToLoad, comments: [] }

        if (!this.props.post && this.props.match && this.props.match.params && this.props.match.params.postid) {
            this.fetchPost(this.props.match.params.postid)
            this.fetchComments(this.props.match.params.postid)
        } else {
            console.log("No post id provided")
        }
    }

    fetchPost(postID: string): void {
        firebase.firestore().collection("posts").doc(postID).get().then(this.postLoaded)
    }

    postLoaded(docSnapshot: firebase.firestore.DocumentSnapshot): void {
        let post = docSnapshot.data() as IPost
        post.id = docSnapshot.id

        this.setState({
            post: post,
            loading: false
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
                <PostMenu history={this.props.history} />
                <PostHeader title={post.title} author={post.author} date={post.posted.toDate()} details={post.details} />
                <PostMedia items={post.media} />
                <PostComments comments={this.state.comments} />
            </div>
        );
    }
}
export default PostPage;