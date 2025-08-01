import {Datetime_global} from "./Datetime_global.js";
import {Temporal} from "temporal-polyfill";
import {ClockTime} from "./RelativeTimeChecker.js";

export class ClockDate extends ClockTime {
    validateDate(): Date | null {
        const date: Date | null = this.dateTime;
        if (date === null) return null;
        // @ts-ignore (invalid dates implicitly coerce to NaN)
        if (isNaN(date)) throw new TypeError('invalid Date');
        return date;
    }

    set minutesAfterMidnight(value: unknown) {
        if (typeof value !== 'number') throw new TypeError('minutesAfterMidnight isnt set with a number');
        const zdt = this.datetime_global;
        if (zdt === null) return;
        this.validateDate();
        zdt.minutesAfterMidnight = value;
        this.dateTime = zdt;
    }

    get minutesAfterMidnight(): number | null {
        return this.datetime_global?.minutesAfterMidnight ?? null;
    }

    set timezoneId(value: unknown) {
        if (typeof value !== 'string') throw new TypeError('timezoneId isnt set with a string');
        const zdt = this.datetime_global;
        if (zdt === null) return;
        this.validateDate();
        zdt.timezoneId = value;
        this.dateTime = zdt;
    }

    get timezoneId(): string | null {
        return this.datetime_global?.timezoneId ?? null;
    }

    set date(value: unknown) {
        if (value instanceof Date) {
            this.dateTime = value;
        } else throw new TypeError('date isnt set with a Date');
    }

    get date(): Date | null {
        return this.dateTime;
    }

    toDate() {
        return this.date;
    }

    withTimezone(timezone: string): Datetime_global {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        zdt.timezoneId = timezone;
        this.dateTime = zdt;
        return zdt;
    }

    toTimezone(timezone: string): Datetime_global {
        return this.withTimezone(timezone);
    }

    getTimezoneId(): string {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.timezoneId;
    }

    valueOf(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.valueOf();
    }

    getTime(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getTime();
    }

    setTime(time: number) {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        const rtn = zdt.setTime(time);
        this.dateTime = zdt;
        return rtn;
    }

    toString(): string {
        return this.outerHTML;
    }


    toHTML(): never {
        throw new Error('toHTML arent supported');
    }

    toHTMLFormatted(): never {
        throw new Error('toHTMLFormatted arent supported');
    }

    toHTML_GMT(): never {
        throw new Error('toHTML_GMT arent supported');
    }

    toHTML_UTC(): never {
        throw new Error('toHTML_UTC arent supported');
    }

    toHTMLHistoryString(): never {
        throw new Error('toHTMLString arent supported');
    }

    toHTMLString(): never {
        throw new Error('toHTMLString arent supported');
    }

    getDay(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDay();
    }

    getDayOfWeek(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDayOfWeek();
    }

    getYear(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getYear();
    }

    getFullYear(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getFullYear();
    }

    getMonth(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getMonth();
    }

    getDate(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDate();
    }

    getHours(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getHours();
    }

    getMinutes(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getMinutes();
    }

    getSeconds(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getSeconds();
    }

    getMilliseconds(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getSeconds();
    }

    getUTCDay(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getSeconds();
    }

    getUTCYear(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getSeconds();
    }

    getUTCFullYear(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getSeconds();
    }

    getUTCMonth(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCMonth();
    }

    getUTCDate(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCDate();
    }

    getUTCHours(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCHours();
    }

    getUTCMinutes(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCMinutes();
    }

    getUTCSeconds(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCSeconds();
    }

    getUTCMilliseconds(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getUTCMilliseconds();
    }

    getTimezoneOffset(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getTimezoneOffset();
    }

    toISOString(): string | null {
        return this.validateDate()?.toISOString() ?? null;
    }

    toJSON(): string | null {
        return this.validateDate()?.toISOString() ?? null;
    }

    setFullYear(fullYear: number, month?: number, date?: number): number | null {
        const zdt = this.datetime_global;
        if (zdt === null) return null;
        this.validateDate();
        date = arguments.length > 1 ? date : zdt.day;
        month = arguments.length > 2 ? month : zdt.month;
        const rtn = zdt.setFullYear(fullYear, date, month);
        this.dateTime = zdt;
        return rtn;
    }

    setMonth(month: number, date?: number): number | null {
        date = arguments.length > 1 ? date : this.getDate();
        return this.setFullYear(this.getFullYear(), month, date);
    }

    setDate(date: number): number | null {
        return this.setFullYear(this.getFullYear(), this.getMonth(), date);
    }

    setHours(hours: number, minutes?: number, seconds?: number, milliseconds?: number): number | null {
        const zdt = this.datetime_global;
        if (zdt === null) return null;
        this.validateDate();
        minutes = arguments.length > 1 ? minutes : zdt.minute;
        seconds = arguments.length > 2 ? seconds : zdt.second;
        milliseconds = arguments.length > 3 ? milliseconds : zdt.millisecond;
        const rtn = zdt.setHours(hours, minutes, seconds, milliseconds);
        this.dateTime = zdt;
        return rtn;
    }

    setMinutes(minutes: number, seconds?: number, milliseconds?: number): number | null {
        seconds = arguments.length > 1 ? seconds : this.getSeconds();
        milliseconds = arguments.length > 2 ? milliseconds : this.getMilliseconds();
        return this.setHours(this.getHours(), minutes, seconds, milliseconds);
    }

    setSeconds(seconds: number, milliseconds?: number): number | null {
        milliseconds = arguments.length > 1 ? milliseconds : this.getMilliseconds();
        return this.setHours(this.getHours(), this.getMinutes(), seconds, milliseconds);
    }

    setMilliseconds(milliseconds: number): number | null {
        return this.setHours(this.getHours(), this.getMinutes(), this.getSeconds(), milliseconds);
    }

    setUTCFullYear(fullYear: number, month?: number, date?: number): number | null {
        const datetime: Date | null = this.validateDate();
        if (datetime === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        month = arguments.length > 1 ? month : datetime.getUTCMonth();
        date = arguments.length > 2 ? date : datetime.getUTCDate();
        const rtn = datetime.setUTCFullYear(fullYear, month, date);
        this.dateTime = datetime;
        return rtn;
    }

    setUTCHours(hours: number, minutes?: number, seconds?: number, milliseconds?: number): number | null {
        const datetime: Date | null = this.validateDate();
        if (datetime === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        minutes = arguments.length > 1 ? minutes : datetime.getUTCMinutes();
        seconds = arguments.length > 2 ? seconds : datetime.getUTCSeconds();
        milliseconds = arguments.length > 3 ? milliseconds : datetime.getUTCMilliseconds();
        const rtn = datetime.setUTCHours(hours, minutes, seconds, milliseconds);
        this.dateTime = datetime;
        return rtn;
    }

    setUTCMonth(month: number, date?: number): number | null {
        date = arguments.length > 1 ? date : this.getUTCDate();
        return this.setUTCFullYear(this.getUTCFullYear(), month, date);
    }

    setUTCDate(date: number): number | null {
        return this.setUTCFullYear(this.getUTCFullYear(), this.getUTCMonth(), date);
    }

    setUTCMinutes(minutes: number, seconds?: number, milliseconds?: number): number | null {
        seconds = arguments.length > 1 ? seconds : this.getUTCSeconds();
        milliseconds = arguments.length > 2 ? milliseconds : this.getUTCMilliseconds();
        return this.setUTCHours(this.getUTCHours(), minutes, seconds, milliseconds);
    }

    setUTCSeconds(seconds: number, milliseconds?: number): number | null {
        milliseconds = arguments.length > 1 ? milliseconds : this.getUTCMilliseconds();
        return this.setUTCHours(this.getUTCHours(), this.getUTCMinutes(), seconds, milliseconds);
    }

    toTemporalZonedDateTime() {
        return this.zonedDateTime;
    }

    setNanoseconds() {
        throw new Error('nanoseconds arent supported')
    }

    getNanoseconds() {
        throw new Error('nanoseconds arent supported')
    }

    getUTCNanoseconds() {
        throw new Error('nanoseconds arent supported')
    }

    toUTCTimezone() {
        return this.toTimezone('UTC');
    }

    toLocalTime() {
        return this.toTimezone(Datetime_global.hostLocalTimezone());
    }

    getDayNumberWeek(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDayNumberWeek();
    }

    getDayNumber(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDayNumber();
    }

    getDayNumberMonth(): number {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDayNumberMonth();
    }

    getDayName(): string {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getDayName();
    }

    getMonthName(): string {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getMonthName();
    }

    getFullDayName(): string {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getFullDayName();
    }

    getFullMonthName(): string {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.getFullMonthName();
    }

    toLocaleString(locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined) {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        return zdt.toLocaleString(locales, options);
    }

    toGMTString(): string | null {
        const d = this.validateDate();
        return d ? this.datetime_global!.toGMTString() : null;
    }

    toUTCString(): string | null {
        const d = this.validateDate();
        return d ? this.datetime_global!.toUTCString() : null;
    }

    toDateString(): string | null {
        const d = this.validateDate();
        return d ? this.datetime_global!.toDateString() : null;
    }

    toTimeString(): string | null {
        const d = this.validateDate();
        return d ? this.datetime_global!.toTimeString() : null;
    }

    format(): never {
        throw new Error('please call toGMTString directly from a Datetime_global instance');
    }

    templateFormat(): never {
        throw new Error('please call toGMTString directly from a Datetime_global instance');
    }

    withCalender(): never {
        throw new Error('calenders arent supported');
    }

    clone() {
        throw new Error('cloning is not supported');
    }

    startOfDay(timezone?: string) {
        const zdt = this.datetime_global;
        if (zdt === null) throw new TypeError('no dateTime is set');
        this.validateDate();
        const rtn = timezone ? zdt.startOfDay(timezone) : zdt.startOfDay();
        this.dateTime = zdt;
        return rtn;
    }

    getTimestamp(): bigint | null {
        const d = this.validateDate();
        return d ? this.datetime_global!.getTimestamp() : null;
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
        get(this: ClockDate): number | null {
            return this.getFullYear();
        }, enumerable, configurable,
    }, month: {
        get(this: ClockDate): number | null {
            return this.zonedDateTime?.month ?? null;
        }, enumerable, configurable,
    }, day: {
        get(this: ClockDate): number | null {
            return this.getDate();
        }, enumerable, configurable,
    }, dayOfWeek: {
        get(this: ClockDate): number | null {
            return this.zonedDateTime?.dayOfWeek ?? null;
        }, enumerable, configurable,
    }, hour: {
        get(this: ClockDate): number | null {
            return this.getHours();
        }, enumerable, configurable,
    }, minute: {
        get(this: ClockDate): number | null {
            return this.getMinutes();
        }, enumerable, configurable,
    }, second: {
        get(this: ClockDate): number | null {
            return this.getSeconds();
        }, enumerable, configurable,
    }, millisecond: {
        get(this: ClockDate): number | null {
            return this.zonedDateTime?.millisecond ?? null;
        }, enumerable, configurable,
    }, microsecond: {
        get(this: ClockDate): number | null {
            return this.zonedDateTime?.microsecond ?? null;
        }, enumerable, configurable,
    }, nanosecond: {
        get(this: ClockDate): number | null {
            return this.zonedDateTime?.nanosecond ?? null;
        }, enumerable, configurable,
    }, epochMilliseconds: {
        get(this: ClockDate): number | null {
            return this.zonedDateTime?.epochMilliseconds ?? null;
        }, enumerable, configurable,
    }, epochNanoseconds: {
        get(this: ClockDate): bigint | null {
            return this.zonedDateTime?.epochNanoseconds ?? null;
        }, set(this: ClockDate, value: bigint): void {
            if (this.timezoneId === null) throw new TypeError('no timezoneId is set');
            this.dateTime = new Temporal.ZonedDateTime(BigInt(value), this.timezoneId);
        }, enumerable, configurable,
    },
});
