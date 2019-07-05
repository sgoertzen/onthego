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
    constructor(id: string, name: string) {
        this.id = id
        this.name = name
    }
    id: string
    name: string
    coords = new GeoPoint()
    arrive = new TimeStamp()
    depart = new TimeStamp()
}
