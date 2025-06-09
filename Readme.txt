# Datetime_global: A Simplified Interface for Date and Temporal Timezones

`Datetime_global` is a JavaScript library that provides a `Date`-like interface for handling dates and times with robust
timezone support, built on the [Temporal API](https://tc39.es/proposal-temporal/docs/). It simplifies working with
timezones while maintaining high precision (nanoseconds) and compatibility with modern web applications.

## Why Use This Package?

While the `Temporal` API offers advanced date-time functionality, `Datetime_global` provides a familiar `Date`-like API
with nonlocal timezone support. Use it when you need:

- A simple, `Date`-compatible interface.
- Timezone-aware date-time operations.
- Nanosecond precision for high-accuracy applications.

For complex temporal operations, consider using `Temporal` directly.
## installation

```bash
npm install datetime-global
```

Include the Temporal polyfill for environments without native Temporal support:

## `Datetime_global` Construction

first import the library

```typescript
import {Datetime_global} from "./Datetime_global.js";
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

// you can even call Datetime_global as a non constructor
console.log(Datetime_global(0,'America/new_York')); // Wed Dec 31 1969 19:00:00 UTC-0500 (America/New_York)
```

## `Datetime_global` Construction

The Datetime_global constructor accepts various inputs as the first argument and an optional timezone as the second:

Inputs:

- `Temporal.ZonedDateTime`: Used directly (nanoseconds, will ignore the specified timezone, convert to Temporal.Instant
  to use argument 2).
- `Temporal.Instant`: From epoch nanoseconds.
- `Date`, `Datetime_global`, `Datetime_local`: From epoch milliseconds.
- bigint: Epoch nanoseconds.
- number: Epoch milliseconds.
- string: Parsed via Date.parse (ISO 8601 recommended).
- `undefined`: Current time.

Timezone: A Temporal.TimeZoneLike or IANA timezone string (e.g., UTC, America/New_York). Defaults to local timezone.

When called with new, it returns a Datetime_global instance. Without new, it returns a string representation.

## .methods

an overview of the public api. note that semver version 0. meaning anything can change.

### Getters:

- `getFullYear(): number` - Full year (e.g., 2025).
- `getYear(): number` - Year minus 1900.
- `getMonth(): number` - Month (0-11).
- `getDate(): number` - Day of month (1-31).
- `getDay(): number` - Day of week (0=Sunday, ..., 6=Saturday).
- `getHours(): number`, `getMinutes(): number`, `getSeconds(): number`, `getMilliseconds(): number` - Time components.
  `getNanoseconds(): bigint` - Sub-millisecond components.
- `getTimezoneOffset(): number` - Timezone offset in minutes (positive west of UTC).
- `valueOf(): number`, `getTime(): number` - Milliseconds since epoch.

UTC Variants: Each getter (except `valueOf`, `getTime`) has a `getUTC*` version (e.g., `getUTCFullYear`).

### Setters:

- `setFullYear(year, month?, date?): number` - Sets year, month, day.
- `setMonth(month, date?): number` - Sets month, day.
- `setDate(date): number` - Sets day of month.
- `setHours(hours, minutes?, seconds?, milliseconds?): number` - Sets time.
- `setMinutes(minutes, seconds?, milliseconds?): number` - Sets minutes and below.
- `setSeconds(seconds, milliseconds?): number` - Sets seconds and below.
- `setMilliseconds(milliseconds): number` - Sets milliseconds.
- `setMicroseconds(microseconds: bigint, nanoseconds?: bigint): bigint` - Sets microseconds, nanoseconds.
- `setNanoseconds(nanoseconds: bigint, microseconds?: bigint): bigint` - Sets nanoseconds, microseconds.
- `setTime(timestamp: number | bigint): number` - Sets timestamp (deprecated).

UTC Variants: `setUTCFullYear`, `setUTCMonth`, `setUTCDate`, `setUTCHours`, `setUTCMinutes`, `setUTCSeconds`, `setUTCMilliseconds`.

### Formatters:

- `toString(): string` - Formats as `(php): "D M d Y H:i:s \\U\\T\\CO (e)"` (e.g., `Fri Apr 18 2025 00:00:00 UTC+0000 (UTC)`).
- `toISOString(): string` - ISO 8601 in UTC (e.g., `2025-04-18T00:00:00.000Z`).
- `toJSON(): string` - ISO 8601 with timezone (e.g., `2025-04-18T00:00:00+00:00[UTC]`).
- `format(pattern: string): string` - PHP-like format (e.g., `Y-m-d` -> `2025-04-18`).
- `templateFormat(strings: TemplateStringsArray, ...keys: string[]): string` - Template literal formatting.
- `toHTMLString(): string` - HTML time element with local or instance timezone.

### Timezone and Conversion:

- `toTimezone(timezoneId: string): Datetime_global` - Converts to new timezone, preserving instant.
- `toDate(): Date` - Converts to Date (loses sub-millisecond precision).
- `toTemporalZonedDateTime(): Temporal.ZonedDateTime` - Returns internal Temporal object.
- `clone(): Datetime_global` - Creates a copy.

### Static Methods:

- `fromComponentsUTC(year, month?, date?, ...): bigint` - UTC timestamp from components.
- `parse(dateString: string, this_parserOnly?: boolean): number` - Parses string to milliseconds.
- `parse_strict(string: string): Temporal.ZonedDateTime` - Strict ISO 8601 parsing.
- `now(): bigint` - Current timestamp in nanoseconds.
- `zeroms(): number` - Current timestamp with sub-second set to 0 (milliseconds).
- `zerons(): bigint` - Current timestamp with sub-second set to 0 (nanoseconds).
- `getUTCOffset(offset: number): string` - Formats offset (e.g., UTC+0100).
- `htmlToCurrentTime(timetags: NodeListOf<HTMLTimeElement> | HTMLTimeElement[]): void` - Updates time elements.

### Utility:

- `getDayName(): string`, `getFullDayName(): string` - Abbreviated or full weekday (en-US).
- `getMonthName(): string`, `getFullMonthName(): string` - Abbreviated or full month (en-US).
- `startOfDay(): Datetime_global` - Sets time to 00:00:00.000000000.

### examples

```typescript
const tz = 'Europe/Berlin', time = new Datetime_global(1749476032000, tz);

console.log(String(time)); // Mon Jun 09 2025 15:33:52 UTC+0200 (Europe/Berlin)

// set the hour to 25, which corrosponds to hour 1 the next day.
console.log(Datetime_global(time.setHours(25), tz)); // Tue Jun 10 2025 01:33:52 UTC+0200 (Europe/Berlin)

// change the timezone to Asia/Riyadh
console.log(String(time.toTimezone('Asia/Riyadh'))); // Tue Jun 10 2025 02:33:52 UTC+0300 (Asia/Riyadh)

console.log(); // print an empty string to space out
// startOfDay
console.log(String(time.startOfDay())); // Tue Jun 10 2025 00:00:00 UTC+0200 (Europe/Berlin)
console.log(String(time.startOfDay('America/new_York'))); // Mon Jun 09 2025 06:00:00 UTC+0200 (Europe/Berlin)

console.log(); // print an empty string to space out

console.log(time.toHTMLString()); // <time datetime="2025-06-09T23:33:52.000Z">Tue Jun 10 2025 01:33:52 UTC+0200 (Europe/Berlin)</time>

time.setUTCHours(0,0,0,0); // midnight UTC

console.log(time.toHTMLString()); // Mon, 09 Jun 2025 00:00:00 UTC
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

Datetime_global.FORMAT_DATETIME_GLOBALV2: ${Datetime_global.FORMAT_DATETIME_GLOBALV3};

Datetime_global.FORMAT_DATETIME_GLOBALV2: ${Datetime_global.FORMAT_DATETIME_GLOBALV2};
Datetime_global.FORMAT_DATETIME_GLOBALV1: ${Datetime_global.FORMAT_DATETIME_GLOBALV1};
Datetime_global.FORMAT_DATEV1: ${Datetime_global.FORMAT_DATEV1};
Datetime_global.FORMAT_HEADER_DEFAULT: ${Datetime_global.FORMAT_HEADER_DEFAULT};
Datetime_global.FORMAT_MYSQLI: ${Datetime_global.FORMAT_MYSQLI};
Datetime_global.FORMAT_B: ${Datetime_global.FORMAT_B}; (still being worked on);
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
```

## License

Mit Licence

## Credits

thanks to generative ai to help with the documentation

## aftercode

// npm: https://www.npmjs.com/package/datetime_global
// github: https://github.com/Qin2007/Datetime-local
// ListOfTimezones: [Moderator Statistics | Reddit for Developers](https://developers.reddit.com/apps/modlogstats)

consider inserting this into your site, and convert your site to local time

```ts
import {Datetime_global} from "./Datetime_global";

window.document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('time.toLocalTime').forEach(function (each) {
        each.innerText = `${new Date(each.dateTime)}`.replace(/ GMT.+/, '');
    });
    document.querySelectorAll('time.toSelfTime').forEach(function (each) {
        each.innerText = (new Date(each.dateTime)).toString();
    });
    Datetime_global.htmlToCurrentTime(document.querySelectorAll('time.toCurrentTime'));
});
```