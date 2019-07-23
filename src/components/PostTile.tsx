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

    onClick(event: any): void {
        console.log("Post tile clicked")
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
                <CardActionArea onClick={this.onClick}>
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
                    <Typography component="span">&nbsp;{mediaCount}</Typography>
                    <IconButton aria-label="Media">
                        <SvgIcon>
                            <path d="M0 0h24v24H0z" fill="none" /><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </SvgIcon>
                    </IconButton>
                    <Typography component="span">0</Typography>
                    <IconButton aria-label="Comments">
                        <SvgIcon>
                            <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /><path d="M0 0h24v24H0z" fill="none" />
                        </SvgIcon>
                    </IconButton>
                    <Button size="small" color="primary" onClick={this.onClick}>
                        View Details
              </Button>
                </CardActions>
            </Card>
        );
    }
}
export default PostTile;