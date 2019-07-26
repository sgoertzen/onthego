import React from 'react';
import { Typography } from '@material-ui/core';
import { ITravelLocation } from '../classes/TravelLocation';
import { TimeStamp } from '../classes/TimeStamp';
import { format } from 'date-fns';
import "./LocationDetails.css"

interface detailProps {
    location?: ITravelLocation
}

class LocationDetails extends React.Component {

    public props: detailProps

    constructor(props: detailProps) {
        super(props);
        this.props = props;
    }

    format2(date:TimeStamp): string {
        return format(date.toDate(), "MMM d yyyy")
    }

    render() {
        if (!this.props.location){
            return (<div/>)
        }
        let loc = this.props.location
        let now = new Date()
        let inLocation = loc.arrive.toDate() < now && loc.depart.toDate() > now
        return (
            <div className="detailsPanel">
                <Typography variant="body1" className="details-intro">
                    {inLocation?"Currently In:": " "}
                </Typography>
                <Typography variant="h2" className="details-location">
                    {loc.name}
                </Typography>
                <Typography component="span" className="details-arrive">
                    {loc.arrive.toDate() < now?"Arrived":"Arriving"}:&nbsp;
                    {this.format2(loc.arrive)}
                </Typography>
                <Typography component="span" className="details-depart">
                    {loc.depart.toDate() < now?"Departed":"Departing"}:&nbsp;
                    {this.format2(loc.depart)}
                </Typography>
            </div>
        );
    }
}
export default LocationDetails;