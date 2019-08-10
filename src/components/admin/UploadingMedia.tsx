import React from 'react';
import './UploadingMedia.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MediaHelper } from '../../util/MediaHelper';
import { IMedia } from '../../classes/Media';

class UploadingMedia extends React.Component {

    public props: IMedia

    constructor(props: IMedia) {
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
                    <img src={this.props.url} alt={this.props.filename} width="250px" />
                )
            } else if (MediaHelper.isVideo(this.props.filename)) {
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