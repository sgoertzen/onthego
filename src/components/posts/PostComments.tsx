import React from 'react';
import { IComment } from '../../classes/Comment';
import PostComment from './PostComment';

interface postCommentProps {
    comments: IComment[]
}

class PostComments extends React.Component {

    public props: postCommentProps

    constructor(props: postCommentProps) {
        super(props);
        this.props = props;
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