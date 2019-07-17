import React from 'react';
import { storiesOf } from '@storybook/react';
import TripStats from './TripStats';


storiesOf('Trip Stats', module)
    .add('default', () => {
        return <TripStats daysOnTheRoad={5} countriesVisited={2} milesTraveled={1000} />
    })
