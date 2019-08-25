/// <reference types="googlemaps" />
import React from 'react'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'
import { ITravelLocation } from '../../classes/TravelLocation'
import { ILocChangeCallback } from '../../classes/ILocChangeCallback'
import './TravelMap.css'
import * as firebase from "firebase/app";;

interface mapProps {
    locations: ITravelLocation[]
    selectedLocation?: ITravelLocation
    onLocChange: ILocChangeCallback
}

class TravelMap extends React.Component<mapProps> {

    public props: mapProps
    private map: google.maps.Map | null;
    private maps: any;

    constructor(props: mapProps) {
        super(props);
        this.props = props;
        this.map = null;
        this.maps = null;
    }

    handleApiLoaded(map: google.maps.Map, maps: any) {
        this.map = map;
        this.maps = maps;
        this.drawPaths();
    }
    drawPaths() {
        if (this.map === undefined) {
            return;
        }
        const pathCoords = this.buildFlightPlanCoordinates(this.props.locations)
        const traveledPath = new this.maps.Polyline({
            path: pathCoords.traveled,
            geodesic: true,
            strokeColor: '#3E442B',
            strokeOpacity: 1.0,
            strokeWeight: 4
        });
        traveledPath.setMap(this.map);

        const upcomingPath = new this.maps.Polyline({
            path: pathCoords.upcoming,
            geodesic: true,
            strokeColor: '#AAADC4',
            strokeOpacity: 0.4,
            strokeWeight: 3
        });
        upcomingPath.setMap(this.map);
    }

    buildFlightPlanCoordinates(locs: ITravelLocation[]) {
        const now: Date = new Date()
        const traveledPath = [];
        const upcomingPath = [];

        for (const loc of locs) {
            if (loc.arrive === undefined || loc.arrive.toDate() < now) {
                traveledPath.push({
                    lat: loc.coords.latitude,
                    lng: loc.coords.longitude
                });
            }
            if (loc.depart === undefined || loc.depart.toDate() > now) {
                upcomingPath.push({
                    lat: loc.coords.latitude,
                    lng: loc.coords.longitude
                });
            }

        }

        return {
            traveled: traveledPath,
            upcoming: upcomingPath
        };
    }

    buildMarkers() {
        const markers: any = this.props.locations.map(loc => {
            return (
                <MapMarker
                    lat={loc.coords.latitude}
                    lng={loc.coords.longitude}
                    text={loc.name}
                    key={loc.name}
                    onLocChange={this.props.onLocChange}
                />
            );
        });
        return markers;
    }
    render() {
        let center: firebase.firestore.GeoPoint
        if (this.props.selectedLocation) {
            center = this.props.selectedLocation.coords
        } else {
            // Defaults to San Francisco
            center = new firebase.firestore.GeoPoint(37.7749, -122.4194)
        }

        this.drawPaths()
        return (
            // Important! Always set the container height explicitly
            <div className="TravelMap">
                <GoogleMapReact
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                    bootstrapURLKeys={{ key: 'AIzaSyBDe1KUNj3px_7kkfl7cfkrEpihDwvunt4' }}
                    center={{ lat: center.latitude, lng: center.longitude }}
                    defaultZoom={6}
                >
                    {this.buildMarkers()}
                </GoogleMapReact>
            </div>
        );
    }
}

export default TravelMap;
