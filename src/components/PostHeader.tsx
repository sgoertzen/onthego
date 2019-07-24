import React from 'react';
import { format } from 'date-fns';
import { Typography } from '@material-ui/core';

interface postHeaderProps {
    title: string
    author: string
    date: Date
    details: string
}

class PostHeader extends React.Component {

    public props: postHeaderProps

    constructor(props: postHeaderProps) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className="statsPanel">
                <Typography variant="h5" component="h5">
                    {this.props.title}
                </Typography>
                <Typography>
                    By {this.props.author} on {format(this.props.date, "MMM d yyyy hh:mm a")}
                </Typography>
                <Typography>
                    {this.props.details}
                </Typography>
            </div>
        );
    }
}
export default PostHeader;