import React from 'react'
import { IPanorama } from '../../classes/Panorama'
import { Paper, Button, TableBody, Table, TableHead, TableCell, TableRow, IconButton, SvgIcon } from '@material-ui/core'
import { IHistoryProps } from '../../classes/IHistoryProps'
import { FirestoreHelper } from '../../util/FirestoreHelper'

interface IPanoramaListProps {
    panos: IPanorama[]
    history: IHistoryProps
}
interface IPanoramaListState {
    panos: IPanorama[]
}

class PanoramaList extends React.Component<IPanoramaListProps> {
    public props: IPanoramaListProps
    public state: IPanoramaListState

    constructor(props: IPanoramaListProps) {
        super(props)
        this.props = props

        let panos = this.props.panos
        if (!panos) {
            panos = []
        }
        this.state = {
            panos: panos
        }
        if (panos.length === 0) {
            FirestoreHelper.loadPanoramas((p) => {
                this.setState({ panos: p })
            })
        }
    }

    uploadPanorama() {
        // TODO: Show upload window
        // Upon file selection, upload immediately
        // When upload complete, reload list (might need a delay on this so function can do its thing)
    }

    edit(pano: IPanorama) {
        this.props.history.push(`/notadmin/panoentry/${pano.id}`)

    }

    render() {
        return (
            <Paper className="root">
                <Button variant="outlined" onClick={() => { this.uploadPanorama() }}>
                    Upload Panorama
                </Button>

                <Table className="location-table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Filename</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell id="departCol" align="right">Coordinates</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {this.state.panos.map(pano => (
                            <TableRow key={pano.id}>
                                <TableCell component="th" scope="row">
                                    {pano.filename}
                                    &nbsp;
                                    <IconButton aria-label="Edit" onClick={() => { this.edit(pano) }}>
                                        <SvgIcon width="12" height="12">
                                            <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
                                        </SvgIcon>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">{pano.title}</TableCell>
                                <TableCell id="codeCol" align="right">{pano.coords.latitude}, {pano.coords.longitude}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default PanoramaList