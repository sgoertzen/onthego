import React from 'react';
import { Card, CardActions, CardContent, Typography, Button } from '@material-ui/core';
import './TripStats.css'

interface statsProps {
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
                    <Typography className="title" color="textSecondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                        be
                    {bull}
                        nev
                    {bull}o{bull}
                        lent
                    </Typography>
                    <Typography className="pos" color="textSecondary">
                        adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                    <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    }
}
export default TripStats;