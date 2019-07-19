import React from 'react';
import './LocationEntry.css';
import { ITravelLocation } from '../../classes/TravelLocation';
import { TextField, Button, Divider, Container } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// Todo: may want to move this out of this class later
export interface IPostCreated {
    (): void;
}

interface postEntryProps {
    title?: string,
    details?: string,
    loc: ITravelLocation
    onPostCreated: IPostCreated
}

interface IPostEntryState {
    title: string
    details: string
    media?: any // todo, figure out this type
}

class PostEntry extends React.Component {

    public state: IPostEntryState
    public props: postEntryProps

    constructor(props: postEntryProps) {
        super(props);
        console.log(props)
        this.props = props;
        this.state = {
            title: this.props.title ? this.props.title : "",
            details: this.props.details ? this.props.details : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        const id = event.target.id;
        const value = event.target.value;
        let stateChange: any
        switch (id) {
            case "post-entry-title": {
                stateChange = { title: value }
                break;
            }
            case "post-entry-details": {
                stateChange = { details: value }
                console.log(value)
                break;
            }
            case "post-entry-media": {
                console.log("Got media")
                console.log(event)
            }
        }
        this.setState(stateChange);
    }

    handleSubmit() {
        // toodo
    }

    render() {
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <Container maxWidth="md">

                    <TextValidator
                        required
                        id="post-entry-title"
                        name="post-entry-title"
                        onChange={this.handleChange}
                        value={this.state.title}
                        label="Post Title"
                        validators={['required']}
                        errorMessages={['field required']}
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
                        onChange={this.handleChange}
                    />
                    <input
                        id="post-entry-media"
                        className="PostEntryInput"
                        type="file"
                        multiple
                        accept="image/*|video/*"
                        onChange={this.handleChange}
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
            </ValidatorForm>
        );
    }
}
export default PostEntry;