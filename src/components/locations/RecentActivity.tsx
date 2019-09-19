import React from "react";
import { IRecentActivity, ActivityType } from "../../util/FirestoreHelper";
import { formatDistance } from "date-fns";
import { Paper, Grid, Typography, SvgIcon } from "@material-ui/core";

class RecentActivity extends React.Component<IRecentActivity> {
    public props:IRecentActivity

    public constructor(props:IRecentActivity) {
        super(props)
        this.props = props
    }

    render() {
        let svgpath:string
        if (this.props.Type === ActivityType.Comment) {
            svgpath = "M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
        } else {
            svgpath = "M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"
        }
        return (
            <div>
                <Paper>
                    <Grid container>
                        <Grid item>
                            <SvgIcon>
                                <path d={svgpath} /><path d="M0 0h24v24H0z" fill="none" />
                            </SvgIcon>
                        </Grid>
                        <Grid item>
                            <Typography noWrap>{formatDistance(this.props.Posted.toDate(), new Date())} </Typography>
                        </Grid>
                        <Grid item>
                            <Typography noWrap>{this.props.Author} - {this.props.Snippet} </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

export default RecentActivity