import React from 'react'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, SvgIcon } from '@material-ui/core'
import "./LocationList.css"
import { ITravelLocation } from '../../classes/TravelLocation'
import { format } from 'date-fns'
import * as firebase from "firebase/app"
import { IHistoryProps } from '../../classes/IHistoryProps'
import { FirestoreHelper } from '../../util/FirestoreHelper'


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
                <Table className="location-table" size="small">
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
                                    &nbsp;
                                    <IconButton aria-label="Edit" onClick={() => { this.edit(loc) }}>
                                        <SvgIcon width="12" height="12">
                                            <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
                                        </SvgIcon>
                                    </IconButton>
                                </TableCell>
                                <TableCell id="codeCol" align="right">{loc.countrycode}</TableCell>
                                <TableCell id="arriveCol" align="right" className="expandedColumn">{format(loc.arrive.toDate(), "MMM do, yyyy")}</TableCell>
                                <TableCell id="departCol" align="right">{format(loc.depart.toDate(), "MMM do, yyyy")}</TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" onClick={() => { this.viewLocation(loc) }}>
                                        Manage Posts
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