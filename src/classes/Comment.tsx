import { TimeStamp } from "./TimeStamp";

export interface IComment {
    author: string
    comment: string
    posted: TimeStamp
    postid: string
    commentid: string
}

export class Comment implements IComment {
    constructor(author:string, comment:string, posted:TimeStamp) {
        this.author = author
        this.comment = comment
        this.posted = posted
        this.postid = ""
        this.commentid = ""
    }
    author: string
    comment: string
    posted: TimeStamp
    postid: string
    commentid: string
}