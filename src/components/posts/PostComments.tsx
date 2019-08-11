import React from 'react';
import { IComment } from '../../classes/Comment';
import PostComment from './PostComment';
import { Button } from '@material-ui/core';
import CommentDialog from './CommentDialog';

interface postCommentsProps {
    comments: IComment[]
}
interface postCommentsState {
    comments: IComment[]
    open: boolean
}

class PostComments extends React.Component {

    public props: postCommentsProps
    public state: postCommentsState

    constructor(props: postCommentsProps) {
        super(props);
        this.props = props;
        this.state = {...props, open: false}
    }

    addComment() {
        this.setState({ open: true })
    }
    handleClose() {
        this.setState({ open: false })
    }

    render() {
        if (this.props.comments.length === 0) {
            return <div className="no-posts">No comments</div>
        }
        const comments = this.props.comments.map(comment => {
            return (
                // <Grid item key={post.title} xs={12} sm={6} md={4}>
                    <PostComment {...comment} />
                // </Grid>
            );
        });
        return ( 
            <div>
                <Button variant="contained" onClick={this.addComment}>Add Comment</Button>
                <CommentDialog open={this.state.open} onClose={this.handleClose} />
                <hr />
                {comments}
            </div>
        )
        /* <Container className="cardGrid" maxWidth="lg">
                <hr />
                <Grid container spacing={4}>
                </Grid>
            </Container> */
    }
}
export default PostComments;