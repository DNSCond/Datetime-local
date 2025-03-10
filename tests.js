import {Datetime_global} from "./Datetime_global.js";
import {Temporal} from "@js-temporal/polyfill";
// tests are written here

// the Datetime_global is very specific in its construction. meaning Datetime_global.fromComponentsUTC is used to
// construct a Datetime_global, the components are to be specified in UTC timwezone
const timestampBigIntUTC = Datetime_global.fromComponentsUTC(2024, 6, 25, 14, 30, 0, 0, 0n);
// construct the class
let time = new Datetime_global(timestampBigIntUTC);

// return a string like Tue Jun 25 2024 14:30:00 UTC+0000 (UTC) <time datetime="2024-06-25T14:30:00.000Z">Tue Jun 25 2024 14:30:00 UTC+0000 (UTC)</time>
// in your local time
console.log(time.toString(), time.toHTMLString());

// change the timezone to america newyork and return its time
console.log(time.toTimezone('America/New_York').toString());
// change the timezone to asia tokyo and return its time
console.log(time.toTimezone('Asia/Tokyo').toString());
// change the timezone to UTC and return its time
console.log(time.toTimezone('UTC').toString());
// Asia/Tokyo, the time specified but as a html insertable
console.log(time.toTimezone('Asia/Tokyo').toHTMLString());
// UTC, the time specified but as a html insertable
console.log(time.toTimezone('UTC').toHTMLString());
// an random timezone
console.log(time.toTimezone('America/Anchorage').toLocaleString());
// json "2024-06-25T06:30:00-08:00[America/Anchorage]"
console.log(JSON.stringify(time.toTimezone('America/Anchorage')));

console.log((new Datetime_global()).toHTMLString());
// if timeLeft === timeRight, then this expression should also be true, always
const timeLeft = (new Datetime_global(new Date('2024'))).toString(),
    timeRight = Datetime_global(new Date('2024'));
console.log(timeLeft === timeRight);
// this is because Datetime_global.prototype.toString.call is called when Datetime_global is called without new

// this works, assuming an object with a key of `time` points to an object with an object with `epochNanoseconds` which is a bigint gets passed
time = Temporal.ZonedDateTime.from({
    year: 2024,
    month: 7,
    day: 15,
    hour: 14,
    minute: 25,
    second: 50,
    nanosecond: 50550400,
    timeZone: Temporal.Now.timeZoneId(),
});
console.log(Datetime_global.prototype.toString.call(Object.assign({time}, Datetime_global.prototype)));
console.log(Datetime_global.prototype.toJSON.call({time}));

console.log(Datetime_global.prototype.toJSON.call(new Datetime_global(Datetime_global.fromComponentsUTC(
    2024, 7, 15, 14, 25, 50, 0, 50550400n,
))));
console.log();
