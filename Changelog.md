# Changelog.md

## 0.7.2: fixed bigint, number,and boolean

- break;

## 0.7.1: useOldJSON 2

- `set useOldJSON` will now properly `TypeError` is you do not pass a boolean primitive
- `Datetime_global.prototype.toJSON` will now check for a symbol and if its there and has
  the value of `true` then it will call `Date.prototype.toJSON`.
- make sure to log changes when `git commit`ing them.
- setting null in `setDatetime` might not remove the attribute without `setAttribute` being true.

### changed Datetime_global.prototype.templateFormat in 0.7.1

- new Symbols `nullStyle` and `undefinedFormat`
- **breaking**: `null` and `undefined` now result in empty strings. use the new symbols to restore old formats
- `Date`, `Date.now`, `Date.UTC` now are formatted according to what they imply. `Date.now` will be equal to `Date` as
  you probably should display a timestamp to the user, if you do then call it instead of passing it. (this is unreliable across ecmascript realms)
- `Temporal.Now` is equivalent to `Temporal.Now.zonedDateTimeISO(Temporal.Now.timeZoneId()).toString()` but as its imported you might not have access to it. (this is unreliable across ecmascript realms)
- `Temporal.PlainDateTime` will now use `toLocaleString('en-US', {month: 'long', year: 'numeric', day: "2-digit"})` instead of assuming it is a local `Temporal.ZonedDateTime`.

to restore old behavior use

```typescript
function useOldFormatting(value: unknown): any {
    if (value === undefined) {
        return undefinedFormat;
    } else if (value === null) {
        return nullStyle;
    } else {
        return value;
    }
}
```

## 0.7.0: useOldJSON

- `useOldJSON` added as accessor property when set to true then `this.toJSON` will be in
  the format of `Date.prototype.toJSON`,
  otherwise in the format of `Temporal.ZonedDateTime.prototype.toJSON`.
- added documentations to getter and setter methods.
- `useOldJSON` now defaults to `true`, making `toJSON` return `Date`-like ISO strings (e.g., "2025-04-18T00:00:00.000Z")
  instead of `Temporal.ZonedDateTime` format (e.g., "2025-04-18T00:00:00+00:00[UTC]"). To restore the previous behavior,
  set `dt.useOldJSON = false`.
- started a changelog.
