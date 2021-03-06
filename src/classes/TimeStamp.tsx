export interface ITimeStamp {
    toDate(): Date
    nanoseconds: number
}

export class TimeStamp implements ITimeStamp {
    constructor(nanoseconds?: number) {
        this.nanoseconds = (nanoseconds === undefined) ? 0 : nanoseconds
    }
    nanoseconds: number;
    toDate = () => {
        return new Date(this.nanoseconds)
    }
}