
// TODO: Decide if we need the class and the interface (remove one if possible)
export interface ITravelLocation {
    name: string
    coords: IGeoPoint
    arrive: ITimestamp
    depart: ITimestamp
}

export interface IGeoPoint {
    latitude: number
    longitude: number
}

export interface ITimestamp {
    toDate():Date
    nanoseconds:number
}

export class TimeStamp implements ITimestamp {
    nanoseconds = 0;
    toDate = () => {
        return new Date(this.nanoseconds)
    }
}

export class GeoPoint implements IGeoPoint {
    latitude = 0
    longitude = 0
}
export class TravelLocation implements ITravelLocation {
    name = ""
    coords = new GeoPoint()
    arrive = new TimeStamp()
    depart = new TimeStamp()
}
