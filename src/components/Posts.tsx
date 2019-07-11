import React from 'react';
import './Posts.css';
import { IPost } from '../classes/Post';


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
                <div key="{post.title}"><img className="Post-Image" src={post.photo} alt="{post.title}" />{post.title}</div>
            );
        });
        return tiles
    }
}
export default Posts;