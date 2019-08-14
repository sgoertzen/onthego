import { TimeStamp } from "./TimeStamp";
import { IMedia, Media, MediaType } from "./Media"

export interface IPost {
    id: string
    title: string
    media: IMedia[]
    commentcount: number
    author: string
    details: string
    posted: TimeStamp
}

export class Post implements IPost {
    constructor(title: string, media: Media[], commentcount: number, author: string, posted: TimeStamp, details: string) {
        this.title = title
        this.media = media
        this.commentcount = commentcount
        this.author = author
        this.posted = posted
        this.details = details
    }
    id = ""
    title = ""
    media: Media[] = [new Media("", "", MediaType.Unknown)]
    commentcount = 0
    author = ""
    posted = new TimeStamp()
    details = ""
}
