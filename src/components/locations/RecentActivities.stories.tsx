import React from 'react';
import { storiesOf } from '@storybook/react';
import RecentActivities from './RecentActivities';
import { IRecentActivity, ActivityType } from '../../util/FirestoreHelper';
import { TimeStamp } from '../../classes/TimeStamp';


storiesOf('locations/Recent Activities', module)
    .add('standard', () => {
        const activity:IRecentActivity = {
            Author: "Bob",
            Type: ActivityType.Comment,
            Posted: new TimeStamp(),
            Snippet: "balh"
        }
        const activities = [activity]
        return (<RecentActivities count={2} activities={activities} />)
    })
