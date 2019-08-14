import React from 'react';
import { storiesOf } from '@storybook/react';
import PostComments from './PostComments';
import { Comment } from '../../classes/Comment';
import { TimeStamp } from '../../classes/TimeStamp';

storiesOf('posts/Post Comments', module)
    .add('Default', () => {
        const comments = [
            new Comment("Sally", "I like cheese", new TimeStamp()),
            new Comment("Sally", "I like cheese", new TimeStamp()),
            new Comment("Sally", "I like cheese", new TimeStamp()),
            new Comment("Sally", "I like cheese", new TimeStamp()),
        ]
        return (<PostComments comments={comments} />)
    })
