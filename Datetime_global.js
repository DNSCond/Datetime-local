import { Temporal } from 'temporal-polyfill';
import { ZDTDuration } from "./ZDTDuration.js";
/**
 * this class `Datetime_global` should behave exactly like `Date` if a name matches that on `Date`.
 * except `toJSON`. until now. that was the design goal all along. to have Date with `Temporal`'s precision
 */
// npm: https://www.npmjs.com/package/datetime_global
// github: https://github.com/DNSCond/Datetime-local
"use strict"; // [^\x00-\x7F]
const useOldJSON = Symbol('useOldJSON');
const [writable, enumerable, configurable] = [true, true, true];
/**
 * Constructs a Datetime_global instance or returns a string representation.
 * @param from - Input to initialize the date-time. Supports:
 *   - Temporal.ZonedDateTime: Used directly.
 *   - Temporal.Instant: Converted from epoch nanoseconds.
 *   - Date | Datetime_global: Converted from epoch milliseconds.
 *   - bigint: Nanoseconds since epoch.
 *   - number: Milliseconds since epoch.
 *   - string: Parsed using `Date.parse` (EcmaScript format or browser-dependent formats).
 *   - undefined: Uses current time (Datetime_global.now()).
 * @param timezoneId - A Temporal.TimeZoneLike or IANA timezone string (e.g., "UTC"). Defaults to local timezone (Temporal.Now.timeZoneId()).
 * @returns A Datetime_global instance if called with `new`, or a string representation if called as a function.
 * @throws TypeError if timezoneId is invalid or if BigInt conversion fails.
 * @throws RangeError if the input string cannot be parsed or results in an invalid date.
 * @example
 * // Current time in local timezone (assuming its America/New_York)
 * const now = new Datetime_global();
 * console.log(now.toString()); // e.g., "Fri Apr 18 2025 12:00:00 UTC-0400 (America/New_York)"
 *
 * // From Date in UTC
 * const fromDate = new Datetime_global(new Date("2025-04-18T00:00:00Z"), "UTC");
 * console.log(fromDate.toISOString()); // "2025-04-18T00:00:00.000Z"
 *
 * // From nanoseconds (bigint)
 * const fromBigInt = new Datetime_global(1745193600000000000n, "UTC"); // April 18, 2025
 * console.log(fromBigInt.toISOString()); // "2025-04-18T00:00:00.000Z"
 *
 * // From ISO string
 * const fromString = new Datetime_global("2025-04-18T00:00:00Z", "Asia/Tokyo");
 * console.log(fromString.toString()); // e.g., "Fri Apr 18 2025 09:00:00 UTC+0900 (Asia/Tokyo)"
 *
 * // As a function (returns string)
 * const asString = Datetime_global(new Date("2025-04-18T00:00:00Z"), "UTC");
 * console.log(asString); // "Fri Apr 18 2025 00:00:00 UTC+0000 (UTC)"
 * @constructor
 * @function
 */
export const Datetime_global = function (from = undefined, timezoneId = Temporal.Now.timeZoneId()) {
    let timestamp, isBigInt = false;
    if (arguments.length === 0 || from === undefined) {
        from = Datetime_global.now();
    }
    if (from instanceof Temporal.ZonedDateTime) {
        timestamp = 0n;
    }
    else if (from instanceof Temporal.Instant) {
        timestamp = BigInt(from.epochNanoseconds);
        isBigInt = true;
    }
    else if (from instanceof Datetime_global) {
        timestamp = from.time.epochNanoseconds;
        isBigInt = true;
    }
    else if (typeof from === 'bigint') {
        timestamp = from;
        isBigInt = true;
    }
    else if (typeof from === 'string') {
        timestamp = Date.parse(from);
    }
    else {
        timestamp = Math.trunc(from);
    }
    if (typeof timestamp === 'number' && new.target === undefined) {
        if (!Number.isSafeInteger(timestamp)) {
            return "Invalid Date";
        }
    }
    const value = from instanceof Temporal.ZonedDateTime ? from : new Temporal.ZonedDateTime(BigInt(timestamp) * (isBigInt ? 1n : 1000000n), timezoneId);
    const self = new.target ? this : Object.create(Datetime_global.prototype);
    Object.defineProperties(self, {
        time: { value, writable, enumerable, configurable, },
        year: {
            get() {
                return this.getFullYear();
            }, enumerable, configurable,
        }, month: {
            get() {
                return this.time.month;
            }, enumerable, configurable,
        }, day: {
            get() {
                return this.getDate();
            }, enumerable, configurable,
        }, dayOfWeek: {
            get() {
                return this.time.dayOfWeek;
            }, enumerable, configurable,
        }, hour: {
            get() {
                return this.getHours();
            }, enumerable, configurable,
        }, minute: {
            get() {
                return this.getMinutes();
            }, enumerable, configurable,
        }, second: {
            get() {
                return this.getSeconds();
            }, enumerable, configurable,
        }, millisecond: {
            get() {
                return this.time.millisecond;
            }, enumerable, configurable,
        }, microsecond: {
            get() {
                return this.time.microsecond;
            }, enumerable, configurable,
        }, nanosecond: {
            get() {
                return this.time.nanosecond;
            }, enumerable, configurable,
        }, epochMilliseconds: {
            get() {
                return this.time.epochMilliseconds;
            }, enumerable, configurable,
        }, epochNanoseconds: {
            get() {
                return this.time.epochNanoseconds;
            }, set(value) {
                this.time = new Temporal.ZonedDateTime(BigInt(value), this.timezoneId);
            }, enumerable, configurable,
        },
    });
    if (!new.target)
        return self.toString();
    else
        self.useOldJSON = true;
};
Object.defineProperties(Datetime_global.prototype, {
    minutesAfterMidnight: {
        get() {
            const { time } = this;
            return time.startOfDay().until(time, {
                smallestUnit: 'minutes',
                largestUnit: 'minutes',
            }).minutes;
        }, set(value) {
            this.setHours(0, Math.trunc(value));
        }, enumerable, configurable,
    }, timezoneId: {
        get() {
            return this.time.timeZoneId;
        }, set(value) {
            this.time = this.toTimezone(value).toTemporalZonedDateTime();
        }, enumerable, configurable,
    }, date: {
        get() {
            return this.toDate();
        }, set(value) {
            if (value instanceof Date) {
                const instant = Temporal.Instant.fromEpochMilliseconds(value);
                this.time = new Temporal.ZonedDateTime(instant.epochNanoseconds, this.getTimezoneId());
            }
            else
                throw new TypeError('date must be set using a Date.');
        }, enumerable, configurable,
    }, useOldJSON: {
        get() {
            return this[useOldJSON];
        }, set(value) {
            if (value === true || value === false) {
                this[useOldJSON] = value;
            }
            else {
                throw new TypeError('useOldJSON must be set using an explicit boolean');
            }
        }, enumerable, configurable,
    },
});
Datetime_global.prototype.setOldJSON = function (useOldJSON) {
    this.useOldJSON = useOldJSON;
    return this;
};
Datetime_global.compare = function (zonedDatetime1, zonedDatetime2) {
    zonedDatetime1 = new Datetime_global(zonedDatetime1, 'UTC');
    zonedDatetime2 = new Datetime_global(zonedDatetime2, 'UTC');
    const nano1 = zonedDatetime1.getTimestamp(), nano2 = zonedDatetime2.getTimestamp();
    if (nano1 > nano2) {
        return +1;
    }
    else if (nano1 < nano2) {
        return -1;
    }
    else {
        return +0;
    }
};
/**
 * Creates a UTC timestamp from date-time components, returning nanoseconds since the epoch.
 * @param year - The year (0-99 maps to 1900-1999; otherwise used as-is). if it's a string the `Date.parse` is used
 * @param month - The month (0-11; default 0, January).
 * @param date - The day of the month (1-31; default 1).
 * @param hour - The hour (0-23; default 0).
 * @param minute - The minute (0-59; default 0).
 * @param second - The second (0-59; default 0).
 * @param millisecond - The millisecond (0-999; default 0).
 * @param nanosecond - The nanosecond (default 0).
 * @returns The nanoseconds since the epoch (January 1, 1970, 00:00:00 UTC).
 * @throws RangeError if the components form an invalid date.
 * @example
 * // April 18, 2025, 00:00:00 UTC
 * console.log(Datetime_global.fromComponentsUTC(2025, 3, 18));
 * // 1745193600000000000n
 *
 * // With nanoseconds
 * console.log(Datetime_global.fromComponentsUTC(2025, 3, 18, 0, 0, 0, 0, 500));
 * // 1745193600000000500n
 */
Datetime_global.fromComponentsUTC = function (year, month = 0, date = 1, hour = 0, minute = 0, second = 0, millisecond = 0, nanosecond = 0n) {
    const date_time = new Date;
    if (arguments.length === 1) {
        if (typeof year === 'string') {
            year = Date.parse(year);
        }
        date_time.setTime(year);
    }
    else if (arguments.length > 1) {
        date_time.setTime(Date.UTC(year, month, date, hour, minute, second, millisecond));
    }
    return (BigInt(date_time.getTime()) * 1000000n) + BigInt(nanosecond);
};
/**
 * Parses a string into a Temporal.ZonedDateTime using strict ISO 8601 parsing.
 * @param string - An ISO 8601 string (e.g., "2025-04-18T00:00:00Z") or object with date-time fields.
 * @returns A Temporal.ZonedDateTime instance.
 * @throws RangeError if the string is invalid or cannot be parsed.
 * @example
 * const zdt = Datetime_global.parse_strict("2025-04-18T00:00:00Z");
 * console.log(zdt.toString()); // "2025-04-18T00:00:00+00:00[UTC]"
 */
Datetime_global.parse_strict = function (string) {
    return Temporal.ZonedDateTime.from(string);
};
/**
 * Returns the current timestamp as nanoseconds since the epoch (January 1, 1970, 00:00:00 UTC).
 * @returns The nanoseconds since the epoch.
 * @example
 * console.log(Datetime_global.now()); // e.g., 1745193600000000000n
 */
Datetime_global.now = function () {
    return Temporal.Now.instant().epochNanoseconds;
};
/**
 * Returns the current timestamp as nanoseconds since the epoch (January 1, 1970, 00:00:00 UTC).
 * @returns The nanoseconds since the epoch.
 * @example
 * console.log(Datetime_global.now()); // e.g., 1745193600000000000n
 */
Datetime_global.nowInTimezone = function (timezone) {
    if (timezone)
        return new Datetime_global(Datetime_global.now(), timezone);
    return new Datetime_global;
};
/**
 * Returns the current timestamp in milliseconds since the epoch, with sub-second components (milliseconds, microseconds, nanoseconds) set to 0.
 * @returns The milliseconds since the epoch.
 * @example
 * console.log(Datetime_global.zeroms()); // e.g., 1745193600000
 */
Datetime_global.zeroms = function () {
    return (new Date).setMilliseconds(0);
};
/**
 * Returns the current timestamp in nanoseconds since the epoch, with sub-second components (milliseconds, microseconds, nanoseconds) set to 0.
 * @returns The nanoseconds since the epoch.
 * @example
 * console.log(Datetime_global.zerons()); // e.g., 1745193600000000000n
 */
Datetime_global.zerons = function () {
    return BigInt(Datetime_global.zeroms()) * 1000000n;
};
/**
 * Parses a date string into milliseconds since the epoch, using `Date.parse`.
 * @param dateString - The date string to parse (e.g., "2025-04-18", "2025-04-18T00:00:00Z").
 * @returns The milliseconds since the epoch, or NaN if invalid.
 * @example
 * console.log(Datetime_global.parse("2025-04-18T00:00:00Z")); // 1745193600000
 */
Datetime_global.parse = Date.parse;
Datetime_global.prototype[Symbol.toStringTag] = 'Datetime_global';
Datetime_global[Symbol.toStringTag] = 'Datetime_global_constructor';
/**
 * converts this Datetime_global to Date
 * @returns {Date} the Date with millisecond precision. sub millisecond precision is lost
 */
Datetime_global.prototype.toDate = function () {
    return new Date(this.time.epochMilliseconds);
};
/**
 * Creates a new Datetime_global in the specified timezone, preserving the instant in time.
 * @param timezoneId - A Temporal.TimeZoneLike or IANA timezone string (e.g., "UTC", "America/New_York").
 * @returns A new Datetime_global instance.
 * @throws TypeError if timezoneId is invalid.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.toTimezone("Asia/Tokyo").toString());
 * // "Fri Apr 18 2025 09:00:00 UTC+0900 (Asia/Tokyo)"
 */
Datetime_global.prototype.toTimezone = Datetime_global.prototype.withTimezone = function (timezoneId) {
    return new Datetime_global(this.time.epochNanoseconds, timezoneId);
};
/**
 * Retrieves the timezone identifier for this Datetime_global instance.
 *
 * @returns {string} The timezone identifier (e.g., "America/New_York") associated with the Temporal.ZonedDateTime instance.
 */
Datetime_global.prototype.getTimezoneId = function () {
    return this.time.timeZoneId;
};
/**
 * Returns the timestamp in milliseconds since the epoch (January 1, 1970, 00:00:00 UTC).
 * @returns The milliseconds since the epoch.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.valueOf()); // 1745193600000
 */
Datetime_global.prototype.valueOf = function () {
    return this.time.epochMilliseconds;
};
/**
 *
 * Returns the timestamp in milliseconds since the epoch (January 1, 1970, 00:00:00 UTC).
 * @returns The milliseconds since the epoch.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.valueOf()); // 1745193600000
 * @alias valueOf returning milliseconds since the epoch.
 */
Datetime_global.prototype.getTime = function () {
    return this.valueOf();
};
/**
 * Sets the timestamp, modifying the instance in place. Use the `Datetime_global` constructor instead.
 * @param timestamp - Nanoseconds (bigint) or milliseconds (number) since the epoch.
 * @returns The new timestamp in milliseconds since the epoch.
 * @example
 * const dt = new Datetime_global();
 * dt.setTime(1745193600000);
 * console.log(dt.toISOString()); // "2025-04-18T00:00:00.000Z"
 */
Datetime_global.prototype.setTime = function (timestamp) {
    this.time = new Temporal.ZonedDateTime(BigInt(timestamp) * (((typeof timestamp) === 'bigint') ? 1n : 1000000n), this.time.timeZoneId);
    return this.time.epochMilliseconds;
};
/**
 * Returns a string representation of the date-time, including timezone offset and ID.
 * Format (php): "D M d Y H:i:s \U\T\CO (e)" (e.g., "Fri Apr 18 2025 00:00:00 UTC+0000 (UTC)").
 * @returns The formatted string.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.toString()); // "Fri Apr 18 2025 00:00:00 UTC+0000 (UTC)"
 */
Datetime_global.prototype.toString = function () {
    const self = this, pad = (n, z = 2) => padNumber(n, z).replace(/^\+/, ''), fullYear = pad(self.time.withCalendar('iso8601').year, 4);
    const offset = Datetime_global.getUTCOffset(self.getTimezoneOffset()), string = `${self.getDayName()} ${self.getMonthName()} ${pad(self.getDate())}`, time = `${pad(self.getHours())}:${pad(self.getMinutes())}:${pad(self.getSeconds())}`;
    return `${string} ${fullYear} ${time} ${offset} (${self.time.timeZoneId})`;
};
/**
 * Returns an HTML <time> element with the date-time in the browser's local timezone.
 * The datetime attribute is in ISO 8601 format (UTC).
 * @returns The HTML string (e.g., "<time datetime='2025-04-18T00:00:00.000Z'>Fri Apr 18 2025 00:00:00 UTC</time>").
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.toHTML()); // Depends on local timezone
 */
Datetime_global.prototype.toHTML = function () {
    const date = new Date(this.time.epochMilliseconds);
    return `<time datetime="${date.toISOString()}">${date}</time>`;
};
export function htmlencode(string) {
    return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
Datetime_global.prototype.toHTMLFormatted = function (dtg, format) {
    return `<time datetime="${dtg.toISOString()}">${htmlencode(dtg.format(format))}</time>`;
};
/*
function htmlencode(string) {
    return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

const toHTMLFormatted = function(dtg, format) {
    return `<time datetime="${dtg.toISOString()}">${htmlencode(dtg.format(format))}</time>`;
};
*/
/**
 * Returns an HTML `<time>` element string representing the current datetime in GMT (UTC) format.
 *
 * The `datetime` attribute is set using the ISO 8601 string (`Date.prototype.toISOString()`),
 * and the inner text of the element is the UTC string (`Date.prototype.toUTCString()`).
 *
 * This is useful for embedding machine-readable and human-readable timestamps in HTML,
 * ensuring proper formatting and time zone clarity.
 *
 * @this {Datetime_global} The `Datetime_global` instance containing the time value.
 * @returns {string} A string containing the `<time>` HTML element with GMT time.
 */
Datetime_global.prototype.toHTML_GMT = function () {
    const date = new Date(this.time.epochMilliseconds);
    return `<time datetime="${date.toISOString()}">${date.toUTCString()}</time>`;
};
Datetime_global.prototype.toHTML_UTC = function () {
    return `<time datetime="${this.toISOString()}">${this.toUTCString()}</time>`;
};
Datetime_global.prototype.toHTMLHistoryString = function () {
    const options = { smallestUnit: 'seconds', largestUnit: 'years' }, historyString = this.until(new Date, options).toHumanString(2);
    return `<time datetime="${this.toISOString()}">${historyString}</time>`;
};
/**
 * Returns an HTML <time> element with the date-time formatted in the instance's timezone.
 * The datetime attribute is in ISO 8601 format (UTC).
 * @returns The HTML string.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.toHTMLString());
 * // "<time datetime='2025-04-18T00:00:00.000Z'>Fri Apr 18 2025 00:00:00 UTC+0000 (UTC)</time>"
 */
Datetime_global.prototype.toHTMLString = function () {
    const date = new Date(this.time.epochMilliseconds);
    return `<time datetime="${date.toISOString()}">${this.toString()}</time>`;
};
/**
 * Returns the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday).
 *
 * will convert to the iso8601 calendar
 * @returns The day of the week (0-6).
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC"); // Friday
 * console.log(dt.getDay()); // 5
 */
Datetime_global.prototype.getDay = function () {
    const time = this.time.withCalendar('iso8601');
    return time.dayOfWeek % time.daysInWeek;
};
/**
 * returns the true day of week arcording to the specified calendar
 */
Datetime_global.prototype.getDayOfWeek = function () {
    return this.time.dayOfWeek;
};
/**
 * Returns the year minus 1900 (e.g., 2025 -> 125) only iso8601 calendar.
 * @returns The year minus 1900.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getYear()); // 125
 */
Datetime_global.prototype.getYear = function () {
    return this.time.withCalendar('iso8601').year - 1900;
};
/**
 * Returns the full four-digit year (e.g., 2025).
 * @returns The year.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getFullYear()); // 2025
 */
Datetime_global.prototype.getFullYear = function () {
    return this.time.year;
};
/**
 * Returns the month (0 = January, 1 = February, ..., 11 = December).
 * @returns The month (0-11).
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getMonth()); // 3
 */
Datetime_global.prototype.getMonth = function () {
    return this.time.month - 1;
};
/**
 * Returns the day of the month (1-31).
 * @returns The day of the month.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getDate()); // 18
 */
Datetime_global.prototype.getDate = function () {
    return this.time.day;
};
/**
 * Returns the hour (0-23).
 * @returns The hour.
 * @example
 * const dt = new Datetime_global("2025-04-18T15:00:00Z", "UTC");
 * console.log(dt.getHours()); // 15
 */
Datetime_global.prototype.getHours = function () {
    return this.time.hour;
};
/**
 * Returns the minute (0-59).
 * @returns The minute.
 * @example
 * const dt = new Datetime_global("2025-04-18T15:30:00Z", "UTC");
 * console.log(dt.getMinutes()); // 30
 */
Datetime_global.prototype.getMinutes = function () {
    return this.time.minute;
};
/**
 * Returns the second (0-59).
 * @returns The second.
 * @example
 * const dt = new Datetime_global("2025-04-18T15:30:45Z", "UTC");
 * console.log(dt.getSeconds()); // 45
 */
Datetime_global.prototype.getSeconds = function () {
    return this.time.second;
};
/**
 * Returns the millisecond (0-999).
 * @returns The millisecond.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00.123Z", "UTC");
 * console.log(dt.getMilliseconds()); // 123
 */
Datetime_global.prototype.getMilliseconds = function () {
    return this.time.millisecond;
};
// builtin-proxy-UTC
/**
 * Returns the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday) in UTC.
 * @returns The day of the week (0-6).
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC"); // Friday
 * console.log(dt.getUTCDay()); // 5
 */
Datetime_global.prototype.getUTCDay = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCDay();
};
/**
 * Returns the year minus 1900 (e.g., 2025 -> 125) in UTC.
 *
 * will convert to Date's calendar
 * @returns The year minus 1900. in UTC
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getYear()); // 125
 */
Datetime_global.prototype.getUTCYear = function () {
    return this.getUTCFullYear() - 1900;
};
/**
 * Returns the year in UTC.
 *
 * will convert to Date's calendar
 * @returns The year minus in UTC
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getUTCFullYear()); // 2025
 */
Datetime_global.prototype.getUTCFullYear = function () {
    return this.toDate().getUTCFullYear();
};
/**
 * Returns the month (0 = January, 1 = February, ..., 11 = December) in utc.
 *
 * will convert to Date's calendar
 * @returns The month (0-11) in utc.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getMonth()); // 3
 */
Datetime_global.prototype.getUTCMonth = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCMonth();
};
/**
 * Returns the day of the month (1-31) in utc.
 *
 * will convert to Date's calendar
 * @returns The day of the month in utc.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getDate()); // 18
 */
Datetime_global.prototype.getUTCDate = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCDate();
};
/**
 * Returns the hour (0-23) in utc.
 *
 * will convert to Date's calendar
 * @returns The hour in utc.
 * @example
 * const dt = new Datetime_global("2025-04-18T15:00:00Z", "UTC");
 * console.log(dt.getHours()); // 15
 */
Datetime_global.prototype.getUTCHours = function () {
    return (new Date(this.time.epochMilliseconds)).getUTCHours();
};
/**
 * Returns the minute (0-59) in utc.
 *
 * will convert to Date's calendar
 * @returns The minute in utc.
 * @example
 * const dt = new Datetime_global("2025-04-18T15:30:00Z", "UTC");
 * console.log(dt.getMinutes()); // 30
 */
Datetime_global.prototype.getUTCMinutes = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCMinutes();
};
/**
 * Returns the second (0-59) in utc.
 *
 * will convert to Date's calendar
 * @returns The second in utc.
 * @example
 * const dt = new Datetime_global("2025-04-18T15:30:45Z", "UTC");
 * console.log(dt.getSeconds()); // 45
 */
Datetime_global.prototype.getUTCSeconds = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCSeconds();
};
/**
 * Returns the millisecond (0-999) in utc.
 *
 * will convert to Date's calendar
 * @returns The millisecond in utc.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00.123Z", "UTC");
 * console.log(dt.getMilliseconds()); // 123
 */
Datetime_global.prototype.getUTCMilliseconds = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCMilliseconds();
};
/**
 * Returns the timezone offset in minutes (positive for west of UTC, negative for east).
 * @returns The offset in minutes.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "America/New_York");
 * console.log(dt.getTimezoneOffset()); // 240 (4 hours west)
 */
Datetime_global.prototype.getTimezoneOffset = function () {
    return -Math.trunc((Number(this.time.offsetNanoseconds) / 1e9) / 60);
};
/**
 * Returns the date-time as an ISO 8601 string in UTC (e.g., "2025-04-18T12:34:56.789Z").
 * Matches Date.prototype.toISOString, with millisecond precision.
 * @returns A string in ISO 8601 format.
 */
Datetime_global.prototype.toISOString = function () {
    return this.toDate().toISOString();
};
/**
 * Returns the date-time as an ISO 8601 string with timezone (e.g., "2025-04-18T00:00:00+00:00[UTC]").
 * @returns The ISO 8601 string.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.toJSON()); // "2025-04-18T00:00:00+00:00[UTC]"
 */
Datetime_global.prototype.toJSON = function () {
    if (this[useOldJSON] === true)
        return this.toDate().toJSON();
    return this.time.toJSON();
};
/**
 * Sets the year, optionally month and day, modifying the instance in place.
 * Handles overflow/underflow by rolling over to adjacent months/years.
 * @param fullYear - The year (e.g., 2025).
 * @param month - The month (0-11; optional, defaults to current month).
 * @param date - The day of the month (1-31; optional, defaults to current day).
 * @returns The new timestamp in milliseconds since the epoch.
 * @throws Error if excessive overflow causes recursion limit to be reached.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * dt.setFullYear(2026);
 * console.log(dt.toISOString()); // "2026-04-18T00:00:00.000Z"
 */
Datetime_global.prototype.setFullYear = function (fullYear, month, date) {
    date = arguments.length > 1 ? date : this.time.day;
    month = arguments.length > 2 ? month : this.time.month;
    const year = fullYear, try_date = {
        year: toNumber(year), day: toNumber(date), month: toNumber(month) + 1,
    }, self_time = overflowDatetime_global(this, try_date);
    return (this.time = self_time).epochMilliseconds;
};
function toNumber(mixed) {
    return Number(BigInt(Number(mixed)));
}
/**
 * Sets the month, optionally day, modifying the instance in place.
 * Handles overflow/underflow by rolling over to adjacent months/years.
 * @param month - The month (0-11).
 * @param date - The day of the month (1-31; optional, defaults to current day).
 * @returns The new timestamp in milliseconds since the epoch.
 * @throws Error if excessive overflow causes recursion limit to be reached.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * dt.setMonth(5); // June
 * console.log(dt.toISOString()); // "2025-06-18T00:00:00.000Z"
 */
Datetime_global.prototype.setMonth = function (month, date) {
    date = arguments.length > 1 ? date : this.getDate();
    return this.setFullYear(this.getFullYear(), month, date);
};
/**
 * Sets the day of the month, modifying the instance in place.
 * Handles overflow/underflow by rolling over to adjacent months.
 * @param date - The day of the month (1-31).
 * @returns The new timestamp in milliseconds since the epoch.
 * @throws Error if excessive overflow causes recursion limit to be reached.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * dt.setDate(19);
 * console.log(dt.toISOString()); // "2025-04-19T00:00:00.000Z"
 */
Datetime_global.prototype.setDate = function (date) {
    return this.setFullYear(this.getFullYear(), this.getMonth(), date);
};
/**
 * Sets the hours, minutes, seconds, and milliseconds, modifying the object in place.
 * Handles overflow/underflow by rolling over to the next or previous day/month/year.
 * Sub-millisecond precision (microseconds, nanoseconds) is preserved.
 * @param hours - The hours to set (e.g., 0-23; 25 rolls over to next day's 1:00).
 * @param minutes - The minutes to set (0-59; optional, defaults to current minutes).
 * @param seconds - The seconds to set (0-59; optional, defaults to current seconds).
 * @param milliseconds - The milliseconds to set (0-999; optional, defaults to current milliseconds).
 * @returns The new timestamp in milliseconds since the epoch.
 * @throws Error if excessive overflow causes forever loop to be reached.
 * @throws TypeError if inputs are non-numeric.
 */
Datetime_global.prototype.setHours = function (hours, minutes, seconds, milliseconds) {
    minutes = arguments.length > 1 ? minutes : this.time.minute;
    seconds = arguments.length > 2 ? seconds : this.time.second;
    milliseconds = arguments.length > 3 ? milliseconds : this.time.millisecond;
    const try_time = {
        hour: toNumber(hours),
        minute: toNumber(minutes),
        second: toNumber(seconds),
        millisecond: toNumber(milliseconds),
    }, time = overflowDatetime_global(this, try_time);
    return (this.time = time).epochMilliseconds;
};
/**
 * Sets the minutes, optionally seconds and milliseconds, modifying the instance in place.
 * Handles overflow/underflow by rolling over to adjacent hours/days.
 * @param minutes - The minutes (0-59).
 * @param seconds - The seconds (0-59; optional, defaults to current seconds).
 * @param milliseconds - The milliseconds (0-999; optional, defaults to current milliseconds).
 * @returns The new timestamp in milliseconds since the epoch.
 * @throws Error if excessive overflow causes recursion limit to be reached.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * dt.setMinutes(45);
 * console.log(dt.toISOString()); // "2025-04-18T00:45:00.000Z"
 */
Datetime_global.prototype.setMinutes = function (minutes, seconds, milliseconds) {
    seconds = arguments.length > 1 ? seconds : this.getSeconds();
    milliseconds = arguments.length > 2 ? milliseconds : this.getMilliseconds();
    return this.setHours(this.getHours(), minutes, seconds, milliseconds);
};
/**
 * Sets the seconds, optionally milliseconds, modifying the instance in place.
 * Handles overflow/underflow by rolling over to adjacent minutes/hours.
 * @param seconds - The seconds (0-59).
 * @param milliseconds - The milliseconds (0-999; optional, defaults to current milliseconds).
 * @returns The new timestamp in milliseconds since the epoch.
 * @throws Error if excessive overflow causes recursion limit to be reached.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * dt.setSeconds(45);
 * console.log(dt.toISOString()); // "2025-04-18T00:00:45.000Z"
 */
Datetime_global.prototype.setSeconds = function (seconds, milliseconds) {
    milliseconds = arguments.length > 1 ? milliseconds : this.getMilliseconds();
    return this.setHours(this.getHours(), this.getMinutes(), seconds, milliseconds);
};
/**
 * Sets the milliseconds, modifying the instance in place.
 * Handles overflow/underflow by rolling over to adjacent seconds.
 * @param milliseconds - The milliseconds (0-999).
 * @returns The new timestamp in milliseconds since the epoch.
 * @throws Error if excessive overflow causes recursion limit to be reached.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * dt.setMilliseconds(500);
 * console.log(dt.toISOString()); // "2025-04-18T00:00:00.500Z"
 */
Datetime_global.prototype.setMilliseconds = function (milliseconds) {
    return this.setHours(this.getHours(), this.getMinutes(), this.getSeconds(), milliseconds);
};
// UTC
/**
 * Sets the year, optionally month and day, in UTC, modifying the instance in place.
 *
 * will convert to Date's calendar
 * @param fullYear - The year (e.g., 2025).
 * @param month - The month (0-11; optional, defaults to current UTC month).
 * @param date - The day of the month (1-31; optional, defaults to current UTC day).
 * @returns The new timestamp in milliseconds since the epoch.
 * @throws RangeError if the components form an invalid date.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * dt.setUTCFullYear(2026);
 * console.log(dt.toISOString()); // "2026-04-18T00:00:00.000Z"
 */
Datetime_global.prototype.setUTCFullYear = function (fullYear, month, date) {
    const nanosecond = BigInt(this.time.nanosecond), microsecond = BigInt(this.time.microsecond) * 1000n, datetime = new Date(this.time.epochMilliseconds);
    month = arguments.length > 1 ? month : datetime.getUTCMonth();
    date = arguments.length > 2 ? date : datetime.getUTCDate();
    const returnValue = BigInt(datetime.setUTCFullYear(fullYear, month, date));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1000000n) + microsecond + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
/**
 * Sets the hours, optionally minutes, seconds, and milliseconds, in UTC, modifying the instance in place.
 * Handles overflow/underflow by rolling over to adjacent days.
 *
 * will convert to Date's calendar
 * @param hours - The hours (e.g., 0-23; 25 rolls over to next day's 1:00).
 * @param minutes - The minutes (0-59; optional, defaults to current UTC minutes).
 * @param seconds - The seconds (0-59; optional, defaults to current UTC seconds).
 * @param milliseconds - The milliseconds (0-999; optional, defaults to current UTC milliseconds).
 * @returns The new timestamp in milliseconds since the epoch.
 * @throws RangeError if the components form an invalid date.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * dt.setUTCHours(15);
 * console.log(dt.toISOString()); // "2025-04-18T15:00:00.000Z"
 */
Datetime_global.prototype.setUTCHours = function (hours, minutes, seconds, milliseconds) {
    const nanosecond = BigInt(this.time.nanosecond), microsecond = BigInt(this.time.microsecond) * 1000n, date = new Date(this.time.epochMilliseconds);
    minutes = arguments.length > 1 ? minutes : date.getUTCMinutes();
    seconds = arguments.length > 2 ? seconds : date.getUTCSeconds();
    milliseconds = arguments.length > 3 ? milliseconds : date.getUTCMilliseconds();
    const returnValue = BigInt(date.setUTCHours(hours, minutes, seconds, milliseconds));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1000000n) + microsecond + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
/**
 * sets the month based on `Date.prototype.setUTCFullYear`
 * @param month the zero indexed month (0 to 11)
 * @param date the day of the month.
 */
Datetime_global.prototype.setUTCMonth = function (month, date) {
    date = arguments.length > 1 ? date : this.getUTCDate();
    return this.setUTCFullYear(this.getUTCFullYear(), month, date);
};
/**
 * sets the day based on `Date.prototype.setUTCFullYear`
 * @param date the day of the month.
 */
Datetime_global.prototype.setUTCDate = function (date) {
    return this.setUTCFullYear(this.getUTCFullYear(), this.getUTCMonth(), date);
};
/**
 * sets the minutes based on `Date.prototype.setUTCHours`
 * @param minutes the minutes (0 to 59)
 * @param seconds the seconds (0 to 59)
 * @param milliseconds the milliseconds (0 to 999)
 */
Datetime_global.prototype.setUTCMinutes = function (minutes, seconds, milliseconds) {
    seconds = arguments.length > 1 ? seconds : this.getUTCSeconds();
    milliseconds = arguments.length > 2 ? milliseconds : this.getUTCMilliseconds();
    return this.setUTCHours(this.getUTCHours(), minutes, seconds, milliseconds);
};
/**
 * sets the seconds based on `Date.prototype.setUTCHours`
 * @param seconds the seconds (0 to 59)
 * @param milliseconds the milliseconds (0 to 999)
 */
Datetime_global.prototype.setUTCSeconds = function (seconds, milliseconds) {
    milliseconds = arguments.length > 1 ? milliseconds : this.getUTCMilliseconds();
    return this.setUTCHours(this.getUTCHours(), this.getUTCMinutes(), seconds, milliseconds);
};
/**
 * Returns the internal Temporal.ZonedDateTime instance.
 * @returns The Temporal.ZonedDateTime.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.toTemporalZonedDateTime().toString());
 * // "2025-04-18T00:00:00+00:00[UTC]"
 */
Datetime_global.prototype.toTemporalZonedDateTime = function () {
    return this.time;
};
// custom
/**
 * Sets the nanoseconds and optionally microseconds, modifying the instance in place.
 * Preserves other date-time components.
 * @param nanoseconds - The nanoseconds to set (default 0).
 * @param microseconds - The microseconds to set (optional, defaults to current microseconds).
 * @returns The new timestamp in nanoseconds since the epoch.
 * @throws TypeError if inputs are not bigints.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * dt.setNanoseconds(500n);
 * console.log(dt.getNanoseconds()); // 500n
 */
Datetime_global.prototype.setNanoseconds = function (nanoseconds = 0n, microseconds) {
    const self_time = this.time, did_specify_microseconds = arguments.length > 1;
    microseconds = BigInt(did_specify_microseconds ? (microseconds ?? 0) : self_time.microsecond);
    return BigInt((this.time = new Temporal.ZonedDateTime(self_time.with({
        microsecond: did_specify_microseconds ? 0 : self_time.microsecond,
        nanosecond: 0, millisecond: self_time.millisecond,
    }).epochNanoseconds + ((microseconds * 1000n) + BigInt(nanoseconds)), self_time.timeZoneId)).epochNanoseconds);
};
/**
 * Returns the nanosecond and microseconds component of the date-time (0-999).
 * @returns The nanoseconds and microseconds as a bigint.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00.000000500Z", "UTC");
 * console.log(dt.getNanoseconds()); // 500n
 */
Datetime_global.prototype.getUTCNanoseconds = Datetime_global.prototype.getNanoseconds = function () {
    return (BigInt(this.time.microsecond) * 1000n) + BigInt(this.time.nanosecond);
};
/**
 * Formats a timezone offset in minutes as a UTC string (e.g., "UTC+0000").
 * @param offset - The offset in minutes (positive for west of UTC, negative for east).
 * @returns The formatted offset string.
 * @example
 * console.log(Datetime_global.getUTCOffset(240)); // "UTC-0400"
 */
Datetime_global.getUTCOffset = function (offset) {
    if (isNaN(offset))
        return 'UTC+Error';
    const sign = offset > 0 ? "-" : "+", absOffset = Math.abs(offset);
    const pad = (n) => padNumber(n).replace(/^\+/, '');
    const hours = pad(Math.trunc(absOffset / 60));
    const minutes = pad(absOffset % 60);
    return `UTC${sign}${hours}${minutes}`;
};
/**
 * Updates the innerText of HTML <time> elements with formatted date-time strings.
 * Uses the `data-datetime-global-format` attribute for the format (default: "D M d Y H:i:s \U\T\CO (e)")
 * and `data-iana-timezone` for the timezone (default: local timezone).
 * @param timetags - A NodeList or Array of HTMLTimeElement.
 * @throws RangeError if a time element's dateTime attribute is invalid.
 * @example
 * // HTML: <time datetime="2025-04-18T00:00:00Z" data-datetime-global-format="[offsetFromNow]"></time>
 * Datetime_global.htmlToCurrentTime(document.querySelectorAll('time'));
 * // Updates innerText to e.g., "in 5 days"
 */
Datetime_global.htmlToCurrentTime = function (timetags = []) {
    const now = Temporal.Now.zonedDateTimeISO();
    Array.from(timetags).forEach(function (each) {
        const tz = each.getAttribute('data-iana-timezone') ?? Temporal.Now.timeZoneId(), d = new Datetime_global(Date.parse(each.dateTime), tz), f = each.getAttribute('data-datetime-global-format') ?? 'D M d Y H:i:s \\U\\T\\CO (e)';
        switch (f) {
            case "[TemporalOffset]":
                {
                    const target = d.toTemporalZonedDateTime();
                    const isFuture = target.epochMilliseconds > now.epochMilliseconds, largestUnit = 'days';
                    const duration = isFuture ? now.until(target, { largestUnit }) : target.until(now, { largestUnit });
                    const parts = [];
                    if (duration.days)
                        parts.push(`${duration.days} day${duration.days !== 1 ? 's' : ''}`);
                    if (duration.hours)
                        parts.push(`${duration.hours} hour${duration.hours !== 1 ? 's' : ''}`);
                    if (duration.minutes)
                        parts.push(`${duration.minutes} minute${duration.minutes !== 1 ? 's' : ''}`);
                    if (duration.seconds && parts.length === 0)
                        parts.push(`${duration.seconds} second${duration.seconds !== 1 ? 's' : ''}`);
                    const join = parts.map(s => s.trim()).join(', ');
                    each.innerText = isFuture ? 'in ' + join : join + ' ago';
                }
                return;
        }
        each.innerText = d.format(f);
    });
};
/**
 * Formats the time difference between now and the given date as a human-readable string.
 * @param date The timestamp (in milliseconds) to compare against the current time.
 * @returns A string like "now", "in 30 seconds", or "5 minutes ago".
 */
export const formatOffsetFromNow = function (date) {
    const diffMs = (+date) - Date.now();
    const absDiffMs = Math.abs(diffMs);
    const isFuture = diffMs > 0;
    const seconds = Math.floor(absDiffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (absDiffMs < 1000) {
        return "now";
    }
    else if (seconds < 60) {
        return `${isFuture ? "in " : ""}${seconds} second${seconds === 1 ? "" : "s"}${isFuture ? "" : " ago"}`;
    }
    else if (minutes < 60) {
        return `${isFuture ? "in " : ""}${minutes} minute${minutes === 1 ? "" : "s"}${isFuture ? "" : " ago"}`;
    }
    else if (hours < 24) {
        return `${isFuture ? "in " : ""}${hours} hour${hours === 1 ? "" : "s"}${isFuture ? "" : " ago"}`;
    }
    else {
        return `${isFuture ? "in " : ""}${days} day${days === 1 ? "" : "s"}${isFuture ? "" : " ago"}`;
    }
};
/**
 * applies the UTC time to the `Datetime_global`
 *
 * @returns {Datetime_global}
 */
Datetime_global.prototype.toUTCTimezone = function () {
    return this.toTimezone('UTC');
};
/**
 * applies the system's LocalTime to the `Datetime_global`
 *
 * @returns {Datetime_global}
 */
Datetime_global.prototype.toLocalTime = function () {
    return this.toTimezone(Temporal.Now.timeZoneId());
};
/**
 * Returns the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday).
 * @alias getDay
 * @returns The day of the week (0-6).
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC"); // Friday
 * console.log(dt.getDayNumberWeek()); // 5
 */
Datetime_global.prototype.getDayNumberWeek = function () {
    return this.getDay();
};
/**
 * Returns the day of the month (1-31).
 * @alias getDate
 * @returns The day of the month.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getDayNumberMonth()); // 18
 */
Datetime_global.prototype.getDayNumberMonth = Datetime_global.prototype.getDayNumber = function () {
    return this.getDate();
};
/**
 * Returns the abbreviated weekday name (e.g., "Mon", "Tue") in en-US locale.
 * @returns The weekday name. (oneOf "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" )
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC"); // Friday
 * console.log(dt.getDayName()); // "Fri"
 */
Datetime_global.prototype.getDayName = function () {
    return Datetime_global.daynames[this.getDay()];
};
/**
 * Returns the abbreviated month name (e.g., "Jan", "Feb") in en-US locale.
 * @returns The month name. (oneOf "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec" )
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getMonthName()); // "Apr"
 */
Datetime_global.prototype.getMonthName = function () {
    return Datetime_global.monthnames[this.withCalender('iso8601').getMonth()];
};
/**
 * Returns the full weekday name (e.g., "Monday", "Tuesday") in en-US locale.
 * @returns The weekday name. (OneOf "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday")
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC"); // Friday
 * console.log(dt.getFullDayName()); // "Friday"
 */
Datetime_global.prototype.getFullDayName = function () {
    return Datetime_global.daynamesFull[this.getDay()];
};
/**
 * Returns the full month name (e.g., "January", "February") in en-US locale.
 * @returns The full month name. (oneOf "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December")
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getFullMonthName()); // "April"
 */
Datetime_global.prototype.getFullMonthName = function () {
    return Datetime_global.monthnamesFull[this.withCalender('iso8601').getMonth()];
};
/**
 * @see Temporal.ZonedDateTime.toLocaleString
 * @param locales
 * @param options
 */
Datetime_global.prototype.toLocaleString = function (locales, options) {
    return this.time.toLocaleString(locales, options);
};
/**
 * Converts the internal datetime value to a GMT (UTC) string representation.
 *
 * This method provides a standardized, human-readable string of the datetime
 * in Greenwich Mean Time (UTC), following the format produced by
 * `Date.prototype.toUTCString()`. It is primarily intended for display purposes
 * where a clear, unambiguous representation of the time in UTC is required.
 *
 * Internally, this method delegates to `toDate()`, which is expected to return a
 * native JavaScript `Date` instance representing the same point in time as this
 * `Datetime_global` object.
 *
 * #### Example
 * ```js
 * const dt = new Datetime_global(...);
 * console.log(dt.toGMTString());
 * // Output: "Mon, 09 Jun 2025 12:00:00 GMT"
 * ```
 *
 * @method toGMTString
 * @memberof Datetime_global
 * @instance
 * @returns {string} A GMT-formatted date string compliant with `Date.prototype.toUTCString()`.
 */
Datetime_global.prototype.toGMTString = function () {
    return this.toDate().toUTCString();
};
/**
 * Converts the internal datetime value to a UTC string representation.
 *
 * This method provides a standardized, human-readable string of the datetime
 * in UTC, following the format produced by
 * It is primarily intended for display purposes
 * where a clear, unambiguous representation of the time in UTC is required.
 *
 * #### Example
 * ```js
 * const dt = new Datetime_global(...);
 * console.log(dt.toUTCString());
 * // Output: "Mon, 09 Jun 2025 12:00:00 UTC"
 * ```
 *
 * @method toGMTString
 * @memberof Datetime_global
 * @instance
 * @returns {string} A UTC-formatted date string.
 * @note php 'D, d M Y H:i:s \\U\\T\\C'
 */
Datetime_global.prototype.toUTCString = function () {
    return this.toUTCTimezone().format('D, d M Y H:i:s \\U\\T\\C');
};
Datetime_global.prototype.toDateString = function () {
    return this.format('D M d Y');
};
Datetime_global.prototype.toTimeString = function () {
    return this.format('H:i:s \\U\\T\\CO (e)');
};
/**
 * Formats the date-time using a PHP-like format pattern with placeholders (e.g., `Y`, `m`, `d`).
 * Supports special patterns (e.g., `[toMYSQLi]`) and escaped characters (e.g., `\Y`).
 * @param pattern - The format string with placeholders or special patterns.
 * @returns The formatted date-time string.
 * @throws Error if the `o` placeholder (ISO-8601 year) is used.
 * @example
 * const dt = new Datetime_global(new Date(2025, 3, 18), "UTC");
 * dt.format("Y-m-d H:i:s"); // "2025-04-18 00:00:00"
 * dt.format("[toMYSQLi]"); // "2025-04-18 00:00:00"
 * dt.format("D, Y-m-d H:i:s.u \\U\\T\\CO (e)"); // "Fri, 2025-04-18 00:00:00.000000 UTC+0000 (UTC)"
 * @see https://www.php.net/manual/en/datetime.format.php for placeholder details.
 */
Datetime_global.prototype.format = function (pattern) {
    const string = pattern ?? '';
    //(new this.constructor(this, this?.time?.timeZoneId))
    const datetime_local = this.withCalender(), pad = (n, z = 2) => padNumber(n, z).replace(/^\+/, '');
    const hour24 = pad(datetime_local.getHours()), dayName = datetime_local.getDayName();
    const iso8601 = datetime_local, dayNameFull = datetime_local.getFullDayName();
    const dayNumberMonth = pad(datetime_local.getDayNumberMonth()), N = iso8601.time.dayOfWeek.toString(), //iso8601.time.dayOfWeek
    W = iso8601.time?.weekOfYear?.toString() ?? 'undefined', w = iso8601.getDay().toString(), z = iso8601.time.daysInYear.toString(), m = pad(datetime_local.getMonth() + 1), M = datetime_local.getMonthName(), F = datetime_local.getFullMonthName(), hour12 = pad(+hour24 === 0 ? 12 : +hour24), dayInMonth = datetime_local.time.daysInMonth.toString(), leap = datetime_local.time.inLeapYear ? '1' : '0', X = pad(datetime_local.getFullYear(), 4), getYear = pad(datetime_local.getYear(), 2), minutes = pad(datetime_local.getMinutes()), seconds = pad(datetime_local.getSeconds()), datetime_timezone = datetime_local.time.timeZoneId, offset = Datetime_global.getUTCOffset(datetime_local.getTimezoneOffset()).replace(/UTC/, ''), currentDate = datetime_local.toDate(), B = toSwatchInternetTime(currentDate), microseconds = `${pad(datetime_local.getMilliseconds(), 3)}${pad(datetime_local.time.microsecond, 3)}`, milliseconds = pad(datetime_local.getMilliseconds(), 3);
    return String(string).replace(/\[[a-zA-Z0-9\-_]+]/g, function (substring) {
        const f = substring.toLowerCase(), each = { innerText: f };
        if (/^\[[a-zA-Z0-9\-_]+]$/i.test(f)) {
            switch (f) {
                case "[offsetfromnow]":
                    each.innerText = noFormat(formatOffsetFromNow(currentDate));
                    break;
                case "[datev1]":
                    each.innerText = 'D M d Y H:i:s \\U\\T\\CO (e)';
                    break;
                case '[HeaderDefault]':
                    each.innerText = 'D, d M Y H:i:s O (e)';
                    break;
                case '[toMYSQLi]':
                    each.innerText = 'Y-m-d H:i:s';
                    break;
                case '[B]':
                    each.innerText = 'D, @B (Y-m-d H:i:s)';
                    break;
                default:
            }
        }
        return each.innerText;
    }).replace(/\\*[a-zA-Z]/ig, function (substring) {
        const strxx = substring.replace(/\\\\/g, '\\').slice(-1);
        if (substring.length % 2 !== 0) {
            const strx = strxx.replace(/[^\\]/g, ''), charxater = substring.replace(/\\/g, '');
            switch (charxater) {
                case 'd':
                    return strx + dayNumberMonth;
                case 'D':
                    return strx + dayName;
                case 'j':
                    return strx + +dayNumberMonth;
                case 'l':
                    return strx + dayNameFull;
                case 'N':
                    return strx + +N;
                case 'S':
                    return strx + ordinalSuffix(+m);
                case 'w':
                    return strx + w;
                case 'z':
                    return strx + z;
                case 'W':
                    return strx + W;
                case 'F':
                    return strx + F;
                case 'm':
                    return strx + m;
                case 'M':
                    return strx + M;
                case 'n':
                    return strx + +m;
                case 't':
                    return strx + dayInMonth;
                case 'L':
                    return strx + leap;
                case 'o':
                    throw new Error('\'o\' is not supported as formatting character');
                case 'X':
                    return strx + addSignToNumber(X, false);
                case 'Y':
                    return strx + X;
                case 'y':
                    return strx + getYear;
                case 'x':
                    if (+X > 10_000) {
                        return strx + '+' + X;
                    }
                    return strx + addSignToNumber(X, false).replace(/^\+/, '');
                case 'a':
                    return strx + (+hour24 < 12 ? 'am' : 'pm');
                case 'A':
                    return strx + (+hour24 < 12 ? 'am' : 'pm').toUpperCase();
                case 'B':
                    return strx + B;
                case 'h':
                    return strx + hour12;
                case 'H':
                    return strx + hour24;
                case 'i':
                    return strx + minutes;
                case 's':
                    return strx + seconds;
                case 'O':
                    return strx + offset;
                case 'u':
                    return strx + microseconds;
                case 'v':
                    return strx + milliseconds;
                case 'e':
                    return strx + datetime_timezone;
                default:
                    //('your \'' + charxater + '\' is not supported as formatting character');
                    return strx + charxater;
            }
        }
        return strxx;
    });
};
function underscoreNumber(n) {
    return chunkArray(Array.from(BigInt(n).toString()).reverse(), 3).map(chunk => chunk.reverse().join().replace(/,/g, '')).reverse().join().replace(/,/g, '_');
}
function chunkArray(array, chunkSize) {
    const result = [];
    array = Array.from(array);
    chunkSize = Number(Math.trunc(chunkSize));
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}
function addSignToNumber(n, chunk = true) {
    const strx = String((chunk ? underscoreNumber : BigInt)(n));
    return strx.startsWith('-') ? strx : `+${strx}`;
}
export const noFormat = function (string) {
    return String(string).replace(/[a-zA-Z]/g, '\\$&');
};
export const plainToZoned = function (tempTime) {
    let time;
    const temporalTimezoneId = Temporal.Now.timeZoneId();
    if (tempTime instanceof Datetime_global) {
        time = tempTime;
    }
    else if (tempTime instanceof Date || tempTime instanceof Temporal.ZonedDateTime || tempTime instanceof Temporal.Instant) {
        time = new Datetime_global(tempTime);
    }
    else if (tempTime instanceof Temporal.PlainDateTime) {
        time = new Datetime_global(tempTime.toZonedDateTime(temporalTimezoneId));
    }
    else if (tempTime instanceof Temporal.PlainDate) {
        time = new Datetime_global(tempTime.toPlainDateTime({
            hour: 0, minute: 0, second: 0,
        }).toZonedDateTime(temporalTimezoneId));
    }
    else if (tempTime instanceof Temporal.PlainYearMonth) {
        time = new Datetime_global(tempTime.toPlainDate({ day: 1 }).toPlainDateTime({
            hour: 0, minute: 0, second: 0,
        }).toZonedDateTime(temporalTimezoneId));
    }
    else if (tempTime instanceof Temporal.PlainTime) {
        time = new Datetime_global(Temporal.Now.plainDateISO().toPlainDateTime(tempTime).toZonedDateTime(temporalTimezoneId));
    }
    else {
        throw new TypeError('Custom object time property must be Datetime_global, Date, Temporal.ZonedDateTime, Temporal.Instant, Temporal.PlainDateTime, Temporal.PlainDate, Temporal.PlainYearMonth, Temporal.PlainTime, or undefined');
    }
    return time;
};
// "changed Datetime_global.prototype.templateFormat in 0.7.1"
export const nullStyle = Symbol('nullStyle');
export const undefinedFormat = Symbol('undefinedFormat');
/**
 * Formats the date-time using a template literal, where placeholders are processed by the format method.
 * @param strings - The literal parts of the template string.
 * @param expressions - The placeholders to be formatted (e.g., "Y", "m", "d").
 * @returns The formatted string.
 * @throws Error if a placeholder is invalid (e.g., "o").
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.templateFormat`Date: ${"Y"}-${"m"}-${"d"}`);
 * // "Date: 2025-04-18"
 */
Datetime_global.prototype.templateFormat = function (strings, ...expressions) {
    const self = this;
    // Combine static strings and formatted expressions
    return strings.reduce(function (result, str, i) {
        let exp = expressions[i], formatIt = false;
        if (exp === null) {
            exp = '';
        }
        else {
            switch (typeof exp) {
                case "bigint":
                case "number":
                case "boolean":
                case "undefined":
                    exp = '';
                    break;
                case "symbol":
                    switch (exp) {
                        case nullStyle:
                            exp = self.toString();
                            break;
                        case undefinedFormat:
                            exp = self.toDate().toString();
                            break;
                        default:
                            throw new TypeError('Symbols are not supported; convert to string');
                    }
                    break;
                case "function":
                    {
                        const cloned = self.clone();
                        exp = String(exp.call(cloned, cloned));
                    }
                    break;
                case "object":
                    if (exp instanceof Datetime_global) {
                        exp = exp.toString();
                        // the conditions `exp === Datetime_global`, `exp === globalThis.Date`,
                        // `globalThis.Date.now` and `exp === globalThis?.Temporal?.Now && exp === Temporal?.Now`
                        // arent expected to be true, but still
                        // @ts-expect-error
                    }
                    else if (exp === globalThis?.Temporal?.Now && exp === Temporal?.Now) {
                        exp = Temporal.Now.zonedDateTimeISO(Temporal.Now.timeZoneId()).toString();
                    }
                    else if (exp === Datetime_global) {
                        exp = Datetime_global();
                    }
                    else if (exp === globalThis.Date) {
                        exp = Date();
                    }
                    else if (exp === globalThis.Date.now) {
                        // this may seem wierd, but if you really want to
                        // display a timestamp then just call the function
                        exp = Date();
                    }
                    else if (exp === globalThis.Date.UTC) {
                        exp = (new Date).toUTCString();
                    }
                    else if (exp instanceof Date) {
                        exp = exp.toString();
                    }
                    else if (exp instanceof Temporal.ZonedDateTime || exp instanceof Temporal.Instant) {
                        exp = Datetime_global(exp);
                    }
                    else if (exp instanceof Temporal.PlainDateTime) {
                        exp = exp.toLocaleString('en-US', { month: 'long', year: 'numeric', day: "2-digit" });
                    }
                    else if (exp instanceof Temporal.PlainTime) {
                        exp = exp.toLocaleString('en-US', {
                            hour: 'numeric', minute: '2-digit',
                            second: '2-digit', hour12: false,
                        });
                    }
                    else if (exp instanceof Temporal.PlainYearMonth) {
                        exp = exp.toLocaleString('en-US', { month: 'long', year: 'numeric' });
                    }
                    else if (exp instanceof Temporal.PlainDate) {
                        exp = exp.toLocaleString('en-US', { month: 'long', year: 'numeric', day: "2-digit" });
                    }
                    else {
                        // logic for objects, add `formatIt = true;` to pass it through format
                        // throw new Error('invalid Object passed to Datetime_global.prototype.templateFormat');
                        if ('raw' in exp) {
                            exp = String(exp.raw);
                        }
                        else {
                            let time, resultExp;
                            if ('time' in exp && exp['time'] !== undefined) {
                                time = plainToZoned(exp['time']);
                            }
                            else {
                                time = new Datetime_global(self.toTemporalZonedDateTime());
                            }
                            if ('callback' in exp) {
                                if (typeof exp.callback !== 'function') {
                                    throw new TypeError('callbacks in custom objects must be functions');
                                }
                                resultExp = String(exp.callback.call(exp, time.clone()));
                            }
                            if ('pattern' in exp && ('localeOptions' in exp || 'locale' in exp)) {
                                throw new TypeError('Cannot combine pattern with locale or localeOptions');
                            }
                            else if ('pattern' in exp && typeof exp['pattern'] === 'string') {
                                resultExp = time.format(exp['pattern']);
                            }
                            else if ('localeOptions' in exp || 'locale' in exp) {
                                resultExp = time.toTemporalZonedDateTime().toLocaleString(exp['locale'], exp['localeOptions']);
                            }
                            else {
                                throw new TypeError('if a pattern is on a custom object then it must be a string');
                            }
                            exp = resultExp;
                        }
                    }
                    break;
                case "string":
                    formatIt = true;
                    break;
                default:
            }
        }
        const stringified = String(exp), formatted = formatIt ? self.format(stringified) : stringified;
        return result + str + (i < expressions.length ? formatted : '');
    }, '');
};
Datetime_global.FORMAT_DATETIME_GLOBALV3 = 'D, Y-M-d H:i:s \\U\\T\\CO (e)';
Datetime_global.FORMAT_DATETIME_GLOBALV2 = 'D, Y-m-d H:i:s.u \\U\\T\\CO (e)';
Datetime_global.FORMAT_DATETIME_GLOBALV1 = 'D Y-m-d H:i:s \\U\\T\\CO (e)';
Datetime_global.FORMAT_DATEV1 = 'D M d Y H:i:s \\U\\T\\CO (e)';
Datetime_global.FORMAT_HEADER_DEFAULT = 'D, d M Y H:i:s O (e)';
Datetime_global.FORMAT_MYSQLI = 'Y-m-d H:i:s';
Datetime_global.FORMAT_B = 'D, @B (Y-m-d H:i:s)';
Datetime_global.FORMAT_ISO8601 = 'Y-m-d\\TH:i:s.vO';
Datetime_global.FORMAT_MYSQL = 'Y-m-d H:i:s';
Datetime_global.FORMAT_RFC2822 = 'D, d M Y H:i:s O';
Datetime_global.FORMAT_SHORT_DATE = 'M d, Y';
Datetime_global.FORMAT_LONG_DATE = 'l, F jS, Y';
Datetime_global.FORMAT_SHORT_DATE_TIME = 'M d, Y H:i';
Datetime_global.FORMAT_FULL_DATE_TIME = 'l, F jS, Y H:i:s O (e)';
Datetime_global.FORMAT_OFFSET_FROM_NOW = '[offsetFromNow]';
Datetime_global.daynames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
Datetime_global.monthnames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
Datetime_global.daynamesFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
Datetime_global.monthnamesFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// todo correctly handle this
export const toSwatchInternetTime = function (date) {
    const datetime = new Datetime_global(date)
        .withTimezone('+0100'), userTimestamp = datetime.epochNanoseconds;
    const midnightTimestamp = datetime.startOfDay().epochNanoseconds; // start of day in TZ(+0100)
    const elapsedNs = userTimestamp - midnightTimestamp;
    return ((elapsedNs / 1000000n) * 10n / 864000n).toString().padStart(3, '0');
};
/**
 * changes the calendar
 * @param calender defaults to "iso8601"
 */
Datetime_global.prototype.withCalender = function (calender = "iso8601") {
    const datetime_global = new Datetime_global(this.time.epochNanoseconds, this.time.timeZoneId);
    datetime_global.time = datetime_global.time.withCalendar(calender);
    return datetime_global;
};
/**
 * Creates a new Datetime_global instance with the same date-time and timezone.
 * @returns A new Datetime_global instance.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * const clone = dt.clone();
 * console.log(clone.toISOString()); // "2025-04-18T00:00:00.000Z"
 */
Datetime_global.prototype.clone = function () {
    return new Datetime_global(this.time);
};
/**
 * Returns a new Datetime_global instance set to the start of the current day (00:00:00.000000000) in the same timezone.
 * @returns A new Datetime_global instance.
 * @example
 * const dt = new Datetime_global(new Date(2025, 4, 18, 15, 30), "UTC");
 * dt.startOfDay().toISOString(); // "2025-04-18T00:00:00.000Z"
 */
Datetime_global.prototype.startOfDay = function (timezone) {
    const zdt = (timezone ? this.toTimezone(timezone) : this).time.startOfDay().epochNanoseconds;
    return new Datetime_global(zdt, this.time.timeZoneId);
};
/**
 * Retrieves the timestamp for this Datetime_global instance.
 *
 * @returns {bigint} The timestamp associated with the Temporal.ZonedDateTime instance.
 */
Datetime_global.prototype.getTimestamp = function () {
    return this.time.epochNanoseconds;
};
export const ordinalSuffix = function (value) {
    const $number = Number(BigInt(value)) % 100;
    let $suffix;
    if ($number >= 11 && $number <= 13) {
        $suffix = 'th';
    }
    else {
        switch ($number % 10) {
            case 1:
                $suffix = 'st';
                break;
            case 2:
                $suffix = 'nd';
                break;
            case 3:
                $suffix = 'rd';
                break;
            default:
                $suffix = 'th';
                break;
        }
    }
    return $suffix;
};
/**
 * undocumented, can change any version
 * @param other
 * @param options
 */
Datetime_global.prototype.until = function (other, options) {
    const zdt = new Datetime_global(other, this.getTimezoneId());
    return new ZDTDuration(this.time.until(zdt.toTemporalZonedDateTime(), options));
};
/**
 * undocumented, can change any version
 * @param other
 * @param options
 */
Datetime_global.prototype.since = function (other, options) {
    const zdt = new Datetime_global(other, this.getTimezoneId());
    return new ZDTDuration(this.time.since(zdt.toTemporalZonedDateTime(), options));
};
function toPrimitive(o, preference) {
    preference = ["number", "string", "default"].includes(preference) ? preference : "default";
    if (typeof o === "object" || typeof o === "function") {
        if (typeof o[Symbol.toPrimitive] === "function") {
            const p = o[Symbol.toPrimitive](preference);
            if (!(typeof p === "object" || typeof p === "function")) {
                return p;
            }
        }
        else {
            for (let methodName of (preference === "string" ? ["toString", "valueOf"] : ["valueOf", "toString"])) {
                if (typeof o[methodName] === "function") {
                    const p = o[methodName]();
                    if (!(typeof p === "object" || typeof p === "function")) {
                        return p;
                    }
                }
            }
        }
    }
    else {
        return o;
    }
    throw new TypeError('that could not be converted to Primitive');
}
export function toNumeric(value, type = null) {
    // Handle object conversion
    value = toPrimitive(value, "number");
    // At this point, value should be a primitive
    if (type === 'Number') {
        return +value; // Unary plus, let errors propagate
    }
    else if (type === 'BigInt') {
        try {
            return BigInt(value);
        }
        catch (e) {
            if (e instanceof TypeError) {
                throw e; // Rethrow TypeError
            }
            if (e instanceof SyntaxError) {
                return null; // Return null for SyntaxError
            }
            throw e; // Rethrow other errors
        }
    }
    else {
        // Default case: return BigInt as-is, others get unary plus
        if (typeof value === 'bigint') {
            return value;
        }
        return +value; // Unary plus, let errors propagate
    }
}
/**
 * Adjusts a `Temporal.ZonedDateTime` or `Datetime_global` object by applying overflow or underflow changes
 * to its date and time components based on the provided `overflow_overwrite` values.
 *
 * @param zonedDateTime - The input date-time object, either as a `Datetime_global` with a `time` property
 *                        of type `Temporal.ZonedDateTime` or directly as a `Temporal.ZonedDateTime`.
 * @param overflow_overwrite - An object specifying the date and time fields to overwrite. Any unspecified
 *                             fields will retain their original values from `zonedDateTime`.
 * @param overflow_overwrite.year - The year to set, or `undefined` to keep the original.
 * @param overflow_overwrite.month - The month to set (1-12), or `undefined` to keep the original.
 * @param overflow_overwrite.day - The day to set (1-31), or `undefined` to keep the original.
 * @param overflow_overwrite.hour - The hour to set (0-23), or `undefined` to keep the original.
 * @param overflow_overwrite.minute - The minute to set (0-59), or `undefined` to keep the original.
 * @param overflow_overwrite.second - The second to set (0-59), or `undefined` to keep the original.
 * @param overflow_overwrite.millisecond - The millisecond to set (0-999), or `undefined` to keep the original.
 * @param overflow_overwrite.microsecond - The microsecond to set (0-999), or `undefined` to keep the original.
 * @param overflow_overwrite.nanosecond - The nanosecond to set (0-999), or `undefined` to keep the original.
 *
 * @returns A new `Temporal.ZonedDateTime` object with the adjusted date and time, accounting for overflow
 *          or underflow as calculated from the differences between the provided and original values.
 *
 * @example
 * ```typescript
 * const zonedDateTime = new Temporal.ZonedDateTime(
 *   2023n, 10n, 15n, 12n, 0n, 0n, 0n, 0n, 0n, 'America/New_York'
 * );
 * const overflow = { year: 2024, month: 12 };
 * const result = overflowDatetime_global({ time: zonedDateTime }, overflow);
 * // Returns a new ZonedDateTime with year 2024 and month 12, other fields unchanged.
 * ```
 */
export function overflowDatetime_global(zonedDateTime, overflow_overwrite) {
    // Extract the ZonedDateTime object
    const self_time = zonedDateTime.time;
    // Prepare the fields with defaults from self_time
    const try_time = {
        year: overflow_overwrite.year ?? self_time.year,
        month: overflow_overwrite.month ?? self_time.month,
        day: overflow_overwrite.day ?? self_time.day,
        hour: overflow_overwrite.hour ?? self_time.hour,
        minute: overflow_overwrite.minute ?? self_time.minute,
        second: overflow_overwrite.second ?? self_time.second,
        millisecond: overflow_overwrite.millisecond ?? self_time.millisecond,
        microsecond: overflow_overwrite.microsecond ?? self_time.microsecond,
        nanosecond: overflow_overwrite.nanosecond ?? self_time.nanosecond,
    };
    // Calculate the differences (overflow/underflow) from the base time
    const duration = {
        years: try_time.year - self_time.year,
        months: try_time.month - self_time.month,
        days: try_time.day - self_time.day,
        hours: try_time.hour - self_time.hour,
        minutes: try_time.minute - self_time.minute,
        seconds: try_time.second - self_time.second,
        milliseconds: try_time.millisecond - self_time.millisecond,
        microseconds: try_time.microsecond - self_time.microsecond,
        nanoseconds: try_time.nanosecond - self_time.nanosecond,
    };
    let zoneddatetime = self_time;
    for (const unit of ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds', 'microseconds', 'nanoseconds']) {
        // @ts-expect-error
        zoneddatetime = zoneddatetime.add(Temporal.Duration.from({ [unit]: duration[unit] }));
    }
    return zoneddatetime;
}
Datetime_global.hostLocalTimezone = function () {
    return Temporal.Now.timeZoneId();
};
export function padNumber(number, zeros = 2) {
    number = -(-number);
    /*if (Number.isNaN(number)) return 'Not a Number';//;//
    if (number === +Infinity) return 'Positive Infinity';//
    if (number === -Infinity) return 'Negative Infinity';*/
    if (Number.isNaN(number))
        throw new TypeError('Not A Number is encountered');
    if (number === +Infinity)
        throw new TypeError('Positive Infinity is encountered');
    if (number === -Infinity)
        throw new TypeError('Negative Infinity is encountered');
    let negative = false;
    if (number < 0) {
        negative = true;
        number = -number;
    }
    return (negative ? '-' : '+') + String(number).padStart(zeros, "0");
}
