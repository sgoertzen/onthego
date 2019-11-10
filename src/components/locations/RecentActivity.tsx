import React from "react";
import { IRecentActivity } from "../../util/FirestoreHelper";
import { formatDistance } from "date-fns";
import { Typography, MenuItem } from "@material-ui/core";
import './RecentActivity.css'

interface IRecentActivityProps extends IRecentActivity {
    onClick(event:React.MouseEvent<HTMLLIElement, MouseEvent>):void;
}

class RecentActivity extends React.Component<IRecentActivityProps> {
    public props:IRecentActivityProps

    public constructor(props:IRecentActivityProps) {
        super(props)
        this.props = props
    }

    render() {
        return (
            <MenuItem onClick={this.props.onClick}>
                <Typography noWrap className="activity-title">{this.props.Snippet} </Typography>
                <Typography noWrap> &nbsp; {this.props.Author} - {formatDistance(this.props.Posted.toDate(), new Date())} ago - </Typography>
            </MenuItem>
            // <div>
            //     <Paper className="activity-paper">
            //         <Grid container wrap="nowrap" spacing={2}>
            //             <Grid item>
            //                 <SvgIcon className="activity-icon">
            //                     <path d={svgpath} /><path d="M0 0h24v24H0z" fill="none" />
            //                 </SvgIcon>
            //             </Grid>
            //             <Grid item container direction="column" spacing={0}>
            //                 <Grid item>
            //                     <Typography noWrap>{this.props.Author} - {formatDistance(this.props.Posted.toDate(), new Date())} </Typography>
            //                 </Grid>
            //                 <Grid item xs zeroMinWidth>
            //                     <Typography noWrap>{this.props.Snippet} </Typography>
            //                 </Grid>
            //             </Grid>
            //         </Grid>
            //     </Paper>
            // </div>
        )
    }
}

export default RecentActivity