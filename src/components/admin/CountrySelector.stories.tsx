/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import AdminFooter from './AdminFooter';
import CountrySelector from './CountrySelector';

storiesOf('admin/Country Selector', module)
    .add('No selection', () => {
        return <CountrySelector onChange={() => { }} />
    })
    .add('Italy', () => {
        return <CountrySelector onChange={() => { }} value="it" />
    })