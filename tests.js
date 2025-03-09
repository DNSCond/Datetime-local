import {Datetime_global} from "./Datetime_global.js";
// tests are written here
const time = new Datetime_global(Datetime_global.fromComponentsUTC(2024, 6, 25, 14, 30, 0, 0, 0));
console.log(time.toString(), time.toHTMLString());
console.log(time.toTimezone('America/New_York').toString());
console.log(time.toTimezone('Asia/Tokyo').toString());
console.log(time.toTimezone('UTC').toString());
console.log(time.toTimezone('Asia/Tokyo').toHTMLString());
console.log(time.toTimezone('UTC').toHTMLString());
console.log(time.toTimezone('America/Anchorage').toLocaleString());
console.log(JSON.stringify(time.toTimezone('America/Anchorage')));
console.log();
