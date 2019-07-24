import React from 'react';
import { Typography } from '@material-ui/core';

interface postCommentProps {
}

class PostComments extends React.Component {

    public props: postCommentProps

    constructor(props: postCommentProps) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className="statsPanel">
                <Typography>
                    Comments coming soon.
                </Typography>
            </div>
        );
    }
}
export default PostComments;