import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button, DialogActions, DialogContent, TextField, Typography } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Login, { LoginControl } from '../common/Login';
import * as firebase from "firebase/app";

export interface ICommentSavedCallback {
    (): void
}
interface ICommentDialogProps {
    comment?: string
    onClose: ICommentSavedCallback
    open: boolean
    username?: string
    postid: string
}

interface commentDialogState {
    comment?: string
    editing: boolean
    onClose: ICommentSavedCallback
    saving: boolean
}

class CommentDialog extends React.Component<ICommentDialogProps> {

    public props: ICommentDialogProps
    public state: commentDialogState

    constructor(props: ICommentDialogProps) {
        super(props);
        this.props = props;
        this.state = { ...props, editing: (this.props.comment !== undefined), saving: false }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.complete = this.complete.bind(this)
    }

    handleChange(event: any) {
        const id = event.target.id;
        const value = event.target.value;
        let stateChange: any
        switch (id) {
            case "comment-entry-comment": {
                stateChange = { comment: value }
                break;
            }
        }
        this.setState(stateChange);
    }

    handleSubmit() {
        this.setState({ saving: true })

        const that = this
        const user = firebase.auth().currentUser

        const db = firebase.firestore();
        db.collection("comments").add({
            postid: this.props.postid,
            comment: this.state.comment,
            edited: false,
            author: user ? user.displayName : "(unknown)",
            posted: new Date()
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id)
            that.complete()
        }).catch(function(error) {
            console.error("Error adding document: ", error);
            alert('Saving the comment failed.  Please contact the site adminstrator.')
            that.complete()
        });
    }

    complete() {
        this.setState({
            comment: "",
            saving: false
        })
        this.props.onClose()
    }

    render() {
        const signedIn = (this.props.username !== undefined && this.props.username && this.props.username.trim())
        return (
            <Dialog onClose={this.props.onClose} aria-labelledby="simple-dialog-title" open={this.props.open} fullWidth maxWidth="md">
                <DialogTitle id="simple-dialog-title">
                    <Typography variant="h5" component="span">Add Comment</Typography>
                    <Login key="login" control={LoginControl.Button} username={this.props.username} intro="Before posting a comment, you must login with a google account." />
                </DialogTitle>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                >
                    <DialogContent>
                        <TextField
                            disabled={!signedIn}
                            autoFocus
                            id="comment-entry-comment"
                            label="Comment"
                            rows="4"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.comment}
                            multiline
                            fullWidth
                            required
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="primary">
                            Cancel
                    </Button>
                        <Button id="post-entry-submit"
                            disabled={!signedIn || this.state.saving}
                            type="submit">
                            Add Comment
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}

export default CommentDialog