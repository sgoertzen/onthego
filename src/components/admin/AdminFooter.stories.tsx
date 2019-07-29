/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import AdminFooter from './AdminFooter';

storiesOf('admin/Footer', module)
    .add('Logged Out', () => {
        return <AdminFooter />
    })
    .add('Logged In', () => {
        return <AdminFooter username="Bob" />
    })