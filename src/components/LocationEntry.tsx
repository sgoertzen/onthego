import React from 'react';
import './LocationEntry.css';
import 'date-fns';
import { Button, Container, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// Todo: may want to move this out of this class later
export interface ILocationCreated {
    (): void;
}

interface buttonProps {
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
    public props: buttonProps

    constructor(props: buttonProps) {
        super(props);
        this.props = props;
        this.state = {
            name: "",
            latitude: 0,
            longitude: 0,
            arrival: new Date(),
            departure: new Date()
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event:any): void {
        const id = event.target.id;
        const value = event.target.value;
        let stateChange: any
        switch (id) 
        {
            case "location-entry-name": {
                stateChange = { name: value }
                break;
            }
            case "location-entry-latitude": {
                stateChange = { latitude: value}
                break;
            }
            case "location-entry-longitude": {
                stateChange = { longitude: value}
                break;
            }
        }
        this.setState(stateChange);
    }
    handleDateChange(): void {
        console.log("date changed")
    }
    handleSubmit(): void {
        console.log('form submitted')
    }

    render() {
        let arrivalDate = new Date()
        let departureDate = new Date()
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
                                validators={['required', 'isNumber', 'minNumber:-90', 'maxNumber:90']}
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
                                validators={['required', 'isNumber', 'minNumber:-180', 'maxNumber:180']}
                                errorMessages={['field required', 'Must be a number', 'Value should be greater then -180', 'Value should be less then 180']}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="location-entry-arrive"
                                label="Arrive"
                                value={arrivalDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                required
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="location-entry-depart"
                                label="Depart"
                                value={departureDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
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
        // return(
        // <ValidatorForm
        //         ref="form"
        //         onSubmit={this.handleSubmit}
        //     >
        //         <h2>Location Entry</h2>
        //         <TextValidator
        //             label="Email"
        //             onChange={this.handleChange}
        //             name="email"
        //             value=""
        //             validators={['required', 'isEmail']}
        //             errorMessages={['this field is required', 'email is not valid']}
        //             autoComplete
        //         />
        //         <br />
        //         <TextValidator
        //             label="Password"
        //             onChange={this.handleChange}
        //             name="password"
        //             value=""
        //             validators={['required']}
        //             errorMessages={['this field is required']}
        //         />
        //         <br />
        //         <Button
        //             color="primary"
        //             variant="contained"
        //             type="submit"
        //         >
        //             Submit
        //         </Button>
        //     </ValidatorForm>
        // );
    }
}
export default LocationEntry;