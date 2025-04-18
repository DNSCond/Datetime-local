// import the library
import {Datetime_global} from "./Datetime_global.js";
// the Datetime_global is very specific in its construction.
// meaning Datetime_global.fromComponentsUTC is used to
// construct a Datetime_global, the components are to be specified in UTC timezone
const timestampBigIntUTC = Datetime_global.fromComponentsUTC(
    2024, 2, 1, 5, 30, 50, 123, 456_789);
// construct the `Datetime_global`
let time = new Datetime_global(1745193600000000000n);
console.log(time.templateFormat`---
FORMAT_DATETIME_GLOBALV2: ${Datetime_global.FORMAT_DATETIME_GLOBALV2};
FORMAT_DATETIME_GLOBALV1: ${Datetime_global.FORMAT_DATETIME_GLOBALV1};
FORMAT_DATEV1: ${Datetime_global.FORMAT_DATEV1};
FORMAT_HEADER_DEFAULT: ${Datetime_global.FORMAT_HEADER_DEFAULT};
FORMAT_MYSQLI: ${Datetime_global.FORMAT_MYSQLI};
FORMAT_B: ${Datetime_global.FORMAT_B};
FORMAT_ISO8601: ${Datetime_global.FORMAT_ISO8601};
FORMAT_MYSQL: ${Datetime_global.FORMAT_MYSQL};
FORMAT_RFC2822: ${Datetime_global.FORMAT_RFC2822};
FORMAT_SHORT_DATE: ${Datetime_global.FORMAT_SHORT_DATE};
FORMAT_LONG_DATE: ${Datetime_global.FORMAT_LONG_DATE};
FORMAT_SHORT_DATE_TIME: ${Datetime_global.FORMAT_SHORT_DATE_TIME};
FORMAT_FULL_DATE_TIME: ${Datetime_global.FORMAT_FULL_DATE_TIME};
FORMAT_OFFSET_FROM_NOW: ${Datetime_global.FORMAT_OFFSET_FROM_NOW};
---`);
