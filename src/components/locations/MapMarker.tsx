import React from 'react';
import './MapMarker.css';
import { ILocChangeCallback } from '../../classes/ILocChangeCallback';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

interface IMarkerProps {
    lat: number,
    lng: number,
    text: string,
    locationid: string,
    onLocChange: ILocChangeCallback
}

const MapMarker: React.FC<IMarkerProps> = (props) => {
    return (
        <Paper className="MapMarker" onClick={() => { props.onLocChange(props.locationid) }}>
            <Typography variant="h6" component="h5">
                {props.text}
            </Typography>
        </Paper>
    );
}

export default MapMarker;