import React from 'react'
import { IPost } from '../../classes/Post'
import PostMenu from './PostMenu'
import PostHeader from './PostHeader'
import PostMedia from './PostMedia'
import "firebase/firestore"
import { IHistoryProps } from '../../classes/IHistoryProps'
import { IComment } from '../../classes/Comment'
import PostComments from './PostComments'
import { FirestoreHelper } from '../../util/FirestoreHelper'

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
    public _mounted: boolean

    constructor(props: postDetailsProps) {
        super(props);
        this.props = props;
        this.commentsChanged = this.commentsChanged.bind(this)
        this.loadPost = this.loadPost.bind(this)
        this._mounted = false

        const needToLoad = (!this.props.post && this.props.match && this.props.match.params && this.props.match.params.postid) as boolean;
        this.state = { post: this.props.post, loading: needToLoad, comments: [] }

        if (!this.props.post && this.props.match && this.props.match.params && this.props.match.params.postid) {
            this.loadPost(this.props.match.params.postid)
        } else {
            console.log("No post id provided")
        }
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    loadPost(postid: string) {
        if (this._mounted) {
            this.setState({
                loading: true,
                post: undefined,
                locationname: undefined,
                comments: []
            })
        }
        FirestoreHelper.loadPost(postid, (post) => {
            this.setState({
                post: post,
                loading: false
            })
            FirestoreHelper.loadLocation(post.locationid, (loc) => {
                this.setState({ locationname: loc.name })
            })
        })
        FirestoreHelper.loadComments(postid, (comments) => {
            this.setState({ comments: comments })
        })
    }

    commentsChanged() {
        if (this.state.post) {
            FirestoreHelper.loadComments(this.state.post.id, (comments) => {
                this.setState({ comments: comments })
            })
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

    componentDidUpdate(prevProps: postDetailsProps, prevState: postDeatilsState) {
        if (this.props.match && this.props.match.params && this.state.post && this.props.match.params.postid && this.props.match.params.postid !== this.state.post.id) {
            this.loadPost(this.props.match.params.postid)
        }
    }

    render() {
        if (this.state.loading) {
            return <div>Loading</div>
        }
        if (!this.state.post) {
            return <div>No post found</div>
        }
        const post = this.state.post
        return (
            <>
                <PostMenu history={this.props.history} locationname={this.state.locationname} />
                <PostHeader title={post.title} author={post.author} date={post.posted.toDate()} details={post.details} />
                <PostMedia items={post.media} />
                <PostComments comments={this.state.comments} username={this.props.username} postid={post.id} onChange={this.commentsChanged} />
            </>
        );
    }
}
export default PostPage;