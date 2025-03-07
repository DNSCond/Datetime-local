"use strict";
import { Datetime_local } from "./Datetime_local.js";
import { Temporal } from '@js-temporal/polyfill';
export const Datetime_global = function (from, timezoneId = Temporal.Now.timeZoneId()) {
    let timestamp, isBigInt = false;
    if (from instanceof Temporal.ZonedDateTime || from instanceof Temporal.Instant) {
        timestamp = BigInt(from.epochNanoseconds);
        isBigInt = true;
    }
    else if (typeof from === 'bigint') {
        timestamp = from;
        isBigInt = true;
    }
    else {
        timestamp = +from;
    }
    if (new.target) {
        this.time = new Temporal.ZonedDateTime(BigInt(timestamp) * (isBigInt ? 1n : 1000000n), timezoneId);
    }
    else {
        const epochMilliseconds = Number(timestamp), time = { epochMilliseconds };
        return Datetime_global.prototype.toString.call({ time });
    }
};
Datetime_global.parse_strict = function (string) {
    return Temporal.ZonedDateTime.from(string);
};
/**
 * throws an Error when used
 */
Datetime_global.prototype.toString = function () {
    throw new Error('toString is currently in progress');
};
/**
 * The Datetime_local.now() static method returns the number of nanoseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC
 * @returns {number} the number of nanoseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC
 */
Datetime_global.now = function () {
    return Temporal.Now.instant().epochNanoseconds;
};
Datetime_global.parse = Datetime_local.parse;
Datetime_global.zeroms = Datetime_local.zeroms;
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
Datetime_global.prototype.toHTML = function () {
    const date = new Date(this.time.epochMilliseconds);
    return `<time datetime="${date.toISOString()}">${date}</time>`.replace(/GMT/, 'UTC');
};
// builtin-proxy
/**
 * a proxy for `Date.prototype.getDay`
 * @returns {number}
 */
Datetime_global.prototype.getDay = function () {
    return this.time.dayOfWeek;
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
Datetime_global.prototype.setFullYear = function (fullYear, month, date) {
    const nanosecond = BigInt(this.time.nanosecond), datetime = new Date(this.time.epochMilliseconds);
    month = arguments.length > 1 ? month : datetime.getMonth();
    date = arguments.length > 2 ? date : datetime.getDate();
    const returnValue = BigInt(datetime.setFullYear(fullYear, month, date));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1000000n) + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.setMonth = function (month, date) {
    date = arguments.length > 1 ? date : this.getDate();
    return this.setFullYear(this.getFullYear(), month, date);
};
Datetime_global.prototype.setDate = function (date) {
    return this.setFullYear(this.getFullYear(), this.getMonth(), date);
};
Datetime_global.prototype.setHours = function (hours, minutes, seconds, milliseconds) {
    const nanosecond = BigInt(this.time.nanosecond), date = new Date(this.time.epochMilliseconds);
    minutes = arguments.length > 1 ? minutes : date.getMinutes();
    seconds = arguments.length > 2 ? seconds : date.getSeconds();
    milliseconds = arguments.length > 3 ? milliseconds : date.getMilliseconds();
    const returnValue = BigInt(date.setHours(hours, minutes, seconds, milliseconds));
    this.time = new Temporal.ZonedDateTime(((returnValue * 1000000n) + nanosecond), this.time.timeZoneId);
    return Number(returnValue);
};
Datetime_global.prototype.setMinutes = function (minutes, seconds, milliseconds) {
    seconds = arguments.length > 1 ? seconds : this.getSeconds();
    milliseconds = arguments.length > 2 ? milliseconds : this.getMilliseconds();
    return this.setHours(this.getHours(), minutes, seconds, milliseconds);
};
Datetime_global.prototype.setSeconds = function (seconds, milliseconds) {
    milliseconds = arguments.length > 1 ? milliseconds : this.getMilliseconds();
    return this.setHours(this.getHours(), this.getMinutes(), seconds, milliseconds);
};
Datetime_global.prototype.setMilliseconds = function (milliseconds) {
    return this.setHours(this.getHours(), this.getMinutes(), this.getSeconds(), milliseconds);
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
Datetime_global.prototype.toLocaleString = function (locales, options) {
    const date = new Date(this.time.epochMilliseconds);
    if (arguments.length === 0) {
        return date.toLocaleString();
    }
    else if (arguments.length === 1) {
        return date.toLocaleString(locales);
    }
    return date.toLocaleString(locales, options);
};
Datetime_global.prototype.toLocaleDateString = function (locales, options) {
    const date = new Date(this.time.epochMilliseconds);
    if (arguments.length === 0) {
        return date.toLocaleDateString();
    }
    else if (arguments.length === 1) {
        return date.toLocaleDateString(locales);
    }
    return date.toLocaleDateString(locales, options);
};
Datetime_global.prototype.toLocaleTimeString = function (locales, options) {
    const date = new Date(this.time.epochMilliseconds);
    if (arguments.length === 0) {
        return date.toLocaleTimeString();
    }
    else if (arguments.length === 1) {
        return date.toLocaleTimeString(locales);
    }
    return date.toLocaleTimeString(locales, options);
};
Datetime_global.prototype.toTemporalZonedDateTime = function () {
    return this.time;
};
