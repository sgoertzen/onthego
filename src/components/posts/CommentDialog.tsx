import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button, DialogActions, DialogContent, TextField, Typography } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Login, { LoginControl } from '../common/Login';

export interface ICloseCallback {
    (): void
}
interface commentDialogProps {
    comment?: string
    onClose: ICloseCallback
    open: boolean
    username?: string
}

interface commentDialogState {
    comment?: string
    editing: boolean
    onClose: ICloseCallback
}

class CommentDialog extends React.Component {

    public props: commentDialogProps
    public state: commentDialogState

    constructor(props: commentDialogProps) {
        super(props);
        this.props = props;
        this.state = { ...props, editing: (this.props.comment !== undefined) }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        // TODO: SAVE THE Comment
        if (!this.state.comment) {
            return false;
        }
        let formattedComment = this.state.comment.replace(/\n/g, "<br />");
        alert('submit handled: ' + formattedComment)
        this.props.onClose()
    }

    render() {
        const signedIn = (typeof this.props.username!='undefined' && this.props.username.trim())
        return (
            <Dialog onClose={this.props.onClose} aria-labelledby="simple-dialog-title" open={this.props.open} fullWidth maxWidth="md">
                <DialogTitle id="simple-dialog-title">
                    <Typography variant="h5" component="span">Add Comment</Typography>
                    <Login key="login" control={LoginControl.Button} username={this.props.username} intro="Before posting a comment, you must login with a google account."/>
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
                            disabled={!signedIn}
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