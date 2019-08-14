import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { IComment } from '../../classes/Comment';
import { formatRelative } from 'date-fns';
import './PostComment.css'
import { ParagraphHelper } from '../../util/ParagraphHelper';

class PostComment extends React.Component {

    public props: IComment

    constructor(props: IComment) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Paper className="postcomment" key={this.props.commentid + "paper"}>
                <Typography variant="h6" component="span">{this.props.author}</Typography>
                <Typography variant="subtitle2" component="span"> &nbsp;
                      {formatRelative(this.props.posted.toDate(), new Date())}
                </Typography>
                {ParagraphHelper.split(this.props.comment)}
            </Paper>
        );
    }
}
export default PostComment;