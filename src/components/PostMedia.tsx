import React from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
//import ReactPlayer from 'react-player'
import FilePlayer from 'react-player'
import './PostMedia.css'
require('react-image-gallery/styles/css/image-gallery.css')


interface postMediaProps {
    items: IGalleryItem[]
}
export interface IGalleryItem {
    url: string
    thumbnail: string
    type: MediaType
}
export enum MediaType {
    Image,
    Video
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

    buildItems(media: IGalleryItem[]): ReactImageGalleryItem[] {
        let items: ReactImageGalleryItem[] = []
        for (let med of media) {
            if (med.type === MediaType.Image) {
                items.push({
                    original: med.url,
                    thumbnail: med.thumbnail
                })
            } else if (med.type === MediaType.Video) {
                items.push({
                    thumbnail: med.thumbnail,
                    original: med.url,
                    description: 'Render custom slides within the gallery',
                    renderItem: this._renderVideo.bind(this)
                })
            }
        }
        return items
    }

    render() {
        return (
            <div className="MediaViewer">
                <ImageGallery items={this.buildItems(this.props.items)} thumbnailPosition="top" showPlayButton={false} />
            </div>
        )
    }
}
export default PostMedia;