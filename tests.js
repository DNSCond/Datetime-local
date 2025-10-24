import {Datetime_local} from "./Datetime_local.js";

const dtl = new Datetime_local('2024-02-29'), d = new Date(dtl);
console.log(dtl.setHours(5, 30, 45, 60) === d.setHours(5, 30, 45, 60));
console.log(String(dtl));
console.log(String(d));
