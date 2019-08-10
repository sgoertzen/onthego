import React from 'react';
import { Typography } from '@material-ui/core';
import { IComment } from '../../classes/Comment';
import { formatDistance } from 'date-fns';

class PostComment extends React.Component {

    public props: IComment

    constructor(props: IComment) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div>
                <Typography>
                    {this.props.author} said "{this.props.comment}" on {formatDistance(this.props.posted.toDate(), new Date())}
                </Typography>
            </div>
        );
    }
}
export default PostComment;