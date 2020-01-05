import React from 'react'
import './MapMarker.css'
import { Paper } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

interface IPanoClickCallback {
    (panId: string): void
}

interface IPanoMarkerProps {
    lat: number,
    lng: number,
    thumbnail: string,
    text: string,
    panoid: string,
    onClick: IPanoClickCallback
}

const PanoMarker: React.FC<IPanoMarkerProps> = (props) => {
    /* 
    TODO:
    1. Make this into a single icon
    2. Mouse over should show mini dialog 
    3. Click on dialog will expand to full screen
     */
    return (
        <Paper className="PanoMarker" onClick={() => { props.onClick(props.panoid) }}>
            <Typography component="h6">
                {props.text}
            </Typography>
            <img alt={"Image for " + props.text} src={props.thumbnail} />
        </Paper>
    );
}

export default PanoMarker;