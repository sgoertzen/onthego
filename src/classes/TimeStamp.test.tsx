import { TimeStamp } from './TimeStamp';
import { deepEqual } from 'assert';

it('converts to date properly', () => {
    let ts = new TimeStamp(10485856007336)
    let date = ts.toDate()
    deepEqual(date, new Date("2302-04-15T01:46:47.336Z"), "Timestamp returned an incorrect date")
});
