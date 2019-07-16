import React from 'react';
import './Posts.css';
import { IPost } from '../classes/Post';
import PostTile from './PostTile';
import { Box } from '@material-ui/core';


interface postProps {
    posts: IPost[]
}

class Posts extends React.Component {

    public props: postProps

    constructor(props: postProps) {
        super(props);
        this.props = props;
    }

    render() {
        if (this.props.posts.length === 0) {
            return <div>Nothing shared for this location yet</div>
        }
        const tiles = this.props.posts.map(post => {
            return (
                <PostTile post={post}/>
            );
        });
        return <Box>{tiles}</Box>
    }
}
export default Posts;