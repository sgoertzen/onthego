/// <reference types="googlemaps" />
import React from 'react'
import GoogleMapReact from 'google-map-react'
import { SvgIcon } from '@material-ui/core'
import './SelectionMap.css'

interface IMapProps {
    label: number
    latitude?: number
    longitude?: number
    onChange: (lat: number, lng: number) => void
}

interface ISelectionMapState {
    latitude: number
    longitude: number
}

class SelectionMap extends React.Component<IMapProps> {

    public props: IMapProps
    public state: ISelectionMapState

    constructor(props: IMapProps) {
        super(props);
        this.props = props;
        this.state = {
            latitude: this.props.latitude ? this.props.latitude : 0,
            longitude: this.props.longitude ? this.props.longitude : 0,
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(args: any) {
        const lat = args.center.lat
        const lng = args.center.lng
        if (lat !== this.props.latitude && lng !== this.props.longitude) {
            this.props.onChange(lat, lng)
        }
    }
    render() {
        return (
            <div className="SelectionMap">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBDe1KUNj3px_7kkfl7cfkrEpihDwvunt4' }}
                    center={{ lat: this.state.latitude, lng: this.state.longitude }}
                    defaultZoom={6}
                    onChange={this.onChange}
                >
                </GoogleMapReact>
                <SvgIcon className="centered">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /><path d="M0 0h24v24H0z" fill="none" />
                </SvgIcon>
                Travel Point {this.props.label}
            </div>
        )
    }
}

export default SelectionMap;
