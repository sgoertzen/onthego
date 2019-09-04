import React from 'react';
import { Typography, Box } from '@material-ui/core';
import './AdminFooter.css'
import Login, { LoginControl } from '../common/Login';

interface IFooterProps {
    username?: string
}

class AdminFooter extends React.Component<IFooterProps> {

    public props: IFooterProps

    constructor(props: IFooterProps) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Box className="footer" justifyContent="center" width="100%">
                <Typography className="footer-copy">&copy;2019 Goertzen Family</Typography>
                <Typography className="footer-spacer"> &nbsp;-&nbsp; </Typography>
                <Login control={LoginControl.Link} adminLogin={true} username={this.props.username} />
            </Box>
        );
    }
}
export default AdminFooter;