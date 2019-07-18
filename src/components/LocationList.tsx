import React from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import "./LocationList.css"
import { ITravelLocation } from '../classes/TravelLocation';
import { format } from 'date-fns';


interface ILocationListProps {
    locs: ITravelLocation[]
}

class LocationList extends React.Component {

    public props: ILocationListProps
    
    constructor(props: ILocationListProps) {
        super(props);
        this.props = props;
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
                <TableCell align="right">Post Count</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.locs.map(loc => (
                <TableRow key={loc.id}>
                    <TableCell component="th" scope="row">
                    {loc.name}
                    </TableCell>
                    <TableCell align="right">{format(loc.arrive.toDate(),"MMM do, yyyy")}</TableCell>
                    <TableCell align="right">{format(loc.depart.toDate(), "MMM do, yyyy")}</TableCell>
                    <TableCell align="right">{loc.coords.latitude}</TableCell>
                    <TableCell align="right">{loc.coords.longitude}</TableCell>
                    <TableCell align="right">0</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </Paper>
        );
    }
}

export default LocationList;