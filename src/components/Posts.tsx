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
        const buttons = this.props.posts.map(post => {
            return (
                <div key="{post.title}"><img className="Post-Image" src={post.photo} alt="{post.title}" />{post.title}</div>
            );
        });
        return buttons
    }
}
export default Posts;