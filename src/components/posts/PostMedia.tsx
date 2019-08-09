import React from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
//import ReactPlayer from 'react-player'
import FilePlayer from 'react-player'
import './PostMedia.css'
import { IMedia, MediaType, ImageSize, Media } from '../../classes/Media';
require('react-image-gallery/styles/css/image-gallery.css')


interface postMediaProps {
    items: IMedia[]
}

class PostMedia extends React.Component {

    public props: postMediaProps

    constructor(props: postMediaProps) {
        super(props);
        this.props = props;
    }

    _renderVideo(item: ReactImageGalleryItem) {
        console.log("Rendering video", item.original)
        return (
            <FilePlayer url={item.original} controls={true} width="98%" height="98%" />
        );
    }

    buildItems(media: IMedia[]): ReactImageGalleryItem[] {
        let items: ReactImageGalleryItem[] = []
        for (let med of media) {
            if (med.filetype === MediaType.Image) {
                items.push({
                    original: Media.imageThumbnail(med, ImageSize.Size_1600), // prefix with thumb_1600_
                    thumbnail: Media.imageThumbnail(med, ImageSize.Size_200) // prefix with thumb_200_
                })
            } else if (med.filetype === MediaType.Video) {
                items.push({
                    thumbnail: Media.videoThumbnail(med), // prefix with thumb_ and switch extension to .png
                    original: med.url,
                    description: 'Render custom slides within the gallery',
                    renderItem: this._renderVideo.bind(this)
                })
            }
        }
        return items
    }

    render() {
        if (this.props.items.length === 0) {
            return <div />
        }
        return (
            <div className="MediaViewer">
                <ImageGallery items={this.buildItems(this.props.items)} thumbnailPosition="top" showPlayButton={false} />
            </div>
        )
    }
}
export default PostMedia;