import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Container, Divider, Button, DialogActions, DialogContent, DialogContentText, TextField } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export interface ICloseCallback {
    (): void
}
interface commentDialogProps {
    comment?: string
    onClose: ICloseCallback
    open: boolean
}

interface commentDialogState {
    comment?: string
    editing: boolean
    onClose: ICloseCallback
    open: boolean
}

class CommentDialog extends React.Component {
    
    public props: commentDialogProps
    public state: commentDialogState

    constructor(props: commentDialogProps) {
        super(props);
        this.props = props;
        this.state = { ...props, editing:(this.props.comment !== undefined) }
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event:any) {
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
        alert('submit handled: ' + this.state.comment)
    }

    handleClose() {
        this.props.onClose();
    }

    render() {
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open} fullWidth>
                <DialogTitle id="simple-dialog-title">Add Comment</DialogTitle>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                >
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="comment-entry-comment"
                        label="Comment"
                        rows="3"
                        onChange={this.handleChange}
                        value={this.state.comment}
                        fullWidth
                        required
                    />
                    
              </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button id="post-entry-submit"
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