"use strict";
import { Datetime_local } from "./Datetime_local.js";
import { Temporal } from 'temporal-polyfill';
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
        date_time.setTime(year);
    }
    else if (arguments.length > 1) {
        date_time.setTime(Date.UTC(year, month, date, hour, minute, second, millisecond));
    }
    return (BigInt(date_time.getTime()) * 1000000n) + BigInt(nanosecond);
};
/**
 * parses a date like `Temporal.ZonedDateTime.from` only
 * @param string
 */
Datetime_global.parse_strict = function (string) {
    return Temporal.ZonedDateTime.from(string);
};
/**
 * The Datetime_global.now() static method returns the number of nanoseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC
 * @returns {bigint} the number of nanoseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC
 */
Datetime_global.now = function () {
    return Temporal.Now.instant().epochNanoseconds;
};
/**
 * returns milliseconds since the epoch with sub-second precision set to 0.
 * @returns {number}
 */
Datetime_global.zeroms = function () {
    return (new Date).setMilliseconds(0);
};
/**
 * returns nanoseconds since the epoch with sub-second precision set to 0.
 * @returns {bigint}
 */
Datetime_global.zerons = function () {
    return BigInt(Datetime_global.zeroms()) * 1000000n;
};
/**
 * parses dateString into a valid date, supports english only
 * @param dateString the string to parse
 * @param this_parserOnly if falsy then uses Date.parse as a fallback, if truthy then it only parses the current date.
 * default `true`
 * @returns {number} the number of milliseconds elapsed since the epoch, or NaN on failure
 */
Datetime_global.parse = Date.parse;
Datetime_global.prototype[Symbol.toStringTag] = Datetime_global.name;
/**
 * converts this Datetime_global to Date
 * @returns {Date} the Date with millisecond precision. sub millisecond precision is lost
 */
Datetime_global.prototype.toDate = function () {
    return new Date(this.time.epochMilliseconds);
};
/**
 * converts this Datetime_global toanother timezone, preversing its instant in history (hiostory)
 * @param timezoneId the Temporal TimezoneId
 * @returns {Datetime_global} the new Object in the selected Timezone
 */
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
/**
 * sets the timestamp of this Datetime_global instance. if a BigInt is passed directly then its the nanoseconds since the epoch. otherwise its the milliseconds
 * @param timestamp if a BigInt is passed directly then its the nanoseconds since the epoch. otherwise its the milliseconds, all values are passed into BigInt()
 * @returns {number} the milliseconds since the epoch
 * @deprecated this method is modifying. consider using the constructor instead
 */
Datetime_global.prototype.setTime = function (timestamp) {
    this.time = new Temporal.ZonedDateTime(BigInt(timestamp) * (((typeof timestamp) === 'bigint') ? 1n : 1000000n), this.time.timeZoneId);
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
Datetime_global.prototype.toString = function () {
    const self = this, pad = function (strx, number = 2) {
        return String(strx).padStart(Number(number), '0');
    }, fullYear = pad(self.time.withCalendar('iso8601').year, 4);
    const offset = Datetime_global.getUTCOffset(self.getTimezoneOffset()), string = `${self.getDayName()} ${self.getMonthName()} ${pad(self.getDate())}`, time = `${pad(self.getHours())}:${pad(self.getMinutes())}:${pad(self.getSeconds())}`;
    return `${string} ${fullYear} ${time} ${offset} (${self.time.timeZoneId})`;
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
// /**
//  * an insertable HTML String representing this Datetime using the specified timezone
//  *
//  * @returns {string} an insertable HTML String representing this Datetime using the specified timezone
//  */
// Datetime_global.prototype.toHTMLDiscordString = function (
//     this: Datetime_global, f: "R" | "T" | "t" | "f" | "F" | "D" | "d" = 'f'): string {
//     let date: Date = new Date(this.time.epochMilliseconds), strx = this.toString();
//     const self: Datetime_global = this, pad = function (strx: string | any, number: number = 2): string {
//         return String(strx).padStart(Number(number), '0');
//     }, t: string = `${pad(self.getHours())}:${pad(self.getMinutes())}`;
//     switch (f) {
//         case 't':
//             strx = t;
//             break;
//         case 'T':
//             strx = `${t}:${pad(self.getSeconds())}`;
//             break;
//         case 'd':
//             strx = `${pad(self.getFullYear(), 4)}-${pad(self.getMonth() + 1)}-${pad(self.getDate())}`;
//             break;
//         case 'D':
//             strx = `${pad(self.getFullYear(), 4)} ${pad(self.getFullMonthName())} ${pad(self.getDate())}`;
//             break;
//         case 'f':
//             strx = `${pad(self.getFullYear(), 4)} ${pad(self.getFullMonthName())} ${pad(self.getDate())} ${t}`;
//             break;
//         case 'F':
//             strx = `${pad(self.getFullDayName())}, ${pad(self.getFullYear(), 4)}`
//                 + ` ${pad(self.getFullMonthName())} ${pad(self.getDate())} ${t}`;
//             break;
//         case 'R':
//             const differenceSeconds: number = Math.trunc(((+new Date) - (+self.getTime())) / 1_000),
//                 positive: boolean = differenceSeconds >= 0;
//             if (differenceSeconds === 0) {
//                 strx = 'now';
//             } else if (Math.abs(differenceSeconds) < 60) {
//                 strx = `${Math.abs(differenceSeconds)} seconds ${positive ? 'ago' : 'from now'}`;
//             } else if (Math.abs(differenceSeconds) < 3600) {
//                 const minutes = Math.abs(Math.trunc(differenceSeconds / 60));
//                 strx = `${minutes} minute${minutes !== 1 ? 's' : ''} ${positive ? 'ago' : 'from now'}`;
//             } else if (Math.abs(differenceSeconds) < 86400) {
//                 const hours = Math.abs(Math.trunc(differenceSeconds / 3600));
//                 strx = `${hours} hour${hours !== 1 ? 's' : ''} ${positive ? 'ago' : 'from now'}`;
//             } else {
//                 const days = Math.abs(Math.trunc(differenceSeconds / 86400));
//                 strx = `${days} day${days !== 1 ? 's' : ''} ${positive ? 'ago' : 'from now'}`;
//             }
//             break;
//         default:
//             throw new Error(`${f} is not valid`);
//     }
//     return `<time datetime="${date.toISOString()}" data-format="${f}" title="${this.toString()}">${strx}</time>`;
// };
// builtin-proxy
/**
 * a proxy for `Date.prototype.getDay`
 * @returns {number}
 */
Datetime_global.prototype.getDay = function () {
    return this.time.dayOfWeek % this.time.daysInWeek;
};
/**
 * a proxy for `Date.prototype.getYear` or `this.date.getFullYear() - 1900`.
 * @returns {number}
 */
Datetime_global.prototype.getYear = function () {
    return this.time.withCalendar('iso8601').year - 1900;
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
/**
 * returns this.time's toJSON result. which should be Temporal.ZonedDateTime.prototype.toJSON.
 * @returns {string} this.time's toJSON result. which should be Temporal.ZonedDateTime.prototype.toJSON.
 */
Datetime_global.prototype.toJSON = function () {
    return this.time.toJSON();
};
/**
 * sets the full year (modifying the object in place), also warps around
 * @param fullYear the year treated as is
 * @param month the zero indexed month
 * @param date the day of the month
 * @returns {number} milliseconds of the new timestamp
 */
Datetime_global.prototype.setFullYear = function (fullYear, month, date) {
    date = arguments.length > 1 ? date : this.time.day;
    month = arguments.length > 2 ? month : this.time.month;
    const year = fullYear, try_date = {
        year: Number(BigInt(year)),
        day: Number(BigInt(date ?? 0)),
        month: Number(BigInt(month ?? 0)),
    }, self_time = this.time;
    let time, indexed = 0;
    while (true) {
        if (++indexed > 800) {
            throw new Error('Precaution recursion limit reached');
        }
        try {
            time = self_time.with(try_date, { overflow: "reject" });
            break;
        }
        catch {
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
                try_date.day += self_time.subtract({ months: 1 }).daysInMonth;
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
 * sets the month (modifying the object in place), also warps around
 * @param month the zero indexed month
 * @param date the day of the month
 * @returns {number} milliseconds of the new timestamp
 */
Datetime_global.prototype.setMonth = function (month, date) {
    date = arguments.length > 1 ? date : this.getDate();
    return this.setFullYear(this.getFullYear(), month, date);
};
/**
 * sets the day of the month (modifying the object in place), also warps around
 * @param date the day of the month
 * @returns {number} milliseconds of the new timestamp
 */
Datetime_global.prototype.setDate = function (date) {
    return this.setFullYear(this.getFullYear(), this.getMonth(), date);
};
/**
 * sets the hours (modifying the object in place), also warps around.
 * sub milliseconds precision cannot be achieved though this function
 * @param hours the hours
 * @param minutes the minutes
 * @param seconds the seconds
 * @param milliseconds the milliseconds
 * @returns {number} milliseconds of the new timestamp
 */
Datetime_global.prototype.setHours = function (hours, minutes, seconds, milliseconds) {
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
        if (++indexed > 800) {
            throw new Error('Precaution recursion limit reached');
        }
        try {
            time = self_time.with(try_time, { overflow: "reject" });
            break;
        }
        catch {
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
                try_time.day += self_time.subtract({ months: 1 }).daysInMonth;
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
 * sets the minutes (modifying the object in place), also warps around.
 * sub milliseconds precision cannot be achieved though this function
 * @param minutes the minutes
 * @param seconds the seconds
 * @param milliseconds the milliseconds
 * @returns {number} milliseconds of the new timestamp
 */
Datetime_global.prototype.setMinutes = function (minutes, seconds, milliseconds) {
    seconds = arguments.length > 1 ? seconds : this.getSeconds();
    milliseconds = arguments.length > 2 ? milliseconds : this.getMilliseconds();
    return this.setHours(this.getHours(), minutes, seconds, milliseconds);
};
/**
 * sets the seconds (modifying the object in place), also warps around.
 * sub milliseconds precision cannot be achieved though this function
 * @param seconds the seconds
 * @param milliseconds the milliseconds
 * @returns {number} milliseconds of the new timestamp
 */
Datetime_global.prototype.setSeconds = function (seconds, milliseconds) {
    milliseconds = arguments.length > 1 ? milliseconds : this.getMilliseconds();
    return this.setHours(this.getHours(), this.getMinutes(), seconds, milliseconds);
};
/**
 * sets the milliseconds (modifying the object in place), also warps around.
 * sub milliseconds precision cannot be achieved though this function
 * @param milliseconds the milliseconds
 * @returns {number} milliseconds of the new timestamp
 */
Datetime_global.prototype.setMilliseconds = function (milliseconds) {
    return this.setHours(this.getHours(), this.getMinutes(), this.getSeconds(), milliseconds);
};
// UTC
/**
 * sets the full year in UTC, using Date.prototype.setUTCYears internally
 * @param fullYear the year treated as is
 * @param month the zero indexed month
 * @param date the day of the month
 * @returns {number} milliseconds of the new timestamp
 */
Datetime_global.prototype.setUTCFullYear = function (fullYear, month, date) {
    const nanosecond = BigInt(this.time.nanosecond), microsecond = BigInt(this.time.microsecond), datetime = new Date(this.time.epochMilliseconds);
    month = arguments.length > 1 ? month : datetime.getUTCMonth();
    date = arguments.length > 2 ? date : datetime.getUTCDate();
    const returnValue = BigInt(datetime.setUTCFullYear(fullYear, month, date));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1000000n) + microsecond + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
/**
 * sets the hours in UTC (modifying the object in place), also warps around.
 * sub milliseconds precision cannot be achieved though this function
 * @param hours the hours
 * @param minutes the minutes
 * @param seconds the seconds
 * @param milliseconds the milliseconds
 * @returns {number} milliseconds of the new timestamp
 */
Datetime_global.prototype.setUTCHours = function (hours, minutes, seconds, milliseconds) {
    const nanosecond = BigInt(this.time.nanosecond), microsecond = BigInt(this.time.microsecond), date = new Date(this.time.epochMilliseconds);
    minutes = arguments.length > 1 ? minutes : date.getUTCMinutes();
    seconds = arguments.length > 2 ? seconds : date.getUTCSeconds();
    milliseconds = arguments.length > 3 ? milliseconds : date.getUTCMilliseconds();
    const returnValue = BigInt(date.setUTCHours(hours, minutes, seconds, milliseconds));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1000000n) + microsecond + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
/**
 * converts this `Datetime_global` instance to an `Temporal.ZonedDateTime` using its unique point in history
 * @returns {Temporal.ZonedDateTime} an `Temporal.ZonedDateTime` with the same unique point in history
 */
Datetime_global.prototype.toTemporalZonedDateTime = function () {
    return this.time;
};
// Datetime_global.daynames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// Datetime_global.monthnames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Datetime_global.daynamesFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// Datetime_global.monthnamesFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// custom
/**
 * sets the Nanoseconds and optionally the microseconds
 * @param nanoseconds the Nanoseconds you want to set to
 * @param microseconds the microseconds you want to set to
 * @returns {bigint}
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
 * gets the Nanoseconds and microseconds
 * @returns {bigint}
 */
Datetime_global.prototype.getUTCNanoseconds = Datetime_global.prototype.getNanoseconds = function () {
    return (BigInt(this.time.microsecond) * 1000n) + BigInt(this.time.nanosecond);
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
/**
 * Converts all HTML `<time>` tags' `dateTime` attributes to a string representation.
 * Uses the `data-datetime-global-format` attribute to determine the format:
 * - `offsetFromNow` Time offset from now (e.g., "now", "in 30 seconds", "5 minutes ago").
 *
 * uses Date.parse to parse its time.dateTime attribute
 * @param timetags A NodeList or Array of HTMLTimeElement, typically from `document.querySelectorAll`
 * with `time` as tag.
 */
Datetime_global.htmlToCurrentTime = function (timetags = []) {
    Array.from(timetags).forEach(function (each) {
        const tz = each.getAttribute('data-iana-timezone') ?? Temporal.Now.timeZoneId(), d = new Datetime_global(Date.parse(each.dateTime), tz), f = each.getAttribute('data-datetime-global-format') ?? 'D M d Y H:i:s \\U\\T\\CO (e)';
        if (/^\[[a-zA-Z0-9\-_]+]$/.test(f)) {
            switch (f) {
                case "[offsetFromNow]":
                    each.innerText = formatOffsetFromNow(d.toDate());
                    break;
                default:
                    each.innerText = "Invalid Date";
                    break;
            }
        }
        each.innerText = d.format(f);
    });
};
/**
 * Formats the time difference between now and the given date as a human-readable string.
 * @param date The timestamp (in milliseconds) to compare against the current time.
 * @returns A string like "now", "in 30 seconds", or "5 minutes ago".
 */
export function formatOffsetFromNow(date) {
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
        return `${isFuture ? "in" : ""} ${seconds} second${seconds === 1 ? "" : "s"} ${isFuture ? "" : "ago"}`;
    }
    else if (minutes < 60) {
        return `${isFuture ? "in" : ""} ${minutes} minute${minutes === 1 ? "" : "s"} ${isFuture ? "" : "ago"}`;
    }
    else if (hours < 24) {
        return `${isFuture ? "in" : ""} ${hours} hour${hours === 1 ? "" : "s"} ${isFuture ? "" : "ago"}`;
    }
    else {
        return `${isFuture ? "in" : ""} ${days} day${days === 1 ? "" : "s"} ${isFuture ? "" : "ago"}`;
    }
}
/**
 * applies the UTC time to the `Datetime_global`
 *
 * @returns {Datetime_global}
 */
Datetime_global.prototype.toUTCTimezone = function () {
    return this.toTimezone('UTC');
};
/**
 * applies the user's LocalTime to the `Datetime_global`
 *
 * @returns {Datetime_global}
 */
Datetime_global.prototype.toLocalTime = function () {
    return this.toTimezone(Temporal.Now.timeZoneId());
};
Datetime_global.prototype.getDayNumberWeek = function () {
    return this.getDay();
};
Datetime_global.prototype.getDayNumberMonth = Datetime_global.prototype.getDayNumber = function () {
    return this.getDate();
};
Datetime_global.prototype.getDayName = function () {
    return this.time.toLocaleString("en-US", { "weekday": "short" });
};
Datetime_global.prototype.getMonthName = function () {
    return this.time.toLocaleString("en-US", { "month": "short" });
};
Datetime_global.prototype.getFullDayName = function () {
    return this.time.toLocaleString("en-US", { "weekday": "long" });
};
Datetime_global.prototype.getFullMonthName = function () {
    return this.time.toLocaleString("en-US", { "month": "long" });
};
Datetime_global.prototype.toLocaleString = function (locales, options) {
    return this.time.toLocaleString(locales, options);
};
// Datetime_global.prototype.formatPlaceholders = function (this: Datetime_global): { [k: string]: string } {
//     const pad = function (strx: string | any, number: number = 2): string {
//         return String(strx).padStart(Number(number), '0');
//     }, datetime_local = new this.constructor(this);
//     const hour24=datetime_local.getHours(),
//         hour12 = datetime_local.toLocaleString('en-US', {hour12: true, hour: "2-digit"});
//     return Object.fromEntries(Object.entries({
//         'Hour24': String(hour24),
//         'Hour12': String(hour12),
//         'pre0-Hour24': pad(hour24),
//         'pre0-Hour12': pad(hour12),
//         'Year4': String(hour24),
//         'Hour12': String(hour12),
//
//     }).map(s => [s[0].toLowerCase(), s[1]]));
// };
// Datetime_global.prototype.format = function (this: Datetime_global, string: string): string {
//     const timetags: { [k: string]: string } = this.formatPlaceholders();
//     return String(string).replaceAll(/\[([a-z\-0-9]+?)]/ig, function (_: string, value: string): string {
// return timetags[value] ?? `[${value}]`;});};
Datetime_global.prototype.format = function (string) {
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
    //(new this.constructor(this, this?.time?.timeZoneId))
    const pad = function (numberToPad, number = 2, plusIfPositive = false) {
        return (numberToPad < 0 ? '-' : (plusIfPositive ? '+' : '')) + String(Math.abs(numberToPad)).padStart(Number(number), '0');
    }, datetime_local = this.withCalender();
    const hour24 = pad(datetime_local.getHours()), dayName = datetime_local.getDayName();
    const iso8601 = datetime_local, dayNameFull = datetime_local.getFullDayName();
    const dayNumberMonth = pad(datetime_local.getDayNumberMonth()), N = iso8601.time.dayOfWeek.toString(), //iso8601.time.dayOfWeek
    W = iso8601.time?.weekOfYear?.toString() ?? 'undefined', w = iso8601.getDay().toString(), z = iso8601.time.daysInYear.toString(), m = pad(datetime_local.getMonth() + 1), M = datetime_local.getMonthName(), F = datetime_local.getFullMonthName(), hour12 = pad(+hour24 === 0 ? 12 : +hour24), dayInMonth = datetime_local.time.daysInMonth.toString(), leap = datetime_local.time.inLeapYear ? '1' : '0', X = pad(datetime_local.getFullYear(), 4), getYear = pad(datetime_local.getYear(), 2), minutes = pad(datetime_local.getMinutes()), seconds = pad(datetime_local.getSeconds()), datetime_timezone = datetime_local.time.timeZoneId, offset = Datetime_global.getUTCOffset(datetime_local.getTimezoneOffset()).replace(/UTC/, ''), B = toSwatchInternetTime(datetime_local.toDate()), microseconds = `${pad(datetime_local.getMilliseconds(), 3)}${pad(datetime_local.time.microsecond, 3)}`, milliseconds = pad(datetime_local.getMilliseconds(), 3);
    return String(string).replace(/\[Datetime_globalV([12])]/ig, function (_, group1) {
        switch (group1) {
            case '2':
                return 'D, Y-m-d H:i:s.u \\U\\T\\CO (e)';
            default:
                return 'D Y-m-d H:i:s \\U\\T\\CO (e)';
        }
    }).replace(/\[DateV1]/ig, 'D M d Y H:i:s \\U\\T\\CO (e)').replace(/\[HeaderDefault]/ig, 'D, d M Y H:i:s O (e)').replace(/\[toMYSQLi]/ig, 'Y-m-d H:i:s').replace(/\[B]/ig, 'D, @B (Y-m-d H:i:s)').replace(/\\*[a-zA-Z]/ig, function (substring) {
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
                    if (+X > 10000) {
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
export const toSwatchInternetTime = function (date) {
    const datetime = new Date(date), userTimestamp = BigInt(datetime.setUTCHours(datetime.getUTCHours() + 1)), midnightTimestamp = BigInt(datetime.setUTCHours(1, 0, 0, 0));
    // const MS_PER_BEAT: bigint = 86400000n / 1000n; // 86_400 ms per beat
    const elapsedMs = userTimestamp - midnightTimestamp;
    return ((elapsedMs * 1000n) / 86400000n).toString().padStart(3, '0'); // Compute beats as BigInt
};
Datetime_global.prototype.withCalender = function (calender = "iso8601") {
    const datetime_global = new Datetime_global(this.time.epochNanoseconds, this.time.timeZoneId);
    datetime_global.time = datetime_global.time.withCalendar(calender);
    return datetime_global;
};
Datetime_global.prototype.startOfDay = function () {
    return new Datetime_global(this.time.startOfDay().epochNanoseconds, this.time.timeZoneId);
};
export function ordinalSuffix(value) {
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
}
