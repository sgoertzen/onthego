import React from 'react';
import './PostTile.css';
import { IPost } from '../classes/Post';
import PostHeader from './PostHeader';
import PostMedia, { IGalleryItem, MediaType } from './PostMedia';
import PostComments from './PostComments';


interface postDetailsProps {
    post?: IPost
    match?: {
        params?: {
            postid?: string
        }
    }
}
interface postDeatilsState {
    post: IPost
    selectedImage: string
}

class PostPage extends React.Component {

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

    buildMediaItems(post: IPost): IGalleryItem[] {
        return [{
            url: "test",
            thumbnail: "test2",
            type: MediaType.Image
        }]
    }

    render() {
        if (!this.props.post) {
            return <div>No post found</div>
        }
        let post = this.props.post
        return (
            <div>
                <PostHeader title={post.title} author={post.author} date={post.posted} details={post.details} />
                <PostMedia items={this.buildMediaItems(post)} />
                <PostComments />
                {this.props.post.title}
            </div>
        );
    }
}
export default PostPage;