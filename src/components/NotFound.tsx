import React from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const NotFound: React.FC = () => {
    return (
        <Paper>
            <Typography variant="h5" component="h3">
                Page not found
            </Typography>
        </Paper>
    );
}

export default NotFound;