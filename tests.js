// import the library
import {Datetime_global} from "./Datetime_global.js";
// the Datetime_global is very specific in its construction.
// meaning Datetime_global.fromComponentsUTC is used to
// construct a Datetime_global, the components are to be specified in UTC timezone
const timestampBigIntUTC = Datetime_global.fromComponentsUTC(
    2024, 0, 1, 5, 0, 0, 0, 0n);
// construct the `Datetime_global`
const time = (new Datetime_global(timestampBigIntUTC)).toTimezone('America/New_York');
console.log(Datetime_global(timestampBigIntUTC));
console.log(time.toString());
time.setHours(10, 30);
console.log(time.toString());
time.setHours(30, 30);
console.log(time.toString());
console.log();
