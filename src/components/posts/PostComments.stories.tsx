import React from 'react';
import { storiesOf } from '@storybook/react';
import PostComments from './PostComments';

storiesOf('posts/Post Comments', module)
    .add('Default', () => <PostComments />)