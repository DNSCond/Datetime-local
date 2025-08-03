import { Datetime_global } from "./Datetime_global.js";
import { Temporal } from "temporal-polyfill";
import { ClockTime } from "./RelativeTimeChecker.js";
// ClockTime's name was chosen because 'time' was already used, and it needed a hyphen,
// and ClockDate's name was chosen because ClockTime + Date => ClockDate.
export class ClockDate extends ClockTime {
    validateDate() {
        const date = this.dateTime;
        if (date === null)
            return null;
        // @ts-ignore (invalid dates implicitly coerce to NaN)
        if (isNaN(date))
            throw new TypeError('invalid Date');
        return date;
    }
    set minutesAfterMidnight(value) {
        if (typeof value !== 'number')
            throw new TypeError('minutesAfterMidnight isnt set with a number');
        const zdt = this.datetime_global;
        if (zdt === null)
            return;
        this.validateDate();
        zdt.minutesAfterMidnight = value;
        this.dateTime = zdt;
    }
    get minutesAfterMidnight() {
        return this.datetime_global?.minutesAfterMidnight ?? null;
    }
    set timezoneId(value) {
        if (typeof value !== 'string')
            throw new TypeError('timezoneId isnt set with a string');
        const zdt = this.datetime_global;
        if (zdt === null)
            return;
        this.validateDate();
        zdt.timezoneId = value;
        this.dateTime = zdt;
    }
    get timezoneId() {
        return this.datetime_global?.timezoneId ?? null;
    }
    set date(value) {
        if (value instanceof Date) {
            this.dateTime = value;
        }
        else
            throw new TypeError('date isnt set with a Date');
    }
    get date() {
        return this.dateTime;
    }
    toDate() {
        return this.date;
    }
    withTimezone(timezone) {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        zdt.timezoneId = timezone;
        this.dateTime = zdt;
        return zdt;
    }
    toTimezone(timezone) {
        return this.withTimezone(timezone);
    }
    getTimezoneId() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.timezoneId;
    }
    valueOf() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.valueOf();
    }
    getTime() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getTime();
    }
    setTime(time) {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        const rtn = zdt.setTime(time);
        this.dateTime = zdt;
        return rtn;
    }
    toString() {
        return this.outerHTML;
    }
    toHTML() {
        throw new Error('toHTML arent supported');
    }
    toHTMLFormatted() {
        throw new Error('toHTMLFormatted arent supported');
    }
    toHTML_GMT() {
        throw new Error('toHTML_GMT arent supported');
    }
    toHTML_UTC() {
        throw new Error('toHTML_UTC arent supported');
    }
    toHTMLHistoryString() {
        throw new Error('toHTMLString arent supported');
    }
    toHTMLString() {
        throw new Error('toHTMLString arent supported');
    }
    getDay() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDay();
    }
    getDayOfWeek() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDayOfWeek();
    }
    getYear() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getYear();
    }
    getFullYear() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getFullYear();
    }
    getMonth() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getMonth();
    }
    getDate() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDate();
    }
    getHours() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getHours();
    }
    getMinutes() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getMinutes();
    }
    getSeconds() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getSeconds();
    }
    getMilliseconds() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getMilliseconds();
    }
    getUTCDay() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCDay();
    }
    getUTCYear() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCYear();
    }
    getUTCFullYear() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCFullYear();
    }
    getUTCMonth() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCMonth();
    }
    getUTCDate() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCDate();
    }
    getUTCHours() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCHours();
    }
    getUTCMinutes() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCMinutes();
    }
    getUTCSeconds() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCSeconds();
    }
    getUTCMilliseconds() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCMilliseconds();
    }
    getTimezoneOffset() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getTimezoneOffset();
    }
    toISOString() {
        return this.validateDate()?.toISOString() ?? null;
    }
    toJSON() {
        return this.validateDate()?.toISOString() ?? null;
    }
    setFullYear(fullYear, month, date) {
        const zdt = this.datetime_global;
        if (zdt === null)
            return null;
        this.validateDate();
        date = arguments.length > 1 ? date : zdt.day;
        month = arguments.length > 2 ? month : zdt.month;
        const rtn = zdt.setFullYear(fullYear, date, month);
        this.dateTime = zdt;
        return rtn;
    }
    setMonth(month, date) {
        date = arguments.length > 1 ? date : this.getDate();
        return this.setFullYear(this.getFullYear(), month, date);
    }
    setDate(date) {
        return this.setFullYear(this.getFullYear(), this.getMonth(), date);
    }
    setHours(hours, minutes, seconds, milliseconds) {
        const zdt = this.datetime_global;
        if (zdt === null)
            return null;
        this.validateDate();
        minutes = arguments.length > 1 ? minutes : zdt.minute;
        seconds = arguments.length > 2 ? seconds : zdt.second;
        milliseconds = arguments.length > 3 ? milliseconds : zdt.millisecond;
        const rtn = zdt.setHours(hours, minutes, seconds, milliseconds);
        this.dateTime = zdt;
        return rtn;
    }
    setMinutes(minutes, seconds, milliseconds) {
        seconds = arguments.length > 1 ? seconds : this.getSeconds();
        milliseconds = arguments.length > 2 ? milliseconds : this.getMilliseconds();
        return this.setHours(this.getHours(), minutes, seconds, milliseconds);
    }
    setSeconds(seconds, milliseconds) {
        milliseconds = arguments.length > 1 ? milliseconds : this.getMilliseconds();
        return this.setHours(this.getHours(), this.getMinutes(), seconds, milliseconds);
    }
    setMilliseconds(milliseconds) {
        return this.setHours(this.getHours(), this.getMinutes(), this.getSeconds(), milliseconds);
    }
    setUTCFullYear(fullYear, month, date) {
        const datetime = this.validateDate();
        if (datetime === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        month = arguments.length > 1 ? month : datetime.getUTCMonth();
        date = arguments.length > 2 ? date : datetime.getUTCDate();
        const rtn = datetime.setUTCFullYear(fullYear, month, date);
        this.dateTime = datetime;
        return rtn;
    }
    setUTCHours(hours, minutes, seconds, milliseconds) {
        const datetime = this.validateDate();
        if (datetime === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        minutes = arguments.length > 1 ? minutes : datetime.getUTCMinutes();
        seconds = arguments.length > 2 ? seconds : datetime.getUTCSeconds();
        milliseconds = arguments.length > 3 ? milliseconds : datetime.getUTCMilliseconds();
        const rtn = datetime.setUTCHours(hours, minutes, seconds, milliseconds);
        this.dateTime = datetime;
        return rtn;
    }
    setUTCMonth(month, date) {
        date = arguments.length > 1 ? date : this.getUTCDate();
        return this.setUTCFullYear(this.getUTCFullYear(), month, date);
    }
    setUTCDate(date) {
        return this.setUTCFullYear(this.getUTCFullYear(), this.getUTCMonth(), date);
    }
    setUTCMinutes(minutes, seconds, milliseconds) {
        seconds = arguments.length > 1 ? seconds : this.getUTCSeconds();
        milliseconds = arguments.length > 2 ? milliseconds : this.getUTCMilliseconds();
        return this.setUTCHours(this.getUTCHours(), minutes, seconds, milliseconds);
    }
    setUTCSeconds(seconds, milliseconds) {
        milliseconds = arguments.length > 1 ? milliseconds : this.getUTCMilliseconds();
        return this.setUTCHours(this.getUTCHours(), this.getUTCMinutes(), seconds, milliseconds);
    }
    toTemporalZonedDateTime() {
        return this.zonedDateTime;
    }
    setNanoseconds() {
        throw new Error('nanoseconds arent supported');
    }
    getNanoseconds() {
        throw new Error('nanoseconds arent supported');
    }
    getUTCNanoseconds() {
        throw new Error('nanoseconds arent supported');
    }
    toUTCTimezone() {
        return this.toTimezone('UTC');
    }
    toLocalTime() {
        return this.toTimezone(Datetime_global.hostLocalTimezone());
    }
    getDayNumberWeek() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDayNumberWeek();
    }
    getDayNumber() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDayNumber();
    }
    getDayNumberMonth() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDayNumberMonth();
    }
    getDayName() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDayName();
    }
    getMonthName() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getMonthName();
    }
    getFullDayName() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getFullDayName();
    }
    getFullMonthName() {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getFullMonthName();
    }
    toLocaleString(locales, options) {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.toLocaleString(locales, options);
    }
    toGMTString() {
        const d = this.validateDate();
        return d ? this.datetime_global.toGMTString() : null;
    }
    toUTCString() {
        const d = this.validateDate();
        return d ? this.datetime_global.toUTCString() : null;
    }
    toDateString() {
        const d = this.validateDate();
        return d ? this.datetime_global.toDateString() : null;
    }
    toTimeString() {
        const d = this.validateDate();
        return d ? this.datetime_global.toTimeString() : null;
    }
    format() {
        throw new Error('please call toGMTString directly from a Datetime_global instance');
    }
    templateFormat() {
        throw new Error('please call toGMTString directly from a Datetime_global instance');
    }
    withCalender() {
        throw new Error('calenders arent supported');
    }
    clone() {
        throw new Error('cloning is not supported');
    }
    startOfDay(timezone) {
        const zdt = this.datetime_global;
        if (zdt === null)
            throw new TypeError('no dateTime is set');
        this.validateDate();
        const rtn = timezone ? zdt.startOfDay(timezone) : zdt.startOfDay();
        this.dateTime = zdt;
        return rtn;
    }
    getTimestamp() {
        const d = this.validateDate();
        return d ? this.datetime_global.getTimestamp() : null;
    }
    until() {
        throw new Error('until is not supported');
    }
    since() {
        throw new Error('since is not supported');
    }
}
const [enumerable, configurable] = [true, true];
Object.defineProperties(ClockDate.prototype, {
    year: {
        get() {
            return this.getFullYear();
        }, enumerable, configurable,
    }, month: {
        get() {
            return this.zonedDateTime?.month ?? null;
        }, enumerable, configurable,
    }, day: {
        get() {
            return this.getDate();
        }, enumerable, configurable,
    }, dayOfWeek: {
        get() {
            return this.zonedDateTime?.dayOfWeek ?? null;
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
            return this.zonedDateTime?.millisecond ?? null;
        }, enumerable, configurable,
    }, microsecond: {
        get() {
            return this.zonedDateTime?.microsecond ?? null;
        }, enumerable, configurable,
    }, nanosecond: {
        get() {
            return this.zonedDateTime?.nanosecond ?? null;
        }, enumerable, configurable,
    }, epochMilliseconds: {
        get() {
            return this.zonedDateTime?.epochMilliseconds ?? null;
        }, enumerable, configurable,
    }, epochNanoseconds: {
        get() {
            return this.zonedDateTime?.epochNanoseconds ?? null;
        }, set(value) {
            if (this.timezoneId === null)
                throw new TypeError('no timezoneId is set');
            this.dateTime = new Temporal.ZonedDateTime(BigInt(value), this.timezoneId);
        }, enumerable, configurable,
    },
});
