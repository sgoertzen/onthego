import React from 'react';
import './LocationEntry.css';
import 'date-fns';
import { Button, Container, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import * as firebase from "firebase/app";
import "firebase/firestore";


// Todo: may want to move this out of this class later
export interface ILocationCreated {
    (): void;
}

export interface locationEntryProps {
    name?: string
    latitude?: number
    longitude?: number
    arrival?: Date
    departure?: Date
    onLocationCreated: ILocationCreated
}

interface ILocationEntryState {
    name: string
    latitude: number
    longitude: number
    arrival: Date
    departure: Date
}

class LocationEntry extends React.Component {

    public state: ILocationEntryState;
    public props: locationEntryProps

    constructor(props: locationEntryProps) {
        super(props);
        this.props = props;
        this.state = {
            name: this.props.name ? this.props.name : "",
            latitude: this.props.latitude ? this.props.latitude : 0,
            longitude: this.props.longitude ? this.props.longitude : 0,
            arrival: this.props.arrival ? this.props.arrival : new Date(),
            departure: this.props.departure ? this.props.departure : new Date()
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleArrivalDateChange = this.handleArrivalDateChange.bind(this);
        this.handleDepartureDateChange = this.handleDepartureDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any): void {
        const id = event.target.id;
        const value = event.target.value;
        let stateChange: any
        switch (id) {
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
        }
        this.setState(stateChange);
    }
    handleArrivalDateChange(event: any): void {
        this.setState({ arrival: event })
    }
    handleDepartureDateChange(event: any): void {
        this.setState({ arrival: event })
    }
    handleSubmit(): void {
        console.log('form submitted')
        var db = firebase.firestore();
        db.collection("locations").add({
            name: this.state.name,
            coords: { Latitude: this.state.latitude, Longitude: this.state.longitude },
            arrive: this.state.arrival,
            depart: this.state.departure
        })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                alert("Location created!")
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <Container maxWidth="md">
                    <TextValidator
                        required
                        id="location-entry-name"
                        name="location-entry-name"
                        onChange={this.handleChange}
                        value={this.state.name}
                        label="Location Name"
                        validators={['required']}
                        errorMessages={['field required']}
                        fullWidth
                        autoFocus
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">

                            <TextValidator
                                id="location-entry-latitude"
                                name="location-entry-latitude"
                                label="Latitude"
                                value={this.state.latitude}
                                onChange={this.handleChange}
                                margin="normal"
                                validators={['required', 'isFloat', 'minNumber:-90', 'maxNumber:90']}
                                errorMessages={['field required', 'Must be a number', 'Value should be greater then -90', 'Value should be less then 90']}
                                required
                            />
                            <TextValidator
                                id="location-entry-longitude"
                                name="location-entry-longitude"
                                label="Longitude"
                                value={this.state.longitude}
                                onChange={this.handleChange}
                                margin="normal"
                                validators={['required', 'isFloat', 'minNumber:-180', 'maxNumber:180']}
                                errorMessages={['field required', 'Must be a number', 'Value should be greater then -180', 'Value should be less then 180']}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="location-entry-arrive"
                                label="Arrive"
                                value={this.state.arrival}
                                onChange={this.handleArrivalDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                minDate={new Date()}
                                format="MM/dd/yyyy"
                                required
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="location-entry-depart"
                                label="Depart"
                                value={this.state.departure}
                                onChange={this.handleDepartureDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                minDate={new Date()}
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
                        Add Location
                </Button>
                </Container>
            </ValidatorForm>
        );
    }
}
export default LocationEntry;