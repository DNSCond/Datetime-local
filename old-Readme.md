# Datetime_global: A Simplified Interface for Date and Temporal Timezones

This package provides two classes: `Datetime_local` and `Datetime_global`.

- `Datetime_local` is an advancement of the native `Date` object, supporting only local and UTC timezones. and i dont
  think im going to support it for long
- `Datetime_global` leverages `Temporal` to support a wide range of timezones.

## Installation

To install the package, run the following command:

```bash
npm install datetime_global
```

## Why Use This Package?

While this package aims to provide a simpler interface for handling dates and timezones, it is not a replacement for
the `Temporal` API. If you need advanced temporal functionalities, consider using `Temporal` directly. However, if you
prefer a `Date`-like interface with timezone support, this library might be a good fit.

## `Datetime_local` Construction

To create a `Datetime_local` instance, you can use either `Datetime_local()` or `new Datetime_local()`. When passing a
single string, `Datetime_local` uses `Datetime_local.parse`, which defaults to `Date.parse` after itself cannot parse
the date. You can override `Datetime_local.parse` to support custom formats, but the return value must be a Number of
milliseconds since the Unix epoch.

If you pass multiple arguments or non-string values, they are directly passed to the `Date` constructor.

**Note:** Unlike `Date`, `Datetime_local` will not ignore your parameters when using it without the `new` keyword. For
example, `Datetime_local(2024, 0)` will return `Mon Jan 01 2024 01:00:00 GMT+0100 (Central European Standard Time)`
instead of the current time.

## `Datetime_global` Construction

for argument 1, `Datetime_global` is more flexible and can accept various inputs:

- `Temporal.ZonedDateTime`
- `Temporal.Instant`
- `Date`
- `Datetime_global`
- `Datetime_local`

It also accepts a `Temporal.TimeZoneLike` to specify the desired timezone (as argument 2).

**Note:** When passing a `BigInt`, it assumes `epochNanoseconds`, and when passing a `Number`, it
assumes `epochMilliseconds`. that's a feature, not a mistake

## .methods

Both `Datetime_local` and `Datetime_global` share several methods, but some are exclusive to `Datetime_global` and
others to `Datetime_local`.

this class uses JSDoc.

### Common Instance Methods

- `getYear(): number`: Returns the year minus 1900.
- `getFullYear(): number`: Returns the full year.
- `getMonth(): number`: Returns the zero-indexed month.
- `getDate(): number`: Returns the day of the month.
- `getDay(): number`: Returns the day of the week.
- `getHours(): number`, `getMinutes(): number`, `getSeconds(): number`, `getMilliseconds(): number`: Return the
  respective time components.
- `valueOf(): number`, `getTime(): number`: Return the number of milliseconds since the Unix epoch.

Each `get`\* method has a corresponding `getUTC`\* method, which behaves similarly but returns UTC-based values.

### methods exclusive to `Datetime_global`

- `toString(): string`: Returns a string representation of the date. looks like "Tue Jun 25 2024 16:30:00 UTC+0200 (Europe/Amsterdam)"

this documentation is incomplete

### Differences Between `Datetime_local` and `Datetime_global`

- in `Datetime_local`, methods like `getYear` and `getFullYear` call their `Date` counterparts.
- in `Datetime_global`, these methods return values based on the specified timezone.

this documentation is incomplete

### static methods exclusive to `Datetime_local`

- `parseISODate(dateString: string): RegExpMatchArray | null`: this method accepts the string that is required to be
  supported by `Date.parse` and parses it with the components. its for internal use only, but treated as if its for
  global use.
- `now(): number`: technically not exclusive to `Datetime_local`, the one available in `Datetime_global` is quite
  different. This method returns the number of milliseconds elapsed since the epoch, which is defined as the midnight at
  the beginning of January 1, 1970, UTC
- `padding(strx: string | any, number: number = 2): string`: pads the string `strx` the number of `number` times
  with `"0"`. if you want more control over padding then use `String.prototype.padStart`
- `getUTCOffset(offset: number): string`: returns a format like `UTC+0100` or  `UTC-0200`, if offset `isNaN` (if `isNaN`
  returns true if offset is passed directly into it) then `UTC+Error` is returned

this documentation is incomplete

### common static methods

- `parse(dateString: string, this_parserOnly: boolean = true): number`: parses the `dateString`, if `dateString`
  is `undefined` then it returns `NaN` otherwise it attempts to parse a date out of the string. might behave quirky if
  passed a giant text. if `this_parserOnly` if truthy then it returns `NaN` if this parser fails, if its false then it
  passes `dateString` to `Date.parse` returning its result as is
- `zeroms(): number`: returns the current timestamp setting milliseconds to 0

this documentation is incomplete

## Example Usage

fetching a few results

```javascript
// import the library
import {Datetime_global} from "./Datetime_global.js";
// the Datetime_global is very specific in its construction. meaning Datetime_global.fromComponentsUTC is used to
// construct a Datetime_global, the components are to be specified in UTC timwezone
const timestampBigIntUTC = Datetime_global.fromComponentsUTC(2024, 6, 25, 14, 30, 0, 0, 0);
// construct the class
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
// json "2024-06-25T06:30:00-08:00[America/Anchorage]"
console.log(JSON.stringify(time.toTimezone('America/Anchorage')));
```

## Contributing

~~We welcome contributions! Please follow these steps to contribute:~~

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
