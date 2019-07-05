export interface ITimestamp {
    toDate(): Date
    nanoseconds: number
}

export class TimeStamp implements ITimestamp {
    constructor(nanoseconds?:number) {
        this.nanoseconds = (nanoseconds == null) ? 0 : nanoseconds
    }
    nanoseconds:number;
    toDate = () => {
        return new Date(this.nanoseconds)
    }
}