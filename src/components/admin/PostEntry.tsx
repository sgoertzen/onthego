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
        this.props = props;
        this.state = {
            title: this.props.title || "",
            details: this.props.details || "",
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
                    for (let file of event.target.files) {
                        this.uploadFile(file)
                    }
                }
            }
        }
        this.setState(stateChange);
    }

    uploadFile(file:any) {
        let storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child("postimages/" + file.name).put(file);
        let self = this

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, function(error) {
            // Handle unsuccessful uploads
            console.log("Unable to upload the file ", error)
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                
                let pastMedia: string[] = self.state.media || [];
                pastMedia.push(downloadURL)
                self.setState({ media: pastMedia })
            });
        });
    }

    handleSubmit() {
        console.log("submitting post entry")


        var db = firebase.firestore();
        db.collection("posts").add({
            title: this.state.title,
            details: this.state.details,
            locationid: this.state.locationid,
            author: "Trav El",
            created: new Date(),
            mediaURLs: this.state.media ||  []
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            alert('Success!')
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            alert('failed uploading, check logs')
        });
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
                        value={this.state.details}
                        multiline
                        fullWidth
                        rows="3"
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