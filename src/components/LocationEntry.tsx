import React from 'react';
import './LocationEntry.css';
import { TextField, Button, Container, Grid } from '@material-ui/core';
import 'date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// Todo: may want to move this out of this class later
export interface ILocationCreated {
    (): void;
}

interface buttonProps {
    onLocationCreated: ILocationCreated
}

class LocationEntry extends React.Component {

    public props: buttonProps

    constructor(props: buttonProps) {
        super(props);
        this.props = props;
    }

    handleDateChange(): void {
        console.log("date changed")
    }

    render() {
        let arrivalDate = new Date()
        let departureDate = new Date()
        return (
            <form>
                <Container maxWidth="md">
                    <TextField
                        required
                        id="location-entry-name"
                        label="Location Name"
                        fullWidth
                        autoFocus
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">

                            <TextField
                                id="location-entry-latitude"
                                label="Latitude"
                                defaultValue=""
                                margin="normal"
                                required
                            />
                            <TextField
                                id="location-entry-longitude"
                                label="Longitude"
                                defaultValue=""
                                margin="normal"
                                required
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
                    <Button variant="contained" id="location-entry-submit" fullWidth>
                        Add Location
                </Button>
                </Container>
            </form>
        );
    }
}
export default LocationEntry;