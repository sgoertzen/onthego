import { ITimeStamp, TimeStamp } from "./TimeStamp"
import firebase from "firebase";

export interface ITravelLocation {
    id: string
    name: string
    coords: firebase.firestore.GeoPoint
    arrive: ITimeStamp
    depart: ITimeStamp
}

export class TravelLocation implements ITravelLocation {
    constructor(id: string, name: string, coords?: firebase.firestore.GeoPoint, arrive?: TimeStamp, depart?: TimeStamp) {
        this.id = id
        this.name = name
        this.coords = (coords == null) ? new firebase.firestore.GeoPoint(0, 0) : coords
        this.arrive = (arrive == null) ? new TimeStamp() : arrive
        this.depart = (depart == null) ? new TimeStamp() : depart
    }
    id: string
    name: string
    coords: firebase.firestore.GeoPoint
    arrive: TimeStamp
    depart: TimeStamp
}
