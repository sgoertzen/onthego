import React from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, SvgIcon } from '@material-ui/core';
import "./LocationList.css"
import { ITravelLocation } from '../../classes/TravelLocation';
import { format } from 'date-fns';
import * as firebase from "firebase/app";


interface ILocationListProps {
    locs?: ITravelLocation[]
}
interface ILocationListState {
    locs: ITravelLocation[]
}

class LocationList extends React.Component {

    public props: ILocationListProps
    public state: ILocationListState

    constructor(props: ILocationListProps) {
        super(props);
        this.props = props;

        let locs = this.props.locs
        if (!locs) {
            locs = []
        }
        this.state = {
            locs: locs
        }
        this.loadLocations = this.loadLocations.bind(this);
        this.locationsLoaded = this.locationsLoaded.bind(this);
        this.loadLocations();
    }

    loadLocations(): void {
        firebase.firestore().collection("locations").orderBy("arrive").get().then(this.locationsLoaded);
    }

    locationsLoaded(querySnapshot: firebase.firestore.QuerySnapshot): void {
        const locations: ITravelLocation[] = [];
        querySnapshot.forEach((doc) => {
            let loc = doc.data() as ITravelLocation
            loc.id = doc.id
            locations.push(loc)
        })
        this.setState({ locs: locations })
    }

    edit(loc: ITravelLocation): void {
        console.log("Would edit: " + loc.name);
    }

    delete(loc: ITravelLocation): void {
        console.log("Would delete: " + loc.name);
    }

    render() {
        return (
            <Paper className="root">
                <Table className="location-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Arrive</TableCell>
                            <TableCell align="right">Depart</TableCell>
                            <TableCell align="right">Latitude</TableCell>
                            <TableCell align="right">Longitude</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.locs.map(loc => (
                            <TableRow key={loc.id}>
                                <TableCell component="th" scope="row">
                                    {loc.name}
                                </TableCell>
                                <TableCell align="right">{format(loc.arrive.toDate(), "MMM do, yyyy")}</TableCell>
                                <TableCell align="right">{format(loc.depart.toDate(), "MMM do, yyyy")}</TableCell>
                                <TableCell align="right">{loc.coords.latitude}</TableCell>
                                <TableCell align="right">{loc.coords.longitude}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="Edit" onClick={() => { this.edit(loc) }}>
                                        <SvgIcon>
                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /><path d="M0 0h24v24H0z" fill="none" />
                                        </SvgIcon>
                                    </IconButton>
                                    <IconButton aria-label="Delete" onClick={() => { this.delete(loc) }}>
                                        <SvgIcon>
                                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /><path d="M0 0h24v24H0z" fill="none" />
                                        </SvgIcon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default LocationList;