import React from 'react';
import './MapMarker.css';
import { ILocChangeCallback } from './App';

interface markerProps {
    lat: number,
    lng: number,
    text: string,
    onLocChange: ILocChangeCallback
}

const MapMarker: React.FC<markerProps> = (markerProps) => {
    return (
        <div className="MapMarker">{markerProps.text}</div>
    );
}

export default MapMarker;