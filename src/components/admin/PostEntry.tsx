import React from 'react'
import './LocationEntry.css'
import * as firebase from "firebase/app"
import "firebase/storage"
import { ITravelLocation } from '../../classes/TravelLocation'
import { TextField, Button, Divider, Container, Typography } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import UploadingMedia from './UploadingMedia'
import { MediaHelper } from '../../util/MediaHelper'
import { IMedia, Media, MediaType, ImageSize } from '../../classes/Media'
import { IPost } from '../../classes/Post'
import './PostEntry.css'

export interface IPostCreated {
    (): void;
}

interface postEntryProps {
    loc: ITravelLocation
    post?: IPost
    onPostCreated: IPostCreated
}

interface IPostEntryState {
    title: string
    details: string
    uploads: IMedia[]
    locationid: string
    removeduploads: IMedia[]
}

class PostEntry extends React.Component {

    public state: IPostEntryState
    public props: postEntryProps

    constructor(props: postEntryProps) {
        super(props);
        this.props = props;
        this.state = {
            title: this.props.post ? this.props.post.title : "",
            details: this.props.post ? this.props.post.details : "",
            locationid: this.props.loc.id,
            uploads: this.props.post ? this.props.post.media : [], // Set uploaded to 100%
            removeduploads: []
        }
        // Todo; Allow uploads to be browsed for multiple times
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.isUploading = this.isUploading.bind(this)
        this.updateUploadState = this.updateUploadState.bind(this)
        this.removeMedia = this.removeMedia.bind(this)
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
                    const uploadings: IMedia[] = []
                    console.log("Processing " + event.target.files.length + " files")
                    for (const file of event.target.files) {
                        console.log("processing file ", file.name)
                        uploadings.push(this.uploadFile(file))
                    }
                    this.setState({
                        uploads: this.state.uploads.concat(uploadings)
                    })
                }
            }
        }
    }

    uploadFile(file: any): IMedia {
        const folder = MediaHelper.isImage(file.name) ? "postimages" : "postvideos"
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(folder + "/" + file.name).put(file);
        const self = this
        const uploadingMedia = new Media(file.name, "", MediaHelper.getFiletype(file.name))

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion

        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            self.updateUploadState(uploadingMedia.filename, progress)
        }, error => {
            console.log("Unable to upload the file ", error)
            self.updateUploadState(uploadingMedia.filename, undefined, undefined, error)
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                self.updateUploadState(uploadingMedia.filename, undefined, downloadURL)
            }).catch((reason) => { console.log("Unable to load upload file", reason) })
        })
        return uploadingMedia
    }

    updateUploadState(filename: string, percentUploaded?: number, url?: string, error?: Error) {
        const uploadings = this.state.uploads
        for (const upload of uploadings) {
            if (upload.filename === filename) {
                if (error) {
                    upload.error = error.message
                }
                if (url) {
                    upload.url = url
                    upload.filetype = MediaHelper.getFiletype(filename)
                }
                if (percentUploaded) {
                    upload.percentUploaded = percentUploaded
                }
                break;
            }
        }
        this.setState({ uploads: uploadings })
    }

    prepMediaForSaving(media: IMedia[]): any[] {
        // Convert the enum to a string
        const items: any[] = []
        for (const obj of media) {
            items.push(
                {
                    url: obj.url,
                    filename: obj.filename,
                    filetype: obj.filetype.toString()
                }
            )
        }
        return items
    }

    handleSubmit() {
        const user = firebase.auth().currentUser
        const db = firebase.firestore()

        if (this.props.post) {
            const post = this.props.post
            db.doc(`posts/${post.id}`)
                .update({
                    title: this.state.title,
                    details: this.state.details,
                    media: this.prepMediaForSaving(this.state.uploads)
                })
                .then(async () => {
                    await this.deleteRemovedMedia(this.state.removeduploads)
                    this.props.onPostCreated()
                })
                .catch((reason) => { console.error(`Unable to update the post: ${reason}`) })
        } else {
            db.collection("posts")
                .add({
                    title: this.state.title,
                    details: this.state.details,
                    locationid: this.state.locationid,
                    author: user ? user.displayName : "(unknown)",
                    posted: new Date(),
                    media: this.prepMediaForSaving(this.state.uploads)
                })
                .then(async () => {
                    await this.deleteRemovedMedia(this.state.removeduploads)
                    this.props.onPostCreated()
                })
                .catch((reason) => { console.error(`Unable to add the post: ${reason}`) })
        }
    }


    deleteRemovedMedia(removed: IMedia[]): Promise<any> {
        const promises: Promise<any>[] = []
        const storageRef = firebase.storage().ref()

        console.log(removed)
        removed.forEach(toremove => {
            console.log("removing image: " + toremove.filename)
            if (toremove.filetype === MediaType.Image) {
                // Remove both thumbnails and main image
                const folder = "postimages"
                promises.push(storageRef.child(folder + "/" + Media.imageThumbnailFilename(toremove, ImageSize.Size_200)).delete())
                promises.push(storageRef.child(folder + "/" + Media.imageThumbnailFilename(toremove, ImageSize.Size_1600)).delete())
                promises.push(storageRef.child(folder + "/" + toremove.filename).delete())
            } else if (toremove.filetype === MediaType.Video) {
                // Remove thumbnail and main video
                const folder = "postvideos"
                promises.push(storageRef.child(folder + "/" + Media.videoThumbnailFilename(toremove)).delete())
                promises.push(storageRef.child(folder + "/" + toremove.filename).delete())
            }
        })
        return Promise.all(promises)
    }

    removeMedia(media: IMedia) {
        // Remove from our uploads and add to removedUploads list
        const newMedia = this.state.uploads.filter((value, index, arr) => {
            return value.filename !== media.filename
        })
        const newRemoved = this.state.removeduploads
        newRemoved.push(media)
        this.setState({
            removeduploads: newRemoved,
            uploads: newMedia
        })
    }

    isUploading() {
        for (const file of this.state.uploads) {
            if (file.percentUploaded < 100) {
                return true
            }
        }
        return false
    }

    render() {
        let counter = 0
        const uploadDisplays = this.state.uploads.map(obj => {
            return (<UploadingMedia
                filename={obj.filename}
                percentUploaded={obj.percentUploaded}
                url={obj.url}
                error={obj.error}
                key={"upload_" + counter++}
                filetype={obj.filetype}
                removeCallback={this.removeMedia}
            />)
        })

        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <Container maxWidth="md">
                    <Typography variant="h5">Adding post for {this.props.loc.name}</Typography>
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
                        <div className="secondaryButtons">
                            <label htmlFor="post-entry-media">
                                <Button variant="outlined" component="span">
                                    Add Images and Videos
                                </Button>
                            </label>
                        </div>
                    </div>
                    <Divider />
                    <Button
                        variant="contained"
                        id="post-entry-submit"
                        type="submit"
                        disabled={this.isUploading()}
                        fullWidth>
                        {this.props.post !== undefined ? "Update Post" : "Create Post"}
                    </Button>
                </Container>
            </ValidatorForm>
        );
    }
}
export default PostEntry;