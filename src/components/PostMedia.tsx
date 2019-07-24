import React from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
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
        console.log("Rendering video")
        return (
          <div className='image-gallery-image'>
            {/* {
              this.state.showVideo[item.embedUrl] ?
                <div className='video-wrapper'>
                    <a
                      className='close-video'
                      onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                    >
                    </a>
                    <iframe
                      width='560'
                      height='315'
                      src={item.embedUrl}
                      frameBorder='0'
                      allowFullScreen
                    >
                    </iframe>
                </div>
              :
                <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
                  <div className='play-button'></div>
                  <img src={item.original}/>
                  {
                    item.description &&
                      <span
                        className='image-gallery-description'
                        style={{right: '0', left: 'initial'}}
                      >
                        {item.description}
                      </span>
                  }
                </a>
            } */}
          </div>
        );
      }

    buildItems(media:IGalleryItem[]): ReactImageGalleryItem[] {
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
                <ImageGallery items={this.buildItems(this.props.items)} />
            </div>
        )
    }
}
export default PostMedia;