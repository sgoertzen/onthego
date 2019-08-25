import { TimeStamp } from './TimeStamp';
import { deepStrictEqual } from 'assert';

it('converts to date properly', () => {
    const ts = new TimeStamp(10485856007336)
    const date = ts.toDate()
    deepStrictEqual(date, new Date("2302-04-15T01:46:47.336Z"), "TimeStamp returned an incorrect date")
});
