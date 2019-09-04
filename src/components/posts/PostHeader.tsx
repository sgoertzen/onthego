import React from 'react';
import { format } from 'date-fns';
import { Typography } from '@material-ui/core';
import './PostHeader.css'
import { ParagraphHelper } from '../../util/ParagraphHelper';

interface IPostHeaderProps {
    title: string
    author: string
    date: Date
    details: string
}

class PostHeader extends React.Component<IPostHeaderProps> {

    public props: IPostHeaderProps

    constructor(props: IPostHeaderProps) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className="post-header">
                <Typography variant="h5" component="h5">
                    {this.props.title}
                </Typography>
                <Typography>
                    By {this.props.author} on {format(this.props.date, "MMM d yyyy hh:mm a")}
                </Typography>
                {ParagraphHelper.split(this.props.details)}
            </div>
        );
    }
}
export default PostHeader;