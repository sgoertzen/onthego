import { TimeStamp } from "./TimeStamp";
import { IMedia, Media, MediaType } from "./Media"

export interface IPost {
    id: string
    title: string
    media: IMedia[]
    commentCount: number
    author: string
    details: string
    posted: TimeStamp
}

export class Post implements IPost {
    constructor(title: string, media: IMedia[], commentCount: number, author: string, posted: TimeStamp, details: string) {
        this.title = title
        this.media = media
        this.commentCount = commentCount
        this.author = author
        this.posted = posted
        this.details = details
    }
    id = ""
    title = ""
    media: IMedia[] = [new Media("", "", "", MediaType.Unknown)]
    commentCount = 0
    author = ""
    posted = new TimeStamp()
    details = ""
}
