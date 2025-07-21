import {Datetime_global} from "./Datetime_global.js";
import {Temporal} from 'temporal-polyfill';
// change "./Datetime_global" to the actual path

// get the current time
const now = new Datetime_global();

// display the current time to the user
console.log(now.toString()); // Mon Jun 09 2025 15:21:20 UTC+0200 (Europe/Amsterdam)
// will vary for you

// use components and UTC
const date = Datetime_global.fromComponentsUTC(
    2024, // year
    2, // month
    1, // day of month
    5, // hours
    30, // minutes
    50, // seconds
    123, // millisecond
    456_789, // nanoseconds and microseconds
); // a bigint that can be used in the Datetime_global constructor.

console.log((new Datetime_global(date)).toTimezone('Asia/Tokyo').toString()); // Fri Mar 01 2024 14:30:50 UTC+0900 (Asia/Tokyo)

// you can even call Datetime_global as anon constructor
console.log(Datetime_global(0, 'America/new_York'));

console.log(); // print an empty string to space out
// ```typescript
const tz = 'Europe/Berlin', time = new Datetime_global(1749476032000, tz);

console.log(String(time)); // Mon Jun 09 2025 15:33:52 UTC+0200 (Europe/Berlin)

// set the hour to 25, which corrosponds to hour 1 the next day.
console.log(Datetime_global(time.setHours(25), tz)); // Tue Jun 10 2025 01:33:52 UTC+0200 (Europe/Berlin)

console.log(); // print an empty string to space out

// change the timezone to Asia/Riyadh
console.log(String(time.toTimezone('Asia/Riyadh')));

console.log(); // print an empty string to space out
// startOfDay
console.log(String(time.startOfDay()));
console.log(String(time.startOfDay('America/new_York'))); // Mon Jun 09 2025 23:00:00 UTC+0200 (Europe/Berlin)

console.log(time.toHTMLString());
time.setUTCHours(8, 6, 2, 0); // midnight UTC

console.log(time.toUTCString());
console.log();
console.log(time.toTimezone('Asia/Seoul').templateFormat`---\nToday is ${'"Y-M-d H:i:s" \\i\\n "e"'}

that is "${(d) => Datetime_global(d, 'UTC')}"

it supports bigints and numbers and booleans ${5n} and ${5} ${true}.

but for string interpolation use ${{raw: 'an object with a raw property'}}

you can even put Temporal Types in this: ${new Temporal.PlainDate(2025, 6, 25)}, ${new Temporal.PlainTime(21, 6, 25)}

or this ${{locale: 'de-DE'}}. this is bound to what templateFormat is called upon cloned "${function () {
    return this;
}}"

you can even "${(m) => m.toUTCString()}". the this bound is  bound to the first argument (${function (self) {
    return this === self;
}}).`, '\n\n--');
console.log((new Datetime_global(Datetime_global.now(), 'UTC')).templateFormat`
there are even constants for this

Datetime_global.FORMAT_DATETIME_GLOBALV3: ${Datetime_global.FORMAT_DATETIME_GLOBALV3};
Datetime_global.FORMAT_DATETIME_GLOBALV2: ${Datetime_global.FORMAT_DATETIME_GLOBALV2};
Datetime_global.FORMAT_DATETIME_GLOBALV1: ${Datetime_global.FORMAT_DATETIME_GLOBALV1};
Datetime_global.FORMAT_DATEV1: ${Datetime_global.FORMAT_DATEV1};
Datetime_global.FORMAT_HEADER_DEFAULT: ${Datetime_global.FORMAT_HEADER_DEFAULT};
Datetime_global.FORMAT_MYSQLI: ${Datetime_global.FORMAT_MYSQLI};
Datetime_global.FORMAT_B: ${Datetime_global.FORMAT_B}; (FORMAT_B is still being worked on);
Datetime_global.FORMAT_ISO8601: ${Datetime_global.FORMAT_ISO8601};
Datetime_global.FORMAT_MYSQL: ${Datetime_global.FORMAT_MYSQL};
Datetime_global.FORMAT_RFC2822: ${Datetime_global.FORMAT_RFC2822};

Datetime_global.FORMAT_SHORT_DATE: ${Datetime_global.FORMAT_SHORT_DATE};
Datetime_global.FORMAT_LONG_DATE: ${Datetime_global.FORMAT_LONG_DATE};
Datetime_global.FORMAT_SHORT_DATE_TIME: ${Datetime_global.FORMAT_SHORT_DATE_TIME};
Datetime_global.FORMAT_FULL_DATE_TIME: ${Datetime_global.FORMAT_FULL_DATE_TIME};
---\n`); // Datetime_global.FORMAT_OFFSET_FROM_NOW: ${Datetime_global.FORMAT_OFFSET_FROM_NOW};
// convert it to a classic Date
console.log(time.toDate());
console.log(); // print an empty string to space out
// or even an
console.log(time.toTemporalZonedDateTime());
console.log(); // print an empty string to space out
// toJSON is implicitly called here
console.log(JSON.stringify({
    Date: new Date, Datetime_global: new Datetime_global,
    Temporal_ZonedDateTime: new Temporal.ZonedDateTime(Datetime_global.now(), "UTC"),
}, null, 2));
console.log();
console.log(time.toHTMLHistoryString())
