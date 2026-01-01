import {Datetime_global} from "./Datetime_global.js";
import {Temporal} from 'temporal-polyfill';

export type ZDTDuration = {
    durr: Temporal.Duration,
    toHumanString(this: ZDTDuration, units?: number): string,
    round(this: ZDTDuration, roundTo?: Temporal.DurationRoundTo): ZDTDuration,
    total(this: ZDTDuration, totalOf?: Temporal.DurationRoundTo): ZDTDuration,
    toMachineString(this: ZDTDuration): string, toJSON(this: ZDTDuration): string,
    toString(this: ZDTDuration): string,
};

export interface ZDTDuration_constructor {
    prototype: ZDTDuration,

    (duration: Temporal.Duration | string | number | any, months?: number, weeks?: number, days?: number, hours?: number, minutes?: number, seconds?: number, ms?: number, us?: number, ns?: number): | string,

    new(duration: Temporal.Duration | string | number | any, months?: number, weeks?: number, days?: number, hours?: number, minutes?: number, seconds?: number, ms?: number, us?: number, ns?: number): ZDTDuration,

    mktime(hours?: number, minutes?: number, seconds?: number, months?: number, weeks?: number, days?: number, years?: number, ms?: number, us?: number, ns?: number): ZDTDuration,
}

/**
 * undocumented, can change any version
 */
export const ZDTDuration: ZDTDuration_constructor = function (this: ZDTDuration, duration: Temporal.Duration | string | number | any, months?: number, weeks?: number, days?: number, hours?: number, minutes?: number, seconds?: number, ms: number = 0, us: number = 0, ns: number = 0): void | ZDTDuration | string {
    let newDuration: Temporal.Duration;
    if (typeof duration === 'number' && arguments.length > 1) {
        newDuration = new Temporal.Duration(duration, months, weeks, days, hours, minutes, seconds, ms, us, ns);
    } else if (typeof duration === 'number') {
        newDuration = new Temporal.Duration(0, 0, 0, 0, 0, 0, duration, 0, 0, 0);
    } else if (typeof duration === 'string') {
        newDuration = Temporal.Duration.from(duration);
    } else if (arguments.length === 0) {
        newDuration = Temporal.Duration.from('PT0S');
    } else if (duration instanceof Temporal.Duration) {
        newDuration = duration;
    } else {
        throw new TypeError('duration isnt valid');
    }
    const self: ZDTDuration = new.target ? this : Object.create(ZDTDuration.prototype);
    self.durr = newDuration;
    if (!new.target) return self.round().toHumanString();
} as ZDTDuration_constructor;

/**
 * undocumented, can change any version
 * @returns {*|string}
 * @constructor
 */
ZDTDuration.prototype.toHumanString = function (this: ZDTDuration, units?: number): string {
    const self: Temporal.Duration = this.durr, constructed: string[] = [];
    if (self.years !== 0) constructed.push(` ${self.years} year${Math.abs(self.years) === 1 ? '' : 's'}`);
    if (self.months !== 0) constructed.push(` ${self.months} month${Math.abs(self.months) === 1 ? '' : 's'}`);
    if (self.weeks !== 0) constructed.push(` ${self.weeks} week${Math.abs(self.weeks) === 1 ? '' : 's'}`);
    if (self.days !== 0) constructed.push(` ${self.days} day${Math.abs(self.days) === 1 ? '' : 's'}`);
    if (self.hours !== 0) constructed.push(` ${self.hours} hour${Math.abs(self.hours) === 1 ? '' : 's'}`);
    if (self.minutes !== 0) constructed.push(` ${self.minutes} minute${Math.abs(self.minutes) === 1 ? '' : 's'}`);
    if (self.seconds !== 0) constructed.push(` ${self.seconds} second${Math.abs(self.seconds) === 1 ? '' : 's'}`);
    if (constructed.length === 0) return "0 seconds";
    if (constructed.length === 1) return constructed[0].replace(/^\s+/, '');
    units = Number(units);
    if (units > 0) constructed.length = Math.min(constructed.length, units);
    const popped: string | undefined = constructed.pop();
    return `${constructed}, and${popped}`.replace(/^\s+/, '');
};
// export type durationString =|'years'|'year'|'months'|'month'|'hours'|'hour'|'minutes'|'minute'|'seconds'|'second'|'nanoseconds'|'nanosecond'|'microseconds'|'microsecond';
ZDTDuration.prototype.round = function (
    this: ZDTDuration, roundTo?: any): ZDTDuration {
    roundTo = Object(roundTo);
    roundTo.largestUnit ??= 'years';
    roundTo.smallestUnit ??= 'nanoseconds';
    roundTo.relativeTo ??= (new Datetime_global).toTemporalZonedDateTime();
    return new ZDTDuration(this.durr.round(roundTo));
};

ZDTDuration.prototype.total = function (
    this: ZDTDuration, totalOf?: any): ZDTDuration {
    totalOf = (typeof totalOf === 'string') ? {unit: totalOf} : Object(totalOf);
    totalOf.unit ??= 'seconds';
    totalOf.relativeTo ??= (new Datetime_global).toTemporalZonedDateTime();
    return new ZDTDuration(this.durr.total(totalOf));
};

ZDTDuration.prototype.toMachineString = function (this: ZDTDuration): string {
    return this.durr.toString();
};

ZDTDuration.prototype.toJSON = function (this: ZDTDuration): string {
    return this.durr.toJSON();
};

ZDTDuration.mktime = function (hours: number = 0, minutes: number = 0, seconds: number = 0, months: number = 0, weeks: number = 0, days: number = 0, years: number = 0, ms: number = 0, us: number = 0, ns: number = 0): ZDTDuration {
    return new ZDTDuration(new Temporal.Duration(years, months, weeks, days, hours, minutes, seconds, ms, us, ns));
};
ZDTDuration.prototype.toString = function (this: ZDTDuration): string {
    return this.toHumanString();
};
