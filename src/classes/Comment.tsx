import { TimeStamp } from "./TimeStamp";

export interface IComment {
    author: string
    comment: string
    posted: TimeStamp
    postid: string
    commentid: string
    edited: boolean
}

export class Comment implements IComment {
    constructor(author:string, comment:string, posted:TimeStamp) {
        this.author = author
        this.comment = comment
        this.posted = posted
        this.postid = ""
        this.commentid = ""
        this.edited = false
    }
    author: string
    comment: string
    posted: TimeStamp
    postid: string
    commentid: string
    edited: boolean
}