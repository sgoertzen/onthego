/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import LocationButton from '../components/LocationButton';
import { TravelLocation } from '../classes/TravelLocation';

storiesOf('Location Button', module)
    .add('standard', () => {
        return <LocationButton location={new TravelLocation("123", "Antartica")} onLocChange={() => { }} />
    })
    .add('large name', () => {
        return <LocationButton location={new TravelLocation("123", "Antigua and Barbuda")} onLocChange={() => { }} />
    })