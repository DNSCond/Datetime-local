import {Datetime_local} from "./Datetime_local.js";

const dtl = new Datetime_local(), d = new Date(dtl);
console.log(dtl.setHours(0, 400, 0, 0) === d.setHours(0, 400, 0, 0));
console.log(String(dtl));
console.log(String(d));
