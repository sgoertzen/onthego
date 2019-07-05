import { IGeoPoint, GeoPoint } from "./GeoPoint"
import { ITimestamp, TimeStamp } from "./TimeStamp";

export interface ITravelLocation {
    id: string
    name: string
    coords: IGeoPoint
    arrive: ITimestamp
    depart: ITimestamp
}

export class TravelLocation implements ITravelLocation {
    constructor(id: string, name: string, coords?: GeoPoint, arrive?: TimeStamp, depart?: TimeStamp) {
        this.id = id
        this.name = name
        this.coords = (coords == null) ? new GeoPoint() : coords
        this.arrive = (arrive == null) ? new TimeStamp() : arrive
        this.depart = (depart == null) ? new TimeStamp() : depart
    }
    id: string
    name: string
    coords:GeoPoint
    arrive:TimeStamp
    depart:TimeStamp
}
