import React from 'react';
import './TripStats.css'

interface ITripStatsProps {
    daysOnTheRoad: number
    countriesVisited: number
    milesTraveled: number
}

class TripStats extends React.Component<ITripStatsProps> {

    public props: ITripStatsProps

    constructor(props: ITripStatsProps) {
        super(props);
        this.props = props;
    }

    formatMiles(value: number): string {
        const km = value * 1.60934;
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
                <div className="statsGroup">
                    <span className="statsLabel">On the road:</span>
                    <span className="statsContent">{this.props.daysOnTheRoad} days</span>
                </div>
                <div>
                    <span className="statsLabel">Visited:</span>
                    <span className="statsContent">{this.props.countriesVisited} countries</span>
                </div>
                <div>
                    <span className="statsLabel">Traveled:</span>
                    <span className="statsContent">{this.formatMiles(this.props.milesTraveled)}</span>
                </div>
            </div>
        );
    }
}
export default TripStats;