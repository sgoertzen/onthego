import React from 'react';
import './LocationEntry.css';


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
        if (this.props.percentUploaded < 100) {
            // TODO: LIMIT THIS TO 2 decimal places or put in place a progress pie chart
            return (
                <div>Uploading {this.props.filename} - {this.props.percentUploaded.toFixed(1)}% done.</div>
            )
        }
        if (this.props.url) {
            if (this.isImage(this.props.filename)) {
                return (
                    <img src={this.props.url} alt={this.props.filename} width="100px" />
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
            return (
                <div>Upload complete, loading thumbnail</div>
            )
        }
    }
}

export default UploadingMedia