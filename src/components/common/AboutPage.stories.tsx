
import React from 'react';
import { storiesOf } from '@storybook/react';
import AboutPage from './AboutPage';

storiesOf('common/About page', module)
    .add('Default', () => {
        return <AboutPage />
    })