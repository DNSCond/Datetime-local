"use strict"; // [^\x00-\x7F]
import {Datetime_local} from "./Datetime_local.js";
import {Temporal} from 'temporal-polyfill';
// npm: https://www.npmjs.com/package/datetime_global
// github: https://github.com/Qin2007/Datetime-local

export type constructorInput =
    | Temporal.ZonedDateTime
    | Temporal.Instant
    | Datetime_global
    | Date
    | bigint
    | number
    | string;
export type Datetime_global = {
    constructor: Datetime_global_constructor,
    time: Temporal.ZonedDateTime,
    [Symbol.toStringTag]: string,
    toString(this: Datetime_global): string,
    getTime(this: Datetime_global): number,
    valueOf(this: Datetime_global): number,
    setTime(this: Datetime_global, timestamp: number): number,
    toHTML(this: Datetime_global): string,
    toHTMLString(this: Datetime_global): string,
    // convertion utils
    toDate(this: Datetime_global): Date,
    toTimezone(this: Datetime_global, timezoneId: Temporal.TimeZoneLike): Datetime_global,
    withTimezone(this: Datetime_global, timezoneId: Temporal.TimeZoneLike): Datetime_global,
    // builtin-proxy
    getDay(this: Datetime_global): number;
    getYear(this: Datetime_global): number;
    getFullYear(this: Datetime_global): number;
    getMonth(this: Datetime_global): number;
    getDate(this: Datetime_global): number;
    getHours(this: Datetime_global): number;
    getMinutes(this: Datetime_global): number;
    getSeconds(this: Datetime_global): number;
    getMilliseconds(this: Datetime_global): number;
    // setters
    setFullYear(this: Datetime_global, fullYear: number, month?: number, date?: number): number

    // builtin-proxy-UTC
    getUTCDay(this: Datetime_global): number;
    getUTCYear(this: Datetime_global): number;
    getUTCFullYear(this: Datetime_global): number;
    getUTCMonth(this: Datetime_global): number;
    getUTCDate(this: Datetime_global): number;
    getUTCHours(this: Datetime_global): number;
    getUTCMinutes(this: Datetime_global): number;
    getUTCSeconds(this: Datetime_global): number;
    getUTCMilliseconds(this: Datetime_global): number;
    getTimezoneOffset(this: Datetime_global): number;
    toJSON(this: Datetime_global): string;
    // setters
    setUTCFullYear(this: Datetime_global, fullYear: number, month?: number, date?: number): number;
    setUTCHours(this: Datetime_global, hours: number, minutes?: number, seconds?: number, milliseconds?: number): number;
    // custom
    getDayNumberWeek(this: Datetime_global): number;
    getDayNumberMonth(this: Datetime_global): number;
    getDayNumber(this: Datetime_global): number;
    getDayName(this: Datetime_global): string;
    getMonthName(this: Datetime_global): string;
    getFullMonthName(this: Datetime_global): string;
    getFullDayName(this: Datetime_global): string;

    setNanoseconds(this: Datetime_global, nanoseconds: bigint, microseconds?: bigint): bigint;
    getNanoseconds(this: Datetime_global): bigint;
    getUTCNanoseconds(this: Datetime_global): bigint;
    toDatetime_local(this: Datetime_global): Datetime_local;

    toISOString(this: Datetime_global): string;
    toTemporalZonedDateTime(): Temporal.ZonedDateTime;

    setMonth(this: Datetime_global, month: number, date?: number): number;
    setDate(this: Datetime_global, date: number): number
    setHours(this: Datetime_global, hours: number, minutes?: number, seconds?: number, milliseconds?: number): number;
    setMinutes(this: Datetime_global, minutes: number, seconds?: number, milliseconds?: number): number;
    setSeconds(this: Datetime_global, seconds: number, milliseconds?: number): number;
    setMilliseconds(this: Datetime_global, milliseconds: number): number;

    toUTCTimezone(this: Datetime_global): Datetime_global;
    toLocalTime(this: Datetime_global): Datetime_global;
    toLocaleString(locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined): string;
    format(this: Datetime_global, string: string): string;//formatPlaceholders(this:Datetime_global):{[k:string]:string};
    withCalender(this: Datetime_global, calender?: Temporal.CalendarLike): Datetime_global;

    startOfDay(this: Datetime_global, timezone?: Temporal.TimeZoneLike): Datetime_global;
    templateFormat(this: Datetime_global, strings: TemplateStringsArray, ...expressions: unknown[]): string;
    clone(this: Datetime_global): Datetime_global;
    getTimezoneId(this: Datetime_global): string;
    getTimestamp(this: Datetime_global): bigint;

    until(this: Datetime_global, other: constructorInput): Temporal.Duration;
    since(this: Datetime_global, other: constructorInput): Temporal.Duration;
};

interface Datetime_global_constructor {
    prototype: Datetime_global;

    new(from?: constructorInput | Datetime_local, timezoneId?: Temporal.TimeZoneLike | string | undefined): Datetime_global,

    (from?: constructorInput | Datetime_local, timezoneId?: Temporal.TimeZoneLike | string | undefined): string,

    parse_strict(string: string): Temporal.ZonedDateTime;

    parse(dateString: string, this_parserOnly: boolean): number,

    // padding(strx: string | any, number?: number): string,

    now(): bigint,

    zeroms(): number,

    zerons(): bigint,

    nowInTimezone(timezone?: Temporal.TimeZoneLike): Datetime_global,

    fromComponentsUTC(
        year?: number | undefined, month?: number, date?: number,
        hour?: number, minute?: number, second?: number,
        ms?: number, nanosecond?: bigint | number): bigint,

    getUTCOffset(offset: number): string,

    htmlToCurrentTime(timetags: NodeListOf<HTMLTimeElement> | HTMLTimeElement[]): void,

    FORMAT_DATETIME_GLOBALV2: string;
    FORMAT_DATETIME_GLOBALV1: string;
    FORMAT_DATEV1: string;
    FORMAT_HEADER_DEFAULT: string;
    FORMAT_MYSQLI: string;
    FORMAT_B: string;
    FORMAT_ISO8601: string;
    FORMAT_MYSQL: string;
    FORMAT_RFC2822: string;
    FORMAT_SHORT_DATE: string;
    FORMAT_LONG_DATE: string;
    FORMAT_SHORT_DATE_TIME: string;
    FORMAT_FULL_DATE_TIME: string;
    FORMAT_OFFSET_FROM_NOW: string;

    fromTemporalZonedDateTime(zonedDatetime: Temporal.ZonedDateTime | unknown): Datetime_global;
}

/**
 * Constructs a Datetime_global instance or returns a string representation.
 * @param from - Input to initialize the date-time. Supports:
 *   - Temporal.ZonedDateTime: Used directly.
 *   - Temporal.Instant: Converted from epoch nanoseconds.
 *   - Date | Datetime_global | Datetime_local: Converted from epoch milliseconds.
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
export const Datetime_global: Datetime_global_constructor = function (
    this: Datetime_global, from: constructorInput | Datetime_local | undefined = undefined,
    timezoneId: string = Temporal.Now.timeZoneId(),
): Datetime_global | string | void {
    let timestamp: number | bigint, isBigInt: boolean = false;
    if (arguments.length === 0 || from === undefined) {
        from = Datetime_global.now();
    }
    if (from instanceof Temporal.ZonedDateTime) {
        timestamp = 0n;
    } else if (from instanceof Temporal.Instant) {
        timestamp = BigInt(from.epochNanoseconds);
        isBigInt = true;
    } else if (from instanceof Datetime_global) {
        timestamp = from.time.epochNanoseconds;
        isBigInt = true;
    } else if (typeof from === 'bigint') {
        timestamp = from;
        isBigInt = true;
    } else if (typeof from === 'string') {
        timestamp = Date.parse(from);
    } else {
        timestamp = Math.trunc(+from);
    }
    const time: Temporal.ZonedDateTime = from instanceof Temporal.ZonedDateTime ? from : new Temporal.ZonedDateTime(
        BigInt(timestamp) * (isBigInt ? 1n : 1_000_000n),
        timezoneId);
    if (new.target) {
        this.time = time;
    } else {
        return Datetime_global.prototype.toString.call(Object.assign({time}, Datetime_global.prototype));
    }
} as Datetime_global_constructor;


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
Datetime_global.fromComponentsUTC = function (
    year: number | string | undefined, month: number = 0, date: number = 1,
    hour: number = 0, minute: number = 0, second: number = 0,
    millisecond: number = 0, nanosecond: bigint | number = 0n): bigint {
    const date_time: Date = new Date();
    if (arguments.length === 1) {
        if (typeof year === 'string') {
            year = Date.parse(year);
        }
        date_time.setTime(year as number);
    } else if (arguments.length > 1) {
        date_time.setTime(Date.UTC(year as number, month, date, hour, minute, second, millisecond));
    }
    return (BigInt(date_time.getTime()) * 1_000_000n) + BigInt(nanosecond);
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
Datetime_global.parse_strict = function (string: string): Temporal.ZonedDateTime {
    return Temporal.ZonedDateTime.from(string);
};
/**
 * Returns the current timestamp as nanoseconds since the epoch (January 1, 1970, 00:00:00 UTC).
 * @returns The nanoseconds since the epoch.
 * @example
 * console.log(Datetime_global.now()); // e.g., 1745193600000000000n
 */
Datetime_global.now = function (): bigint {
    return Temporal.Now.instant().epochNanoseconds;
};

/**
 * Returns the current timestamp as nanoseconds since the epoch (January 1, 1970, 00:00:00 UTC).
 * @returns The nanoseconds since the epoch.
 * @example
 * console.log(Datetime_global.now()); // e.g., 1745193600000000000n
 */
Datetime_global.nowInTimezone = function (timezone?: Temporal.TimeZoneLike): Datetime_global {
    if (timezone) return new Datetime_global(Datetime_global.now(), timezone);
    return new Datetime_global;
};

/**
 * Returns the current timestamp in milliseconds since the epoch, with sub-second components (milliseconds, microseconds, nanoseconds) set to 0.
 * @returns The milliseconds since the epoch.
 * @example
 * console.log(Datetime_global.zeroms()); // e.g., 1745193600000
 */
Datetime_global.zeroms = function (): number {
    return (new Date).setMilliseconds(0);
};
/**
 * Returns the current timestamp in nanoseconds since the epoch, with sub-second components (milliseconds, microseconds, nanoseconds) set to 0.
 * @returns The nanoseconds since the epoch.
 * @example
 * console.log(Datetime_global.zerons()); // e.g., 1745193600000000000n
 */
Datetime_global.zerons = function (): bigint {
    return BigInt(Datetime_global.zeroms()) * 1_000_000n;
};

/**
 * Parses a date string into milliseconds since the epoch, using `Date.parse`.
 * @param dateString - The date string to parse (e.g., "2025-04-18", "2025-04-18T00:00:00Z").
 * @returns The milliseconds since the epoch, or NaN if invalid.
 * @example
 * console.log(Datetime_global.parse("2025-04-18T00:00:00Z")); // 1745193600000
 */
Datetime_global.parse = Date.parse;
Datetime_global.prototype[Symbol.toStringTag] = Datetime_global.name;
/**
 * converts this Datetime_global to Date
 * @returns {Date} the Date with millisecond precision. sub millisecond precision is lost
 */
Datetime_global.prototype.toDate = function (): Date {
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
Datetime_global.prototype.toTimezone = Datetime_global.prototype.withTimezone = function (this: Datetime_global, timezoneId: Temporal.TimeZoneLike): Datetime_global {
    // hiostory
    return new Datetime_global(this.time.epochNanoseconds, timezoneId);
};

Datetime_global.prototype.getTimezoneId = function (this: Datetime_global): string {
    return this.time.timeZoneId;
};

/**
 * Returns the timestamp in milliseconds since the epoch (January 1, 1970, 00:00:00 UTC).
 * @returns The milliseconds since the epoch.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.valueOf()); // 1745193600000
 */
Datetime_global.prototype.valueOf = function (this: Datetime_global): number {
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
Datetime_global.prototype.getTime = function (this: Datetime_global): number {
    return this.valueOf();
};

/**
 * Sets the timestamp, modifying the instance in place.
 * @deprecated Use the `Datetime_global` constructor instead.
 * @param timestamp - Nanoseconds (bigint) or milliseconds (number) since the epoch.
 * @returns The new timestamp in milliseconds since the epoch.
 * @example
 * const dt = new Datetime_global();
 * dt.setTime(1745193600000);
 * console.log(dt.toISOString()); // "2025-04-18T00:00:00.000Z"
 */
Datetime_global.prototype.setTime = function (this: Datetime_global, timestamp: number | bigint): number {
    this.time = new Temporal.ZonedDateTime(
        BigInt(timestamp) * (((typeof timestamp) === 'bigint') ? 1n : 1000000n),
        this.time.timeZoneId);
    return this.time.epochMilliseconds;
};
/**
 * formats a string like Tue Jun 25 2024 14:30:00 UTC+0000 (UTC) based on the date contained
 *
 * note that you can also use this with Date. you just have tto attach something with time.timezoneId
 *
 * php: `D M d Y H:i:s \U\T\CO (e)`
 * @returns {string} formats a string like Tue Jun 25 2024 14:30:00 UTC+0000 (UTC) based on the date contained
 */
/**
 * Returns a string representation of the date-time, including timezone offset and ID.
 * Format (php): "D M d Y H:i:s \U\T\CO (e)" (e.g., "Fri Apr 18 2025 00:00:00 UTC+0000 (UTC)").
 * @returns The formatted string.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.toString()); // "Fri Apr 18 2025 00:00:00 UTC+0000 (UTC)"
 */
Datetime_global.prototype.toString = function (this: Datetime_global): string {
    const self: Datetime_global = this, pad = function (strx: string | any, number: number = 2): string {
        return String(strx).padStart(Number(number), '0');
    }, fullYear = pad(self.time.withCalendar('iso8601').year, 4);

    const offset: string = Datetime_global.getUTCOffset(self.getTimezoneOffset()),
        string: string = `${self.getDayName()} ${self.getMonthName()} ${pad(self.getDate())}`,
        time: string = `${pad(self.getHours())}:${pad(self.getMinutes())}:${pad(self.getSeconds())}`;
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
Datetime_global.prototype.toHTML = function (this: Datetime_global): string {
    const date: Date = new Date(this.time.epochMilliseconds);
    return `<time datetime="${date.toISOString()}">${date}</time>`.replace(/GMT/, 'UTC');
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
Datetime_global.prototype.toHTMLString = function (this: Datetime_global): string {
    const date: Date = new Date(this.time.epochMilliseconds);
    return `<time datetime="${date.toISOString()}">${this.toString()}</time>`;
};

/**
 * Returns the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday).
 * @returns The day of the week (0-6).
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC"); // Friday
 * console.log(dt.getDay()); // 5
 */
Datetime_global.prototype.getDay = function (this: Datetime_global): number {
    return this.time.dayOfWeek % this.time.daysInWeek;
};

/**
 * Returns the year minus 1900 (e.g., 2025 -> 125).
 * @returns The year minus 1900.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getYear()); // 125
 */
Datetime_global.prototype.getYear = function (this: Datetime_global): number {
    return this.time.withCalendar('iso8601').year - 1900;
};

/**
 * Returns the full four-digit year (e.g., 2025).
 * @returns The year.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getFullYear()); // 2025
 */
Datetime_global.prototype.getFullYear = function (this: Datetime_global): number {
    return this.time.year;
};

/**
 * Returns the month (0 = January, 1 = February, ..., 11 = December).
 * @returns The month (0-11).
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getMonth()); // 3
 */
Datetime_global.prototype.getMonth = function (this: Datetime_global): number {
    return this.time.month - 1;
};

/**
 * Returns the day of the month (1-31).
 * @returns The day of the month.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getDate()); // 18
 */
Datetime_global.prototype.getDate = function (this: Datetime_global): number {
    return this.time.day;
};

/**
 * Returns the hour (0-23).
 * @returns The hour.
 * @example
 * const dt = new Datetime_global("2025-04-18T15:00:00Z", "UTC");
 * console.log(dt.getHours()); // 15
 */
Datetime_global.prototype.getHours = function (this: Datetime_global): number {
    return this.time.hour;
};
/**
 * Returns the minute (0-59).
 * @returns The minute.
 * @example
 * const dt = new Datetime_global("2025-04-18T15:30:00Z", "UTC");
 * console.log(dt.getMinutes()); // 30
 */
Datetime_global.prototype.getMinutes = function (this: Datetime_global): number {
    return this.time.minute;
};

/**
 * Returns the second (0-59).
 * @returns The second.
 * @example
 * const dt = new Datetime_global("2025-04-18T15:30:45Z", "UTC");
 * console.log(dt.getSeconds()); // 45
 */
Datetime_global.prototype.getSeconds = function (this: Datetime_global): number {
    return this.time.second;
};

/**
 * Returns the millisecond (0-999).
 * @returns The millisecond.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00.123Z", "UTC");
 * console.log(dt.getMilliseconds()); // 123
 */
Datetime_global.prototype.getMilliseconds = function (this: Datetime_global): number {
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
Datetime_global.prototype.getUTCDay = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCDay();
};

/**
 * Returns the year minus 1900 (e.g., 2025 -> 125) in UTC.
 * @returns The year minus 1900. in UTC
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getYear()); // 125
 */
Datetime_global.prototype.getUTCYear = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCFullYear() - 1900;
};

/**
 * Returns the year in UTC.
 * @returns The year minus in UTC
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getUTCFullYear()); // 2025
 */
Datetime_global.prototype.getUTCFullYear = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCFullYear();
};

/**
 * Returns the month (0 = January, 1 = February, ..., 11 = December) in utc.
 * @returns The month (0-11) in utc.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getMonth()); // 3
 */
Datetime_global.prototype.getUTCMonth = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCMonth();
};

/**
 * Returns the day of the month (1-31) in utc.
 * @returns The day of the month in utc.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getDate()); // 18
 */
Datetime_global.prototype.getUTCDate = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCDate();
};

/**
 * Returns the hour (0-23) in utc.
 * @returns The hour in utc.
 * @example
 * const dt = new Datetime_global("2025-04-18T15:00:00Z", "UTC");
 * console.log(dt.getHours()); // 15
 */
Datetime_global.prototype.getUTCHours = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCHours();
};

/**
 * Returns the minute (0-59) in utc.
 * @returns The minute in utc.
 * @example
 * const dt = new Datetime_global("2025-04-18T15:30:00Z", "UTC");
 * console.log(dt.getMinutes()); // 30
 */
Datetime_global.prototype.getUTCMinutes = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCMinutes();
};

/**
 * Returns the second (0-59) in utc.
 * @returns The second in utc.
 * @example
 * const dt = new Datetime_global("2025-04-18T15:30:45Z", "UTC");
 * console.log(dt.getSeconds()); // 45
 */
Datetime_global.prototype.getUTCSeconds = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCSeconds();
};

/**
 * Returns the millisecond (0-999) in utc.
 * @returns The millisecond in utc.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00.123Z", "UTC");
 * console.log(dt.getMilliseconds()); // 123
 */
Datetime_global.prototype.getUTCMilliseconds = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCMilliseconds();
};

/**
 * Returns the timezone offset in minutes (positive for west of UTC, negative for east).
 * @returns The offset in minutes.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "America/New_York");
 * console.log(dt.getTimezoneOffset()); // 240 (4 hours west)
 */
Datetime_global.prototype.getTimezoneOffset = function (this: Datetime_global): number {
    return -Math.round((Number(this.time.offsetNanoseconds) / 1e9) / 60);
};

/**
 * Converts this Datetime_global to a Datetime_local instance.
 * @deprecated Use alternative methods or constructor.
 * @returns A Datetime_local instance.
 * @throws TypeError if Datetime_local is not available.
 */
Datetime_global.prototype.toDatetime_local = function (this: Datetime_global): Datetime_local {
    return new Datetime_local(this.time.epochMilliseconds);
};

/**
 * Returns the date-time as an ISO 8601 string in UTC (e.g., "2025-04-18T00:00:00.000Z").
 * Matches Date.prototype.toISOString, with millisecond precision.
 * @returns A string in ISO 8601 format.
 */
Datetime_global.prototype.toISOString = function (this: Datetime_global): string {
    return (new Date(this.time.epochMilliseconds)).toISOString();
};

/**
 * Returns the date-time as an ISO 8601 string with timezone (e.g., "2025-04-18T00:00:00+00:00[UTC]").
 * @returns The ISO 8601 string.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.toJSON()); // "2025-04-18T00:00:00+00:00[UTC]"
 */
Datetime_global.prototype.toJSON = function (): string {
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
Datetime_global.prototype.setFullYear = function (this: Datetime_global, fullYear: number, month?: number, date?: number): number {
    date = arguments.length > 1 ? date : this.time.day;
    month = arguments.length > 2 ? month : this.time.month;
    const year = fullYear, try_date = {
        year: Number(BigInt(year)),
        day: Number(BigInt(date ?? 0)),
        month: Number(BigInt(month ?? 0)),
    }, self_time = this.time;
    let time, indexed = 0;
    while (true) {
        if (++indexed > 80000) {
            throw new Error('Precaution recursion limit reached');
        }
        try {
            time = self_time.with(try_date, {overflow: "reject"});
            break;
        } catch {

            if (try_date.day > self_time.daysInMonth) {
                try_date.month += Math.trunc(try_date.day / self_time.daysInMonth);
                try_date.day = ((try_date.day - 1) % self_time.daysInMonth) + 1;
            }
            if (try_date.month > self_time.monthsInYear) {
                try_date.year += Math.trunc(try_date.month / self_time.monthsInYear);
                try_date.month = ((try_date.month - 1) % self_time.monthsInYear) + 1;
            }
            //
            if (try_date.day < 1) {
                try_date.month -= 1;
                try_date.day += self_time.subtract({months: 1}).daysInMonth;
            }
            if (try_date.month < 1) {
                try_date.year -= 1;
                try_date.month += self_time.monthsInYear;
            }
        }
    }
    return (this.time = time).epochMilliseconds;
};

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
Datetime_global.prototype.setMonth = function (this: Datetime_global, month: number, date?: number): number {
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
Datetime_global.prototype.setDate = function (this: Datetime_global, date: number): number {
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
Datetime_global.prototype.setHours = function (this: Datetime_global, hours: number, minutes?: number, seconds?: number, milliseconds?: number): number {
    minutes = arguments.length > 1 ? minutes : this.time.minute;
    seconds = arguments.length > 2 ? seconds : this.time.second;
    milliseconds = arguments.length > 3 ? milliseconds : this.time.millisecond;

    let time, indexed = 0;
    const self_time = this.time, try_time = {
        hour: Number(BigInt(hours ?? 0)),
        minute: Number(BigInt(minutes ?? 0)),
        second: Number(BigInt(seconds ?? 0)),
        millisecond: Number(BigInt(milliseconds ?? 0)),
        microsecond: self_time.microsecond,
        nanosecond: self_time.nanosecond,
        day: self_time.day,
        month: self_time.month,
        year: self_time.year,
    };

    while (true) {
        if (++indexed > 80000) {
            throw new Error('Precaution forever loop reached');
        }
        try {
            time = self_time.with(try_time, {overflow: "reject"});
            break;
        } catch {
            // Overflow/Underflow correction
            if (try_time.millisecond >= 1000) {
                try_time.second += Math.trunc(try_time.millisecond / 1000);
                try_time.millisecond %= 1000;
            }
            if (try_time.second >= 60) {
                try_time.minute += Math.trunc(try_time.second / 60);
                try_time.second %= 60;
            }
            if (try_time.minute >= 60) {
                try_time.hour += Math.trunc(try_time.minute / 60);
                try_time.minute %= 60;
            }
            if (try_time.hour >= self_time.hoursInDay) {
                try_time.day += Math.trunc(try_time.hour / self_time.hoursInDay);
                try_time.hour %= self_time.hoursInDay;
            }
            if (try_time.day > self_time.daysInMonth) {
                try_time.month += Math.trunc(try_time.day / self_time.daysInMonth);
                try_time.day = ((try_time.day - 1) % self_time.daysInMonth) + 1;
            }
            if (try_time.month > self_time.monthsInYear) {
                try_time.year += Math.trunc(try_time.month / self_time.monthsInYear);
                try_time.month = ((try_time.month - 1) % self_time.monthsInYear) + 1;
            }
            //
            if (try_time.millisecond < 0) {
                try_time.second -= 1 + Math.trunc(Math.abs(try_time.millisecond) / 1000);
                try_time.millisecond = 1000 + (try_time.millisecond % 1000);
            }
            if (try_time.second < 0) {
                try_time.minute -= 1 + Math.trunc(Math.abs(try_time.second) / 60);
                try_time.second = 60 + (try_time.second % 60);
            }
            if (try_time.minute < 0) {
                try_time.hour -= 1 + Math.trunc(Math.abs(try_time.minute) / 60);
                try_time.minute = 60 + (try_time.minute % 60);
            }
            if (try_time.hour < 0) {
                try_time.day -= 1 + Math.trunc(Math.abs(try_time.hour) / self_time.hoursInDay);
                try_time.hour = self_time.hoursInDay + (try_time.hour % self_time.hoursInDay);
            }
            if (try_time.day < 1) {
                try_time.month -= 1;
                try_time.day += self_time.subtract({months: 1}).daysInMonth;
            }
            if (try_time.month < 1) {
                try_time.year -= 1;
                try_time.month += self_time.monthsInYear;
            }
        }
    }
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
Datetime_global.prototype.setMinutes = function (this: Datetime_global, minutes: number, seconds?: number, milliseconds?: number): number {
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
Datetime_global.prototype.setSeconds = function (this: Datetime_global, seconds: number, milliseconds?: number): number {
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
Datetime_global.prototype.setMilliseconds = function (this: Datetime_global, milliseconds: number): number {
    return this.setHours(this.getHours(), this.getMinutes(), this.getSeconds(), milliseconds);
};
// UTC

/**
 * Sets the year, optionally month and day, in UTC, modifying the instance in place.
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
Datetime_global.prototype.setUTCFullYear = function (this: Datetime_global, fullYear: number, month?: number, date?: number): number {
    const nanosecond: bigint = BigInt(this.time.nanosecond), microsecond: bigint = BigInt(this.time.microsecond),
        datetime: Date = new Date(this.time.epochMilliseconds);
    month = arguments.length > 1 ? month : datetime.getUTCMonth();
    date = arguments.length > 2 ? date : datetime.getUTCDate();

    const returnValue: bigint = BigInt(datetime.setUTCFullYear(fullYear, month as number, date as number));
    this.time = new Temporal.ZonedDateTime(
        ((returnValue * 1_000_000n) + microsecond + nanosecond),
        this.time.timeZoneId);
    return Number(returnValue);
};

/**
 * Sets the hours, optionally minutes, seconds, and milliseconds, in UTC, modifying the instance in place.
 * Handles overflow/underflow by rolling over to adjacent days.
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
Datetime_global.prototype.setUTCHours = function (this: Datetime_global, hours: number, minutes?: number, seconds?: number, milliseconds?: number): number {
    const nanosecond: bigint = BigInt(this.time.nanosecond), microsecond: bigint = BigInt(this.time.microsecond),
        date: Date = new Date(this.time.epochMilliseconds);
    minutes = arguments.length > 1 ? minutes : date.getUTCMinutes();
    seconds = arguments.length > 2 ? seconds : date.getUTCSeconds();
    milliseconds = arguments.length > 3 ? milliseconds : date.getUTCMilliseconds();

    const returnValue: bigint = BigInt(date.setUTCHours(hours, minutes as number, seconds as number, milliseconds as number));
    this.time = new Temporal.ZonedDateTime(
        ((returnValue * 1_000_000n) + microsecond + nanosecond),
        this.time.timeZoneId);
    return Number(returnValue);
};

/**
 * Returns the internal Temporal.ZonedDateTime instance.
 * @returns The Temporal.ZonedDateTime.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.toTemporalZonedDateTime().toString());
 * // "2025-04-18T00:00:00+00:00[UTC]"
 */
Datetime_global.prototype.toTemporalZonedDateTime = function (): Temporal.ZonedDateTime {
    return this.time;
};
/**
 * Creates a Datetime_global from a Temporal.ZonedDateTime or parseable input.
 * @deprecated Use the Datetime_global constructor instead.
 * @param zonedDatetime - A Temporal.ZonedDateTime or parseable object/string.
 * @returns A Datetime_global instance.
 * @throws RangeError if the input cannot be parsed.
 */
Datetime_global.fromTemporalZonedDateTime = function (zonedDatetime: Temporal.ZonedDateTime | unknown): Datetime_global {
    const self = Object.create(Datetime_global.prototype);
    if (zonedDatetime instanceof Temporal.ZonedDateTime) {
        self.time = zonedDatetime;
    } else {
        self.time = Temporal.ZonedDateTime.from(zonedDatetime as any);
    }
    return self;
};
// Datetime_global.daynames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// Datetime_global.monthnames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Datetime_global.daynamesFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// Datetime_global.monthnamesFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
Datetime_global.prototype.setNanoseconds = function (this: Datetime_global, nanoseconds: bigint = 0n, microseconds?: bigint): bigint {
    const self_time: Temporal.ZonedDateTime = this.time, did_specify_microseconds: boolean = arguments.length > 1;
    microseconds = BigInt(did_specify_microseconds ? (microseconds ?? 0) : self_time.microsecond);
    return BigInt((this.time = new Temporal.ZonedDateTime(self_time.with({
        microsecond: did_specify_microseconds ? 0 : self_time.microsecond,
        nanosecond: 0, millisecond: self_time.millisecond,
    }).epochNanoseconds + ((microseconds * 1_000n) + BigInt(nanoseconds)), self_time.timeZoneId)).epochNanoseconds);
};

/**
 * Returns the nanosecond and microseconds component of the date-time (0-999).
 * @returns The nanoseconds and microseconds as a bigint.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00.000000500Z", "UTC");
 * console.log(dt.getNanoseconds()); // 500n
 */
Datetime_global.prototype.getUTCNanoseconds = Datetime_global.prototype.getNanoseconds = function (this: Datetime_global): bigint {
    return (BigInt(this.time.microsecond) * 1_000n) + BigInt(this.time.nanosecond);
};
/**
 * Formats a timezone offset in minutes as a UTC string (e.g., "UTC+0000").
 * @param offset - The offset in minutes (positive for west of UTC, negative for east).
 * @returns The formatted offset string.
 * @example
 * console.log(Datetime_global.getUTCOffset(240)); // "UTC-0400"
 */
Datetime_global.getUTCOffset = function (offset: number): string {
    if (isNaN(offset)) return 'UTC+Error';
    const sign: "-" | "+" = offset > 0 ? "-" : "+", absOffset: number = Math.abs(offset);
    const hours: string = String(Math.floor(absOffset / 60)).padStart(2, "0");
    const minutes: string = String(absOffset % 60).padStart(2, "0");
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
Datetime_global.htmlToCurrentTime = function (timetags: NodeListOf<HTMLTimeElement> | HTMLTimeElement[] = []): void {
    const now: Temporal.ZonedDateTime = Temporal.Now.zonedDateTimeISO();
    Array.from(timetags).forEach(function (each: HTMLTimeElement): void {
        const tz: string = each.getAttribute('data-iana-timezone') ?? Temporal.Now.timeZoneId(),
            d: Datetime_global = new Datetime_global(Date.parse(each.dateTime), tz),
            f: string = each.getAttribute('data-datetime-global-format') ?? 'D M d Y H:i:s \\U\\T\\CO (e)';
        switch (f) {
            case "[TemporalOffset]": {
                const target: Temporal.ZonedDateTime = d.toTemporalZonedDateTime();
                const isFuture: boolean = target.epochMilliseconds > now.epochMilliseconds, largestUnit = 'days';
                const duration: Temporal.Duration = isFuture ? now.until(target, {largestUnit}) : target.until(now, {largestUnit});
                const parts: string[] = [];
                if (duration.days) parts.push(`${duration.days} day${duration.days !== 1 ? 's' : ''}`);
                if (duration.hours) parts.push(`${duration.hours} hour${duration.hours !== 1 ? 's' : ''}`);
                if (duration.minutes) parts.push(`${duration.minutes} minute${duration.minutes !== 1 ? 's' : ''}`);
                if (duration.seconds && parts.length === 0)
                    parts.push(`${duration.seconds} second${duration.seconds !== 1 ? 's' : ''}`);
                const join: string = parts.map(s => s.trim()).join(', ');
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
export const formatOffsetFromNow = function (date: Date): string {
    const diffMs = (+date) - Date.now();
    const absDiffMs = Math.abs(diffMs);
    const isFuture = diffMs > 0;

    const seconds = Math.floor(absDiffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (absDiffMs < 1000) {
        return "now";
    } else if (seconds < 60) {
        return `${isFuture ? "in " : ""}${seconds} second${seconds === 1 ? "" : "s"}${isFuture ? "" : " ago"}`;
    } else if (minutes < 60) {
        return `${isFuture ? "in " : ""}${minutes} minute${minutes === 1 ? "" : "s"}${isFuture ? "" : " ago"}`;
    } else if (hours < 24) {
        return `${isFuture ? "in " : ""}${hours} hour${hours === 1 ? "" : "s"}${isFuture ? "" : " ago"}`;
    } else {
        return `${isFuture ? "in " : ""}${days} day${days === 1 ? "" : "s"}${isFuture ? "" : " ago"}`;
    }
}

/**
 * applies the UTC time to the `Datetime_global`
 *
 * @returns {Datetime_global}
 */
Datetime_global.prototype.toUTCTimezone = function (this: Datetime_global): Datetime_global {
    return this.toTimezone('UTC');
};
/**
 * applies the user's LocalTime to the `Datetime_global`
 *
 * @returns {Datetime_global}
 */
Datetime_global.prototype.toLocalTime = function (this: Datetime_global): Datetime_global {
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
Datetime_global.prototype.getDayNumberWeek = function (): number {
    return this.getDay();
};

/**
 * Returns the day of the month (1-31).
 * @alias getDate.
 * @returns The day of the month.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getDayNumberMonth()); // 18
 */
Datetime_global.prototype.getDayNumberMonth = Datetime_global.prototype.getDayNumber = function (): number {
    return this.getDate();
};

/**
 * Returns the abbreviated weekday name (e.g., "Mon", "Tue") in en-US locale.
 * @returns The weekday name.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC"); // Friday
 * console.log(dt.getDayName()); // "Fri"
 */
Datetime_global.prototype.getDayName = function (): string {
    return this.time.toLocaleString("en-US", {"weekday": "short"});
};

/**
 * Returns the abbreviated month name (e.g., "Jan", "Feb") in en-US locale.
 * @returns The month name.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getMonthName()); // "Apr"
 */
Datetime_global.prototype.getMonthName = function (): string {
    return this.time.toLocaleString("en-US", {"month": "short"});
};

/**
 * Returns the full weekday name (e.g., "Monday", "Tuesday") in en-US locale.
 * @returns The weekday name.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC"); // Friday
 * console.log(dt.getFullDayName()); // "Friday"
 */
Datetime_global.prototype.getFullDayName = function (): string {
    return this.time.toLocaleString("en-US", {"weekday": "long"});
};

/**
 * Returns the full month name (e.g., "January", "February") in en-US locale.
 * @returns The month name.
 * @example
 * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
 * console.log(dt.getFullMonthName()); // "April"
 */
Datetime_global.prototype.getFullMonthName = function (): string {
    return this.time.toLocaleString("en-US", {"month": "long"});
};
Datetime_global.prototype.toLocaleString = function (locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined): string {
    return this.time.toLocaleString(locales, options);
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
 * dt.format("D, Y-m-d H:i:s.u \U\T\CO (e)"); // "Fri, 2025-04-18 00:00:00.000000 UTC+0000 (UTC)"
 * @see https://www.php.net/manual/en/datetime.format.php for placeholder details.
 */
Datetime_global.prototype.format = function (this: Datetime_global, pattern: string): string {
    const string: string = pattern;

    function underscoreNumber(n: number | bigint): string {
        return chunkArray(Array.from(BigInt(n).toString()).reverse(), 3).map(chunk => chunk.reverse().join().replace(/,/g, '')).reverse().join().replace(/,/g, '_');
    }

    function chunkArray(array: any[] | string, chunkSize: number): any[] {
        const result = [];
        array = Array.from(array);
        chunkSize = Number(Math.trunc(chunkSize));
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }

    function addSignToNumber(n: number | bigint | string, chunk: boolean = true): string {
        const strx: string = String((chunk ? underscoreNumber : BigInt)(n as bigint));
        return strx.startsWith('-') ? strx : `+${strx}`;
    }

    //(new this.constructor(this, this?.time?.timeZoneId))
    const pad = function (numberToPad: number, number: number = 2, plusIfPositive: boolean = false): string {
        return (numberToPad < 0 ? '-' : (plusIfPositive ? '+' : '')) + String(Math.abs(numberToPad)).padStart(Number(number), '0');
    }, datetime_local: Datetime_global = this.withCalender();
    const hour24: string = pad(datetime_local.getHours()), dayName: string = datetime_local.getDayName();
    const iso8601: Datetime_global = datetime_local, dayNameFull: string = datetime_local.getFullDayName();
    const dayNumberMonth: string = pad(datetime_local.getDayNumberMonth()),
        N: string = iso8601.time.dayOfWeek.toString(),//iso8601.time.dayOfWeek
        W: string = iso8601.time?.weekOfYear?.toString() ?? 'undefined',
        w: string = iso8601.getDay().toString(),
        z: string = iso8601.time.daysInYear.toString(),
        m: string = pad(datetime_local.getMonth() + 1),
        M: string = datetime_local.getMonthName(),
        F: string = datetime_local.getFullMonthName(),
        hour12: string = pad(+hour24 === 0 ? 12 : +hour24),
        dayInMonth: string = datetime_local.time.daysInMonth.toString(),
        leap: string = datetime_local.time.inLeapYear ? '1' : '0',
        X: string = pad(datetime_local.getFullYear(), 4),
        getYear: string = pad(datetime_local.getYear(), 2),
        minutes: string = pad(datetime_local.getMinutes()),
        seconds: string = pad(datetime_local.getSeconds()),
        datetime_timezone: string = datetime_local.time.timeZoneId,
        offset: string = Datetime_global.getUTCOffset(datetime_local.getTimezoneOffset()).replace(/UTC/, ''),
        currentDate = datetime_local.toDate(), B: string = toSwatchInternetTime(currentDate),
        microseconds: string = `${pad(datetime_local.getMilliseconds(), 3)}${pad(datetime_local.time.microsecond, 3)}`,
        milliseconds: string = pad(datetime_local.getMilliseconds(), 3);
    return String(string).replace(/\[[a-zA-Z0-9\-_]+]/g, function (substring: string): string {
        const f: string = substring.toLowerCase(), each: { innerText: string } = {innerText: f};
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
    }).replace(/\\*[a-zA-Z]/ig, function (substring: string): string {
        const strxx: string = substring.replace(/\\\\/g, '\\').slice(-1);
        if (substring.length % 2 !== 0) {
            const strx: string = strxx.replace(/[^\\]/g, ''),
                charxater: string = substring.replace(/\\/g, '');
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

export const noFormat = function (string: any): string {
    return String(string).replace(/[a-zA-Z]/g, '\\$&');
};
export const plainToZoned = function (tempTime: Datetime_global | Date | Temporal.ZonedDateTime | Temporal.Instant | Temporal.PlainDateTime | Temporal.PlainDate | Temporal.PlainYearMonth | Temporal.PlainTime): Datetime_global {
    let time: Datetime_global;
    const temporalTimezoneId: string = Temporal.Now.timeZoneId();
    if (tempTime instanceof Datetime_global) {
        time = tempTime;
    } else if (tempTime instanceof Date || tempTime instanceof Temporal.ZonedDateTime || tempTime instanceof Temporal.Instant) {
        time = new Datetime_global(tempTime);
    } else if (tempTime instanceof Temporal.PlainDateTime) {
        time = new Datetime_global(tempTime.toZonedDateTime(temporalTimezoneId));
    } else if (tempTime instanceof Temporal.PlainDate) {
        time = new Datetime_global(tempTime.toPlainDateTime({
            hour: 0, minute: 0, second: 0,
        }).toZonedDateTime(temporalTimezoneId));
    } else if (tempTime instanceof Temporal.PlainYearMonth) {
        time = new Datetime_global(tempTime.toPlainDate({day: 1}).toPlainDateTime({
            hour: 0, minute: 0, second: 0,
        }).toZonedDateTime(temporalTimezoneId));
    } else if (tempTime instanceof Temporal.PlainTime) {
        time = new Datetime_global(Temporal.Now.plainDateISO().toPlainDateTime(tempTime).toZonedDateTime(temporalTimezoneId));
    } else {
        throw new TypeError('Custom object time property must be Datetime_global, Date, Temporal.ZonedDateTime, Temporal.Instant, Temporal.PlainDateTime, Temporal.PlainDate, Temporal.PlainYearMonth, Temporal.PlainTime, or undefined');
    }
    return time;
};

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
Datetime_global.prototype.templateFormat = function (this: Datetime_global, strings: TemplateStringsArray, ...expressions: unknown[]): string {
    const self: Datetime_global = this;
    // Combine static strings and formatted expressions
    return strings.reduce(function (result: string, str: string, i: number) {
        let exp: unknown = expressions[i], formatIt: boolean = false;
        if (exp === null) {
            exp = self.toString();
        } else {
            switch (typeof exp) {
                case "bigint":
                case "number":
                case "boolean":
                    break;
                case "undefined":
                    exp = self.toDate().toString();
                    break;
                case "symbol":
                    throw new TypeError('Symbols are not supported; convert to string');
                case "function":
                    exp = String(exp(self.clone()));
                    break;
                case "object":
                    if (exp instanceof Datetime_global) {
                        exp = exp.toString();
                    } else if (exp instanceof Date) {
                        exp = exp.toString();
                    } else if (exp instanceof Temporal.ZonedDateTime || exp instanceof Temporal.Instant) {
                        exp = Datetime_global(exp);
                    } else if (exp instanceof Temporal.PlainDateTime) {
                        exp = (new Datetime_global(exp.toZonedDateTime(Temporal.Now.timeZoneId()))).format('D Y H:i:s');
                    } else if (exp instanceof Temporal.PlainTime) {
                        exp = exp.toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            second: '2-digit',
                            /*hour12: true*/
                        });
                    } else if (exp instanceof Temporal.PlainYearMonth) {
                        exp = exp.toLocaleString('en-US', {month: 'long', year: 'numeric'});
                    } else if (exp instanceof Temporal.PlainDate) {
                        exp = exp.toLocaleString('en-US', {month: 'long', year: 'numeric', day: "2-digit"});
                    } else {
                        // logic for objects, add `formatIt = true;` to pass it through format
                        // throw new Error('invalid Object passed to Datetime_global.prototype.templateFormat');
                        if ('raw' in exp) {
                            exp = String(exp);
                        } else {
                            let time: Datetime_global, resultExp: string | undefined;
                            if ('time' in exp && exp['time'] !== undefined) {
                                time = plainToZoned(exp['time'] as any);
                            } else {
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
                            } else if ('pattern' in exp && typeof exp['pattern'] === 'string') {
                                resultExp = time.format(exp['pattern']);
                            } else if ('localeOptions' in exp || 'locale' in exp) {
                                resultExp = time.toTemporalZonedDateTime().toLocaleString((exp as any)['locale'], (exp as any)['localeOptions']);
                            } else {
                                throw new TypeError('if a pattern is on a custom object then it must be a string');
                            }
                            exp = resultExp;
                        }
                    }
                    break;
                case "string":
                    formatIt = true;
            }
        }

        const stringified: string = String(exp), formatted: string = formatIt ? self.format(stringified) : stringified;
        return result + str + (i < expressions.length ? formatted : '');
    }, '');
};
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


export const toSwatchInternetTime = function (date: Date | number | string): string {
    const datetime: Date = new Date(date), userTimestamp: bigint =
            BigInt(datetime.setUTCHours(datetime.getUTCHours() + 1)),
        midnightTimestamp: bigint = BigInt(datetime.setUTCHours(1, 0, 0, 0));
    // const MS_PER_BEAT: bigint = 86400000n / 1000n; // 86_400 ms per beat
    const elapsedMs: bigint = userTimestamp - midnightTimestamp;
    return ((elapsedMs * 1000n) / 86400_000n).toString().padStart(3, '0');  // Compute beats as BigInt
};

Datetime_global.prototype.withCalender = function (this: Datetime_global, calender: Temporal.CalendarLike = "iso8601"): Datetime_global {
    const datetime_global: Datetime_global = new Datetime_global(this.time.epochNanoseconds, this.time.timeZoneId);
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
Datetime_global.prototype.clone = function (this: Datetime_global): Datetime_global {
    return new Datetime_global(this.time);
};

/**
 * Returns a new Datetime_global instance set to the start of the current day (00:00:00.000000000) in the same timezone.
 * @returns A new Datetime_global instance.
 * @example
 * const dt = new Datetime_global(new Date(2025, 4, 18, 15, 30), "UTC");
 * dt.startOfDay().toISOString(); // "2025-04-18T00:00:00.000Z"
 */
Datetime_global.prototype.startOfDay = function (this: Datetime_global, timezone?: Temporal.TimeZoneLike): Datetime_global {
    const zdt: bigint = (timezone ? this.toTimezone(timezone) : this).time.startOfDay().epochNanoseconds;
    return new Datetime_global(zdt, this.time.timeZoneId);
};
Datetime_global.prototype.getTimestamp = function (this: Datetime_global): bigint {
    return this.time.epochNanoseconds;
};

export const ordinalSuffix = function (value: number | bigint): string {
    const $number: number = Number(BigInt(value)) % 100;
    let $suffix;
    if ($number >= 11 && $number <= 13) {
        $suffix = 'th';
    } else {
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
}

// export class DatetimeElement {
//     private time: HTMLTimeElement;
//
//     /**
//      * Creates a DatetimeElement instance.
//      * @param time - The HTML <time> element to manage.
//      * @throws TypeError if the element is not a valid <time> element or its dateTime attribute cannot be parsed with Date.parse.
//      */
//     constructor(time: HTMLTimeElement) {
//         if (!(time instanceof HTMLTimeElement)) {
//             throw new TypeError('Input must be an HTMLTimeElement');
//         }
//         const parsed: number = Date.parse(time.dateTime);
//         if (parsed !== parsed) {
//             throw new TypeError('The <time> element must have a valid dateTime attribute, which points to a valid instant in time');
//         }
//         this.time = time;
//     }
//
//     /**
//      * Updates the <time> element's content and attributes with the current date-time.
//      * @param titleFormat - Optional format for the title attribute (defaults to '(D M d Y H:i:s \\U\\T\\CO (e))').
//      * @returns The formatted string used for innerText.
//      * @throws Error if the dateTime, timezone, or format is invalid.
//      */
//     update(titleFormat: string = '(D M d Y H:i:s \\U\\T\\CO (e))'): string {
//         // const date: Datetime_global = new Datetime_global(this.time.dateTime,
//         //         this.time.dataset.ianaTimezone ?? Temporal.Now.timeZoneId()),
//         //     format: string = this.time.dataset.timeFormat ?? '[offsetFromNow]';
//         // this.time.setAttribute('title', date.format(titleFormat));
//         // this.time.innerText = date.format(format);
//         // return this.time.outerHTML;
//         try {
//             const timezone: string = this.time.dataset.ianaTimezone ?? Temporal.Now.timeZoneId();
//             const date: Datetime_global = new Datetime_global(this.time.dateTime, timezone);
//             const format: string = this.time.dataset.timeFormat ?? '[offsetFromNow]';
//
//             // Update dateTime attribute for accessibility
//             this.time.setAttribute('datetime', date.toDate().toISOString());
//             // Update title with detailed format
//             this.time.setAttribute('title', date.format(titleFormat));
//             // Update innerText with user-specified or default format
//             this.time.innerText = date.format(format);
//
//             return this.time.outerHTML;
//         } catch (error) {
//             console.error(`Failed to update DatetimeElement: ${(error as Error).message}`);
//             this.time.innerText = 'Invalid date';
//             return 'Invalid date';
//         }
//     }
//
//     autorun(interval: number): number {
//         const self = this;
//         return setInterval(function () {
//             self.update();
//         }, interval);
//     }
//
//     /**
//      * Gets the underlying <time> element.
//      */
//     get element(): HTMLTimeElement {
//         return this.time;
//     }
// }

/**
 * undocumented, can change any version
 * @param other
 */
Datetime_global.prototype.until = function (this: Datetime_global, other: constructorInput): Temporal.Duration {
    const zdt: Datetime_global = new Datetime_global(other, this.getTimezoneId());
    return this.time.until(zdt.toTemporalZonedDateTime());
};

/**
 * undocumented, can change any version
 * @param other
 */
Datetime_global.prototype.since = function (this: Datetime_global, other: constructorInput): Temporal.Duration {
    const zdt: Datetime_global = new Datetime_global(other, this.getTimezoneId());
    return this.time.since(zdt.toTemporalZonedDateTime());
};

type durationOptions = Temporal.DurationRoundTo & { round?: boolean, largestUnits?: number };

/**
 * undocumented, can change any version
 * @param roundToOptions
 * @returns {*|string}
 * @constructor
 */
export const DurationToHumanString = function (
    this: Temporal.Duration, roundToOptions: durationOptions = {smallestUnit: 'nanoseconds'}): string {
    const rounded: Temporal.Duration = roundToOptions.round ? this.round(roundToOptions as Exclude<durationOptions,
        { round?: boolean, largestUnits?: number }>) : this, constructed: string[] = [];
    if (rounded.years !== 0) constructed.push(` ${rounded.years} year${Math.abs(rounded.years) === 1 ? '' : 's'}`);
    if (rounded.months !== 0) constructed.push(` ${rounded.months} month${Math.abs(rounded.months) === 1 ? '' : 's'}`);
    if (rounded.days !== 0) constructed.push(` ${rounded.days} day${Math.abs(rounded.days) === 1 ? '' : 's'}`);
    if (rounded.hours !== 0) constructed.push(` ${rounded.hours} hour${Math.abs(rounded.hours) === 1 ? '' : 's'}`);
    if (rounded.minutes !== 0) constructed.push(` ${rounded.minutes} minute${Math.abs(rounded.minutes) === 1 ? '' : 's'}`);
    if (rounded.seconds !== 0) constructed.push(` ${rounded.seconds} second${Math.abs(rounded.seconds) === 1 ? '' : 's'}`);
    if (constructed.length === 0) return "0 seconds";
    if (constructed.length === 1) return constructed[0].replace(/^\s+/, '');
    if (typeof roundToOptions.largestUnits === 'number') {
        if (roundToOptions.largestUnits === Infinity) {
        } else if (roundToOptions.largestUnits > 0) {
            constructed.length = Math.min(constructed.length, roundToOptions.largestUnits);
        }
    }
    const popped = constructed.pop();
    return `${constructed}, and${popped}`.replace(/^\s+/, '');
};
export type durationString =
    | 'years'
    | 'year'
    | 'months'
    | 'month'
    | 'hours'
    | 'hour'
    | 'minutes'
    | 'minute'
    | 'seconds'
    | 'second';

/**
 * undocumented, can change any version
 * @param relativeTo
 * @param smallestUnit
 * @param largestUnit
 * @returns {*|string}
 * @constructor
 */
DurationToHumanString.ToHumanString = function (
    this: Temporal.Duration,
    relativeTo?: Temporal.ZonedDateTime | Datetime_global,
    smallestUnit: durationString = 'seconds',
    largestUnit: durationString = 'years'): string {
    const Symbol_null = Symbol.for('null'), round: boolean = (relativeTo ?? Symbol_null) !== Symbol_null;
    relativeTo = (new Datetime_global(relativeTo)).toTemporalZonedDateTime();
    return DurationToHumanString.call(this, {relativeTo, smallestUnit, largestUnit, round});
};

/**
 * undocumented, can change any version
 * @param relativeTo
 * @param largestUnits
 * @param smallestUnit
 * @returns {*|string}
 * @constructor
 */
DurationToHumanString.ToHistoryString = function (
    this: Temporal.Duration,
    relativeTo?: Temporal.ZonedDateTime | Datetime_global,
    largestUnits?: number, smallestUnit: durationString = 'seconds'): string {
    largestUnits = largestUnits ?? Infinity;
    const Symbol_null = Symbol.for('null'), round: boolean = (relativeTo ?? Symbol_null) !== Symbol_null;
    relativeTo = (new Datetime_global(relativeTo)).toTemporalZonedDateTime();
    return DurationToHumanString.call(this, {
        relativeTo, smallestUnit, largestUnits,
        round, largestUnit: 'years',
    });
};
