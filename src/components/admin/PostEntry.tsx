import React from 'react';
import './LocationEntry.css';
import * as firebase from "firebase/app";
import "firebase/storage"
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
    match: {
        params: {
            locationid: string
        }
    }
}

interface IPostEntryState {
    title: string
    details: string
    media?: [string]
    locationid: string
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
            details: this.props.details ? this.props.details : "",
            locationid: this.props.match.params.locationid
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
                this.setState({ title: value })
                break;
            }
            case "post-entry-details": {
                this.setState({ details: value })
                break;
            }
            case "post-entry-media": {
                
                if (event.target.files) {
                    let storageRef = firebase.storage().ref();
                    console.log(event.target.files)
                    for (let file of event.target.files) {
                        let image = storageRef.child("postimages/" + file.name)
                        image.put(file).then((snapshot) => {
                            console.log("Uploaded a file: ", snapshot.downloadURL)
                            if (snapshot.downloadURL) {
                                // TODO: Race condition here! Fix!
                                let pastMedia: string[] = this.state.media || [];
                                pastMedia.push(snapshot.downloadURL)
                                this.setState( { media: pastMedia } )
                            }
                        })
                    }
                }
            }
        }
        this.setState(stateChange);
    }

    handleSubmit() {
        alert('uploading')
        console.log("submitting post entry")
        var db = firebase.firestore();
        db.collection("posts").add({
            title: this.state.title,
            details: this.state.details,
            locationid: this.state.locationid,
            author: "Trav El",
            created: new Date(),
            photos:this.state.media
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            alert('Success!')
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            alert('failed uploading, check logs')
        });
        // var storageRef = firebase.storage().ref();
        // let image1 = storageRef.child("postimages/make_random_name")
        // storageRef.put(file).then((snapshot) => {
        //     console.log("Uploaded a file: ", snapshot.downloadURL)
        //     console.log(snapshot)
        // })
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
                    <Button 
                        variant="contained" 
                        id="post-entry-submit" 
                        type="submit"
                        fullWidth>
                        Create Post
                    </Button>
                </Container>
            </ValidatorForm>
        );
    }
}
export default PostEntry;