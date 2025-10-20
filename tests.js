import {Datetime_local} from "./Datetime_local.js";

const dtl = new Datetime_local();

console.log(dtl.toString());
console.log(dtl.getTimezoneOffset());
console.log(dtl.getTimezoneId());
console.log();
console.log(dtl.setTimezone('America/New_York'));
console.log(dtl.toString());
console.log(dtl.getTimezoneOffset());
console.log(dtl.getTimezoneId());
