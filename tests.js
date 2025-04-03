// import the library
import {Datetime_global} from "./Datetime_global.js";
// the Datetime_global is very specific in its construction.
// meaning Datetime_global.fromComponentsUTC is used to
// construct a Datetime_global, the components are to be specified in UTC timezone
// const timestampBigIntUTC = Datetime_global.fromComponentsUTC(
//     2024, 2, 1, 5, 30, 50, 123, 678n);
// construct the `Datetime_global`
// let time = (new Datetime_global(Datetime_global.fromComponentsUTC(
//        70, 3, 5, 14, 30, 56)));
let time = new Datetime_global(Date.now());
//.toTimezone('UTC')
// console.log(time.toString());
// console.log(time.getDayName());
// console.log(time.getMonthName());
// console.log(time.getFullMonthName());
console.log();
console.log(time.format('[Datetime_globalV1]'));
console.log(time.format('[B]'));
console.log();
// console.log(time.format('[DateV1]'));
// console.log(time.format('[HeaderDefault]'));
// console.log();
// time = time.toTimezone('Asia/Tokyo');
// console.log(time.format('[Datetime_globalV1]'));
// console.log(time.format('[DateV1]'));
// console.log(time.format('[HeaderDefault]'));
// console.log()
// time = time.toTimezone('America/Anchorage');
// console.log(time.format('[Datetime_globalV1]'));
// console.log(time.format('[DateV1]'));
// console.log(time.format('[HeaderDefault]'));
// console.log();
