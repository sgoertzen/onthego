/// <reference types="googlemaps" />
import React from 'react'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'
import { ITravelLocation } from '../../classes/TravelLocation'
import { ILocChangeCallback } from '../../classes/ILocChangeCallback'
import './TravelMap.css'
import * as firebase from "firebase/app";;

interface IMapProps {
    locations: ITravelLocation[]
    selectedLocation?: ITravelLocation
    onLocChange: ILocChangeCallback
    fullscreen?: boolean
}

const DefaultZoom = 6
const DefaultZoomFullScreen = 3

class TravelMap extends React.Component<IMapProps> {

    public props: IMapProps
    private map: google.maps.Map | undefined;
    private maps: any;

    constructor(props: IMapProps) {
        super(props);
        this.props = props;
    }

    handleApiLoaded(map: google.maps.Map, maps: any) {
        this.map = map;
        this.maps = maps;
        this.drawPaths();
    }
    drawPaths() {
        if (this.map === undefined || this.maps === undefined) {
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
                    key={loc.id}
                    locationid={loc.id}
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
            center = new firebase.firestore.GeoPoint(18.9920112,-9.4377394)
        }
        this.drawPaths()

        return (
            // Important! Always set the container height explicitly
            <div className={this.props.fullscreen ? "MapFullscreen" : "TravelMap"}>
                <GoogleMapReact
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                    bootstrapURLKeys={{ key: 'AIzaSyBDe1KUNj3px_7kkfl7cfkrEpihDwvunt4' }}
                    center={{ lat: center.latitude, lng: center.longitude }}
                    defaultZoom={this.props.fullscreen ? DefaultZoomFullScreen : DefaultZoom}>
                    {this.buildMarkers()}
                </GoogleMapReact>
            </div>
        );
    }
}

export default TravelMap;
