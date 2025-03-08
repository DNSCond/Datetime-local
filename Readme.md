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

### Common Instance Methods

- `getYear(): number`: Returns the year minus 1900.
- `getFullYear(): number`: Returns the full year.
- `getMonth(): number`: Returns the zero-indexed month.
- `getDate(): number`: Returns the day of the month.
- `getDay(): number`: Returns the day of the week.
- `getHours(): number`, `getMinutes(): number`, `getSeconds(): number`, `getMilliseconds(): number`: Return the
  respective time components.
- `valueOf(): number`, `getTime(): number`: Return the number of milliseconds since the Unix epoch.
- `toString(): string`: Returns a string representation of the date. note that `Datetime_global`'s implementation will
  throw an error everytime, that is because i havent decided on the format

Each `get`\* method has a corresponding `getUTC`\* method, which behaves similarly but returns UTC-based values.

### Differences Between `Datetime_local` and `Datetime_global`

- in `Datetime_local`, methods like `getYear` and `getFullYear` call their `Date` counterparts.
- in `Datetime_global`, these methods return values based on the specified timezone.

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

### common static methods

- `parse(dateString: string, this_parserOnly: boolean = true): number`: parses the `dateString`, if `dateString`
  is `undefined` then it returns `NaN` otherwise it attempts to parse a date out of the string. might behave quirky if
  passed a giant text. if `this_parserOnly` if truthy then it returns `NaN` if this parser fails, if its false then it
  passes `dateString` to `Date.parse` returning its result as is
- `zeroms(): number`: returns the current timestamp setting milliseconds to 0

this documentation is incomplete

## Example Usage

im still unsure what to put here

## Contributing

~~We welcome contributions! Please follow these steps to contribute:~~

## License

none yet. i still am questining whether to include GNU General Public License or MIT.

## credits

thanks for deepseek for writing the readme

```ts
// consider inserting this into your site
window.document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('time.toLocalTime').forEach(function (each) {
        each.innerText = `${new Date(each.dateTime)}`.replace(/ GMT.+/, '');
    });
    document.querySelectorAll('time.toSelfTime').forEach(function (each) {
        each.innerText = (new Date(each.dateTime)).toString();
    });
});
```
