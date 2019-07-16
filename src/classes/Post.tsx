export interface IPost {
    title: string
    mediaURLs: string[]
    commentCount: number
    author: string
    posted: Date
}

export class Post implements IPost {
    constructor(title: string, mediaURLs: string[], commentCount: number, author:string, posted: Date) {
        this.title = title
        this.mediaURLs = mediaURLs
        this.commentCount = commentCount
        this.author = author
        this.posted = posted
    }
    title = ""
    mediaURLs = [""]
    commentCount = 0
    author = ""
    posted = new Date("12/12/2012")
}
