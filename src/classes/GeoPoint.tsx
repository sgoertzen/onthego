export interface IGeoPoint {
    latitude: number
    longitude: number
}

export class GeoPoint implements IGeoPoint {
    constructor(lat?: number, lng?: number) {
        this.latitude = (lat == null) ? 0 : lat
        this.longitude = (lng == null) ? 0 : lng
    }
    latitude: number
    longitude: number
}