import React from 'react'
import { storiesOf } from '@storybook/react'
import RecentActivities from './RecentActivities'
import { TimeStamp } from '../../classes/TimeStamp'
import { Post } from '../../classes/Post'

storiesOf('locations/Recent Activities', module)
    .add('standard', () => {
        const post = new Post("Sample title", [], 0, "Sally", new TimeStamp(new Date("06/06/2019").getTime()), "")
        const posts = [post]
        return (<div style={{ backgroundColor: 'blue' }}>
            <RecentActivities count={2} recentPosts={posts} onClick={(id) => console.log(id + 'clicked')} />
        </div>)
    })
