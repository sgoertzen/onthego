/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import Footer from './Footer';

storiesOf('Footer', module)
    .add('Default', () => {
        return <Footer />
    })