/// <reference types="googlemaps" />
import React from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker'


interface travelLocation {
    name: string,
    lat: number,
    lng: number,
    arrive?: Date,
    depart?: Date
}
interface paths {
    traveledPath: google.maps.LatLng[],
    upcomingPath: google.maps.LatLng[]
}
interface mapProps {
    locations: travelLocation[]
}

const TravelMap: React.FC<mapProps> = (props) => {
    const handleApiLoaded = (map: google.maps.Map, maps: any) => {
        let pathCoords = buildFlightPlanCoordinates(props.locations)
        let traveledPath = new maps.Polyline({
            path: pathCoords.traveled,
            geodesic: true,
            strokeColor: '#6c027f',
            strokeOpacity: 1.0,
            strokeWeight: 4
        });
        traveledPath.setMap(map);

        let upcomingPath = new maps.Polyline({
            path: pathCoords.upcoming,
            geodesic: true,
            strokeColor: '#ffaf05',
            strokeOpacity: 0.4,
            strokeWeight: 3
        });
        upcomingPath.setMap(map);
    }

    const buildFlightPlanCoordinates = (locs: travelLocation[]) => {
        const now: Date = new Date()
        var traveledPath = [];
        const upcomingPath = [];

        for (const loc of locs) {
            if (loc.arrive == null || loc.arrive < now) {
                traveledPath.push({
                    lat: loc.lat,
                    lng: loc.lng
                });
            }
            if (loc.depart == null || loc.depart > now) {
                upcomingPath.push({
                    lat: loc.lat,
                    lng: loc.lng
                });
            }

        }

        return {
            traveled: traveledPath,
            upcoming: upcomingPath
        };
    }

    const buildMarkers = () => {
        const markers: any = props.locations.map(loc => {
            return (
                <MapMarker
                    lat={loc.lat}
                    lng={loc.lng}
                    text={loc.name}
                    key={loc.name}
                />
            );
        });
        return markers;
    }
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                bootstrapURLKeys={{ key: 'AIzaSyBDe1KUNj3px_7kkfl7cfkrEpihDwvunt4' }}
                defaultCenter={{ lat: 21.5001927, lng: -81.8118274 }}
                defaultZoom={4}
            >
                {buildMarkers()}
            </GoogleMapReact>
        </div>
    );
}

export default TravelMap;
