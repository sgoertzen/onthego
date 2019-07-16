import React from 'react';
import { Card, CardActions, CardContent, Typography, Button } from '@material-ui/core';
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

    render() {
        const bull = <span className="bullet">•</span>;
        return (
            <Card className="card">
                <CardContent>

                    <Typography variant="h5" component="h2">
                        Trip Stats:
                    </Typography>
                    <Typography variant="body2" component="span">
                        Days on the road:
                    </Typography>
                    <Typography component="span" gutterBottom>{this.props.daysOnTheRoad}</Typography>
                    <br />
                    <Typography variant="body2" component="span">
                        Countries Visited:
                    </Typography>
                    <Typography component="span" gutterBottom>{this.props.countriesVisited}</Typography>
                    <br />
                    <Typography variant="body2" component="span">
                        Miles Traveled:
                    </Typography>
                    <Typography component="span" gutterBottom>{this.props.milesTraveled}</Typography>
                </CardContent>
            </Card>
        );
    }
}
export default TripStats;