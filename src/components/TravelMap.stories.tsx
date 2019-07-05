import React from 'react';
import { storiesOf } from '@storybook/react';
import TravelMap from './TravelMap';


storiesOf('Travel Map', module)
    .add('no locations', () => <TravelMap locations={[]} onLocChange={() => { }} />)
