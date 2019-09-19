import React from "react";
import { FirestoreHelper, IRecentActivity } from "../../util/FirestoreHelper";
import RecentActivity from "./RecentActivity";

interface IRecentActivityProps {
    count: number
    activities?: IRecentActivity[]
}

interface IRecentActivityState {
    activities: IRecentActivity[]
}

class RecentActivities extends React.Component<IRecentActivityProps> {

    public props: IRecentActivityProps
    public state: IRecentActivityState

    constructor(props: IRecentActivityProps) {
        super(props)
        this.props = props
        this.state = {activities: this.props.activities ? this.props.activities : []}
        this.recentLoaded = this.recentLoaded.bind(this)
        
        if (!this.props.activities) {
            FirestoreHelper.loadRecent(this.props.count, this.recentLoaded)
        }
    }

    recentLoaded(activity: IRecentActivity[]) {
        this.setState({
            activity: activity
        })
    }

    render() {
        const activities:any[] = []
        for (let activity of this.state.activities) {
            activities.push(<RecentActivity {...activity}/>)
        }
        return (
            <div>Recent Activity
                {activities}
            </div>
        )
    }
}

export default RecentActivities