# Datetime_global: A Simplified Interface for Date and Temporal Timezones

`Datetime_global` is a JavaScript library that provides a `Date`-like interface for handling dates and times with robust
timezone support, built on the [Temporal API](https://tc39.es/proposal-temporal/docs/). It simplifies working with
timezones while maintaining high precision (nanoseconds) and compatibility with modern web applications.

**Note**: `Datetime_local` is included but deprecated and should not be used in new code. Use `Datetime_global` instead.

## Why Use This Package?

While the `Temporal` API offers advanced date-time functionality, `Datetime_global` provides a familiar `Date`-like API
with enhanced timezone support. Use it when you need:

- A simple, `Date`-compatible interface.
- Timezone-aware date-time operations.
- Nanosecond precision for high-accuracy applications.

For complex temporal operations, consider using `Temporal` directly.

## installation

```bash
npm install datetime-global
```

Include the Temporal polyfill for environments without native Temporal support:

```html

<script src='https://cdn.jsdelivr.net/npm/temporal-polyfill@0.3.0/global.min.js'></script>
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
- undefined: Current time.

Timezone: A Temporal.TimeZoneLike or IANA timezone string (e.g., UTC, America/New_York). Defaults to local timezone.

When called with new, it returns a Datetime_global instance. Without new, it returns a string representation.

## .methods

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

- `toString(): string` - Formats as `(php): "D M d Y H:i:s \U\T\CO (e)"` (e.g., `Fri Apr 18 2025 00:00:00 UTC+0000 (UTC)`).
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

## Example Usage

```typescript
// import the library
import {Datetime_global} from "./Datetime_global.js";
// the Datetime_global is very specific in its construction.
// meaning Datetime_global.fromComponentsUTC is used to
// construct a Datetime_global, the components are to be specified in UTC timezone
const timestampBigIntUTC = Datetime_global.fromComponentsUTC(2024, 6, 25, 14, 30, 0, 0, 0);
// construct the `Datetime_global`
const time = new Datetime_global(timestampBigIntUTC);

// return a string like Tue Jun 25 2024 14:30:00 UTC+0000 (UTC) <time datetime="2024-06-25T14:30:00.000Z">Tue Jun 25 2024 14:30:00 UTC+0000 (UTC)</time>
// in your local time
console.log(time.toString(), time.toHTMLString());

// change the timezone to america newyork and return its time
console.log(time.toTimezone('America/New_York').toString());
// change the timezone to asia tokyo and return its time
console.log(time.toTimezone('Asia/Tokyo').toString());
// change the timezone to UTC and return its time
console.log(time.toTimezone('UTC').toString());
// Asia/Tokyo, the time specified but as a html insertable
console.log(time.toTimezone('Asia/Tokyo').toHTMLString());
// UTC, the time specified but as a html insertable
console.log(time.toTimezone('UTC').toHTMLString());
// an random timezone
console.log(time.toTimezone('America/Anchorage').toLocaleString());

console.log(JSON.stringify(time.toTimezone('America/Anchorage')));
// json "2024-06-25T06:30:00-08:00[America/Anchorage]"

time.setHours(15);
console.log(time);

// various formats
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
```

## License

Mit Licence

## Credits

thanks to generative ai to help with the documentation

## Aftercode

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
    Datetime_global.htmlToCurrentTime(document.querySelectorAll('time'));
});
```
