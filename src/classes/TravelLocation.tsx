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
    id = ""
    name = ""
    coords = new GeoPoint()
    arrive = new TimeStamp()
    depart = new TimeStamp()
}
