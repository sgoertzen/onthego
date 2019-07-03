export interface ITimestamp {
    toDate(): Date
    nanoseconds: number
}

export class TimeStamp implements ITimestamp {
    nanoseconds = 0;
    toDate = () => {
        return new Date(this.nanoseconds)
    }
}