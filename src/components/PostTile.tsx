import React from 'react';
import './PostTile.css';
import { IPost } from '../classes/Post';

interface postTileProps {
    post: IPost
}

class PostTile extends React.Component {

    public props: postTileProps

    constructor(props: postTileProps) {
        super(props);
        this.props = props;
    }

    render() {
        let post = this.props.post
        return (
            <div key={post.title}><img className="Post-Image" src={post.photo} alt={post.title} />{post.title}</div>
        );
    }
}
export default PostTile;