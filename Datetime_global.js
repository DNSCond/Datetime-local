"use strict";
import { Datetime_local } from "./Datetime_local.js";
import { Temporal } from '@js-temporal/polyfill';
/**
 * constructs a Datetime_global or Datetime_global string based on different conditions
 * @param from {Temporal.ZonedDateTime | Temporal.Instant | Date | Datetime_global | Datetime_local | bigint | number}
 * either one of these classes. if a `bigint` gets passed in then it will be the nanoseconds since the epoch. otherwise
 * it will be the milliseconds since the epoch. relying on implicit convertion of a bigint will probably result in a
 * `TypeError: cant convert BigInt to number` as BigInts will have to be passed explicitly
 * @param timezoneId the Temporal TimezoneId, if left out then local time is assumed `Temporal.Now.timeZoneId()`.
 * @returns {string|Datetime_global} either a string or an instanceof Datetime_global.
 * @constructor
 * @function
 */
export const Datetime_global = function (from = undefined, timezoneId = Temporal.Now.timeZoneId()) {
    let timestamp, isBigInt = false;
    if (arguments.length === 0 || from === undefined) {
        from = Datetime_global.now();
    }
    if (from instanceof Temporal.ZonedDateTime || from instanceof Temporal.Instant) {
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
    else {
        timestamp = Math.trunc(+from);
    }
    const time = new Temporal.ZonedDateTime(BigInt(timestamp) * (isBigInt ? 1n : 1000000n), timezoneId);
    if (new.target) {
        this.time = time;
    }
    else {
        return Datetime_global.prototype.toString.call(Object.assign({ time }, Datetime_global.prototype));
    }
};
/**
 * forms a date based on Date, returing the nanoseconds since the epoch
 * @param year the year, if under 100 and above 0 then 1900 will be added
 * @param month the zero indexed month
 * @param date the 1 indexed day of the month
 * @param hour the hour
 * @param minute the minute
 * @param second the second
 * @param millisecond the millisecond
 * @param nanosecond the nanosecond
 * @returns {bigint} nanoseconds since the epoch
 */
Datetime_global.fromComponentsUTC = function (year, month = 0, date = 1, hour = 0, minute = 0, second = 0, millisecond = 0, nanosecond = 0n) {
    const date_time = new Date();
    if (arguments.length === 1) {
        if (typeof year === 'string') {
            year = Datetime_local.parse(`${year}`, false);
        }
        if (typeof year === "number") {
            date_time.setTime(+year);
        }
        else {
            date_time.setTime(NaN);
        }
    }
    else if (arguments.length > 1) {
        if (typeof year === "number") {
            date_time.setTime(Date.UTC(year, month, date, hour, minute, second, millisecond));
        }
        else {
            date_time.setTime(NaN);
        }
    }
    return (BigInt(+date_time) * 1000000n) + BigInt(nanosecond);
};
/**
 * parses a date like `Temporal.ZonedDateTime.from` only
 * @param string
 */
Datetime_global.parse_strict = function (string) {
    return Temporal.ZonedDateTime.from(string);
};
/**
 * The Datetime_local.now() static method returns the number of nanoseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC
 * @returns {bigint} the number of nanoseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC
 */
Datetime_global.now = function () {
    return Temporal.Now.instant().epochNanoseconds;
};
Datetime_global.zeroms = function () {
    return (new Date).setMilliseconds(0);
};
Datetime_global.zerons = function () {
    return BigInt(Datetime_global.zeroms()) * 1000000n;
};
Datetime_global.parse = Datetime_local.parse;
Datetime_global.prototype[Symbol.toStringTag] = Datetime_global.name;
Datetime_global.prototype.toDate = function () {
    return new Date(this.time.epochMilliseconds);
};
Datetime_global.prototype.toTimezone = function (timezoneId) {
    return new Datetime_global(this.time.epochNanoseconds, timezoneId);
};
/**
 * the number of milliseconds this object contains since the epoch
 * @returns {number} the number of milliseconds this object contains since the epoch
 */
Datetime_global.prototype.valueOf = function () {
    return this.time.epochMilliseconds;
};
/**
 * the number of milliseconds this object contains since the epoch
 * @returns {number} the number of milliseconds this object contains since the epoch
 */
Datetime_global.prototype.getTime = function () {
    return this.valueOf();
};
Datetime_global.prototype.setTime = function (timestamp) {
    this.time = new Temporal.ZonedDateTime(BigInt(timestamp) * (((typeof timestamp) === 'bigint') ? 1n : 1000000n), this.time.timeZoneId);
    return this.time.epochMilliseconds;
};
/**
 * formats a string like Tue Jun 25 2024 14:30:00 UTC+0000 (UTC) based on the date contained
 *
 * note that you can also use this with Date. you just have tto attach something with time.timezoneId
 * @returns {string} formats a string like Tue Jun 25 2024 14:30:00 UTC+0000 (UTC) based on the date contained
 */
Datetime_global.prototype.toString = function () {
    const self = this, pad = function (strx, number = 2) {
        return String(strx).padStart(Number(number), '0');
    };
    const offset = Datetime_global.getUTCOffset(self.getTimezoneOffset()), string = `${self.getDayName()} ${self.getFullMonthName()} ${pad(self.getDate())}`, time = `${pad(self.getHours())}:${pad(self.getMinutes())}:${pad(self.getSeconds())}`;
    return `${string} ${pad(self.getFullYear(), 4)} ${time} ${offset} (${self.time.timeZoneId})`;
};
/**
 * an insertable HTML String representing this Date using the user's local datetime.
 *
 * @returns {string} an insertable HTML String representing this Date using the user's local datetime.
 * @see {Datetime_global.prototype.toHTMLString} for using any timezone instead of the user's.
 */
Datetime_global.prototype.toHTML = function () {
    const date = new Date(this.time.epochMilliseconds);
    return `<time datetime="${date.toISOString()}">${date}</time>`.replace(/GMT/, 'UTC');
};
/**
 * an insertable HTML String representing this Datetime using the specified timezone
 *
 * @returns {string} an insertable HTML String representing this Datetime using the specified timezone
 */
Datetime_global.prototype.toHTMLString = function () {
    const date = new Date(this.time.epochMilliseconds);
    return `<time datetime="${date.toISOString()}">${this.toString()}</time>`;
};
/**
 * an insertable HTML String representing this Datetime using the specified timezone
 *
 * @returns {string} an insertable HTML String representing this Datetime using the specified timezone
 */
Datetime_global.prototype.toHTMLDiscordString = function (f = 'f') {
    let date = new Date(this.time.epochMilliseconds), strx = this.toString();
    const self = this, pad = function (strx, number = 2) {
        return String(strx).padStart(Number(number), '0');
    }, t = `${pad(self.getHours())}:${pad(self.getMinutes())}`;
    switch (f) {
        case 't':
            strx = t;
            break;
        case 'T':
            strx = `${t}:${pad(self.getSeconds())}`;
            break;
        case 'd':
            strx = `${pad(self.getFullYear(), 4)}-${pad(self.getMonth() + 1)}-${pad(self.getDate())}`;
            break;
        case 'D':
            strx = `${pad(self.getFullYear(), 4)} ${pad(self.getFullMonthName())} ${pad(self.getDate())}`;
            break;
        case 'f':
            strx = `${pad(self.getFullYear(), 4)} ${pad(self.getFullMonthName())} ${pad(self.getDate())} ${t}`;
            break;
        case 'F':
            strx = `${pad(self.getFullDayName())}, ${pad(self.getFullYear(), 4)}`
                + ` ${pad(self.getFullMonthName())} ${pad(self.getDate())} ${t}`;
            break;
        case 'R':
            const differenceSeconds = Math.trunc(((+new Date) - (+self.getTime())) / 1000), positive = differenceSeconds >= 0;
            if (differenceSeconds === 0) {
                strx = 'now';
            }
            else if (Math.abs(differenceSeconds) < 60) {
                strx = `${Math.abs(differenceSeconds)} seconds ${positive ? 'ago' : 'from now'}`;
            }
            else if (Math.abs(differenceSeconds) < 3600) {
                const minutes = Math.abs(Math.trunc(differenceSeconds / 60));
                strx = `${minutes} minute${minutes !== 1 ? 's' : ''} ${positive ? 'ago' : 'from now'}`;
            }
            else if (Math.abs(differenceSeconds) < 86400) {
                const hours = Math.abs(Math.trunc(differenceSeconds / 3600));
                strx = `${hours} hour${hours !== 1 ? 's' : ''} ${positive ? 'ago' : 'from now'}`;
            }
            else {
                const days = Math.abs(Math.trunc(differenceSeconds / 86400));
                strx = `${days} day${days !== 1 ? 's' : ''} ${positive ? 'ago' : 'from now'}`;
            }
            break;
        default:
            throw new Error(`${f} is not valid`);
    }
    return `<time datetime="${date.toISOString()}" data-format="${f}" title="${this.toString()}">${strx}</time>`;
};
// builtin-proxy
/**
 * a proxy for `Date.prototype.getDay`
 * @returns {number}
 */
Datetime_global.prototype.getDay = function () {
    return this.time.dayOfWeek % 7;
};
/**
 * a proxy for `Date.prototype.getYear` or `this.date.getFullYear() - 1900`.
 * @returns {number}
 */
Datetime_global.prototype.getYear = function () {
    return this.time.year - 1900;
};
/**
 * a proxy for `Date.prototype.getFullYear`
 * @returns {number}
 */
Datetime_global.prototype.getFullYear = function () {
    return this.time.year;
};
/**
 * a proxy for `Date.prototype.getMonth`
 * @returns {number}
 */
Datetime_global.prototype.getMonth = function () {
    return this.time.month - 1;
};
/**
 * a proxy for `Date.prototype.getDate`
 * @returns {number}
 */
Datetime_global.prototype.getDate = function () {
    return this.time.day;
};
/**
 * a proxy for `Date.prototype.getHours`
 * @returns {number}
 */
Datetime_global.prototype.getHours = function () {
    return this.time.hour;
};
/**
 * a proxy for `Date.prototype.getMinutes`
 * @returns {number}
 */
Datetime_global.prototype.getMinutes = function () {
    return this.time.minute;
};
/**
 * a proxy for `Date.prototype.getSeconds`
 * @returns {number}
 */
Datetime_global.prototype.getSeconds = function () {
    return this.time.second;
};
/**
 * a proxy for `Date.prototype.getMilliseconds`
 * @returns {number}
 */
Datetime_global.prototype.getMilliseconds = function () {
    return this.time.millisecond;
};
// builtin-proxy-UTC
/**
 * a proxy for `Date.prototype.getUTCDay`
 * @returns {number}
 */
Datetime_global.prototype.getUTCDay = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCDay();
};
/**
 * a proxy for `Date.prototype.getUTCYear` or `this.date.getUTCFullYear() - 1900`.
 * @returns {number}
 */
Datetime_global.prototype.getUTCYear = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCFullYear() - 1900;
};
/**
 * a proxy for `Date.prototype.getUTCFullYear`
 * @returns {number}
 */
Datetime_global.prototype.getUTCFullYear = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCFullYear();
};
/**
 * a proxy for `Date.prototype.getUTCMonth`
 * @returns {number}
 */
Datetime_global.prototype.getUTCMonth = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCMonth();
};
/**
 * a proxy for `Date.prototype.getUTCDate`
 * @returns {number}
 */
Datetime_global.prototype.getUTCDate = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCDate();
};
/**
 * a proxy for `Date.prototype.getUTCHours`
 * @returns {number}
 */
Datetime_global.prototype.getUTCHours = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCHours();
};
/**
 * a proxy for `Date.prototype.getUTCMinutes`
 * @returns {number}
 */
Datetime_global.prototype.getUTCMinutes = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCMinutes();
};
/**
 * a proxy for `Date.prototype.getUTCSeconds`
 * @returns {number}
 */
Datetime_global.prototype.getUTCSeconds = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCSeconds();
};
/**
 * a proxy for `Date.prototype.getUTCMilliseconds`
 * @returns {number}
 */
Datetime_global.prototype.getUTCMilliseconds = function () {
    const date = new Date(this.time.epochMilliseconds);
    return date.getUTCMilliseconds();
};
/**
 * a proxy for `Date.prototype.getTimezoneOffset`
 * @returns {number}
 */
Datetime_global.prototype.getTimezoneOffset = function () {
    return -Math.round((Number(this.time.offsetNanoseconds) / 1e9) / 60);
};
/**
 * converts to `Datetime_local`
 * @deprecated
 * @returns {Datetime_local}
 */
Datetime_global.prototype.toDatetime_local = function () {
    return new Datetime_local(this.time.epochMilliseconds);
};
/**
 * a proxy for `Date.prototype.toISOString`
 * @returns {number}
 */
Datetime_global.prototype.toISOString = function () {
    return (new Date(this.time.epochMilliseconds)).toISOString();
};
Datetime_global.prototype.toJSON = function () {
    return this.time.toJSON();
};
Datetime_global.prototype.setFullYear = function (fullYear, month, date) {
    const nanosecond = BigInt(this.time.nanosecond), datetime = new Date(this.time.epochMilliseconds);
    const utc = new Temporal.ZonedDateTime(this.time.epochNanoseconds, 'UTC');
    month = arguments.length > 1 ? month : utc.month - 1;
    date = arguments.length > 2 ? date : utc.day;
    const returnValue = BigInt(datetime.setUTCFullYear(fullYear, month, date));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1000000n) + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.setMonth = function (month, date) {
    const self = new Date(this.time.epochMilliseconds);
    date = arguments.length > 1 ? date : self.getUTCDate();
    return this.setFullYear(self.getUTCFullYear(), month, date);
};
Datetime_global.prototype.setDate = function (date) {
    const self = new Date(this.time.epochMilliseconds);
    return this.setFullYear(self.getUTCFullYear(), self.getUTCMonth(), date);
};
Datetime_global.prototype.setHours = function (hours, minutes, seconds, milliseconds) {
    const nanosecond = BigInt(this.time.nanosecond), date = new Date(this.time.epochMilliseconds);
    const utc = new Temporal.ZonedDateTime(this.time.epochNanoseconds, 'UTC');
    minutes = arguments.length > 1 ? minutes : utc.minute;
    seconds = arguments.length > 2 ? seconds : utc.second;
    milliseconds = arguments.length > 3 ? milliseconds : utc.millisecond;
    const returnValue = BigInt(date.setUTCHours(hours, minutes + this.getTimezoneOffset(), seconds, milliseconds));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1000000n) + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.setMinutes = function (minutes, seconds, milliseconds) {
    const self = new Date(this.time.epochMilliseconds);
    seconds = arguments.length > 1 ? seconds : self.getUTCSeconds();
    milliseconds = arguments.length > 2 ? milliseconds : self.getUTCMilliseconds();
    return this.setHours(self.getUTCHours(), minutes, seconds, milliseconds);
};
Datetime_global.prototype.setSeconds = function (seconds, milliseconds) {
    const self = new Date(this.time.epochMilliseconds);
    milliseconds = arguments.length > 1 ? milliseconds : self.getUTCMilliseconds();
    return this.setHours(self.getUTCHours(), self.getUTCMinutes(), seconds, milliseconds);
};
Datetime_global.prototype.setMilliseconds = function (milliseconds) {
    const self = new Date(this.time.epochMilliseconds);
    return this.setHours(self.getUTCHours(), self.getUTCMinutes(), self.getUTCSeconds(), milliseconds);
};
// UTC
Datetime_global.prototype.setUTCFullYear = function (fullYear, month, date) {
    const nanosecond = BigInt(this.time.nanosecond), datetime = new Date(this.time.epochMilliseconds);
    month = arguments.length > 1 ? month : datetime.getUTCMonth();
    date = arguments.length > 2 ? date : datetime.getUTCDate();
    const returnValue = BigInt(datetime.setUTCFullYear(fullYear, month, date));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1000000n) + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.setUTCHours = function (hours, minutes, seconds, milliseconds) {
    const nanosecond = BigInt(this.time.nanosecond), date = new Date(this.time.epochMilliseconds);
    minutes = arguments.length > 1 ? minutes : date.getUTCMinutes();
    seconds = arguments.length > 2 ? seconds : date.getUTCSeconds();
    milliseconds = arguments.length > 3 ? milliseconds : date.getUTCMilliseconds();
    const returnValue = BigInt(date.setUTCHours(hours, minutes, seconds, milliseconds));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1000000n) + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.toTemporalZonedDateTime = function () {
    return this.time;
};
Datetime_global.daynames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
Datetime_global.monthnames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
Datetime_global.daynamesFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
Datetime_global.monthnamesFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// custom
/**
 * sets the Nanoseconds
 * @returns {bigint}
 */
Datetime_global.prototype.setNanoseconds = function (nanoseconds) {
    return BigInt((this.time = new Temporal.ZonedDateTime(this.time.epochNanoseconds + BigInt(nanoseconds), this.time.timeZoneId)).nanosecond);
};
/**
 * gets the Nanoseconds
 * @returns {bigint}
 */
Datetime_global.prototype.getNanoseconds = function () {
    return BigInt(this.time.nanosecond);
};
/**
 * gets the Nanoseconds
 * @returns {bigint}
 */
Datetime_global.prototype.getUTCNanoseconds = function () {
    return BigInt(this.time.nanosecond);
};
/**
 * a proxy for `Date.prototype.getDay`
 * @returns {number}
 */
Datetime_global.prototype.getDayNumberWeek = function () {
    return this.getDay();
};
/**
 * a proxy for `Date.prototype.getDate`
 * @returns {number}
 */
Datetime_global.prototype.getDayNumber = function () {
    return this.getDate();
};
/**
 * a proxy for `Date.prototype.getDate`
 * @returns {number}
 */
Datetime_global.prototype.getDayNumberMonth = function () {
    return this.getDate();
};
/**
 * returns one of `['Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat']` if `Datetime_global.daynames` isnt Modified, otherwise it returns `string`
 * @returns {'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | string} arcording to `Date.prototype.getDay`
 */
Datetime_global.prototype.getDayName = function () {
    return Datetime_global.daynames[this.getDay()];
};
/**
 * returns one of `['Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec']` if
 * `Datetime_global.monthnames` isnt Modified, otherwise it returns `string`
 * @returns {'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' | string} arcording to `Date.prototype.getMonth`
 */
Datetime_global.prototype.getMonthName = function () {
    return Datetime_global.monthnames[this.getMonth()];
};
/**
 * returns one of `['Sunday'| 'Monday'| 'Tuesday'| 'Wednesday'| 'Thursday'| 'Friday'| 'Saturday']` if
 * `Datetime_global.daynamesFull` isnt Modified, otherwise it returns `string`
 * @returns {'Sunday'| 'Monday'| 'Tuesday'| 'Wednesday'| 'Thursday'| 'Friday'| 'Saturday' | string} arcording to `Date.prototype.getDay`
 */
Datetime_global.prototype.getFullDayName = function () {
    return Datetime_global.daynamesFull[this.getDay()];
};
/**
 * returns one of `['January'| 'February'| 'March'| 'April'| 'May'| 'June'| 'July'| 'August'| 'September'| 'October'| 'November'| 'December']` if
 * `Datetime_global.monthnamesFull` isnt Modified, otherwise it returns `string`
 * @returns {'January'| 'February'| 'March'| 'April'| 'May'| 'June'| 'July'| 'August'| 'September'| 'October'| 'November'| 'December' | string}
 * arcording to `Date.prototype.getMonth`
 */
Datetime_global.prototype.getFullMonthName = function () {
    return Datetime_global.monthnamesFull[this.getMonth()];
};
/**
 * format a UTC offset from offset in minutes call
 * @param offset
 */
Datetime_global.getUTCOffset = function (offset) {
    if (isNaN(offset))
        return 'UTC+Error';
    const sign = offset > 0 ? "-" : "+", absOffset = Math.abs(offset);
    const hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
    const minutes = String(absOffset % 60).padStart(2, "0");
    return `UTC${sign}${hours}${minutes}`;
};
Datetime_global.htmlToCurrentTime = function (timetags = []) {
    Array.from(timetags).forEach(function (each) {
        const tz = each.getAttribute('data-iana-timezone') ?? Temporal.Now.timeZoneId(), d = new Datetime_global(new Date(each.dateTime), tz);
        each.innerText = d.toString();
    });
};
