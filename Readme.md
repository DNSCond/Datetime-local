# Datetime_global: A Simplified Interface for Date and Temporal Timezones

This package provides the `Datetime_global` class (constructor function).

it also provides `Datetime_local` but that isnt needed anymore and deprecated.

`Datetime_global` leverages `Temporal` to support a wide range of timezones.

## Why Use This Package?

While this package aims to provide a simpler interface for handling dates and timezones, it is not a replacement for
the `Temporal` API. If you need advanced temporal functionalities, consider using `Temporal` directly. However, if you
prefer a `Date`-like interface with timezone support, this library might be a good fit.

## `Datetime_global` Construction

the first argument of `Datetime_global` can accept a variety of things

- `Temporal.ZonedDateTime` \*
- `Temporal.Instant` \*
- `Date`
- `Datetime_global` \*
- `Datetime_local`
- `bigint` \*
- and anything else that can be unary plused (including `number`).

\* these will set nanoseconds

It also accepts a `Temporal.TimeZoneLike` to specify the desired timezone as argument 2, if left undefined it will
assume local time.

**Note:** When passing a `BigInt`, it assumes `epochNanoseconds`, and when passing a `Number`, it
assumes `epochMilliseconds`. that's a feature, not a mistake.

## .methods

if you instantiate with the `new` keyword then it will be an object with some methods. otherwise it will be a datetime
string.

- `getYear(): number`: Returns the year minus 1900 in the specified timezone.
- `getFullYear(): number`: Returns the full year in the specified timezone.
- `getMonth(): number`: Returns the zero-indexed month in the specified timezone.
- `getDate(): number`: Returns the day of the month in the specified timezone.
- `getDay(): number`: Returns the day of the week in the specified timezone.
- `getHours(): number`, `getMinutes(): number`, `getSeconds(): number`, `getMilliseconds(): number`, `getNanoseconds(): bigint`:
  Return the respective time components in the specified timezone.
- `valueOf(): number`, `getTime(): number`: Return the number of milliseconds since the Unix epoch.

Each of these `get`\* method has a corresponding `getUTC`\* method, which behaves similarly but returns UTC-based
values. the exceptions are  `valueOf(): number`, `getTime(): number` which shouldn't need an `getUTC`\* method.

- `toString(): string`: Returns a string representation of the date. looks
  like "`Tue Jun 25 2024 16:30:00 UTC+0200 (Europe/Amsterdam)`"
- `now(): bigint`: The Datetime_local.now() static method returns the number of nanoseconds elapsed since the epoch,
  which is defined as the midnight at the beginning of January 1, 1970, UTC, note that the browser or system might
  interfere
- `getUTCOffset(offset: number): string`: returns a format like `UTC+0100` or  `UTC-0200`. if offset `isNaN` (if `isNaN`
  returns true if offset is passed directly into it) then `UTC+Error` is returned
- `zeroms(): number`: returns the current timestamp setting milliseconds to 0, with 
  milliseconds precision.
- `zerons(): number`: returns the current timestamp setting milliseconds to 0, with 
  nanoseconds precision.

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

time.setHours(15); // its a bug that this sets localtime hours
console.log(time);
```

## known issues

- most setter methods preform using localtime instead of specified time. (im not sure how to fix)

## License

Mit Licence

## Aftercode
consider inserting this into your site

```ts
window.document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('time.toLocalTime').forEach(function (each) {
    each.innerText = `${new Date(each.dateTime)}`.replace(/ GMT.+/, '');
  });
  document.querySelectorAll('time.toSelfTime').forEach(function (each) {
    each.innerText = (new Date(each.dateTime)).toString();
  });
});
```
