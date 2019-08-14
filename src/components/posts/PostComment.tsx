import React from 'react';
import { Typography, Container, Paper } from '@material-ui/core';
import { IComment } from '../../classes/Comment';
import { formatDistance, format, formatRelative } from 'date-fns';
import './PostComment.css'

class PostComment extends React.Component {

    public props: IComment

    constructor(props: IComment) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Paper className="postcomment">
                <Typography variant="h5" component="h3">
                    {this.props.author} - {formatRelative(this.props.posted.toDate(), new Date())}
                </Typography>
                <Typography component="p">
                    {this.props.comment}
                </Typography>
            </Paper>
        );
    }
}
export default PostComment;