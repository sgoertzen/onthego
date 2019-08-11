import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { IComment } from '../../classes/Comment';

export interface ICloseCallback {
    (): void
}
interface commentDialogProps {
    onClose: ICloseCallback
    open: boolean
    comment?: IComment
}

interface commentDialogState {
    comment?: IComment
    onClose: ICloseCallback
    open: boolean
}

class CommentDialog extends React.Component {
    
    public props: commentDialogProps
    public state: commentDialogState

    constructor(props: commentDialogProps) {
        super(props);
        this.props = props;
        this.state = { ...props }
    }


    handleClose() {
        this.props.onClose();
    }

    render() {
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                <DialogTitle id="simple-dialog-title">Add Comment</DialogTitle>
                {/* <List>
                {emails.map(email => (
                    <ListItem button onClick={() => handleListItemClick(email)} key={email}>
                    <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                        <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={email} />
                    </ListItem>
                ))}

                <ListItem button onClick={() => handleListItemClick('addAccount')}>
                    <ListItemAvatar>
                    <Avatar>
                        <AddIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="add account" />
                </ListItem>
                </List> */}
            </Dialog>
        );
    }
}

export default CommentDialog
// export default function SimpleDialogDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

//   function handleClickOpen() {
//     setOpen(true);
//   }

//   const handleClose = value => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
//       <br />
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
//     </div>
//   );
// }
