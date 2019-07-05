export interface IPost {
    title: string
    photo: string
}

export class Post implements IPost {
    title = ""
    photo = ""
}
