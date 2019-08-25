import React from 'react';
import './MapMarker.css';
import { ILocChangeCallback } from '../../classes/ILocChangeCallback';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

interface markerProps {
    lat: number,
    lng: number,
    text: string,
    onLocChange: ILocChangeCallback
}

const MapMarker: React.FC<markerProps> = (mark) => {
    return (
        <Paper className="MapMarker">
            <Typography variant="h6" component="h5">
                {mark.text}
            </Typography>
        </Paper>
    );
}

export default MapMarker;