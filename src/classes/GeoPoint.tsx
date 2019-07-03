export interface IGeoPoint {
    latitude: number
    longitude: number
}

export class GeoPoint implements IGeoPoint {
    latitude = 0
    longitude = 0
}