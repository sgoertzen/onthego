import React from 'react';
import './LocationEntry.css';
import * as firebase from "firebase/app";
import "firebase/storage"
import { ITravelLocation } from '../../classes/TravelLocation';
import { TextField, Button, Divider, Container } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import UploadingMedia, { IUploadingMedia } from './UploadingMedia';

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
    media: IUploadingMedia[]
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
            locationid: this.props.match.params.locationid,
            media: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isUploading = this.isUploading.bind(this);
        this.updateUploadState = this.updateUploadState.bind(this);
    }

    handleChange(event: any) {
        const id = event.target.id;
        const value = event.target.value;
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
                    let uploads: IUploadingMedia[] = []
                    console.log("Processing " + event.target.files.length + " files")
                    for (let file of event.target.files) {
                        console.log("processing file ", file.name)
                        uploads.push(this.uploadFile(file))
                    }
                    this.setState({
                        media: uploads
                    })
                }
            }
        }
    }

    uploadFile(file: any): IUploadingMedia {
        let storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child("postimages/" + file.name).put(file);
        let self = this
        let uploadingMedia = {filename: file.name, percentUploaded: 0}
        
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion

        uploadTask.on('state_changed', function(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            self.updateUploadState(uploadingMedia.filename, progress)
        }, function(error) {
            console.log("Unable to upload the file ", error)
            self.updateUploadState(uploadingMedia.filename, undefined, undefined, error)
        }, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                self.updateUploadState(uploadingMedia.filename, undefined, downloadURL)
            });
        });
        return uploadingMedia
    }

    updateUploadState(filename: string, percentUploaded?: number, url?: string, error?: Error) {

        let uploads = this.state.media
        for (let upload of uploads) {
            if (upload.filename === filename) {
                if (error) {
                    upload.error = error
                }
                if (url) {
                    upload.url = url
                }
                if (percentUploaded) {
                    upload.percentUploaded = percentUploaded
                }
                break;
            }
        }
        this.setState({ media: uploads })
        console.log("Update for " +filename + ". State has " +  this.state.media.length + ' files')
        console.log(this.state.media)
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
            mediaURLs: this.state.media || []
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            alert('Success!')
        })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                alert('failed uploading, check logs')
            });
    }

    isUploading() {
        for (let file of this.state.media) {
            if (file.percentUploaded < 100) {
                return true
            }
        }
        return false
    }

    render() {
        let counter = 0
        let uploadDisplays = this.state.media.map(obj => {
            return (<UploadingMedia
                filename={obj.filename}
                percentUploaded={obj.percentUploaded}
                url={obj.url}
                error={obj.error}
                key={"upload_" + counter++}
            />)
        })

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
                    <div>
                        {uploadDisplays}
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
                    </div>
                    <Divider />
                    <Button
                        variant="contained"
                        id="post-entry-submit"
                        type="submit"
                        disabled={this.isUploading()}
                        fullWidth>
                        Create Post
                    </Button>
                </Container>
            </ValidatorForm>
        );
    }
}
export default PostEntry;