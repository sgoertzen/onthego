import React from 'react';
import { storiesOf } from '@storybook/react';
import MapMarker from './MapMarker';


storiesOf('locations/Map Marker', module)
    .add('standard', () => <MapMarker text="marker name" lat={0} lng={0} onLocChange={() => { }} locationid="123" />)
    .add('long name', () => <MapMarker text="Really long marker name" lat={0} lng={0} onLocChange={() => { }} locationid="123" />)
