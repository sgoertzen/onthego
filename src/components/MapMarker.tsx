import React from 'react';
import './MapMarker.css';

interface markerProps {
    lat: number,
    lng: number,
    text: string
}

const MapMarker: React.FC<markerProps> = (markerProps) => {
    return (
        <div className="MapMarker">{markerProps.text}</div>
    );
}

export default MapMarker;