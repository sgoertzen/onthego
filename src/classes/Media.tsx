
export enum MediaType {
    Image = "image",
    Video = "video",
    Unknown = "unknown"
}

export enum ImageSize {
    Size_200 = "200",
    Size_1600 = "1600"
}

export interface IMedia {
    filename: string
    url: string
    filetype: MediaType
    percentUploaded: number
    error?: string
}

export class Media implements IMedia {
    constructor(filename: string, url: string, filetype: MediaType) {
        this.filename = filename
        this.url = url
        this.filetype = filetype
        this.percentUploaded = 0
        this.error = ""
    }
    filename = ""
    url = ""
    filetype = MediaType.Unknown
    percentUploaded = 0
    error = ""

    static imageThumbnailFilename(media: IMedia, size: ImageSize): string {
        const THUMB_PREFIX = "thumb_";
        return `${THUMB_PREFIX}${size}_${media.filename}`
    }

    static imageThumbnail(media: IMedia, size: ImageSize): string {
        const THUMB_PREFIX = "thumb_";
        return media.url.replace(media.filename, `${THUMB_PREFIX}${size}_${media.filename}`)
    }

    // Will return the correct video URL based on the browser size
    // Could optimize this to react to browser size changes
    // Something like: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
    static videoSizedURL(media: IMedia, width: number): string {
        const RENDITION_PREFIX = "rendition";
        let url:string
        if (width <= 320) {
            url = media.url.replace(media.filename, `${RENDITION_PREFIX}240p_${media.filename}`)
        } else if (width <= 480) {
            url = media.url.replace(media.filename, `${RENDITION_PREFIX}360p_${media.filename}`)
        } else if (width <= 720) {
            url = media.url.replace(media.filename, `${RENDITION_PREFIX}480p_${media.filename}`)
        } else if (width <= 1280) {
            url = media.url.replace(media.filename, `${RENDITION_PREFIX}720p_${media.filename}`)
        } else {
            url = media.url
        }
        console.log("URL is: " + url)
        return url
    }

    static videoThumbnailFilename(media: IMedia): string {
        const THUMB_PREFIX = "thumb_";
        return `${THUMB_PREFIX}${media.filename}`.replace(".mp4", ".png")
    }

    static videoThumbnail(media: IMedia): string {
        const THUMB_PREFIX = "thumb_";
        return media.url.replace(media.filename, `${THUMB_PREFIX}${media.filename}`).replace(".mp4", ".png")
    }

    static panoThumbnail(url: string, filename: string): string {
        const THUMB_PREFIX = "thumb_";
        return url.replace(filename, `${THUMB_PREFIX}${filename}`)
    }
}