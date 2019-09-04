import React from 'react';
import { IComment } from '../../classes/Comment';
import PostComment from './PostComment';
import { Button, Divider } from '@material-ui/core';
import CommentDialog, { ICommentSavedCallback } from './CommentDialog';
import './PostComments.css'

interface IPostCommentsProps {
    comments: IComment[]
    username?: string
    postid: string
    onChange: ICommentSavedCallback
}
interface IPostCommentsState {
    comments: IComment[]
    open: boolean
}

class PostComments extends React.Component<IPostCommentsProps> {

    public props: IPostCommentsProps
    public state: IPostCommentsState

    constructor(props: IPostCommentsProps) {
        super(props);
        this.props = props;
        this.state = { ...props, open: false }
        this.addComment = this.addComment.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    addComment() {
        this.setState({ open: true })
    }
    handleClose() {
        this.setState({ open: false })
        this.props.onChange()
    }

    render() {
        let comments = []
        if (this.props.comments.length === 0) {
            comments.push(<div className="no-posts" key="no-comments">No comments</div>)
        } else {
            comments.push(<Divider key="comment-divider" />)
            comments = this.props.comments.map(comment => {
                return (
                    <PostComment {...comment} key={comment.commentid} />
                );
            });
        }
        return (
            <div className="postcomments" key="postcomments">
                <Button variant="contained" onClick={this.addComment} className="AddCommentButton">Add Comment</Button>
                <CommentDialog open={this.state.open} onClose={this.handleClose} username={this.props.username} postid={this.props.postid} />
                {comments}
            </div>
        )
    }
}
export default PostComments;