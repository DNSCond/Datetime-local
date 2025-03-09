"use strict";

import {Datetime_local} from "./Datetime_local.js";
import {Temporal} from '@js-temporal/polyfill';

export type Datetime_global = {
    time: Temporal.ZonedDateTime,
    toString(this: Datetime_global): string,
    getTime(this: Datetime_global): number,
    valueOf(this: Datetime_global): number,
    setTime(this: Datetime_global, timestamp: number): number,
    toHTML(this: Datetime_global): string,
    toHTML_localeString(this: Datetime_global): string,

    // builtin-proxy
    getDay(): number;
    getYear(): number;
    getFullYear(): number;
    getMonth(): number;
    getDate(): number;
    getHours(): number;
    getMinutes(): number;
    getSeconds(): number;
    getMilliseconds(): number;

    // builtin-proxy-UTC
    getUTCDay(): number;
    getUTCYear(): number;
    getUTCFullYear(): number;
    getUTCMonth(): number;
    getUTCDate(): number;
    getUTCHours(): number;
    getUTCMinutes(): number;
    getUTCSeconds(): number;
    getUTCMilliseconds(): number;
    getTimezoneOffset(): number;
    toJSON(): string;

    // custom
    getDayNumberWeek(): number;
    getDayNumberMonth(): number;
    getDayNumber(): number;
    getDayName(): string;
    getMonthName(): string;
};

interface Datetime_global_constructor {
    new(from?: Temporal.ZonedDateTime | Temporal.Instant | Date | Datetime_global | Datetime_local | bigint | number,
        timezoneId?: Temporal.TimeZoneLike): Datetime_global,

    (from?: Temporal.ZonedDateTime | Temporal.Instant | Date | Datetime_global | Datetime_local | bigint | number,
     timezoneId?: Temporal.TimeZoneLike): string,

    parse_strict(string: string): Temporal.ZonedDateTime;

    parse(dateString: string, this_parserOnly: boolean): number,

    // padding(strx: string | any, number?: number): string,

    now(): bigint,

    zeroms(): number,

    zerons(): bigint,

    daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthnames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    daynamesFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthnamesFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

    fromComponentsUTC(
        year: number | undefined, month: number, date: number,
        hour: number, minute: number, second: number,
        ms: number, nanosecond: number): bigint,
    fromComponentsUTC(
        year: number | undefined, month: number, date: number,
        hour: number, minute: number, second: number,
        ms: number, nanosecond: number): bigint,
}

export const Datetime_global: Datetime_global_constructor = function (
    this: Datetime_global, from?: Temporal.ZonedDateTime | Temporal.Instant | Date | Datetime_global | Datetime_local | bigint | number,
    timezoneId: Temporal.TimeZoneLike = Temporal.Now.timeZoneId(),
): Datetime_global | string | undefined {
    let timestamp: number | bigint, isBigInt: boolean = false;
    if (arguments.length === 0 || from === undefined) {
        from = Datetime_global.now();
    }
    if (from instanceof Temporal.ZonedDateTime || from instanceof Temporal.Instant) {
        timestamp = BigInt(from.epochNanoseconds);
        isBigInt = true;
    } else if (from instanceof Datetime_global) {
        timestamp = from.time.epochNanoseconds;
        isBigInt = true;
    } else if (typeof from === 'bigint') {
        timestamp = from;
        isBigInt = true;
    } else {
        timestamp = +from;
    }
    const time: Temporal.ZonedDateTime = new Temporal.ZonedDateTime(
        BigInt(timestamp) * (isBigInt ? 1n : 1000000n),
        timezoneId);
    if (new.target) {
        this.time = time;
    } else {
        return Datetime_global.prototype.toString.call(Object.assign({time}, Datetime_global.prototype));
    }
} as Datetime_global_constructor;
Datetime_global.fromComponentsUTC = function (
    year: number | undefined, month: number = 0, date: number = 1,
    hour: number = 0, minute: number = 0, second: number = 0,
    ms: number = 0, nanosecond: number = 0): bigint {
    const day: number | undefined = date, millisecond: number | undefined = ms, timeZone: 'UTC' = 'UTC';
    return Temporal.ZonedDateTime.from({
        year, month, day, hour, minute,
        second, millisecond, nanosecond
        , timeZone,
    }).epochNanoseconds;
};

/**
 * parses a date like Temporal.ZonedDateTime.from only
 * @param string
 */
Datetime_global.parse_strict = function (string: string): Temporal.ZonedDateTime {
    return Temporal.ZonedDateTime.from(string);
};

Datetime_global.prototype.toString = function (this: Datetime_global): string {
    const self: Datetime_global = this, pad = function (strx: string | any, number: number = 2): string {
        return String(strx).padStart(Number(number), '0');
    };
    const offset: string = Datetime_local.getUTCOffset(self.getTimezoneOffset()),
        string: string = `${self.getDayName()} ${self.getMonthName()} ${pad(self.getDate())}`,
        time: string = `${pad(self.getHours())}:${pad(self.getMinutes())}:${pad(self.getSeconds())}`;
    return `${string} ${pad(self.getFullYear(), 4)} ${time} ${offset} (${self.time.timeZoneId})`;
};
/**
 * The Datetime_local.now() static method returns the number of nanoseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC
 * @returns {number} the number of nanoseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC
 */
Datetime_global.now = function (): bigint {
    return Temporal.Now.instant().epochNanoseconds;
};

Datetime_global.zeroms = function (): number {
    return (new Date).setMilliseconds(0);
};

Datetime_global.zerons = function (): bigint {
    return BigInt(Datetime_global.zeroms()) * 1_000_000n;
};

Datetime_global.parse = Datetime_local.parse;
Datetime_global.prototype[Symbol.toStringTag] = Datetime_global.name;
Datetime_global.prototype.toDate = function (): Date {
    return new Date(this.time.epochMilliseconds);
};
Datetime_global.prototype.toTimezone = function (this: Datetime_global, timezoneId: Temporal.TimeZoneLike) {
    return new Datetime_global(this.time.epochNanoseconds, timezoneId);
};
/**
 * the number of milliseconds this object contains since the epoch
 * @returns {number} the number of milliseconds this object contains since the epoch
 */
Datetime_global.prototype.valueOf = function (this: Datetime_global): number {
    return this.time.epochMilliseconds;
};
/**
 * the number of milliseconds this object contains since the epoch
 * @returns {number} the number of milliseconds this object contains since the epoch
 */
Datetime_global.prototype.getTime = function (this: Datetime_global): number {
    return this.valueOf();
};
Datetime_global.prototype.setTime = function (this: Datetime_global, timestamp: number | bigint): number {
    this.time = new Temporal.ZonedDateTime(
        BigInt(timestamp) * (((typeof timestamp) === 'bigint') ? 1n : 1000000n),
        this.time.timeZoneId);
    return this.time.epochMilliseconds;
};
/**
 * an insertable HTML String representing this Date using the user's local datetime.
 *
 * @returns {string} an insertable HTML String representing this Date using the user's local datetime.
 * @see {Datetime_global.prototype.toHTMLString} for using any timezone instead of the user's.
 */
Datetime_global.prototype.toHTML = function (this: Datetime_global): string {
    const date: Date = new Date(this.time.epochMilliseconds);
    return `<time datetime="${date.toISOString()}">${date}</time>`.replace(/GMT/, 'UTC');
};
/**
 * an insertable HTML String representing this Datetime using the specified timezone
 *
 * @returns {string} an insertable HTML String representing this Datetime using the specified timezone
 */
Datetime_global.prototype.toHTMLString = function (this: Datetime_global): string {
    const date: Date = new Date(this.time.epochMilliseconds);
    return `<time datetime="${date.toISOString()}">${this.toString()}</time>`;
};
// builtin-proxy
/**
 * a proxy for `Date.prototype.getDay`
 * @returns {number}
 */
Datetime_global.prototype.getDay = function (this: Datetime_global): number {
    return this.time.dayOfWeek % 7;
};
/**
 * a proxy for `Date.prototype.getYear` or `this.date.getFullYear() - 1900`.
 * @returns {number}
 */
Datetime_global.prototype.getYear = function (this: Datetime_global): number {
    return this.time.year - 1900;
};
/**
 * a proxy for `Date.prototype.getFullYear`
 * @returns {number}
 */
Datetime_global.prototype.getFullYear = function (this: Datetime_global): number {
    return this.time.year;
};
/**
 * a proxy for `Date.prototype.getMonth`
 * @returns {number}
 */
Datetime_global.prototype.getMonth = function (this: Datetime_global): number {
    return this.time.month - 1;
};
/**
 * a proxy for `Date.prototype.getDate`
 * @returns {number}
 */
Datetime_global.prototype.getDate = function (this: Datetime_global): number {
    return this.time.day;
};
/**
 * a proxy for `Date.prototype.getHours`
 * @returns {number}
 */
Datetime_global.prototype.getHours = function (this: Datetime_global): number {
    return this.time.hour;
};
/**
 * a proxy for `Date.prototype.getMinutes`
 * @returns {number}
 */
Datetime_global.prototype.getMinutes = function (this: Datetime_global): number {
    return this.time.minute;
};
/**
 * a proxy for `Date.prototype.getSeconds`
 * @returns {number}
 */
Datetime_global.prototype.getSeconds = function (this: Datetime_global): number {
    return this.time.second;
};
/**
 * a proxy for `Date.prototype.getMilliseconds`
 * @returns {number}
 */
Datetime_global.prototype.getMilliseconds = function (this: Datetime_global): number {
    return this.time.millisecond;
};
// builtin-proxy-UTC
/**
 * a proxy for `Date.prototype.getUTCDay`
 * @returns {number}
 */
Datetime_global.prototype.getUTCDay = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCDay();
};
/**
 * a proxy for `Date.prototype.getUTCYear` or `this.date.getUTCFullYear() - 1900`.
 * @returns {number}
 */
Datetime_global.prototype.getUTCYear = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCFullYear() - 1900;
};
/**
 * a proxy for `Date.prototype.getUTCFullYear`
 * @returns {number}
 */
Datetime_global.prototype.getUTCFullYear = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCFullYear();
};
/**
 * a proxy for `Date.prototype.getUTCMonth`
 * @returns {number}
 */
Datetime_global.prototype.getUTCMonth = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCMonth();
};
/**
 * a proxy for `Date.prototype.getUTCDate`
 * @returns {number}
 */
Datetime_global.prototype.getUTCDate = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCDate();
};
/**
 * a proxy for `Date.prototype.getUTCHours`
 * @returns {number}
 */
Datetime_global.prototype.getUTCHours = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCHours();
};
/**
 * a proxy for `Date.prototype.getUTCMinutes`
 * @returns {number}
 */
Datetime_global.prototype.getUTCMinutes = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCMinutes();
};
/**
 * a proxy for `Date.prototype.getUTCSeconds`
 * @returns {number}
 */
Datetime_global.prototype.getUTCSeconds = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCSeconds();
};
/**
 * a proxy for `Date.prototype.getUTCMilliseconds`
 * @returns {number}
 */
Datetime_global.prototype.getUTCMilliseconds = function (this: Datetime_global): number {
    const date: Date = new Date(this.time.epochMilliseconds);
    return date.getUTCMilliseconds();
};
/**
 * a proxy for `Date.prototype.getTimezoneOffset`
 * @returns {number}
 */
Datetime_global.prototype.getTimezoneOffset = function (this: Datetime_global): number {
    return -Math.round((Number(this.time.offsetNanoseconds) / 1e9) / 60);
};
Datetime_global.prototype.toDatetime_local = function () {
    return new Datetime_local(this.time.epochMilliseconds);
};
/**
 * a proxy for `Date.prototype.toISOString`
 * @returns {number}
 */
Datetime_global.prototype.toISOString = function (): string {
    return (new Date(this.time.epochMilliseconds)).toISOString();
};
Datetime_global.prototype.toJSON = function (): string {
    return this.time.toJSON();
};
Datetime_global.prototype.setFullYear = function (fullYear: number, month?: number, date?: number): number {
    const nanosecond: bigint = BigInt(this.time.nanosecond),
        datetime: Date = new Date(this.time.epochMilliseconds);
    month = arguments.length > 1 ? month : datetime.getMonth();
    date = arguments.length > 2 ? date : datetime.getDate();

    const returnValue: bigint = BigInt(datetime.setFullYear(fullYear, month as number, date as number));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1_000_000n) + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.setMonth = function (month: number, date?: number): number {
    date = arguments.length > 1 ? date : this.getDate();
    return this.setFullYear(this.getFullYear(), month, date);
};
Datetime_global.prototype.setDate = function (date: number): number {
    return this.setFullYear(this.getFullYear(), this.getMonth(), date);
};
Datetime_global.prototype.setHours = function (hours: number, minutes?: number, seconds?: number, milliseconds?: number): number {
    const nanosecond: bigint = BigInt(this.time.nanosecond), date: Date = new Date(this.time.epochMilliseconds);
    minutes = arguments.length > 1 ? minutes : date.getMinutes();
    seconds = arguments.length > 2 ? seconds : date.getSeconds();
    milliseconds = arguments.length > 3 ? milliseconds : date.getMilliseconds();

    const returnValue: bigint = BigInt(date.setHours(hours, minutes as number, seconds as number, milliseconds as number));
    this.time = new Temporal.ZonedDateTime(
        ((returnValue * 1_000_000n) + nanosecond),
        this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.setMinutes = function (minutes: number, seconds?: number, milliseconds?: number): number {
    seconds = arguments.length > 1 ? seconds : this.getSeconds();
    milliseconds = arguments.length > 2 ? milliseconds : this.getMilliseconds();
    return this.setHours(this.getHours(), minutes, seconds, milliseconds);
};
Datetime_global.prototype.setSeconds = function (seconds: number, milliseconds?: number): number {
    milliseconds = arguments.length > 1 ? milliseconds : this.getMilliseconds();
    return this.setHours(this.getHours(), this.getMinutes(), seconds, milliseconds);
};
Datetime_global.prototype.setMilliseconds = function (milliseconds: number): number {
    return this.setHours(this.getHours(), this.getMinutes(), this.getSeconds(), milliseconds);
};
// UTC
Datetime_global.prototype.setUTCFullYear = function (fullYear: number, month?: number, date?: number): number {
    const nanosecond: bigint = BigInt(this.time.nanosecond),
        datetime: Date = new Date(this.time.epochMilliseconds);
    month = arguments.length > 1 ? month : datetime.getUTCMonth();
    date = arguments.length > 2 ? date : datetime.getUTCDate();

    const returnValue: bigint = BigInt(datetime.setUTCFullYear(fullYear, month as number, date as number));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1_000_000n) + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.setUTCHours = function (hours: number, minutes?: number, seconds?: number, milliseconds?: number): number {
    const nanosecond: bigint = BigInt(this.time.nanosecond), date: Date = new Date(this.time.epochMilliseconds);
    minutes = arguments.length > 1 ? minutes : date.getUTCMinutes();
    seconds = arguments.length > 2 ? seconds : date.getUTCSeconds();
    milliseconds = arguments.length > 3 ? milliseconds : date.getUTCMilliseconds();

    const returnValue: bigint = BigInt(date.setUTCHours(hours, minutes as number, seconds as number, milliseconds as number));
    this.time = new Temporal.ZonedDateTime(
        ((returnValue * 1_000_000n) + nanosecond),
        this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.toLocaleString = function (locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string {
    const date: Date = new Date(this.time.epochMilliseconds);
    if (arguments.length === 0) {
        return date.toLocaleString();
    } else if (arguments.length === 1) {
        return date.toLocaleString(locales);
    }
    return date.toLocaleString(locales, options);
};
Datetime_global.prototype.toLocaleDateString = function (locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string {
    const date: Date = new Date(this.time.epochMilliseconds);
    if (arguments.length === 0) {
        return date.toLocaleDateString();
    } else if (arguments.length === 1) {
        return date.toLocaleDateString(locales);
    }
    return date.toLocaleDateString(locales, options);
};
Datetime_global.prototype.toLocaleTimeString = function (locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string {
    const date: Date = new Date(this.time.epochMilliseconds);
    if (arguments.length === 0) {
        return date.toLocaleTimeString();
    } else if (arguments.length === 1) {
        return date.toLocaleTimeString(locales);
    }
    return date.toLocaleTimeString(locales, options);
};
Datetime_global.prototype.toTemporalZonedDateTime = function (): Temporal.ZonedDateTime {
    return this.time;
};
Datetime_global.daynames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
Datetime_global.monthnames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
Datetime_global.daynamesFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
Datetime_global.monthnamesFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// custom
/**
 * a proxy for `Date.prototype.getDay`
 * @returns {number}
 */
Datetime_global.prototype.getDayNumberWeek = function (): number {
    return this.getDay();
};
/**
 * a proxy for `Date.prototype.getDate`
 * @returns {number}
 */
Datetime_global.prototype.getDayNumber = function (): number {
    return this.getDate();
};
/**
 * a proxy for `Date.prototype.getDate`
 * @returns {number}
 */
Datetime_global.prototype.getDayNumberMonth = function (): number {
    return this.getDate();
};

/**
 * returns one of `['Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat']` if `Datetime_global.daynames` isnt Modified, otherwise it returns `string`
 * @returns {'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | string} arcording to `Date.prototype.getDay`
 */
Datetime_global.prototype.getDayName = function (): 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | string {
    return Datetime_global.daynames[this.getDay()];
};
/**
 * returns one of `['Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec']` if
 * `Datetime_global.monthnames` isnt Modified, otherwise it returns `string`
 * @returns {'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' | string} arcording to `Date.prototype.getMonth`
 */
Datetime_global.prototype.getMonthName = function (): 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' | string {
    return Datetime_global.monthnames[this.getMonth()];
};
/**
 * returns one of `['Sunday'| 'Monday'| 'Tuesday'| 'Wednesday'| 'Thursday'| 'Friday'| 'Saturday']` if
 * `Datetime_global.daynamesFull` isnt Modified, otherwise it returns `string`
 * @returns {'Sunday'| 'Monday'| 'Tuesday'| 'Wednesday'| 'Thursday'| 'Friday'| 'Saturday' | string} arcording to `Date.prototype.getDay`
 */
Datetime_global.prototype.getFullDayName = function (): 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | string {
    return Datetime_global.daynamesFull[this.getDay()];
};
/**
 * returns one of `['January'| 'February'| 'March'| 'April'| 'May'| 'June'| 'July'| 'August'| 'September'| 'October'| 'November'| 'December']` if
 * `Datetime_global.monthnamesFull` isnt Modified, otherwise it returns `string`
 * @returns {'January'| 'February'| 'March'| 'April'| 'May'| 'June'| 'July'| 'August'| 'September'| 'October'| 'November'| 'December' | string}
 * arcording to `Date.prototype.getMonth`
 */
Datetime_global.prototype.getFullMonthName = function (): 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December' | string {
    return Datetime_global.monthnamesFull[this.getMonth()];
};
