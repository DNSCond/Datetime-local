import {Temporal} from 'temporal-polyfill';
import {CallableClass} from "./proxy.js";
import {EXMAScript} from "anthelpers";

export const Datetime_local = CallableClass(class Datetime_Internal {
    #DateValue: number;
    #Timezone: string = Temporal.Now.timeZoneId();

    constructor(
        year?: number | string | Date | Datetime_Internal,
        month?: number,
        day?: number,
        hour?: number,
        minute?: number,
        second?: number,
        milliseconds?: number) {
        const {length} = arguments;
        let dv;
        if (length === 0) {
            dv = new.target.now();
        } else if (length === 1) {
            let tv;
            if ((typeof year === "object") && #DateValue in year) {
                tv = year.#DateValue;
            } else {
                const p = EXMAScript.toPrimitive(year, "default");
                if (typeof p === "string") {
                    tv = new.target.parse(p);
                } else {
                    tv = +(p as any);
                }
            }
            dv = TimeClip(tv);
        } else {
            // the non-null assertion is incorrct, but the fastest way to say to typescript, i know what im doing.
            year = +year!;
            let m = +month!, dt, h, min, s, milli;
            if (length > 2) dt = +day!; else dt = 1;
            if (length > 3) h = +hour!; else h = 0;
            if (length > 4) min = +minute!; else min = 0;
            if (length > 5) s = +second!; else s = 0;
            if (length > 6) milli = +milliseconds!;
            else milli = 0;
            const yr = Dateinternals.MakeFullYear(year);
            const finalDate = Dateinternals.MakeDate(Dateinternals.MakeDay(yr, m, dt), Dateinternals.MakeTime(h, min, s, milli));
            dv = TimeClip(Dateinternals.UTC(finalDate));
        }
        this.#DateValue = dv;
    }

    [Symbol.toStringTag] = 'Datetime_local';

    static withoutNew() {
        return (new this).toString();
    }

    toString(): string {
        if (Number.isNaN(this.#DateValue)) return "Invalid Date";
        const t = this.#LocalTime();
        return Dateinternals.DateString(t) + space + Dateinternals.TimeString(t) + this.#TimeZoneString();
    }

    toDateString(): string {
        if (Number.isNaN(this.#DateValue)) return "Invalid Date";
        const t = this.#LocalTime();
        return Dateinternals.DateString(t);
    }

    toTimeString(): string {
        if (Number.isNaN(this.#DateValue)) return "Invalid Date";
        const t = this.#LocalTime();
        return Dateinternals.TimeString(t) + this.#TimeZoneString();
    }

    toISOString() {
        const t = this.#DateValue;
        const [year, month, day, hour, minute, second, milli] = [
            (Dateinternals.YearFromTime(t)),
            (Dateinternals.MonthFromTime(t)) + 1,
            (Dateinternals.DateFromTime(t)),
            (Dateinternals.HourFromTime(t)),
            (Dateinternals.MinFromTime(t)),
            (Dateinternals.SecFromTime(t)),
            (Dateinternals.msFromTime(t)),
        ], pad = ToZeroPaddedDecimalString;
        let string = `${pad(year, 4)}-${pad(month, 2)}-${pad(day, 2)}`;
        string += `T${pad(hour, 2)}:${pad(minute, 2)}:${pad(second, 2)}`;
        return `${string}.${pad(milli, 3)}Z`;
    }

    setTime(time: number): number {
        return this.#DateValue = TimeClip(time);
    }

    getTime(): number {
        return this.#DateValue;
    }

    valueOf(): number {
        return this.#DateValue;
    }

    toJSON(): string | null {
        return Date.prototype.toJSON.call(this);
    }

    // now is the only non polyfillable
    static now = Date.now;
    // i have no want create a parser
    static parse = Date.parse;

    #LocalTime(timeValue?: number): number {
        timeValue = timeValue ?? this.#DateValue;
        const {offsetNanoseconds} = getOffsetNanoseconds(this.#DateValue, this.#Timezone);
        const offsetMs = Math.trunc(offsetNanoseconds / (10 ** 6));
        return timeValue + offsetMs;
    }

    #UTC(t: number) {
        const timeZone = this.#Timezone;
        const [year, month, day, hour, minute, second, millisecond] = [
            (Dateinternals.YearFromTime(t)),
            (Dateinternals.MonthFromTime(t)) + 1,
            (Dateinternals.DateFromTime(t)),
            (Dateinternals.HourFromTime(t)),
            (Dateinternals.MinFromTime(t)),
            (Dateinternals.SecFromTime(t)),
            (Dateinternals.msFromTime(t)),
        ], zdt = Temporal.ZonedDateTime.from({
            timeZone, year, month, day, hour,
            minute, second, millisecond,
        }, {disambiguation: "compatible", overflow: "reject"});
        return zdt.epochMilliseconds;
    }

    #TimeZoneString() {
        const {offsetNanoseconds, timezoneId} =
            getOffsetNanoseconds(this.#DateValue, this.#Timezone);
        const tzName = `${space}\x28${timezoneId}\x29`,
            offset = Math.trunc(offsetNanoseconds / (10 ** 6)),
            offsetSign = offset < 0 ? '-' : '+',
            absOffset = Math.abs(offset);
        const offsetMin = ToZeroPaddedDecimalString(Dateinternals.MinFromTime(absOffset), 2);
        const offsetHour = ToZeroPaddedDecimalString(Dateinternals.HourFromTime(absOffset), 2);
        return `${offsetSign}${offsetHour}${offsetMin}${tzName}`;
    }

    setTimezone(TimezoneId: string): string {
        return this.#Timezone = (new Temporal.ZonedDateTime(msToNS(this.#DateValue), TimezoneId)).timeZoneId;
    }

    getComponentsLocal(): {
        year: number,
        month: number,
        date: number,
        day: number,
        hours: number,
        minutes: number,
        seconds: number,
        milliseconds: number,
    } {
        return Object.freeze(this.#getComponents());
    }

    getComponentsUTC(): {
        year: number,
        month: number,
        date: number,
        day: number,
        hours: number,
        minutes: number,
        seconds: number,
        milliseconds: number,
    } {
        return Object.freeze(this.#getComponentsUTC());
    }

    #getComponents() {
        const t = this.#LocalTime();
        const [year, month, date, day, hours, minutes, seconds, milliseconds] = [
            (Dateinternals.YearFromTime(t)),
            (Dateinternals.MonthFromTime(t)),
            (Dateinternals.DateFromTime(t)),
            (Dateinternals.WeekDay(t)),
            (Dateinternals.HourFromTime(t)),
            (Dateinternals.MinFromTime(t)),
            (Dateinternals.SecFromTime(t)),
            (Dateinternals.msFromTime(t)),
        ];
        return {year, month, date, day, hours, minutes, seconds, milliseconds};
    }

    #getComponentsUTC() {
        const t = this.#DateValue;
        const [year, month, date, day, hours, minutes, seconds, milliseconds] = [
            (Dateinternals.YearFromTime(t)),
            (Dateinternals.MonthFromTime(t)),
            (Dateinternals.DateFromTime(t)),
            (Dateinternals.WeekDay(t)),
            (Dateinternals.HourFromTime(t)),
            (Dateinternals.MinFromTime(t)),
            (Dateinternals.SecFromTime(t)),
            (Dateinternals.msFromTime(t)),
        ];
        return {year, month, date, day, hours, minutes, seconds, milliseconds};
    }

    setHours(hours: number, minutes?: number, seconds?: number, milliseconds?: number): number {
        const self = this.#getComponents();
        hours = +hours;
        const time = this.#DateValue;
        if (Number.isNaN(time)) return NaN;
        const t = this.#LocalTime(time);
        const min = arguments.length > 1 ? +(minutes as number) : self.minutes;
        const sec = arguments.length > 2 ? +(seconds as number) : self.seconds;
        const ms = arguments.length > 3 ? +(milliseconds as number) : self.milliseconds;
        const date = Dateinternals.MakeDate(Dateinternals.Day(t), Dateinternals.MakeTime(hours, min, sec, ms));
        return this.#DateValue = this.#UTC(TimeClip(date));
    }

    getTimezoneId(): string {
        return this.#Timezone;
    }

    getTimezoneOffset(): number {
        const t = this.#DateValue;
        return (t - this.#LocalTime(t)) / Dateinternals.msPerMinute;
    }

    toUTCString() {
        const tv = this.#DateValue;
        if (Number.isNaN(tv)) return "Invalid Date";
        const weekday = Dateinternals.daynames[Dateinternals.WeekDay(tv)];
        const month = Dateinternals.monthnames[Dateinternals.MonthFromTime(tv)];
        const day = ToZeroPaddedDecimalString(Dateinternals.DateFromTime(tv));
        const year = Dateinternals.YearFromTime(tv), yearSign = year < 0 ? '-' : '';
        const paddedYear = (String(year)).padStart(4, '0');
        const r = `${weekday}, ${day} ${month} ${yearSign}${paddedYear}`;
        return r + space + Dateinternals.TimeString(tv);
    }

    set time(time: number) {
        this.setTime(time);
    }

    get time() {
        return this.getTime();
    }

    set timezone(timezone: string) {
        this.setTimezone(timezone);
    }

    get timezone() {
        return this.getTimezoneId();
    }

});
const space = "\x20";
const Dateinternals = {
    HoursPerDay: 24,
    MinutesPerHour: 60,
    SecondsPerMinute: 60,
    msPerSecond: 1000,
    msPerMinute: 60000,
    msPerHour: 3600000,
    msPerDay: 86400000,
    daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthnames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    TimeString(tv: number): string {
        const h = ToZeroPaddedDecimalString(this.HourFromTime(tv)),
            i = ToZeroPaddedDecimalString(this.MinFromTime(tv)),
            s = ToZeroPaddedDecimalString(this.SecFromTime(tv));
        return `${h}:${i}:${s}${space}` + "GMT";
    }, DateString(tv: number): string {
        const weekday = this.daynames[this.WeekDay(tv)];
        const month = this.monthnames[this.MonthFromTime(tv)];
        const day = (String(this.DateFromTime(tv))).padStart(2, '0');
        const year = this.YearFromTime(tv), yearSign = year < 0 ? '-' : '';
        const paddedYear = (String(year)).padStart(4, '0');
        return weekday + space + month + space + day + space + yearSign + paddedYear;
    }, WeekDay(t: number): number {
        return EXMAScript_Modulo(this.Day(t) + 4, 7);
    }, Day(t: number): number {
        return Math.floor(t / this.msPerDay);
    }, MonthFromTime(t: number) {
        const inLeapYear: number = +this.InLeapYear(t),
            dayWithinYear: number = this.DayWithinYear(t);
        if (dayWithinYear < +31 + ((((0))))) return +0;
        if (dayWithinYear < +59 + inLeapYear) return 1;
        if (dayWithinYear < +90 + inLeapYear) return 2;
        if (dayWithinYear < 120 + inLeapYear) return 3;
        if (dayWithinYear < 151 + inLeapYear) return 4;
        if (dayWithinYear < 181 + inLeapYear) return 5;
        if (dayWithinYear < 212 + inLeapYear) return 6;
        if (dayWithinYear < 243 + inLeapYear) return 7;
        if (dayWithinYear < 273 + inLeapYear) return 8;
        if (dayWithinYear < 304 + inLeapYear) return 9;
        if (dayWithinYear < 334 + inLeapYear) return 10;
        else return 11;
    }, InLeapYear(t: number): boolean {
        return this.DaysInYear(this.YearFromTime(t)) === 366;
    }, DaysInYear(year: number): number {
        const normal = 365, leap = 366;
        if (EXMAScript_Modulo(year, 400) === 0) {
            return leap;
        } else if (EXMAScript_Modulo(year, 100) === 0) {
            return normal;
        } else if (EXMAScript_Modulo(year, 4) === 0) {
            return leap;
        } else {
            return normal;
        }
    }, YearFromTime(t: number): number {
        const maxYear = function (t: number, msPerDay: number, DayFromYear: Function, minYear: number, maxYear: number) {
            let tInDays = t / msPerDay;
            let low = minYear;
            let high = maxYear;
            let result = minYear;

            while (low <= high) {
                let mid = Math.floor((low + high) / 2);
                if (DayFromYear(mid) <= tInDays) {
                    result = mid;   // mid is valid
                    low = mid + 1;  // try higher
                } else {
                    high = mid - 1; // too high, try lower
                }
            }
            return result;
        };
        return maxYear(t, this.msPerDay, this.DayFromYear.bind(this), 0, 9999);
    }, DayFromYear(y: number): number {
        const numYears1 = y - 1970,
            numYears4 = Math.floor((y - 1969) / 4),
            numYears100 = Math.floor((y - 1901) / 100),
            numYears400 = Math.floor((y - 1601) / 400);
        return 365 * numYears1 + numYears4 - numYears100 + numYears400;
    }, DayWithinYear(t: number) {
        return this.Day(t) - this.DayFromYear(this.YearFromTime(t));
    }, DateFromTime(t: number) {
        const inLeapYear: number = +this.InLeapYear(t),
            dayWithinYear: number = this.DayWithinYear(t),
            month = this.MonthFromTime(t);
        if (month === 0) return dayWithinYear + 1;
        if (month === 1) return dayWithinYear - 30;
        if (month === 2) return dayWithinYear - 58 - inLeapYear;
        if (month === 3) return dayWithinYear - 89 - inLeapYear;
        if (month === 4) return dayWithinYear - 119 - inLeapYear;
        if (month === 5) return dayWithinYear - 150 - inLeapYear;
        if (month === 6) return dayWithinYear - 180 - inLeapYear;
        if (month === 7) return dayWithinYear - 211 - inLeapYear;
        if (month === 8) return dayWithinYear - 242 - inLeapYear;
        if (month === 9) return dayWithinYear - 272 - inLeapYear;
        if (month === 10) return dayWithinYear - 303 - inLeapYear;
        return dayWithinYear - 333 - inLeapYear;
    }, HourFromTime(t: number): number {
        return EXMAScript_Modulo(Math.floor(t / this.msPerHour), this.HoursPerDay);
    }, MinFromTime(t: number): number {
        return EXMAScript_Modulo(Math.floor(t / this.msPerMinute), this.MinutesPerHour);
    }, SecFromTime(t: number): number {
        return EXMAScript_Modulo(Math.floor(t / this.msPerSecond), this.SecondsPerMinute);
    }, msFromTime(t: number): number {
        return EXMAScript_Modulo(t, this.msPerSecond);
    }, TimeClip(value: number): number {
        value = +value;
        if (Number.isFinite(value)) {
            const max = 8.64e15,
                abs = Math.abs(value);
            if (abs > max) {
                return NaN;
            } else if (value === 0) {
                return +0;
            } else return EXMAScript.toIntegerOrInfinity(value);
        } else return NaN;
    }, MakeFullYear(year: number): number {
        if (isNaN(year)) return NaN;
        year = EXMAScript.toIntegerOrInfinity(year);
        if (year >= 0 && year < 100) {
            return 1900 + year;
        } else return year;
    }, MakeDate(day: any, time: any) {
        if (!isFinite(day) || !isFinite(time)) {
            return NaN;
        }
        const tv = day * this.msPerDay + time;
        if (isFinite(tv)) return tv;
        return NaN;
    }, MakeDay(yr: number, m: number, dt: number) {
        if (!isFinite(yr) || !isFinite(m) || !isFinite(dt)) {
            return NaN;
        } else {
            const y = EXMAScript.toIntegerOrInfinity(yr);
            m = EXMAScript.toIntegerOrInfinity(m);
            dt = EXMAScript.toIntegerOrInfinity(dt);
            const ym = y + Math.floor(m / 12);
            if (!isFinite(ym)) return NaN;
            const mn = EXMAScript_Modulo(m, 12);

            // --- Step 8: find day number for first day of month mn in year ym ---
            const dayFromYear = this.DayFromYear(ym);   // days to Jan 1 of ym
            const daysBeforeMonth = ((y: number, m: number): number => {
                const monthDays = [31, this.InLeapYear(this.MakeDate(this.DayFromYear(y), 0)) ? 29 : 28,
                    31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                let sum = 0;
                for (let i = 0; i < m; i++) sum += monthDays[i];
                return sum;
            })(ym, mn); // implement below
            const t = dayFromYear + daysBeforeMonth;

            // --- Step 9: add dt offset ---
            return t + dt - 1;
        }
    }, MakeTime(hour: number, min: number, sec: number, millis: number) {
        if (!Array.from(arguments).every(m => isFinite(m))) return NaN;
        const [h, m, s, ms] = [hour, min, sec, millis]
            .map(n => EXMAScript.toIntegerOrInfinity(n));
        return ((h * this.msPerHour + m * this.msPerMinute) + s * this.msPerSecond) + ms;
    }, UTC(localTVal: number): number {// would this work?
        if (!isFinite(localTVal)) return NaN;
        const t = localTVal, {timezoneId} = getOffsetNanoseconds(localTVal);
        const [year, month, day, hour, minute, second] = [
            (this.YearFromTime(t)),
            (this.MonthFromTime(t)) + 1,
            (this.DateFromTime(t)),
            (this.HourFromTime(t)),
            (this.MinFromTime(t)),
            (this.SecFromTime(t)),
            (this.msFromTime(t)),
        ];
        return t - Temporal.ZonedDateTime.from({
            hour, minute, second, month, day, year,
            timeZoneId: timezoneId,
        }).epochMilliseconds;
    }
};
export const TimeClip = Dateinternals.TimeClip;

// Converts milliseconds to nanoseconds
function msToNS(ms: number): bigint {
    return BigInt(ms) * 1_000_000n;
}

// Converts nanoseconds to milliseconds
function nsToMS(ns: bigint): number {
    return Number(ns / 1_000_000n);
}

function ToZeroPaddedDecimalString(number: number, length: number = 2): string {
    return (String(number)).padStart(length, '0');
}

function EXMAScript_Modulo(x: number, y: number): number {
    if (y === 0) throw new RangeError("modulus cannot be zero");
    const r = x % y;
    return (r === 0 || Math.sign(r) === Math.sign(y)) ? r : r + y;
}

export function getOffsetNanoseconds(timeValueMS: number, timezoneId?: string): {
    offsetNanoseconds: number,
    timezoneId?: string
} {
    timezoneId = timezoneId ?? Temporal.Now.timeZoneId();
    const timeValueNS = BigInt(timeValueMS ?? Date.now()) * 1_000_000n;
    const {offsetNanoseconds} = (new Temporal.ZonedDateTime(
        timeValueNS, timezoneId));
    return Object.freeze({
        timezoneId,
        offsetNanoseconds,
        toString(): string {
            return this.timezoneId;
        }, __proto__: null,
        valueOf(): number {
            return this.offsetNanoseconds;
        },
    });
}
