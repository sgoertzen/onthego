export interface IPost {
    title: string
    photo: string
}

export class Post implements IPost {
    constructor(title: string, photo: string) {
        this.title = title
        this.photo = photo
    }
    title = ""
    photo = ""
}
