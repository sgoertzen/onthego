import React from 'react';
import './UploadingMedia.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MediaHelper } from '../../util/MediaHelper';
import { IMedia } from '../../classes/Media';
import { IconButton, SvgIcon } from '@material-ui/core';

interface UploadingMediaProps extends IMedia {
    removeCallback: (media: IMedia) => void
}

class UploadingMedia extends React.Component {

    public props: UploadingMediaProps

    constructor(props: UploadingMediaProps) {
        super(props);
        this.props = props
    }

    render() {
        if (this.props.error) {
            return <div>Error while uploading: {this.props.error}</div>
        }
        if (this.props.url) {
            if (MediaHelper.isImage(this.props.filename)) {
                return (
                    <div className="UploadingContainer">
                        <img src={this.props.url} alt={this.props.filename} width="200px" className="UploadedMedia" />
                        <IconButton aria-label="Remove" onClick={() => { this.props.removeCallback(this.props) }} className="UploadingRemoveIcon">
                            <SvgIcon>
                                <path fill="#cccccc" d="M0 0h24v24H0V0z" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" /><path fill="none" d="M0 0h24v24H0z" />
                            </SvgIcon>
                        </IconButton>
                    </div>
                )
            } else if (MediaHelper.isVideo(this.props.filename)) {
                // TODO: Need to allow the removal of a video.  
                // TODO: Should show the preview image, but need to deal with the time it takes to create the thumbnail.
                return (
                    <div>Video {this.props.filename} uploaded.  No preview shown.</div>
                )
            } else {
                return <div>Unknown type!</div>
            }
        }
        else {
            const text = (this.props.percentUploaded < 100) ? "Uploading " : "Loading thumbnail for "
            const percent = Math.round(this.props.percentUploaded)
            return (
                <div className="UploadingMedia">
                    <CircularProgressbar value={percent} text={`${percent}%`} />
                    {text} {this.props.filename}
                </div>
            )
        }
    }
}

export default UploadingMedia