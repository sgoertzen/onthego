import React from 'react';
import './Posts.css';
import { IPost } from '../classes/Post';
import PostTile from './PostTile';
import { Grid, Container } from '@material-ui/core';
import { IPostClickCallback } from '../classes/IPostClickCallback'


interface postProps {
    posts: IPost[]
    onPostClick: IPostClickCallback
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
                <Grid item key={post.title} xs={12} sm={6} md={4}>
                    <PostTile post={post} onPostClick={this.props.onPostClick} />
                </Grid>
            );
        });
        return (
            <Container className="cardGrid" maxWidth="lg">
                <Grid container spacing={4}>
                    {tiles}
                </Grid>
            </Container>
        )
    }
}
export default Posts;