
export interface IPanorama {
    id: string
    title: string
    filename: string
    url: string
    coords: firebase.firestore.GeoPoint
}


export class Panorama implements IPanorama {
    constructor(id: string, title: string, filename: string, url: string, coords: firebase.firestore.GeoPoint) {
        this.id = id
        this.title = title
        this.filename = filename
        this.url = url
        this.coords = coords
    }
    id: string
    title: string
    filename: string
    url: string
    coords: firebase.firestore.GeoPoint
}