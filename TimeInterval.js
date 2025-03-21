"use strict"; /*
import {Temporal} from '@js-temporal/polyfill';

export type TimeInterval = {
    years: bigint,
    months: bigint,
    weeks: bigint,
    days: bigint,
    hours: bigint,
    minutes: bigint,
    seconds: bigint,
    negative: boolean,
    milliseconds: bigint,
    nanoseconds: bigint,
    microseconds: bigint,
    toHumanString(this: TimeInterval): string,
    toMachineString(this: TimeInterval, useIForMinutes: boolean): string,
    addIntervalToDate(this: TimeInterval, date: Date | string | number): Date,
    subIntervalToDate(this: TimeInterval, date: Date | string | number): Date,
    toTemporalDuration(this: TimeInterval): Temporal.Duration,
    toJSON(this: TimeInterval): string,
};

interface TimeInterval_constructor {
    prototype: TimeInterval,

    (this: TimeInterval, duration: Temporal.Duration | string | Temporal.DurationLike): TimeInterval | void | string,

    new(duration: Temporal.Duration | string | Temporal.DurationLike): TimeInterval | void | string,

    BigInt_abs(value: number | bigint): bigint,

    fromComponents(years: bigint, months: bigint, days: bigint, hours: bigint, minutes: bigint, seconds: bigint, milliseconds: bigint, nanoseconds: bigint, microseconds: bigint): TimeInterval
}

export const TimeInterval: TimeInterval_constructor = function (this: TimeInterval, duration: Temporal.Duration | string | Temporal.DurationLike): TimeInterval | void | string {
    const self: TimeInterval = new.target ? this : Object.create(TimeInterval.prototype);
    duration = Temporal.Duration.from(duration);
    if (!(duration instanceof Temporal.Duration)) {
        throw new Error('Duration didnt compile');
    }
    self.years = TimeInterval.BigInt_abs(duration.years ?? 0n);
    self.months = TimeInterval.BigInt_abs(duration.months ?? 0n);
    self.weeks = TimeInterval.BigInt_abs(duration.weeks ?? 0n);
    self.days = TimeInterval.BigInt_abs(duration.days ?? 0n);
    self.hours = TimeInterval.BigInt_abs(duration.hours ?? 0n);
    self.minutes = TimeInterval.BigInt_abs(duration.minutes ?? 0n);
    self.seconds = TimeInterval.BigInt_abs(duration.seconds ?? 0n);
    self.milliseconds = TimeInterval.BigInt_abs(duration.milliseconds ?? 0n);
    self.microseconds = TimeInterval.BigInt_abs(duration.microseconds ?? 0n);
    self.nanoseconds = TimeInterval.BigInt_abs(duration.nanoseconds ?? 0n);
    self.negative = duration.sign < 0;
    if (!new.target) {
        return TimeInterval.prototype.toHumanString.call(self);
    }
} as TimeInterval_constructor;
TimeInterval.fromComponents = function (years: bigint = 0n, months: bigint = 0n, days: bigint = 0n, hours: bigint = 0n, minutes: bigint = 0n, seconds: bigint = 0n, milliseconds: bigint = 0n, nanoseconds: bigint = 0n, microseconds: bigint = 0n): TimeInterval {
    return <TimeInterval>new TimeInterval(new Temporal.Duration(Number(years), Number(months), 0,
        Number(days), Number(hours), Number(minutes),
        Number(seconds), Number(milliseconds),
        Number(microseconds), Number(nanoseconds),
    ));
};
TimeInterval.BigInt_abs = function (value: number | bigint): bigint {
    const n: bigint = BigInt(value);
    return n < 0 ? -n : n;
};
TimeInterval.prototype.toMachineString = function (this: TimeInterval, useIForMinutes: boolean = false): string {
    const subsecond_precision: boolean = this.seconds > 0n || this.milliseconds > 0n || this.microseconds > 0n || this.nanoseconds > 0n,
        result: string[] = [];
    if (this.years > 0n) result.push(`${this.years}Y`);
    if (this.months > 0n) result.push(`${this.months}M`);
    if (this.weeks > 0n) result.push(`${this.weeks}D`);
    if (this.days > 0n) result.push(`${this.days}D`);
    if (this.hours > 0n || this.minutes > 0n || subsecond_precision) {
        result.push('T');
        if (this.hours > 0n) result.push(`${this.hours}H`);
        if (this.minutes > 0n) result.push(`${this.minutes}${Boolean(useIForMinutes) ? 'I' : 'M'}`);
        if (subsecond_precision) {
            const precision: bigint = (this.milliseconds * 1_000_000n) + (this.microseconds * 1_000n) + (this.nanoseconds);
            result.push(`${this.seconds}${precision > 0n ? `.${precision}` : ''}S`);
        }
    }
    return `P${result.join()}`.replace(/,/g, '');
};

TimeInterval.prototype.toHumanString = function (this: TimeInterval): string {
    const parts = [], pt0s = "0 seconds";
    if (this.years > 0n) parts.push(`${this.years} year${this.years > 1 ? 's' : ''}`);
    if (this.months > 0) parts.push(`${this.months} month${this.months > 1 ? 's' : ''}`);
    if (this.days > 0) parts.push(`${this.days} day${this.days > 1 ? 's' : ''}`);
    if (this.hours > 0) parts.push(`${this.hours} hour${this.hours > 1 ? 's' : ''}`);
    if (this.minutes > 0) parts.push(`${this.minutes} minute${this.minutes > 1 ? 's' : ''}`);
    if (this.seconds > 0) parts.push(`${this.seconds} second${this.seconds > 1 ? 's' : ''}`);
    if (parts.length === 0) return pt0s;
    const last = parts.pop();
    if (parts.length === 0) return last ?? pt0s;
    return `${parts.join(', ')} and ${last}`;
};
TimeInterval.prototype.addIntervalToDate = function (this: TimeInterval, date: Date | string | number): Date {
    date = new Date(date);
    return new Date(
        date.getFullYear() + Number(this.years),
        date.getMonth() + Number(this.months),
        date.getDate() + Number(this.days),
        date.getHours() + Number(this.hours),
        date.getMinutes() + Number(this.minutes),
        date.getSeconds() + Number(this.seconds),
        date.getMilliseconds() + Number(this.milliseconds),
    );
};
TimeInterval.prototype.subIntervalToDate = function (this: TimeInterval, date: Date | string | number): Date {
    date = new Date(date);
    return new Date(
        date.getFullYear() - Number(this.years),
        date.getMonth() - Number(this.months),
        date.getDate() - Number(this.days),
        date.getHours() - Number(this.hours),
        date.getMinutes() - Number(this.minutes),
        date.getSeconds() - Number(this.seconds),
        date.getMilliseconds() - Number(this.milliseconds),
    );
};
TimeInterval.prototype.toTemporalDuration = function (this: TimeInterval): Temporal.Duration {
    return new Temporal.Duration(Number(this.years), Number(this.months), 0,
        Number(this.days), Number(this.hours), Number(this.minutes),
        Number(this.seconds), Number(this.milliseconds),
        Number(this.microseconds), Number(this.nanoseconds),
    );
};
// TimeInterval.prototype.overflow = function (this: TimeInterval, base: Date | Temporal.ZonedDateTime | Temporal.PlainDateTime): TimeInterval {if (base instanceof Temporal.PlainDateTime) {}};
TimeInterval.prototype.toJSON = function (this: TimeInterval): string {
    return this.toMachineString(true);
};
*/
export {};
