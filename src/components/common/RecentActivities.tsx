import React from "react"
import { FirestoreHelper } from "../../util/FirestoreHelper"
import RecentActivity from "./RecentActivity"
import { Link, Popover, SvgIcon } from "@material-ui/core"
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
        for (let post of this.state.recentPosts) {
            activities.push(<RecentActivity key={post.id} {...post} onClick={this.handleClickMenuItem} />)
        }
        return (
            <>
                <Link id="headerlink" onClick={this.handleClick}>Recent Activity&nbsp;
                    <SvgIcon>
                        <path d="M0 0h24v24H0z" fill="none" /><path fill="#FFFFFF" d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M13,17H11V15H13V17M13,13H11V7H13V13Z" />
                    </SvgIcon>
                </Link>
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