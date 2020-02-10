import React from 'react';
import { storiesOf } from '@storybook/react';
import PanoMarker from './PanoMarker';

import panoImage from "../../../testdata/thumb_pano_101.jpg";

storiesOf('locations/Pano Marker', module)
    .add('standard', () => <PanoMarker text="marker name" lat={0} lng={0} onClick={() => { }} panoid="123" thumbnail={panoImage} />)
    .add('long name', () => <PanoMarker text="Really long marker name" lat={0} lng={0} onClick={() => { }} panoid="123" thumbnail={panoImage} />)
