// import the library
import {Datetime_global} from "./Datetime_global.js";
// the Datetime_global is very specific in its construction.
// meaning Datetime_global.fromComponentsUTC is used to
// construct a Datetime_global, the components are to be specified in UTC timezone
// const timestampBigIntUTC = Datetime_global.fromComponentsUTC(
//     2024, 2, 1, 5, 30, 50, 123, 678n);
// construct the `Datetime_global`
const time = (new Datetime_global()).toTimezone('America/New_York');
// console.log(time.toString());console.log(time.getDayName());console.log(time.getMonthName());console.log(time.getFullMonthName());
console.log(time.getLocaleOffset("long"));
console.log(time.getLocaleOffset("short"));
console.log(time.getLocaleOffset("shortOffset"));
console.log(time.getLocaleOffset("longOffset"));
console.log(time.getLocaleOffset("shortGeneric"));
console.log(time.getLocaleOffset("longGeneric"));
console.log();

