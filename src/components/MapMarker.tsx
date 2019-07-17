import React from 'react';
//import './MapMarker.css';
import { ILocChangeCallback } from '../classes/ILocChangeCallback';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

interface markerProps {
    lat: number,
    lng: number,
    text: string,
    onLocChange: ILocChangeCallback
}

const MapMarker: React.FC<markerProps> = (markerProps) => {
    return (
        <Paper>
            <Typography variant="h5" component="h3">
                {markerProps.text}
            </Typography>
        </Paper>
    );
}

export default MapMarker;