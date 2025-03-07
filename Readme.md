# Datetime-global

there are 2 classes in this package. `Datetime_local` and `Datetime_global`

`Datetime_local` is an Advancement of `Date` and only uses local and utc.
`Datetime_global` uses `Temporal` and can support Temporal Timezones.

## `import`ation

```bash
npm install datetime_global
```

## why use this over Temporal?

uhh, DONT. this package is just me trying to have the simpler interface leveraging the advanced capabilities of
Temporal.

if you want `Date` but with timezone support then sure. use this library. but if you want Temporal then just navigate Temporal

## `Datetime_local` construction

to create a `Datetime_local` use `Datetime_local()` or `new Datetime_local()` whichever way you prefer. when taking a
single string `Datetime_local` puts it into `Datetime_local.parse` with defaulting to `Date.parse`.
override `Datetime_local.parse` to specify your own formats, the return value must be milliseconds since the unix epoch.

if you pass more than 1 argument or pass things that arent a single string then it passes it directly to the `Date`
constructor, with the flaws intact.

unlike the `Date` function, `Datetime_local` will not ignore if not called with new, `Datetime_local(2024, 0)`
is `    Mon Jan 01 2024 01:00:00 GMT+0100 (Central European Standard Time)` not the current time.

~~to replace `new Date(arguments)` use `new Datetime_local(arguments)` and your app should work.
only `toTemporalInstant` will not be implemented.~~

## `Datetime_global` construction

`Datetime_global` is a little different, but still uses many qualities from Date.

`Datetime_global` takes either a `Temporal.ZonedDateTime | Temporal.Instant | Date | Datetime_global | Datetime_local`
and converts it to a `Datetime_global` instance.

be careful when passing it either a `BigInt` or a `Number` as with a `BigInt` it'll assume `epochNanoseconds` and
with `Number` it'll assume `epochMilliseconds`. im not changing that, it's a feature.

it also accepts a `Temporal.TimeZoneLike` which is what `timezoneId` you want it to have.

~~to replace `new Date(arguments)` use `new Datetime_global(new Datetime_local(arguments))` and your app should work.
only `toTemporalInstant` will not be implemented.~~

## .methods

methods are generic. you can pass anything that has the following

- `Datetime_local`: simply pass something that has a date property that points to a Date. or implements enough of Date
- `Datetime_global`: simply pass something with `time.epochMilliseconds` that is also a valid `Number`. for
  example `{time: {epochMilliseconds: 1704067200000}}` will give it the impression that its `2024` in UTC.

note that some methods will be required to attach to `this`.

### getters

they contain getters. that means most can be acted as a replacement for `Date`.

### methods for both

some methods arent available for `Datetime_global`

- `getYear(): number`: basically `(the year contained) - 1900`.
- `getFullYear(): number`: basically `(the year contained)`.
- `getMonth(): number`: the Month. ill make sure its zero indexed just like `Date`.
- `getDate(): number`, `getDayNumberMonth(): number`, `getDayNumber(): number`,: the day of the week.
- `getDay(): number`, `getDayNumberWeek(): number`: the day of the week.
- `getHours(): number`, `getMinutes`, `getSeconds`, `getMilliseconds`: self-explanatory i hope
- `valueOf(): number`, `getTime(): number`: returns the number of milliseconds elapsed since the epoch, which is defined
  as the midnight at the beginning of January 1, 1970, UTC
- `toString():string`: `return (new Date(this.getTime())) .toString() .replace(/GMT/, 'UTC');`

note that in `Datetime_local` and `Datetime_global` they behave slightly differently. in `Datetime_local` they simply
call their matching counterparts of `Date` but in `Datetime_global` they return the matching property in the specified
timezone.

also each `get*` has a `getUTC*` method, and again in `Datetime_local` they simply
call their matching counterparts of `Date` but in `Datetime_global` they construct a `Date` from `epochMilliseconds` and
then call the matching method. for example

```ts
// in Datetime_local, i said they simply call their matching counterparts of `Date` 
Datetime_local.prototype.getUTCSeconds = function (): number {
    return this.date.getUTCSeconds();
};
// however in Datetime_global they construct a `Date` from `epochMilliseconds` and then call the matching method. for example
Datetime_global.prototype.getUTCSeconds = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCSeconds();
};
```

## aftercode

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

### contributing

...
