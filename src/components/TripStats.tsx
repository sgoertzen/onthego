import React from 'react';
import { Typography } from '@material-ui/core';
import './TripStats.css'

interface statsProps {
    daysOnTheRoad: number
    countriesVisited: number
    milesTraveled: number
}

class TripStats extends React.Component {

    public props: statsProps

    constructor(props: statsProps) {
        super(props);
        this.props = props;
    }

    formatMiles(value: number): string {
        let km = value * 1.60934;
        return this.formatNumber(value) + " miles (" + this.formatNumber(km) + " km)"
    }
    formatNumber(value: number): string {
        return value.toLocaleString(undefined, {
            maximumFractionDigits: 0
        })
    }

    render() {
        return (
            <div className="statsPanel">
                <Typography variant="h5" component="h5" className="titleRow">
                    Trip Stats:
                </Typography>
                <Typography variant="body2" component="span" className="statsLabel">
                    On the road:
                </Typography>
                <Typography component="span" className="statsContent">
                    {this.props.daysOnTheRoad} days
                </Typography>
                <Typography variant="body2" component="span" className="statsLabel">
                    Visited:
                </Typography>
                <Typography component="span" className="statsContent">
                    {this.props.countriesVisited} countries
                </Typography>
                <Typography variant="body2" component="span" className="statsLabel">
                    Traveled:
                </Typography>
                <Typography component="span" className="statsContent">
                    {this.formatMiles(this.props.milesTraveled)}
                </Typography>
            </div>
        );
    }
}
export default TripStats;