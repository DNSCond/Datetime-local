import { Datetime_global } from "./Datetime_global.js";
import { Temporal } from 'temporal-polyfill';
/**
 * undocumented, can change any version
 */
export const ZDTDuration = function (duration, months, weeks, days, hours, minutes, seconds, ms = 0, us = 0, ns = 0) {
    let newDuration;
    if (typeof duration === 'number' && arguments.length > 1) {
        newDuration = new Temporal.Duration(duration, months, weeks, days, hours, minutes, seconds, ms, us, ns);
    }
    else if (typeof duration === 'number') {
        newDuration = new Temporal.Duration(0, 0, 0, 0, 0, 0, duration, 0, 0, 0);
    }
    else if (typeof duration === 'string') {
        newDuration = Temporal.Duration.from(duration);
    }
    else if (arguments.length === 0) {
        newDuration = Temporal.Duration.from('PT0S');
    }
    else if (duration instanceof Temporal.Duration) {
        newDuration = duration;
    }
    else {
        throw new TypeError('duration isnt valid');
    }
    const self = new.target ? this : Object.create(ZDTDuration.prototype);
    self.durr = newDuration;
    if (!new.target)
        return self.round().toHumanString();
};
/**
 * undocumented, can change any version
 * @returns {*|string}
 * @constructor
 */
ZDTDuration.prototype.toHumanString = function (units) {
    const self = this.durr, constructed = [];
    if (self.years !== 0)
        constructed.push(` ${self.years} year${Math.abs(self.years) === 1 ? '' : 's'}`);
    if (self.months !== 0)
        constructed.push(` ${self.months} month${Math.abs(self.months) === 1 ? '' : 's'}`);
    if (self.weeks !== 0)
        constructed.push(` ${self.weeks} week${Math.abs(self.weeks) === 1 ? '' : 's'}`);
    if (self.days !== 0)
        constructed.push(` ${self.days} day${Math.abs(self.days) === 1 ? '' : 's'}`);
    if (self.hours !== 0)
        constructed.push(` ${self.hours} hour${Math.abs(self.hours) === 1 ? '' : 's'}`);
    if (self.minutes !== 0)
        constructed.push(` ${self.minutes} minute${Math.abs(self.minutes) === 1 ? '' : 's'}`);
    if (self.seconds !== 0)
        constructed.push(` ${self.seconds} second${Math.abs(self.seconds) === 1 ? '' : 's'}`);
    if (constructed.length === 0)
        return "0 seconds";
    if (constructed.length === 1)
        return constructed[0].replace(/^\s+/, '');
    units = Number(units);
    if (units > 0)
        constructed.length = Math.min(constructed.length, units);
    const popped = constructed.pop();
    return `${constructed}, and${popped}`.replace(/^\s+/, '');
};
// export type durationString =|'years'|'year'|'months'|'month'|'hours'|'hour'|'minutes'|'minute'|'seconds'|'second'|'nanoseconds'|'nanosecond'|'microseconds'|'microsecond';
ZDTDuration.prototype.round = function (roundTo) {
    roundTo = Object(roundTo);
    roundTo.largestUnit ??= 'years';
    roundTo.smallestUnit ??= 'nanoseconds';
    roundTo.relativeTo ??= (new Datetime_global).toTemporalZonedDateTime();
    return new ZDTDuration(this.durr.round(roundTo));
};
ZDTDuration.prototype.total = function (totalOf) {
    totalOf = (typeof totalOf === 'string') ? { unit: totalOf } : Object(totalOf);
    totalOf.unit ??= 'seconds';
    totalOf.relativeTo ??= (new Datetime_global).toTemporalZonedDateTime();
    return new ZDTDuration(this.durr.total(totalOf));
};
ZDTDuration.prototype.toMachineString = function () {
    return this.durr.toString();
};
ZDTDuration.prototype.toJSON = function () {
    return this.durr.toJSON();
};
ZDTDuration.mktime = function (hours = 0, minutes = 0, seconds = 0, months = 0, weeks = 0, days = 0, years = 0, ms = 0, us = 0, ns = 0) {
    return new ZDTDuration(new Temporal.Duration(years, months, weeks, days, hours, minutes, seconds, ms, us, ns));
};
ZDTDuration.prototype.toString = function () {
    return this.toHumanString();
};
