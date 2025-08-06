import {Datetime_global} from "./Datetime_global.js";
// change "./Datetime_global" to the actual path

// get the current time
const now = new Datetime_global('2025-07-21T23:59:00', 'Europe/Amsterdam');
console.log(now.toString());
const plain = now.toTemporalZonedDateTime().toPlainDateTime();
console.log(now.templateFormat`PlainDateTime: ${plain}

Datetime_global: ${Datetime_global}
Date.now: ${Date.now}
Date.UTC: ${Date.UTC}
Date: ${Date}`);
