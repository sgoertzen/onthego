import React from 'react';
import { storiesOf } from '@storybook/react';
import PostComment from './PostComment';
import { Comment } from '../../classes/Comment';
import { TimeStamp } from '../../classes/TimeStamp';

storiesOf('posts/Post Comment', module)
    .add('Default', () => {
        const c = new Comment("Bob", "I said something", new TimeStamp())
        return ( <PostComment {...c}/> )
    })
