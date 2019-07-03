
// TODO: Decide if we need the class and the interface (remove one if possible)
export interface ITravelLocation {
    name: string,
    coords: IGeoPoint,
    arrive: Date,
    depart: Date
}

export interface IGeoPoint {
    latitude: number,
    longitude: number
}

export class GeoPoint implements IGeoPoint {
    latitude = 0;
    longitude = 0;
}
export class TravelLocation implements ITravelLocation {
    name = "";
    coords = new GeoPoint();
    arrive = new Date();
    depart = new Date();
}