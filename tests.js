import {Datetime_global} from "./Datetime_global.js";
// change "./Datetime_global" to the actual path

// get the current time
const now = new Datetime_global('2025-07-21T23:59:00', 'Europe/Amsterdam');
console.log(now.toString(), now.americanFormat);
now.minutesAfterMidnight += 2;
console.log(now.toString(), now.americanFormat);
