import React from 'react';
import './UploadingMedia.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export interface IUploadingMedia {
    filename: string
    url?: string
    percentUploaded: number
    error?: Error
}

class UploadingMedia extends React.Component {

    public props: IUploadingMedia

    constructor(props: IUploadingMedia) {
        super(props);
        this.props = props
    }

    // TODO: Move these three functions to a helper library
    getExtension(filename: string) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }
    isImage(filename: string) {
        var ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'bmp':
            case 'png':
                return true;
        }
        return false;
    }

    isVideo(filename: string) {
        var ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'm4v':
            case 'avi':
            case 'mpg':
            case 'mp4':
                // etc
                return true;
        }
        return false;
    }

    render() {
        if (this.props.error) {
            return <div>Error while uploading: {this.props.error}</div>
        }
        if (this.props.url) {
            if (this.isImage(this.props.filename)) {
                return (
                    <img src={this.props.url} alt={this.props.filename} width="250px" />
                )
            } else if (this.isVideo(this.props.filename)) {
                return (
                    <div>Video {this.props.filename} uploaded.  No preview shown.</div>
                )
            } else {
                return <div>Unknown type!</div>
            }
        }
        else {
            const text = (this.props.percentUploaded < 100) ? "Uploading " : "Loading thumbnail for "
            return (
                <div className="UploadingMedia">
                    <CircularProgressbar value={this.props.percentUploaded} text={`${this.props.percentUploaded}%`}/>
                    {text} {this.props.filename}
                </div>
            )
        }
    }
}

export default UploadingMedia