// import the library
import {Datetime_global} from "./Datetime_global.js";
// the Datetime_global is very specific in its construction.
// meaning Datetime_global.fromComponentsUTC is used to
// construct a Datetime_global, the components are to be specified in UTC timezone
const timestampBigIntUTC = Datetime_global.fromComponentsUTC(2024, 6, 25, 14, 30, 0, 0, 0n);
// construct the `Datetime_global`
const time = new Datetime_global(timestampBigIntUTC);

console.log(time.toString());
console.log(time.toTimezone('America/New_York').toString());
const date = time.toTimezone('America/New_York');
date.setHours(10,  30);
console.log(date.toString());
console.log();
