import React from 'react'
import { Typography } from '@material-ui/core'
import { ITravelLocation } from '../../classes/TravelLocation'
import { TimeStamp } from '../../classes/TimeStamp'
import { format } from 'date-fns'
import LocationSelector from './LocationSelector'
import { ILocChangeCallback } from '../../classes/ILocChangeCallback'
import LocationLink, { LinkDirection } from './LocationLink'
import FlagIconFactory from 'react-flag-icon-css'
import "./LocationDetails.css"

interface detailProps {
    locations?: ITravelLocation[]
    onLocChange: ILocChangeCallback
    selectedLocation?: ITravelLocation
}

export const FlagIcon = FlagIconFactory(React,  { useCssModules: false })

class LocationDetails extends React.Component {

    public props: detailProps

    constructor(props: detailProps) {
        super(props);
        this.props = props;
    }


    format2(date: TimeStamp): string {
        return format(date.toDate(), "MMM d yyyy")
    }

    render() {
        if (!this.props.selectedLocation || !this.props.locations) {
            return (<div />)
        }
        let loc = this.props.selectedLocation

        let previous: ITravelLocation | undefined, next: ITravelLocation | undefined
        let foundOurself = false
        for (let l of this.props.locations) {
            if (l.id === loc.id) {
                foundOurself = true
                continue;
            }
            if (foundOurself) {
                next = l;
                break;
            }
            previous = l;
        }
        let now = new Date()
        let inLocation = loc.arrive.toDate() < now && loc.depart.toDate() > now
        return (
            <div className="detailsPanel">
                <Typography variant="body1" className="details-intro">
                    {inLocation ? "Currently In:" : " "}
                </Typography>
                <Typography variant="h3" className="details-location">
                    <FlagIcon code={loc.code} size="lg" />&nbsp;
                    {loc.name}
                </Typography>
                <Typography component="span" className="details-arrive">
                    {loc.arrive.toDate() < now ? "Arrived" : "Arriving"}:&nbsp;
                    {this.format2(loc.arrive)}
                </Typography>
                <Typography component="span" className="details-depart">
                    {loc.depart.toDate() < now ? "Departed" : "Departing"}:&nbsp;
                    {this.format2(loc.depart)}
                </Typography>
                <div className="detailNav">
                    <LocationLink onLocChange={this.props.onLocChange} loc={previous} direction={LinkDirection.Back} />
                    <LocationSelector locs={this.props.locations} onLocChange={this.props.onLocChange} selectedLocation={this.props.selectedLocation} />
                    <LocationLink onLocChange={this.props.onLocChange} loc={next} direction={LinkDirection.Forward} />
                </div>

            </div>
        );
    }
}
export default LocationDetails;