import React from 'react'
import './LocationEntry.css'
import 'date-fns'
import { Button, Container, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import * as firebase from "firebase/app"
import { ITravelLocation } from '../../classes/TravelLocation'
import CountrySelector from './CountrySelector'
import SelectionMap from './SelectionMap'


// Todo: may want to move this out of this class later
export interface ILocationCreated {
    (): void;
}

export interface ILocationEntryProps {
    loc?: ITravelLocation
    onLocationCreated: ILocationCreated
}

interface ILocationEntryState {
    name: string
    latitude: number
    longitude: number
    arrive: Date
    depart: Date
    countrycode: string
}

class LocationEntry extends React.Component<ILocationEntryProps> {

    public state: ILocationEntryState;
    public props: ILocationEntryProps

    constructor(props: ILocationEntryProps) {
        super(props)
        this.props = props
        const loc = this.props.loc
        this.state = {
            name: loc ? loc.name : "",
            latitude: loc && loc.coords ? loc.coords.latitude : 0,
            longitude: loc && loc.coords ? loc.coords.longitude : 0,
            arrive: loc && loc.arrive ? loc.arrive.toDate() : new Date(),
            depart: loc && loc.depart ? loc.depart.toDate() : new Date(),
            countrycode: loc ? loc.countrycode : ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleArrivalDateChange = this.handleArrivalDateChange.bind(this)
        this.handleDepartureDateChange = this.handleDepartureDateChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onMapChange = this.onMapChange.bind(this)
    }

    handleChange(event: any): void {
        const name = event.target.name;
        const value = event.target.value;

        let stateChange: any
        switch (name) {
            case "location-entry-name": {
                stateChange = { name: value }
                break;
            }
            case "location-entry-latitude": {
                stateChange = { latitude: value }
                break;
            }
            case "location-entry-longitude": {
                stateChange = { longitude: value }
                break;
            }
            case "location-country": {
                stateChange = { countrycode: value }
            }
        }
        this.setState(stateChange);
    }
    handleArrivalDateChange(event: any): void {
        this.setState({ arrive: event })
    }
    handleDepartureDateChange(event: any): void {
        this.setState({ depart: event })
    }
    handleSubmit(): void {
        const db = firebase.firestore();
        if (this.props.loc) {
            const loc = this.props.loc
            db.doc(`locations/${loc.id}`)
                .update({
                    name: this.state.name,
                    coords: new firebase.firestore.GeoPoint(Number(this.state.latitude), Number(this.state.longitude)),
                    arrive: this.state.arrive,
                    depart: this.state.depart,
                    countrycode: this.state.countrycode
                })
                .then(this.props.onLocationCreated)
                .catch((error) => console.error("Error adding document: ", error))

        } else {
            db.collection("locations")
                .add({
                    name: this.state.name,
                    coords: new firebase.firestore.GeoPoint(Number(this.state.latitude), Number(this.state.longitude)),
                    arrive: this.state.arrive,
                    depart: this.state.depart,
                    countrycode: this.state.countrycode
                })
                .then(this.props.onLocationCreated)
                .catch((error) => console.error("Error adding document: ", error));
        }
    }

    onMapChange(lat: number, lng: number) {
        this.setState({
            latitude: lat,
            longitude: lng,
        })
    }

    render() {
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <Container maxWidth="md">
                    <div>
                        <TextValidator
                            required
                            id="location-entry-name"
                            name="location-entry-name"
                            onChange={this.handleChange}
                            value={this.state.name}
                            label="Location Name"
                            validators={['required']}
                            errorMessages={['field required']}
                            autoFocus
                            fullWidth
                        />
                    </div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <SelectionMap latitude={this.state.latitude} longitude={this.state.longitude} onChange={this.onMapChange} />
                            <CountrySelector
                                value={this.state.countrycode}
                                onChange={this.handleChange} />
                            <KeyboardDatePicker
                                margin="normal"
                                id="location-entry-arrive"
                                name="location-entry-arrive"
                                label="Arrive"
                                value={this.state.arrive}
                                onChange={this.handleArrivalDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                format="MM/dd/yyyy"
                                required
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="location-entry-depart"
                                name="location-entry-depart"
                                label="Depart"
                                value={this.state.depart}
                                onChange={this.handleDepartureDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                format="MM/dd/yyyy"
                                required
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Button
                        variant="contained"
                        id="location-entry-submit"
                        type="submit"
                        fullWidth
                    >
                        {this.props.loc !== undefined ? "Update Location" : "Add Location"}
                    </Button>
                </Container>
            </ValidatorForm>
        );
    }
}
export default LocationEntry;