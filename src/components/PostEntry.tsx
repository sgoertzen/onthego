import React from 'react';
import './LocationEntry.css';
import { ITravelLocation } from '../classes/TravelLocation';
import { TextField, Button, Divider, Container } from '@material-ui/core';

// Todo: may want to move this out of this class later
export interface IPostCreated {
    (): void;
}

interface buttonProps {
    loc: ITravelLocation
    onPostCreated: IPostCreated
}

class PostEntry extends React.Component {

    public props: buttonProps

    constructor(props: buttonProps) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div>
                <Container maxWidth="md">
                    <TextField
                        required
                        id="post-entry-title"
                        label="Post Title"
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        id="post-entry-details"
                        label="Details"
                        multiline
                        fullWidth
                        rows="3"
                        defaultValue=""
                        margin="normal"
                    />
                    <input
                        id="post-entry-media"
                        className="PostEntryInput"
                        type="file"
                        multiple
                        accept="image/*|video/*"
                    />
                    <label htmlFor="post-entry-media">
                        <Button variant="outlined" component="span">
                            Add Images and Videos
                    </Button>
                    </label>
                    <Divider />
                    <Button variant="contained" id="post-entry-submit" fullWidth>
                        Create Post
                </Button>
                </Container>
            </div>
        );
    }
}
export default PostEntry;