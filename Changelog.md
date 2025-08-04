# Changelog.md

## 0.7.1: useOldJSON 2

- `set useOldJSON` will now properly `TypeError` is you do not pass a boolean primitive
- `Datetime_global.prototype.toJSON` will now check for a symbol and if its there and has
  the value of `true` then it will call `Date.prototype.toJSON`.
- make sure to log changes when `git commit`ing them.

## 0.7.0: useOldJSON

- `useOldJSON` added as accessor property when set to true then `this.toJSON` will be in
  the format of `Date.prototype.toJSON`,
  otherwise in the format of `Temporal.ZonedDateTime.prototype.toJSON`.
- added documentations to getter and setter methods.
- `useOldJSON` now defaults to `true`, making `toJSON` return `Date`-like ISO strings (e.g., "2025-04-18T00:00:00.000Z")
  instead of `Temporal.ZonedDateTime` format (e.g., "2025-04-18T00:00:00+00:00[UTC]"). To restore the previous behavior,
  set `dt.useOldJSON = false`.
- started a changelog.
