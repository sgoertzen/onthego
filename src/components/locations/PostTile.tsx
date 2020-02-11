import React from 'react'
import './PostTile.css'
import { IPost } from '../../classes/Post'
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, IconButton, SvgIcon } from '@material-ui/core'
import { formatDistance } from 'date-fns'
import defaultImage from '../../images/default.png'
import { MediaHelper } from '../../util/MediaHelper'
import { IPostClickCallback } from '../../classes/IPostClickCallback'
import { ImageSize, Media } from '../../classes/Media'

interface IPostTileProps {
    post: IPost
    onPostClick: IPostClickCallback
}

class PostTile extends React.Component<IPostTileProps> {

    public props: IPostTileProps

    constructor(props: IPostTileProps) {
        super(props);
        this.props = props;
        this.onClick = this.onClick.bind(this)
    }

    onClick(): void {
        this.props.onPostClick(this.props.post.id)
    }

    getPostImageURL(post: IPost): string {
        if (post.media) {
            for (const media of post.media) {
                if (MediaHelper.isImage(media.filename)) {
                    return Media.imageThumbnail(media, ImageSize.Size_200);
                }
            }
            for (const media of post.media) {
                if (MediaHelper.isVideo(media.filename)) {
                    return Media.videoThumbnail(media);
                }
            }
        }
        return defaultImage
    }
    getPostDate(post: IPost): Date {
        if (post.posted) {
            return post.posted.toDate()
        }
        return new Date();
    }

    render() {
        const post = this.props.post
        const mediaCount = post.media ? post.media.length : 0
        const commentCount = post.commentcount ? post.commentcount : 0
        const imageURL = this.getPostImageURL(post)
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
                    <IconButton aria-label="Media" onClick={this.onClick}>
                        <SvgIcon>
                            <path d="M0 0h24v24H0z" fill="none" /><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </SvgIcon>
                    </IconButton>
                    <Typography component="span">&nbsp;{commentCount}</Typography>
                    <IconButton aria-label="Comments" onClick={this.onClick}>
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