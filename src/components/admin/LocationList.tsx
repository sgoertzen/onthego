import React from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import "./LocationList.css"
import { ITravelLocation } from '../../classes/TravelLocation';
import { format } from 'date-fns';
import * as firebase from "firebase/app";
import { IHistoryProps } from '../../classes/IHistoryProps';
import { FirestoreHelper } from '../../util/FirestoreHelper';


interface ILocationListProps {
    locs?: ITravelLocation[]
    history: IHistoryProps
}
interface ILocationListState {
    locs: ITravelLocation[]
}

class LocationList extends React.Component<ILocationListProps> {

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
        if (locs.length === 0) {
            FirestoreHelper.loadLocations((locations) => {
                this.setState({ locs: locations })
            })
        }
    }

    createLocation() {
        this.props.history.push('/notadmin/locationentry')
    }

    viewLocation(loc: ITravelLocation) {
        this.props.history.push(`/notadmin/location/${loc.id}`)
    }

    edit(loc: ITravelLocation): void {
        this.props.history.push(`/notadmin/locationentry/${loc.id}`)
    }

    delete(loc: ITravelLocation): void {
        const name = loc.name
        // TODO: Figure out how to show a confirmation dialog
        if (false) {
            // if this one doens't work, use the one commented out below
            firebase.firestore().collection("locations").doc(loc.id).delete().then(function() {
                console.log("Location '" + name + "' removed")
            }).catch(function(error) {
                console.error("Error removing location", error)
            })
            // firebase.firestore().collection("locations").where("id", "==", loc.id).get().then(function(querySnapshot) {
            //     querySnapshot.forEach(function(doc) {
            //         doc.ref.delete();
            //     })
            // })
        }
        console.log("Would delete: " + loc.name);
    }

    render() {
        return (
            <Paper className="root">
                <Button variant="outlined" onClick={() => { this.createLocation() }}>
                    Add Location
                </Button>
                <Table className="location-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell id="codeCol" align="right">Code</TableCell>
                            <TableCell id="arriveCol" align="right" className="expandedColumn">Arrive</TableCell>
                            <TableCell id="departCol" align="right">Depart</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.locs.map(loc => (
                            <TableRow key={loc.id}>
                                <TableCell component="th" scope="row">
                                    {loc.name}
                                </TableCell>
                                <TableCell id="codeCol" align="right">{loc.countrycode}</TableCell>
                                <TableCell id="arriveCol" align="right" className="expandedColumn">{format(loc.arrive.toDate(), "MMM do, yyyy")}</TableCell>
                                <TableCell id="departCol" align="right">{format(loc.depart.toDate(), "MMM do, yyyy")}</TableCell>
                                <TableCell align="center">

                                    <Button variant="outlined" onClick={() => { this.edit(loc) }}>
                                        Edit
                                    </Button> &nbsp;
                                    <Button variant="outlined" onClick={() => { this.viewLocation(loc) }}>
                                        Manage
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default LocationList;