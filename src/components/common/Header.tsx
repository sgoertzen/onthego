import React from 'react'
import { Typography, Link } from '@material-ui/core'
import { IHistoryProps } from '../../classes/IHistoryProps'
import RecentActivities from './RecentActivities'
import './Header.css'

interface IHeaderProps {
    history?: IHistoryProps
}

class Header extends React.Component<IHeaderProps> {

    public props: IHeaderProps

    constructor(props: IHeaderProps) {
        super(props)
        this.props = props
        this.redirect = this.redirect.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    redirect(path: string) {
        if (this.props.history) {
            this.props.history.push(path)
        }
    }
    onClick(postID: string): void {
        this.redirect("/post/" + postID)
    }

    render() {
        return (
            <div className="header">
                <Typography variant="h4" onClick={() => { this.redirect("/") }} className="headerlogo">
                    Goertzens on the Go
                </Typography>
                <div className="headerlinks">
                    <Link id="headerlink" onClick={() => { this.redirect("/") }}>Home</Link>
                    <RecentActivities onClick={this.onClick} count={8} />
                    <Link id="headerlink" onClick={() => { this.redirect("/map") }}>Map</Link>
                    <Link id="headerlink" onClick={() => { this.redirect("/schedule") }}>Schedule</Link>
                    <Link id="headerlink" onClick={() => { this.redirect("/about") }}>About</Link>
                </div>
            </div>
        );
    }
}
export default Header;