import React from "react";
import { FirestoreHelper, IRecentActivity } from "../../util/FirestoreHelper";
import RecentActivity from "./RecentActivity";
import { Menu, Link } from "@material-ui/core";

interface IRecentActivitiesProps {
    count: number
    activities?: IRecentActivity[]
}

interface IRecentActivitiesState {
    activities: IRecentActivity[]
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
            activities: this.props.activities ? this.props.activities : [], 
            open:false
        }
        this.recentLoaded = this.recentLoaded.bind(this)
        
        if (!this.props.activities && this.props.count > 0) {
            FirestoreHelper.loadRecent(this.props.count, this.recentLoaded)
        }
    }

    recentLoaded(activity: IRecentActivity[]) {
        console.log(activity)
        this.setState({
            activities: activity
        })
    }
    
    handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        this.setState({ 
            open: !this.state.open,
            anchorElement: event.currentTarget
        })
    };
    
    handleClickMenuItem = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        this.setState({ 
            open: !this.state.open,
            anchorElement: event.currentTarget
        })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    render() {
        const activities:any[] = []
        for (let activity of this.state.activities) {
            activities.push(<RecentActivity {...activity} onClick={this.handleClickMenuItem}/>)
        }
        return (
            <>
                <Link id="headerlink" onClick={this.handleClick}>Recent Activity (new!)</Link>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorElement}
                    keepMounted
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    {activities}
                    {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem> */}
                </Menu>
            </>
        )
    }
}

export default RecentActivities