// import the library
import {Datetime_global} from "./Datetime_global.js";
// the Datetime_global is very specific in its construction.
// meaning Datetime_global.fromComponentsUTC is used to
// construct a Datetime_global, the components are to be specified in UTC timezone
const timestampBigIntUTC = Datetime_global.fromComponentsUTC(2024, 6, 25, 14, 30, 0, 0, 0);
// construct the `Datetime_global`
const time = new Datetime_global(timestampBigIntUTC);

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

console.log(JSON.stringify(time.toTimezone('America/Anchorage')));
// json "2024-06-25T06:30:00-08:00[America/Anchorage]"

time.setHours(15); // its a bug that this sets localtime hours
console.log(time.toString());
console.log();
