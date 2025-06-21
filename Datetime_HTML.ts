import {constructorInput, Datetime_global} from "./Datetime_global.js";
import {Temporal} from "temporal-polyfill";

type Datetime_HTML = Datetime_global & {
    toHTMLTimeFormatted(this: Datetime_HTML, format: string): HTMLTimeElement;
    toHTMLTimeGMT(this: Datetime_HTML): HTMLTimeElement;
    toHTMLTimeUTC(this: Datetime_HTML): HTMLTimeElement;
    toHTMLTimeElement(this: Datetime_HTML): HTMLTimeElement;
    toHTMLTime(this: Datetime_HTML): HTMLTimeElement;
};

interface Datetime_HTML_constructor {
    prototype: Datetime_HTML;
    [Symbol.toStringTag]: string;

    /**
     * Constructs a Datetime_global instance or returns a string representation.
     * @param from - Input to initialize the date-time. Supports:
     *   - Temporal.ZonedDateTime: Used directly.
     *   - Temporal.Instant: Converted from epoch nanoseconds.
     *   - Date | Datetime_global: Converted from epoch milliseconds.
     *   - bigint: Nanoseconds since epoch.
     *   - number: Milliseconds since epoch.
     *   - string: Parsed using `Date.parse` (EcmaScript format or browser-dependent formats).
     *   - undefined: Uses current time (Datetime_global.now()).
     * @param timezoneId - A Temporal.TimeZoneLike or IANA timezone string (e.g., "UTC"). Defaults to local timezone (Temporal.Now.timeZoneId()).
     * @returns A Datetime_global instance if called with `new`, or a string representation if called as a function.
     * @throws TypeError if timezoneId is invalid or if BigInt conversion fails.
     * @throws RangeError if the input string cannot be parsed or results in an invalid date.
     * @example
     * // Current time in local timezone (assuming its America/New_York)
     * const now = new Datetime_global();
     * console.log(now.toString()); // e.g., "Fri Apr 18 2025 12:00:00 UTC-0400 (America/New_York)"
     *
     * // From Date in UTC
     * const fromDate = new Datetime_global(new Date("2025-04-18T00:00:00Z"), "UTC");
     * console.log(fromDate.toISOString()); // "2025-04-18T00:00:00.000Z"
     *
     * // From nanoseconds (bigint)
     * const fromBigInt = new Datetime_global(1745193600000000000n, "UTC"); // April 18, 2025
     * console.log(fromBigInt.toISOString()); // "2025-04-18T00:00:00.000Z"
     *
     * // From ISO string
     * const fromString = new Datetime_global("2025-04-18T00:00:00Z", "Asia/Tokyo");
     * console.log(fromString.toString()); // e.g., "Fri Apr 18 2025 09:00:00 UTC+0900 (Asia/Tokyo)"
     *
     * // As a function (returns string)
     * const asString = Datetime_global(new Date("2025-04-18T00:00:00Z"), "UTC");
     * console.log(asString); // "Fri Apr 18 2025 00:00:00 UTC+0000 (UTC)"
     * @constructor
     * @function
     */
    new(from?: constructorInput, timezoneId?: Temporal.TimeZoneLike | string | undefined): Datetime_HTML,

    /**
     * Constructs a Datetime_global instance or returns a string representation.
     * @param from - Input to initialize the date-time. Supports:
     *   - Temporal.ZonedDateTime: Used directly.
     *   - Temporal.Instant: Converted from epoch nanoseconds.
     *   - Date | Datetime_global: Converted from epoch milliseconds.
     *   - bigint: Nanoseconds since epoch.
     *   - number: Milliseconds since epoch.
     *   - string: Parsed using `Date.parse` (EcmaScript format or browser-dependent formats).
     *   - undefined: Uses current time (Datetime_global.now()).
     * @param timezoneId - A Temporal.TimeZoneLike or IANA timezone string (e.g., "UTC"). Defaults to local timezone (Temporal.Now.timeZoneId()).
     * @returns A Datetime_global instance if called with `new`, or a string representation if called as a function.
     * @throws TypeError if timezoneId is invalid or if BigInt conversion fails.
     * @throws RangeError if the input string cannot be parsed or results in an invalid date.
     * @example
     * // Current time in local timezone (assuming its America/New_York)
     * const now = new Datetime_global();
     * console.log(now.toString()); // e.g., "Fri Apr 18 2025 12:00:00 UTC-0400 (America/New_York)"
     *
     * // From Date in UTC
     * const fromDate = new Datetime_global(new Date("2025-04-18T00:00:00Z"), "UTC");
     * console.log(fromDate.toISOString()); // "2025-04-18T00:00:00.000Z"
     *
     * // From nanoseconds (bigint)
     * const fromBigInt = new Datetime_global(1745193600000000000n, "UTC"); // April 18, 2025
     * console.log(fromBigInt.toISOString()); // "2025-04-18T00:00:00.000Z"
     *
     * // From ISO string
     * const fromString = new Datetime_global("2025-04-18T00:00:00Z", "Asia/Tokyo");
     * console.log(fromString.toString()); // e.g., "Fri Apr 18 2025 09:00:00 UTC+0900 (Asia/Tokyo)"
     *
     * // As a function (returns string)
     * const asString = Datetime_global(new Date("2025-04-18T00:00:00Z"), "UTC");
     * console.log(asString); // "Fri Apr 18 2025 00:00:00 UTC+0000 (UTC)"
     * @constructor
     * @function
     */
    (from?: constructorInput, timezoneId?: Temporal.TimeZoneLike | string | undefined): HTMLTimeElement,
}

const Datetime_HTML: Datetime_HTML_constructor = function (this: Datetime_HTML, from?: constructorInput, timezoneId?: Temporal.TimeZoneLike | string | undefined): Datetime_HTML | void | HTMLTimeElement {
    const self: Datetime_HTML = new.target ? this : Object.create(Datetime_HTML),
        {time} = new Datetime_HTML(from, timezoneId);
    self.time = time;
    if (new.target === undefined) {
        return self.toHTMLTime();
    }
} as Datetime_HTML_constructor;
Object.setPrototypeOf(Datetime_HTML.prototype, Datetime_global.prototype);
Object.setPrototypeOf(Datetime_HTML, Datetime_global);


/**
 * Returns the date-time as an ISO 8601 string in UTC (e.g., "2025-04-18T12:34:56.789Z").
 * Matches Date.prototype.toISOString, with millisecond precision.
 * @returns A string in ISO 8601 format.
 */
Datetime_HTML.prototype.toJSON = Datetime_HTML.prototype.toISOString = function (this: Datetime_global): string {
    return this.toDate().toISOString();
};

Datetime_HTML.prototype.toHTMLTimeFormatted = function (this: Datetime_HTML, format: string): HTMLTimeElement {
    const time: HTMLTimeElement = createTimeElement();
    time.textContent = this.format(format);
    time.dateTime = this.toISOString();
    return time;
};

Datetime_HTML.prototype.toHTMLTimeGMT = function (this: Datetime_HTML): HTMLTimeElement {
    const time: HTMLTimeElement = createTimeElement();
    time.textContent = this.toDate().toUTCString();
    time.dateTime = this.toISOString();
    return time;
};

Datetime_HTML.prototype.toHTMLTimeUTC = function (this: Datetime_HTML): HTMLTimeElement {
    const time: HTMLTimeElement = createTimeElement();
    time.textContent = this.toUTCString()
    time.dateTime = this.toISOString();
    return time;
};

Datetime_HTML.prototype.toHTMLTimeElement = function (this: Datetime_HTML): HTMLTimeElement {
    const time: HTMLTimeElement = createTimeElement();
    time.textContent = this.toDate().toString();
    time.dateTime = this.toISOString();
    return time;
};

Datetime_HTML.prototype.toHTMLTime = function (this: Datetime_HTML): HTMLTimeElement {
    const time: HTMLTimeElement = createTimeElement();
    time.textContent = this.toString();
    time.dateTime = this.toISOString();
    return time;
};

export function createTimeElement(): HTMLTimeElement {
    const time: HTMLTimeElement = document.createElement('time');
    time.className = 'Datetime_HTML';
    return time;
}
