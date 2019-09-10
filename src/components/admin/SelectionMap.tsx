/// <reference types="googlemaps" />
import React from 'react'
import GoogleMapReact, { Coords } from 'google-map-react'
import './SelectionMap.css'
import * as firebase from "firebase/app"
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

enum MapMode {
    Drag = "Drag",
    Add = "Add",
    Remove = "Remove"
}

interface IMapProps {
    coordinates: firebase.firestore.GeoPoint[]
    onChange: (coords: firebase.firestore.GeoPoint[]) => void
}

interface ISelectionMapState {
    markers: google.maps.Marker[]
    mode: MapMode
    mapline: google.maps.Polyline | undefined
}

class SelectionMap extends React.Component<IMapProps> {

    public props: IMapProps
    public state: ISelectionMapState
    private map: google.maps.Map | undefined;
    private maps: any;

    constructor(props: IMapProps) {
        super(props);
        this.props = props;
        this.state = {
            mode: MapMode.Drag,
            markers: [],
            mapline: undefined
        }
        this.addMarkers = this.addMarkers.bind(this)
        this.addMarker = this.addMarker.bind(this)
        this.updateEverything = this.updateEverything.bind(this)
        this.handleModeChange = this.handleModeChange.bind(this)
    }


    handleApiLoaded(map: google.maps.Map, maps: any) {
        this.map = map
        this.maps = maps

        const mapline = new this.maps.Polyline({
            map: this.map,
            path: this.convertLatLongs(this.props.coordinates),
            strokeColor: '#AAADC4',
            strokeOpacity: 1,
            strokeWeight: 3
        })
        this.setState({ mapline: mapline })
        this.addMarkers(this.props.coordinates)
        this.updateEverything()
    }

    addMarkers(points: firebase.firestore.GeoPoint[]) {
        for (let point of points) {
            this.addMarker(point)
        }
    }

    addMarker(point: firebase.firestore.GeoPoint) {
        if (this.map === undefined || this.maps === undefined) {
            return;
        }
        const marker = new google.maps.Marker()
        marker.setPosition({ lat: point.latitude, lng: point.longitude })
        marker.setMap(this.map)
        marker.setClickable(true)
        marker.setDraggable(true)
        marker.addListener('dragend', this.updateEverything)
        marker.addListener('click', () => { this.removeMarker(marker) })
        const markers = this.state.markers
        markers.push(marker)
        this.setState({ markers: markers })
    }

    removeMarker(marker: google.maps.Marker) {
        if (this.state.mode !== MapMode.Remove) {
            return
        }
        // Remove the marker from the map and our state
        marker.setMap(null)
        this.state.markers.forEach((item, index) => {
            if (item === marker) {
                const marks = this.state.markers
                marks.splice(index, 1)
                this.setState({ markers: marks })
            }
        })
        this.updateEverything()
    }

    updateEverything() {
        // Draw the path
        if (this.state.mapline) {
            const points: google.maps.LatLng[] = []
            for (let marker of this.state.markers) {
                const position = marker.getPosition()
                if (position && position !== null) {
                    points.push(position)
                }
            }
            this.state.mapline.setPath(points)
        }

        // Number the markers
        let index = 1
        for (let marker of this.state.markers) {
            marker.setLabel(`${index++}`)
        }

        // Push out the changes to our onChange listener
        const points: firebase.firestore.GeoPoint[] = []
        for (let marker of this.state.markers) {
            const position = marker.getPosition()
            if (position)
                points.push(new firebase.firestore.GeoPoint(position.lat(), position.lng()))
        }
        this.props.onChange(points)
    }

    convertLatLongs(points: firebase.firestore.GeoPoint[]): google.maps.LatLng[] {
        const latlngs: google.maps.LatLng[] = []
        for (let point of points) {
            latlngs.push(new google.maps.LatLng(point.latitude, point.longitude))
        }
        return latlngs
    }

    handleClick(lat: number, lng: number) {
        if (this.state.mode !== MapMode.Add) {
            return
        }
        this.addMarker(new firebase.firestore.GeoPoint(lat, lng))
        this.updateEverything()
    }

    handleModeChange(_: any, value: string) {
        let mode: MapMode
        switch (value) {
            case "Drag":
                mode = MapMode.Drag
                break
            case "Add":
                mode = MapMode.Add
                break
            case "Remove":
                mode = MapMode.Remove
                break
            default:
                return
        }
        this.setState({ mode: mode })
    }

    render() {
        let center: Coords
        if (this.props.coordinates.length > 0) {
            center = { lat: this.props.coordinates[0].latitude, lng: this.props.coordinates[0].longitude }
        } else {
            center = { lat: 0, lng: 0 }
        }
        return (
            <div className="SelectionMap">
                <GoogleMapReact
                    onClick={(args) => { this.handleClick(args.lat, args.lng) }}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                    bootstrapURLKeys={{ key: 'AIzaSyBDe1KUNj3px_7kkfl7cfkrEpihDwvunt4' }}
                    center={center}
                    defaultZoom={6}
                    options={{
                        fullscreenControl: false
                    }}
                >
                </GoogleMapReact>
                <RadioGroup aria-label="mode" name="mode" value={this.state.mode} onChange={this.handleModeChange} row className="map-control">
                    <FormControlLabel value="Drag" control={<Radio />} label="Drag" />
                    <FormControlLabel value="Add" control={<Radio />} label="Add" />
                    <FormControlLabel value="Remove" control={<Radio />} label="Remove" />
                </RadioGroup>
            </div>
        )
    }
}

export default SelectionMap;
