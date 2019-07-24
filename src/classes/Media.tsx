
export enum MediaType {
    Image = "image",
    Video = "video",
    Unknown = "unknown"
}

export interface IMedia {
    filename: string
    url: string
    thumbnail: string
    filetype: MediaType
    percentUploaded: number
    error?: string
}

export class Media implements IMedia {
    constructor(filename: string, url: string, thumbnail: string, filetype: MediaType) {
        this.filename = filename
        this.url = url
        this.thumbnail = thumbnail
        this.filetype = filetype
        this.percentUploaded = 0
        this.error = ""
    }
    filename = ""
    url = ""
    thumbnail = ""
    filetype = MediaType.Unknown
    percentUploaded = 0
    error = ""
}