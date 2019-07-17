import React from 'react';
import './PostTile.css';
import { IPost } from '../classes/Post';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, IconButton, SvgIcon } from '@material-ui/core';
import { formatDistance } from 'date-fns';
import defaultImage from '../images/default.png'


interface postTileProps {
    post: IPost
}

class PostTile extends React.Component {

    public props: postTileProps

    constructor(props: postTileProps) {
        super(props);
        this.props = props;
    }

    getPostImageURL(post: IPost): string {
        if (post.mediaURLs && post.mediaURLs.length > 0) {
            return post.mediaURLs[0]
        }
        return defaultImage
    }
    getPostDate(post: IPost): Date {
        if (post.posted) {
            return post.posted
        }
        return new Date();
    }

    render() {
        let post = this.props.post
        let mediaCount = post.mediaURLs ? post.mediaURLs.length : 0
        let imageURL = this.getPostImageURL(post)
        return (
            <Card className="card">
                <CardActionArea>
                    <CardMedia
                        className="media"
                        image={imageURL}
                        title={post.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            By {post.author} {formatDistance(this.getPostDate(post), new Date())} ago
                </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Typography component="span">{mediaCount}</Typography>
                    <IconButton aria-label="Media">
                        <SvgIcon>
                            <path d="M0 0h24v24H0z" fill="none" /><path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z" />
                        </SvgIcon>
                    </IconButton>
                    <Typography component="span">0</Typography>
                    <IconButton aria-label="Comments">
                        <SvgIcon>
                            <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /><path d="M0 0h24v24H0z" fill="none" />
                        </SvgIcon>
                    </IconButton>
                    <Button size="small" color="primary">
                        View Full Post
              </Button>
                </CardActions>
            </Card>
        );
    }
}
export default PostTile;