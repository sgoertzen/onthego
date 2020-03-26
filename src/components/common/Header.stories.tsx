import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from './Header';
import { StorybookHelper } from '../../util/StorybookHelper';

storiesOf('common/Header', module)
    .add('Default', () => {
        StorybookHelper.initFirebase()
        return <Header />
    })
