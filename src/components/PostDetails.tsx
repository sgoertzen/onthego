import React from 'react';
import './PostTile.css';
import { IPost } from '../classes/Post';
// import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, IconButton, SvgIcon } from '@material-ui/core';
// import { formatDistance } from 'date-fns';
// import defaultImage from '../images/default.png'


interface postDetailsProps {
    post?: IPost
}

class PostDetails extends React.Component {

    public props: postDetailsProps

    constructor(props: postDetailsProps) {
        super(props);
        this.props = props;
    }

    getPostDate(post: IPost): Date {
        if (post.posted) {
            return post.posted
        }
        return new Date();
    }

    render() {
        if (!this.props.post) {
            return <div>No post found</div>
        }
        return (
            <div>
                {this.props.post.title}
            </div>
        );
    }
}
export default PostDetails;