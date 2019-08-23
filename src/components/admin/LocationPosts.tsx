import React from 'react';
import { format } from 'date-fns';
import { IHistoryProps } from '../../classes/IHistoryProps';
import { Paper, Table, TableRow, TableBody, TableHead, TableCell, IconButton, SvgIcon, Button, Typography } from '@material-ui/core'
import { IPost } from '../../classes/Post';
import { ITravelLocation } from '../../classes/TravelLocation';
import { FirestoreHelper } from '../../util/FirestoreHelper'

interface ILocationPostsProps {
    history: IHistoryProps
    match: {
        params: {
            locationid: string
        }
    }
}

interface ILocationPostsState {
    locationid: string
    location?: ITravelLocation
    posts: IPost[]
}

class LocationPosts extends React.Component {

    public props: ILocationPostsProps
    public state: ILocationPostsState

    constructor(props: ILocationPostsProps) {
        super(props);
        this.props = props;

        let locid = this.props.match.params.locationid
        this.state = {
            posts: [],
            locationid: locid
        }

        this.create = this.create.bind(this)
        this.edit = this.edit.bind(this)
        this.delete = this.delete.bind(this)
        this.viewPost = this.viewPost.bind(this)

        FirestoreHelper.loadLocation(locid, (loc) => {
            this.setState({ location: loc })
        })
        FirestoreHelper.loadPosts(locid, (posts) => {
            this.setState({ posts: posts })
        })
    }


    viewPost(post: IPost) {
        this.props.history.push(`/post/${post.id}`)
    }

    create(locid: string): void {
        this.props.history.push(`/notadmin/location/${locid}/postentry/`)
    }

    edit(post: IPost): void {
        this.props.history.push(`/notadmin/location/${post.locationid}/postentry/${post.id}`)
    }

    delete(loc: IPost): void {
        // todo
    }
    render() {
        if (!this.state.location) {
            return <div>Loading...</div>
        }
        return (
            <Paper className="root">
                <Typography variant="h5">List of posts for {this.state.location.name}</Typography>
                <Button variant="outlined" onClick={() => { this.create(this.state.locationid) }}>
                    Create Post
                </Button>
                <Table className="location-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="center">Author</TableCell>
                            <TableCell align="right">Posted</TableCell>
                            <TableCell align="right">Media</TableCell>
                            <TableCell align="right">Comments</TableCell>
                            <TableCell align="center">Actions</TableCell>
                            <TableCell align="center">View</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.posts.map(post => (
                            <TableRow key={post.id}>
                                <TableCell scope="row">{post.title}</TableCell>
                                <TableCell align="center">{post.author}</TableCell>
                                <TableCell align="right">{format(post.posted.toDate(), "MMM do, yyyy")}</TableCell>
                                <TableCell align="right">{post.media.length}</TableCell>
                                <TableCell align="right">{post.commentcount}</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="Edit" onClick={() => { this.edit(post) }}>
                                        <SvgIcon>
                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /><path d="M0 0h24v24H0z" fill="none" />
                                        </SvgIcon>
                                    </IconButton>
                                    {/* <IconButton aria-label="Delete" onClick={() => { this.delete(post) }}>
                                        <SvgIcon>
                                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /><path d="M0 0h24v24H0z" fill="none" />
                                        </SvgIcon>
                                    </IconButton> */}
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" onClick={() => { this.viewPost(post) }}>
                                        View Post
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default LocationPosts