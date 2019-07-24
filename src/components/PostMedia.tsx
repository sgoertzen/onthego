import React from 'react';
import ImageGallery from 'react-image-gallery';
import './PostMedia.css'
require('react-image-gallery/styles/css/image-gallery.css')
// import defaultImage from '../images/default.png'

interface postMediaProps {
    items: IGalleryItem[]
}
export interface IGalleryItem {
    original: string
    thumbnail: string
}

class PostMedia extends React.Component {

    public props: postMediaProps

    constructor(props: postMediaProps) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className="MediaViewer">
                <ImageGallery items={this.props.items} />
            </div>
        )
    }
}
export default PostMedia;