import React from "react"
import { formatDistance } from "date-fns"
import { Typography, Paper } from "@material-ui/core"
import './RecentActivity.css'
import { IPost } from "../../classes/Post"

interface IRecentActivityProps extends IPost {
    onClick(postID: string): void
}

class RecentActivity extends React.Component<IRecentActivityProps> {
    public props: IRecentActivityProps

    public constructor(props: IRecentActivityProps) {
        super(props)
        this.props = props
    }

    render() {
        return (
            <Paper className="activity-paper" onClick={() => { this.props.onClick(this.props.id) }}>
                <Typography variant="h6">{this.props.title}</Typography>
                <Typography variant="subtitle2" noWrap>{this.props.author} - {formatDistance(this.props.posted.toDate(), new Date())} </Typography>
            </Paper>
        )
    }
}

export default RecentActivity