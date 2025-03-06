"use strict";

import {Datetime_local} from "./Datetime_local.js";
import {Temporal} from '@js-temporal/polyfill';

export type Datetime_global = Datetime_local & {
    time: Temporal.ZonedDateTime,
    toString(this: Datetime_global): string,
    getTime(this: Datetime_global): number,
    valueOf(this: Datetime_global): number,
    setTime(this: Datetime_global, timestamp: number): number,
    toHTML(this: Datetime_global): string, toHTML_localeString(this: Datetime_global): string,
};

interface Datetime_global_constructor {
    new(from: Temporal.ZonedDateTime | Temporal.Instant | Date | Datetime_global | Datetime_local | bigint | number,
        timezoneId?: Temporal.TimeZoneLike): Datetime_global,

    (from: Temporal.ZonedDateTime | Temporal.Instant | Date | Datetime_global | Datetime_local | bigint | number,
     timezoneId?: Temporal.TimeZoneLike): string,

    parse(dateString: string, this_parserOnly: boolean): number,

    parseISODate(dateString: string): RegExpMatchArray | null,

    padding(strx: string | any, number?: number): string,

    now(): number,

    zeroms(): number,
}

export const Datetime_global: Datetime_global_constructor = function (
    this: Datetime_global, from: Temporal.ZonedDateTime | Temporal.Instant | Date | Datetime_global | Datetime_local | bigint | number,
    timezoneId: Temporal.TimeZoneLike = Temporal.Now.timeZoneId(),
): Datetime_global | string | undefined {
    let timestamp: number | bigint, isBigInt: boolean = false;
    if (from instanceof Temporal.ZonedDateTime || from instanceof Temporal.Instant) {
        timestamp = from.epochMilliseconds;
    } else if (typeof from === 'bigint') {
        timestamp = from;
        isBigInt = true;
    } else {
        timestamp = +from;
    }
    if (new.target) {
        this.time = new Temporal.ZonedDateTime(
            BigInt(timestamp) * (isBigInt ? 0n : 1000000n),
            timezoneId);
    } else {
        const time: { epochMilliseconds: number } = {epochMilliseconds: Number(timestamp)};
        return Datetime_global.prototype.toString.call({time});
    }
} as Datetime_global_constructor;
/**
 * throws an Error when used
 */
Datetime_global.prototype.toString = function (this: Datetime_global): string {
    throw new Error('toString is currently in progress');
};
/**
 * The Datetime_local.now() static method returns the number of milliseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC
 * @returns {number} the number of milliseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC
 */
Datetime_global.now = function (): number {
    return Date.now();
};
Datetime_global.parse = Datetime_local.parse;
Datetime_global.zeroms = Datetime_local.zeroms;
Datetime_global.prototype[Symbol.toStringTag] = Datetime_global.name;
Datetime_global.prototype.toDate = function (): Date {
    return new Date(this.time.epochMilliseconds);
};
Datetime_global.prototype.toTimezone = function (this: Datetime_global, timezoneId: Temporal.TimeZoneLike) {
    return new Datetime_global(new Date(this.time.epochMilliseconds), timezoneId);
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
        BigInt(timestamp) * (((typeof timestamp) === 'bigint') ? 0n : 1000000n),
        this.time.timeZoneId);
    return this.time.epochMilliseconds;
};
Datetime_global.prototype.toHTML = function (this: Datetime_global): string {
    const date: Date = new Date(this.time.epochMilliseconds);
    return `<time datetime="${date.toISOString()}">${date}</time>`.replace(/GMT/, 'UTC');
};
// builtin-proxy
/**
 * a proxy for `Date.prototype.getDay`
 * @returns {number}
 */
Datetime_global.prototype.getDay = function (this: Datetime_global): number {
    return this.time.dayOfWeek;
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
    return this.time.month - 1
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
    return -Math.round((this.time.offsetNanoseconds / 1e9) / 60);
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
