import React from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import FilePlayer from 'react-player'
import './PostMedia.css'
import { IMedia, MediaType, ImageSize, Media } from '../../classes/Media';
import 'react-image-gallery/styles/css/image-gallery.css'


interface IPostMediaProps {
    items: IMedia[]
}

class PostMedia extends React.Component<IPostMediaProps> {

    public props: IPostMediaProps

    constructor(props: IPostMediaProps) {
        super(props);
        this.props = props;
    }

    _renderVideo(item: ReactImageGalleryItem) {
        return (
            <FilePlayer url={item.original} controls={true} width="98%" height="98%" />
        );
    }

    buildItems(media: IMedia[]): ReactImageGalleryItem[] {
        const items: ReactImageGalleryItem[] = []
        for (const med of media) {
            if (med.filetype === MediaType.Image) {
                items.push({
                    original: Media.imageSizedURL(med, window.innerWidth),
                    thumbnail: Media.imageThumbnail(med, ImageSize.Size_200)
                })
            } else if (med.filetype === MediaType.Video) {
                items.push({
                    thumbnail: Media.videoThumbnail(med), // prefix with thumb_ and switch extension to .png
                    original: Media.videoSizedURL(med, window.innerWidth),
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