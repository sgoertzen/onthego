import { ITimeStamp, TimeStamp } from "./TimeStamp"
import * as firebase from 'firebase/app'

export interface ITravelLocation {
    id: string
    name: string
    coordinates: firebase.firestore.GeoPoint[]
    arrive: ITimeStamp
    depart: ITimeStamp
    distance: number
    countrycode: string
}

export class TravelLocation implements ITravelLocation {
    constructor(id: string, name: string, coordinates?: firebase.firestore.GeoPoint[], arrive?: TimeStamp, depart?: TimeStamp) {
        this.id = id
        this.name = name
        this.coordinates = (coordinates === undefined) ? [] : coordinates
        this.arrive = (arrive === undefined) ? new TimeStamp() : arrive
        this.depart = (depart === undefined) ? new TimeStamp() : depart
        this.distance = 0
        this.countrycode = ""
    }
    id: string
    name: string
    coordinates: firebase.firestore.GeoPoint[]
    arrive: TimeStamp
    depart: TimeStamp
    distance: number
    countrycode: string

    static encode(name: string): string {
        return name.replace(' ', '-').toLowerCase()
    }
}


