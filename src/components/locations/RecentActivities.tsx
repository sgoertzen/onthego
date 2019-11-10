import React from "react"
import { FirestoreHelper } from "../../util/FirestoreHelper"
import RecentActivity from "./RecentActivity"
import { Link, Popover } from "@material-ui/core"
import { IPost } from "../../classes/Post"

interface IRecentActivitiesProps {
    count: number
    recentPosts?: IPost[]
    onClick(postID: string): void
}

interface IRecentActivitiesState {
    recentPosts: IPost[]
    open: boolean
    anchorElement?: HTMLElement
}

class RecentActivities extends React.Component<IRecentActivitiesProps> {

    public props: IRecentActivitiesProps
    public state: IRecentActivitiesState

    constructor(props: IRecentActivitiesProps) {
        super(props)
        this.props = props
        this.state = {
            recentPosts: this.props.recentPosts ? this.props.recentPosts : [],
            open: false
        }
        this.recentPostsLoaded = this.recentPostsLoaded.bind(this)

        if (!this.props.recentPosts && this.props.count > 0) {
            FirestoreHelper.loadRecentPosts(this.props.count, this.recentPostsLoaded)
        }
    }

    recentPostsLoaded(posts: IPost[]) {
        console.log(posts)
        this.setState({
            recentPosts: posts
        })
    }

    handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        this.setState({
            open: !this.state.open,
            anchorElement: event.currentTarget
        })
    };

    handleClickMenuItem = (postID: string) => {
        this.setState({
            open: !this.state.open
        })
        this.props.onClick(postID)
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    render() {
        const activities: any[] = []
        for (let activity of this.state.recentPosts) {
            activities.push(<RecentActivity {...activity} onClick={this.handleClickMenuItem} />)
        }
        return (
            <>
                <Link id="headerlink" onClick={this.handleClick}>Recent Activity (new!)</Link>
                <Popover
                    id="recent-popover"
                    anchorEl={this.state.anchorElement}
                    keepMounted
                    open={this.state.open}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {activities}
                </Popover>
            </>
        )
    }
}

export default RecentActivities