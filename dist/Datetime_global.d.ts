import { Temporal } from 'temporal-polyfill';
import { ZDTDuration } from "./ZDTDuration.js";
/**
 * things that go into the constructor
 */
export type constructorInput = Temporal.ZonedDateTime | Temporal.Instant | Datetime_global | Date | null | bigint | number | string;
export type Datetime_global = {
    validate(this: Datetime_global): Temporal.ZonedDateTime | null;
    constructor: Datetime_global_constructor;
    /**
     * the wrapped ZonedDateTime
     */
    time: Temporal.ZonedDateTime | null;
    [Symbol.toStringTag]: string;
    /**
     * a getter for the full year
     */
    get year(): number;
    /**
     * a getter for the month
     */
    get month(): number;
    /**
     * a getter for the day of month
     */
    get day(): number;
    /**
     * a getter for the dayOfWeek
     */
    get dayOfWeek(): number;
    /**
     * a getter for the hour
     */
    get hour(): number;
    /**
     * a getter for the minute
     */
    get minute(): number;
    /**
     * a getter for the second
     */
    get second(): number;
    /**
     * a getter for the millisecond
     */
    get millisecond(): number;
    /**
     * a getter for the microsecond
     */
    get microsecond(): number;
    /**
     * a getter for the nanosecond
     */
    get nanosecond(): number;
    /**
     * a getter for the epochMilliseconds
     */
    get epochMilliseconds(): number;
    /**
     * a getter for the epochNanoseconds
     */
    get epochNanoseconds(): bigint;
    /**
     * a setter for the epochNanoseconds (only accepts bigints)
     */
    set epochNanoseconds(value: bigint);
    /**
     * a getter for the minutesAfterMidnight
     */
    get minutesAfterMidnight(): number;
    /**
     * a setter for the minutesAfterMidnight, number is truncated.
     */
    set minutesAfterMidnight(value: number);
    /**
     * a getter for the timezoneId
     */
    get timezoneId(): string;
    /**
     * a setter for the timezoneId
     */
    set timezoneId(value: string);
    /**
     * a getter for the Date representation of this instance
     */
    get date(): Date;
    /**
     * a setter for the Date representation of this instance
     */
    set date(value: Date | unknown);
    /**
     * Returns a string representation of the date-time, including timezone offset and ID.
     * Format (php): "D M d Y H:i:s \U\T\CO (e)" (e.g., "Fri Apr 18 2025 00:00:00 UTC+0000 (UTC)").
     * @returns The formatted string.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.toString()); // "Fri Apr 18 2025 00:00:00 UTC+0000 (UTC)"
     */
    toString(this: Datetime_global): string;
    /**
     *
     * Returns the timestamp in milliseconds since the epoch (January 1, 1970, 00:00:00 UTC).
     * @returns The milliseconds since the epoch.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.valueOf()); // 1745193600000
     * @alias valueOf returning milliseconds since the epoch.
     */
    getTime(this: Datetime_global): number;
    /**
     * Returns the timestamp in milliseconds since the epoch (January 1, 1970, 00:00:00 UTC).
     * @returns The milliseconds since the epoch.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.valueOf()); // 1745193600000
     */
    valueOf(this: Datetime_global): number;
    /**
     * Sets the timestamp, modifying the instance in place. Use the `Datetime_global` constructor instead.
     * @param timestamp - Nanoseconds (bigint) or milliseconds (number) since the epoch.
     * @returns The new timestamp in milliseconds since the epoch.
     * @example
     * const dt = new Datetime_global();
     * dt.setTime(1745193600000);
     * console.log(dt.toISOString()); // "2025-04-18T00:00:00.000Z"
     */
    setTime(this: Datetime_global, timestamp: number): number;
    /**
     * Returns an HTML <time> element with the date-time in the browser's local timezone.
     * The datetime attribute is in ISO 8601 format (UTC).
     * @returns The HTML string (e.g., "<time datetime='2025-04-18T00:00:00.000Z'>Fri Apr 18 2025 00:00:00 UTC</time>").
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.toHTML()); // Depends on local timezone
     */
    toHTML(this: Datetime_global): string;
    /**
     * Returns an HTML `<time>` element string representing the current datetime in GMT (UTC) format.
     *
     * The `datetime` attribute is set using the ISO 8601 string (`Date.prototype.toISOString()`),
     * and the inner text of the element is the UTC string (`Date.prototype.toUTCString()`).
     *
     * This is useful for embedding machine-readable and human-readable timestamps in HTML,
     * ensuring proper formatting and time zone clarity.
     *
     * @this {Datetime_global} The `Datetime_global` instance containing the time value.
     * @returns {string} A string containing the `<time>` HTML element with GMT time.
     */
    toHTML_GMT(this: Datetime_global): string;
    /**
     * Converts the internal datetime value to a UTC string representation.
     *
     * This method provides a standardized, human-readable string of the datetime
     * in UTC, following the format produced by
     * It is primarily intended for display purposes
     * where a clear, unambiguous representation of the time in UTC is required.
     *
     * #### Example
     * ```js
     * const dt = new Datetime_global(...);
     * console.log(dt.toUTCString());
     * // Output: "Mon, 09 Jun 2025 12:00:00 UTC"
     * ```
     *
     * @method toGMTString
     * @memberof Datetime_global
     * @instance
     * @returns {string} A UTC-formatted date string.
     * @note php 'D, d M Y H:i:s \\U\\T\\C'
     */
    toHTML_UTC(this: Datetime_global): string;
    /**
     * Returns an HTML <time> element with the date-time formatted in the instance's timezone.
     * The datetime attribute is in ISO 8601 format (UTC).
     * @returns The HTML string.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.toHTMLString());
     * // "<time datetime='2025-04-18T00:00:00.000Z'>Fri Apr 18 2025 00:00:00 UTC+0000 (UTC)</time>"
     */
    toHTMLString(this: Datetime_global): string;
    /**
     * converts this Datetime_global to Date
     * @returns {Date} the Date with millisecond precision. sub millisecond precision is lost
     */
    toDate(this: Datetime_global): Date;
    /**
     * Creates a new Datetime_global in the specified timezone, preserving the instant in time.
     * @param timezoneId - A Temporal.TimeZoneLike or IANA timezone string (e.g., "UTC", "America/New_York").
     * @returns A new Datetime_global instance.
     * @throws TypeError if timezoneId is invalid.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.toTimezone("Asia/Tokyo").toString());
     * // "Fri Apr 18 2025 09:00:00 UTC+0900 (Asia/Tokyo)"
     */
    toTimezone(this: Datetime_global, timezoneId: Temporal.TimeZoneLike): Datetime_global;
    /**
     * Creates a new Datetime_global in the specified timezone, preserving the instant in time.
     * @param timezoneId - A Temporal.TimeZoneLike or IANA timezone string (e.g., "UTC", "America/New_York").
     * @alias toTimezone
     */
    withTimezone(this: Datetime_global, timezoneId: Temporal.TimeZoneLike): Datetime_global;
    /**
     * Returns the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday).
     *
     * will convert to the iso8601 calendar
     * @returns The day of the week (0-6).
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC"); // Friday
     * console.log(dt.getDay()); // 5
     */
    getDay(this: Datetime_global): number;
    /**
     * Returns the year minus 1900 (e.g., 2025 -> 125) only iso8601 calendar.
     * @returns The year minus 1900.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.getYear()); // 125
     */
    getYear(this: Datetime_global): number;
    /**
     * Returns the full four-digit year (e.g., 2025).
     * @returns The year.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.getFullYear()); // 2025
     */
    getFullYear(this: Datetime_global): number;
    /**
     * Returns the month (0 = January, 1 = February, ..., 11 = December).
     * @returns The month (0-11).
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.getMonth()); // 3
     */
    getMonth(this: Datetime_global): number;
    /**
     * Returns the day of the month (1-31).
     * @returns The day of the month.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.getDate()); // 18
     */
    getDate(this: Datetime_global): number;
    /**
     * Returns the hour (0-23).
     * @returns The hour.
     * @example
     * const dt = new Datetime_global("2025-04-18T15:00:00Z", "UTC");
     * console.log(dt.getHours()); // 15
     */
    getHours(this: Datetime_global): number;
    /**
     * Returns the minute (0-59).
     * @returns The minute.
     * @example
     * const dt = new Datetime_global("2025-04-18T15:30:00Z", "UTC");
     * console.log(dt.getMinutes()); // 30
     */
    getMinutes(this: Datetime_global): number;
    /**
     * Returns the second (0-59).
     * @returns The second.
     * @example
     * const dt = new Datetime_global("2025-04-18T15:30:45Z", "UTC");
     * console.log(dt.getSeconds()); // 45
     */
    getSeconds(this: Datetime_global): number;
    /**
     * Returns the millisecond (0-999).
     * @returns The millisecond.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00.123Z", "UTC");
     * console.log(dt.getMilliseconds()); // 123
     */
    getMilliseconds(this: Datetime_global): number;
    /**
     * Sets the year, optionally month and day, modifying the instance in place.
     * Handles overflow/underflow by rolling over to adjacent months/years.
     * @param fullYear - The year (e.g., 2025).
     * @param month - The month (0-11; optional, defaults to current month).
     * @param date - The day of the month (1-31; optional, defaults to current day).
     * @returns The new timestamp in milliseconds since the epoch.
     * @throws Error if excessive overflow causes recursion limit to be reached.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * dt.setFullYear(2026);
     * console.log(dt.toISOString()); // "2026-04-18T00:00:00.000Z"
     */
    setFullYear(this: Datetime_global, fullYear: number, month?: number, date?: number): number;
    /**
     * Returns the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday) in UTC.
     * @returns The day of the week (0-6).
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC"); // Friday
     * console.log(dt.getUTCDay()); // 5
     */
    getUTCDay(this: Datetime_global): number;
    /**
     * Returns the year minus 1900 (e.g., 2025 -> 125) in UTC.
     *
     * will convert to Date's calendar
     * @returns The year minus 1900. in UTC
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.getYear()); // 125
     */
    getUTCYear(this: Datetime_global): number;
    /**
     * Returns the year in UTC.
     *
     * will convert to Date's calendar
     * @returns The year minus in UTC
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.getUTCFullYear()); // 2025
     */
    getUTCFullYear(this: Datetime_global): number;
    /**
     * Returns the month (0 = January, 1 = February, ..., 11 = December) in utc.
     *
     * will convert to Date's calendar
     * @returns The month (0-11) in utc.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.getMonth()); // 3
     */
    getUTCMonth(this: Datetime_global): number;
    /**
     * Returns the day of the month (1-31) in utc.
     *
     * will convert to Date's calendar
     * @returns The day of the month in utc.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.getDate()); // 18
     */
    getUTCDate(this: Datetime_global): number;
    /**
     * Returns the hour (0-23) in utc.
     *
     * will convert to Date's calendar
     * @returns The hour in utc.
     * @example
     * const dt = new Datetime_global("2025-04-18T15:00:00Z", "UTC");
     * console.log(dt.getHours()); // 15
     */
    getUTCHours(this: Datetime_global): number;
    /**
     * Returns the minute (0-59) in utc.
     *
     * will convert to Date's calendar
     * @returns The minute in utc.
     * @example
     * const dt = new Datetime_global("2025-04-18T15:30:00Z", "UTC");
     * console.log(dt.getMinutes()); // 30
     */
    getUTCMinutes(this: Datetime_global): number;
    /**
     * Returns the second (0-59) in utc.
     *
     * will convert to Date's calendar
     * @returns The second in utc.
     * @example
     * const dt = new Datetime_global("2025-04-18T15:30:45Z", "UTC");
     * console.log(dt.getSeconds()); // 45
     */
    getUTCSeconds(this: Datetime_global): number;
    /**
     * Returns the millisecond (0-999) in utc.
     *
     * will convert to Date's calendar
     * @returns The millisecond in utc.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00.123Z", "UTC");
     * console.log(dt.getMilliseconds()); // 123
     */
    getUTCMilliseconds(this: Datetime_global): number;
    /**
     * Returns the timezone offset in minutes (positive for west of UTC, negative for east).
     * @returns The offset in minutes.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "America/New_York");
     * console.log(dt.getTimezoneOffset()); // 240 (4 hours west)
     */
    getTimezoneOffset(this: Datetime_global): number;
    /**
     * Returns the date-time as an ISO 8601 string with timezone (e.g., "2025-04-18T00:00:00+00:00[UTC]").
     * @returns The ISO 8601 string.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.toJSON()); // "2025-04-18T00:00:00+00:00[UTC]"
     */
    toJSON(this: Datetime_global): string;
    /**
     * Sets the year, optionally month and day, in UTC, modifying the instance in place.
     *
     * will convert to Date's calendar
     * @param fullYear - The year (e.g., 2025).
     * @param month - The month (0-11; optional, defaults to current UTC month).
     * @param date - The day of the month (1-31; optional, defaults to current UTC day).
     * @returns The new timestamp in milliseconds since the epoch.
     * @throws RangeError if the components form an invalid date.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * dt.setUTCFullYear(2026);
     * console.log(dt.toISOString()); // "2026-04-18T00:00:00.000Z"
     */
    setUTCFullYear(this: Datetime_global, fullYear: number, month?: number, date?: number): number;
    /**
     * Sets the hours, optionally minutes, seconds, and milliseconds, in UTC, modifying the instance in place.
     * Handles overflow/underflow by rolling over to adjacent days.
     *
     * will convert to Date's calendar
     * @param hours - The hours (e.g., 0-23; 25 rolls over to next day's 1:00).
     * @param minutes - The minutes (0-59; optional, defaults to current UTC minutes).
     * @param seconds - The seconds (0-59; optional, defaults to current UTC seconds).
     * @param milliseconds - The milliseconds (0-999; optional, defaults to current UTC milliseconds).
     * @returns The new timestamp in milliseconds since the epoch.
     * @throws RangeError if the components form an invalid date.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * dt.setUTCHours(15);
     * console.log(dt.toISOString()); // "2025-04-18T15:00:00.000Z"
     */
    setUTCHours(this: Datetime_global, hours: number, minutes?: number, seconds?: number, milliseconds?: number): number;
    /**
     * Returns the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday).
     * @alias getDay
     * @returns The day of the week (0-6).
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC"); // Friday
     * console.log(dt.getDayNumberWeek()); // 5
     */
    getDayNumberWeek(this: Datetime_global): number;
    /**
     * Returns the day of the month (1-31).
     * @alias getDate.
     * @returns The day of the month.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.getDayNumberMonth()); // 18
     */
    getDayNumberMonth(this: Datetime_global): number;
    /**
     * Returns the day of the month (1-31).
     * @alias getDate
     * @returns The day of the month.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.getDayNumberMonth()); // 18
     */
    getDayNumber(this: Datetime_global): number;
    /**
     * Returns the abbreviated weekday name (e.g., "Mon", "Tue") in en-US locale.
     * @returns The weekday name. (oneOf "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" )
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC"); // Friday
     * console.log(dt.getDayName()); // "Fri"
     */
    getDayName(this: Datetime_global): "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
    /**
     * Returns the abbreviated month name (e.g., "Jan", "Feb") in en-US locale.
     * @returns The month name. (oneOf "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec")
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.getMonthName()); // "Apr"
     */
    getMonthName(this: Datetime_global): "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";
    /**
     * Returns the full month name (e.g., "January", "February") in en-US locale.
     * @returns The full month name. (oneOf "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December")
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.getFullMonthName()); // "April"
     */
    getFullMonthName(this: Datetime_global): "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
    /**
     * Returns the full weekday name (e.g., "Monday", "Tuesday") in en-US locale.
     * @returns The weekday name. (OneOf "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday")
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC"); // Friday
     * console.log(dt.getFullDayName()); // "Friday"
     */
    getFullDayName(this: Datetime_global): "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
    /**
     * returns the true day of week arcording to the specified calendar
     */
    getDayOfWeek(this: Datetime_global): number;
    /**
     * Sets the nanoseconds and optionally microseconds, modifying the instance in place.
     * Preserves other date-time components.
     * @param nanoseconds - The nanoseconds to set (default 0).
     * @param microseconds - The microseconds to set (optional, defaults to current microseconds).
     * @returns The new timestamp in nanoseconds since the epoch.
     * @throws TypeError if inputs are not bigints.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * dt.setNanoseconds(500n);
     * console.log(dt.getNanoseconds()); // 500n
     */
    setNanoseconds(this: Datetime_global, nanoseconds: bigint, microseconds?: bigint): bigint;
    /**
     * Returns the nanosecond and microseconds component of the date-time (0-999).
     * @returns The nanoseconds and microseconds as a bigint.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00.000000500Z", "UTC");
     * console.log(dt.getNanoseconds()); // 500n
     */
    getNanoseconds(this: Datetime_global): bigint;
    /**
     * Returns the nanosecond and microseconds component of the date-time (0-999).
     * @returns The nanoseconds and microseconds as a bigint.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00.000000500Z", "UTC");
     * console.log(dt.getNanoseconds()); // 500n
     * @alias getNanoseconds
     */
    getUTCNanoseconds(this: Datetime_global): bigint;
    /**
     * Returns the date-time as an ISO 8601 string in UTC (e.g., "2025-04-18T12:34:56.789Z").
     * Matches Date.prototype.toISOString, with millisecond precision.
     * @returns A string in ISO 8601 format.
     */
    toISOString(this: Datetime_global): string;
    /**
     * Returns the internal `Temporal.ZonedDateTime` instance.
     * @returns The `Temporal.ZonedDateTime`.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.toTemporalZonedDateTime().toString());
     * // "2025-04-18T00:00:00+00:00[UTC]"
     */
    toTemporalZonedDateTime(): Temporal.ZonedDateTime;
    /**
     * Sets the month, optionally day, modifying the instance in place.
     * Handles overflow/underflow by rolling over to adjacent months/years.
     * @param month - The month (0-11).
     * @param date - The day of the month (1-31; optional, defaults to current day).
     * @returns The new timestamp in milliseconds since the epoch.
     * @throws Error if excessive overflow causes recursion limit to be reached.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * dt.setMonth(5); // June
     * console.log(dt.toISOString()); // "2025-06-18T00:00:00.000Z"
     */
    setMonth(this: Datetime_global, month: number, date?: number): number;
    /**
     * Sets the day of the month, modifying the instance in place.
     * Handles overflow/underflow by rolling over to adjacent months.
     * @param date - The day of the month (1-31).
     * @returns The new timestamp in milliseconds since the epoch.
     * @throws Error if excessive overflow causes recursion limit to be reached.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * dt.setDate(19);
     * console.log(dt.toISOString()); // "2025-04-19T00:00:00.000Z"
     */
    setDate(this: Datetime_global, date: number): number;
    /**
     * Sets the hours, minutes, seconds, and milliseconds, modifying the object in place.
     * Handles overflow/underflow by rolling over to the next or previous day/month/year.
     * Sub-millisecond precision (microseconds, nanoseconds) is preserved.
     * @param hours - The hours to set (e.g., 0-23; 25 rolls over to next day's 1:00).
     * @param minutes - The minutes to set (0-59; optional, defaults to current minutes).
     * @param seconds - The seconds to set (0-59; optional, defaults to current seconds).
     * @param milliseconds - The milliseconds to set (0-999; optional, defaults to current milliseconds).
     * @returns The new timestamp in milliseconds since the epoch.
     * @throws Error if excessive overflow causes forever loop to be reached.
     * @throws TypeError if inputs are non-numeric.
     */
    setHours(this: Datetime_global, hours: number, minutes?: number, seconds?: number, milliseconds?: number): number;
    /**
     * Sets the minutes, optionally seconds and milliseconds, modifying the instance in place.
     * Handles overflow/underflow by rolling over to adjacent hours/days.
     * @param minutes - The minutes (0-59).
     * @param seconds - The seconds (0-59; optional, defaults to current seconds).
     * @param milliseconds - The milliseconds (0-999; optional, defaults to current milliseconds).
     * @returns The new timestamp in milliseconds since the epoch.
     * @throws Error if excessive overflow causes recursion limit to be reached.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * dt.setMinutes(45);
     * console.log(dt.toISOString()); // "2025-04-18T00:45:00.000Z"
     */
    setMinutes(this: Datetime_global, minutes: number, seconds?: number, milliseconds?: number): number;
    /**
     * Sets the seconds, optionally milliseconds, modifying the instance in place.
     * Handles overflow/underflow by rolling over to adjacent minutes/hours.
     * @param seconds - The seconds (0-59).
     * @param milliseconds - The milliseconds (0-999; optional, defaults to current milliseconds).
     * @returns The new timestamp in milliseconds since the epoch.
     * @throws Error if excessive overflow causes recursion limit to be reached.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * dt.setSeconds(45);
     * console.log(dt.toISOString()); // "2025-04-18T00:00:45.000Z"
     */
    setSeconds(this: Datetime_global, seconds: number, milliseconds?: number): number;
    /**
     * Sets the milliseconds, modifying the instance in place.
     * Handles overflow/underflow by rolling over to adjacent seconds.
     * @param milliseconds - The milliseconds (0-999).
     * @returns The new timestamp in milliseconds since the epoch.
     * @throws Error if excessive overflow causes recursion limit to be reached.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * dt.setMilliseconds(500);
     * console.log(dt.toISOString()); // "2025-04-18T00:00:00.500Z"
     */
    setMilliseconds(this: Datetime_global, milliseconds: number): number;
    /**
     * applies the UTC time to the `Datetime_global`
     *
     * @returns {Datetime_global}
     */
    toUTCTimezone(this: Datetime_global): Datetime_global;
    /**
     * applies the system's LocalTime to the `Datetime_global`
     *
     * @returns {Datetime_global}
     */
    toLocalTime(this: Datetime_global): Datetime_global;
    /**
     * @see Temporal.ZonedDateTime.toLocaleString
     * @param locales
     * @param options
     */
    toLocaleString(locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined): string;
    /**
     * Formats the date-time using a PHP-like format pattern with placeholders (e.g., `Y`, `m`, `d`).
     * Supports special patterns (e.g., `[toMYSQLi]`) and escaped characters (e.g., `\Y`).
     * @param pattern - The format string with placeholders or special patterns.
     * @returns The formatted date-time string.
     * @throws Error if the `o` placeholder (ISO-8601 year) is used.
     * @example
     * const dt = new Datetime_global(new Date(2025, 3, 18), "UTC");
     * dt.format("Y-m-d H:i:s"); // "2025-04-18 00:00:00"
     * dt.format("[toMYSQLi]"); // "2025-04-18 00:00:00"
     * dt.format("D, Y-m-d H:i:s.u \\U\\T\\CO (e)"); // "Fri, 2025-04-18 00:00:00.000000 UTC+0000 (UTC)"
     * @see https://www.php.net/manual/en/datetime.format.php for placeholder details.
     */
    format(this: Datetime_global, pattern: string): string;
    /**
     * changes the calendar
     * @param calender defaults to "iso8601"
     */
    withCalender(this: Datetime_global, calender?: Temporal.CalendarLike): Datetime_global;
    /**
     * Returns a new Datetime_global instance set to the start of the current day (00:00:00.000000000) in the same timezone.
     * @returns A new Datetime_global instance.
     * @example
     * const dt = new Datetime_global(new Date(2025, 4, 18, 15, 30), "UTC");
     * dt.startOfDay().toISOString(); // "2025-04-18T00:00:00.000Z"
     */
    startOfDay(this: Datetime_global, timezone?: Temporal.TimeZoneLike): Datetime_global;
    /**
     * Formats the date-time using a template literal, where placeholders are processed by the format method.
     * @param strings - The literal parts of the template string.
     * @param expressions - The placeholders to be formatted (e.g., "Y", "m", "d").
     * @returns The formatted string.
     * @throws Error if a placeholder is invalid (e.g., "o").
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * console.log(dt.templateFormat`Date: ${"Y"}-${"m"}-${"d"}`);
     * // "Date: 2025-04-18"
     */
    templateFormat(this: Datetime_global, strings: TemplateStringsArray, ...expressions: unknown[]): string;
    /**
     * Creates a new Datetime_global instance with the same date-time and timezone.
     * @returns A new Datetime_global instance.
     * @example
     * const dt = new Datetime_global("2025-04-18T00:00:00Z", "UTC");
     * const clone = dt.clone();
     * console.log(clone.toISOString()); // "2025-04-18T00:00:00.000Z"
     */
    clone(this: Datetime_global): Datetime_global;
    /**
     * Retrieves the timezone identifier for this Datetime_global instance.
     *
     * @returns {string} The timezone identifier (e.g., "America/New_York") associated with the Temporal.ZonedDateTime instance.
     */
    getTimezoneId(this: Datetime_global): string;
    getTimestamp(this: Datetime_global): bigint;
    until(this: Datetime_global, other: constructorInput, options: any): ZDTDuration;
    since(this: Datetime_global, other: constructorInput, options: any): ZDTDuration;
    toGMTString(this: Datetime_global): string;
    toUTCString(this: Datetime_global): string;
    toDateString(this: Datetime_global): string;
    toTimeString(this: Datetime_global): string;
    toHTMLHistoryString(this: Datetime_global): string;
    /**
     * sets the month based on `Date.prototype.setUTCFullYear`
     * @param month the zero indexed month (0 to 11)
     * @param date the day of the month.
     */
    setUTCMonth(this: Datetime_global, month: number, date?: number): number;
    /**
     * sets the day based on `Date.prototype.setUTCFullYear`
     * @param date the day of the month.
     */
    setUTCDate(this: Datetime_global, date: number): number;
    /**
     * sets the minutes based on `Date.prototype.setUTCHours`
     * @param minutes the minutes (0 to 59)
     * @param seconds the seconds (0 to 59)
     * @param milliseconds the milliseconds (0 to 999)
     */
    setUTCMinutes(this: Datetime_global, minutes: number, seconds?: number, milliseconds?: number): number;
    /**
     * sets the seconds based on `Date.prototype.setUTCHours`
     * @param seconds the seconds (0 to 59)
     * @param milliseconds the milliseconds (0 to 999)
     */
    setUTCSeconds(this: Datetime_global, seconds: number, milliseconds?: number): number;
    toHTMLFormatted(dtg: Datetime_global, format: string): string;
};
export interface Datetime_global_constructor {
    prototype: Datetime_global;
    [Symbol.toStringTag]: string;
    hostLocalTimezone(): string;
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
    new (from?: constructorInput, timezoneId?: Temporal.TimeZoneLike | string | undefined): Datetime_global;
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
    (from?: constructorInput, timezoneId?: Temporal.TimeZoneLike | string | undefined): string;
    /**
     * Parses a string into a Temporal.ZonedDateTime using strict ISO 8601 parsing.
     * @param string - An ISO 8601 string (e.g., "2025-04-18T00:00:00Z") or object with date-time fields.
     * @returns A Temporal.ZonedDateTime instance.
     * @throws RangeError if the string is invalid or cannot be parsed.
     * @example
     * const zdt = Datetime_global.parse_strict("2025-04-18T00:00:00Z");
     * console.log(zdt.toString()); // "2025-04-18T00:00:00+00:00[UTC]"
     */
    parse_strict(string: string): Temporal.ZonedDateTime;
    /**
     * see `Date.parse`
     * @param dateString
     * @param this_parserOnly
     */
    parse(dateString: string, this_parserOnly: boolean): number;
    /**
     * Returns the current timestamp as nanoseconds since the epoch (January 1, 1970, 00:00:00 UTC).
     * @returns The nanoseconds since the epoch.
     * @example
     * console.log(Datetime_global.now()); // e.g., 1745193600000000000n
     */
    now(): bigint;
    /**
     * Returns the current timestamp in milliseconds since the epoch, with sub-second components (milliseconds, microseconds, nanoseconds) set to 0.
     * @returns The milliseconds since the epoch.
     * @example
     * console.log(Datetime_global.zeroms()); // e.g., 1745193600000
     */
    zeroms(): number;
    /**
     * Returns the current timestamp in nanoseconds since the epoch, with sub-second components (milliseconds, microseconds, nanoseconds) set to 0.
     * @returns The nanoseconds since the epoch.
     * @example
     * console.log(Datetime_global.zerons()); // e.g., 1745193600000000000n
     */
    zerons(): bigint;
    /**
     * Returns the current timestamp as nanoseconds since the epoch (January 1, 1970, 00:00:00 UTC).
     * @returns The nanoseconds since the epoch.
     * @example
     * console.log(Datetime_global.now()); // e.g., 1745193600000000000n
     */
    nowInTimezone(timezone?: Temporal.TimeZoneLike): Datetime_global;
    /**
     * Creates a UTC timestamp from date-time components, returning nanoseconds since the epoch.
     * @param year - The year (0-99 maps to 1900-1999; otherwise used as-is). if it's a string the `Date.parse` is used
     * @param month - The month (0-11; default 0, January).
     * @param date - The day of the month (1-31; default 1).
     * @param hour - The hour (0-23; default 0).
     * @param minute - The minute (0-59; default 0).
     * @param second - The second (0-59; default 0).
     * @param millisecond - The millisecond (0-999; default 0).
     * @param nanosecond - The nanosecond (default 0).
     * @returns The nanoseconds since the epoch (January 1, 1970, 00:00:00 UTC).
     * @throws RangeError if the components form an invalid date.
     * @example
     * // April 18, 2025, 00:00:00 UTC
     * console.log(Datetime_global.fromComponentsUTC(2025, 3, 18));
     * // 1745193600000000000n
     *
     * // With nanoseconds
     * console.log(Datetime_global.fromComponentsUTC(2025, 3, 18, 0, 0, 0, 0, 500));
     * // 1745193600000000500n
     */
    fromComponentsUTC(year: number | string | undefined, month: number, date: number, hour: number, minute: number, second: number, millisecond: number, nanosecond: bigint | number): bigint;
    /**
     * Formats a timezone offset in minutes as a UTC string (e.g., "UTC+0000").
     * @param offset - The offset in minutes (positive for west of UTC, negative for east).
     * @returns The formatted offset string.
     * @example
     * console.log(Datetime_global.getUTCOffset(240)); // "UTC-0400"
     */
    getUTCOffset(offset: number): string;
    /**
     * Updates the innerText of HTML <time> elements with formatted date-time strings.
     * Uses the `data-datetime-global-format` attribute for the format (default: "D M d Y H:i:s \U\T\CO (e)")
     * and `data-iana-timezone` for the timezone (default: local timezone).
     * @param timetags - A NodeList or Array of HTMLTimeElement.
     * @throws RangeError if a time element's dateTime attribute is invalid.
     * @example
     * // HTML: <time datetime="2025-04-18T00:00:00Z" data-datetime-global-format="[offsetFromNow]"></time>
     * Datetime_global.htmlToCurrentTime(document.querySelectorAll('time'));
     * // Updates innerText to e.g., "in 5 days"
     */
    htmlToCurrentTime(timetags: NodeListOf<HTMLTimeElement> | HTMLTimeElement[]): void;
    FORMAT_DATETIME_GLOBALV3: string;
    FORMAT_DATETIME_GLOBALV2: string;
    FORMAT_DATETIME_GLOBALV1: string;
    FORMAT_DATEV1: string;
    FORMAT_HEADER_DEFAULT: string;
    FORMAT_MYSQLI: string;
    FORMAT_B: string;
    FORMAT_ISO8601: string;
    FORMAT_MYSQL: string;
    FORMAT_RFC2822: string;
    FORMAT_SHORT_DATE: string;
    FORMAT_LONG_DATE: string;
    FORMAT_SHORT_DATE_TIME: string;
    FORMAT_FULL_DATE_TIME: string;
    FORMAT_OFFSET_FROM_NOW: string;
    daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    monthnames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    daynamesFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    monthnamesFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    compare(zonedDatetime1: constructorInput, zonedDatetime2: constructorInput): number;
}
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
export declare const Datetime_global: Datetime_global_constructor;
type overflow_overwrite = {
    day?: number;
    year?: number;
    month?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
    microsecond?: number;
    nanosecond?: number;
};
export declare function htmlencode(string: string): string;
/**
 * Formats the time difference between now and the given date as a human-readable string.
 * @param date The timestamp (in milliseconds) to compare against the current time.
 * @returns A string like "now", "in 30 seconds", or "5 minutes ago".
 */
export declare const formatOffsetFromNow: (date: Date) => string;
/**
 * @deprecated
 * @param string
 */
export declare const noFormat: (string: any) => string;
export declare const plainToZoned: (tempTime: Datetime_global | Date | Temporal.ZonedDateTime | Temporal.Instant | Temporal.PlainDateTime | Temporal.PlainDate | Temporal.PlainYearMonth | Temporal.PlainTime) => Datetime_global;
export declare const nullStyle: unique symbol;
export type nullStyle = typeof nullStyle;
export declare const undefinedFormat: unique symbol;
export type undefinedFormat = typeof undefinedFormat;
export declare const toSwatchInternetTime: (date: Date | number | string) => string;
export declare const ordinalSuffix: (value: number | bigint) => string;
/**
 * @deprecated
 * @param value
 * @param type
 */
export declare function toNumeric(value: any, type?: 'BigInt' | 'Number' | null): bigint | number | null;
/**
 * Adjusts a `Temporal.ZonedDateTime` or `Datetime_global` object by applying overflow or underflow changes
 * to its date and time components based on the provided `overflow_overwrite` values.
 *
 * @param zonedDateTime - The input date-time object, either as a `Datetime_global` with a `time` property
 *                        of type `Temporal.ZonedDateTime` or directly as a `Temporal.ZonedDateTime`.
 * @param overflow_overwrite - An object specifying the date and time fields to overwrite. Any unspecified
 *                             fields will retain their original values from `zonedDateTime`.
 * @param overflow_overwrite.year - The year to set, or `undefined` to keep the original.
 * @param overflow_overwrite.month - The month to set (1-12), or `undefined` to keep the original.
 * @param overflow_overwrite.day - The day to set (1-31), or `undefined` to keep the original.
 * @param overflow_overwrite.hour - The hour to set (0-23), or `undefined` to keep the original.
 * @param overflow_overwrite.minute - The minute to set (0-59), or `undefined` to keep the original.
 * @param overflow_overwrite.second - The second to set (0-59), or `undefined` to keep the original.
 * @param overflow_overwrite.millisecond - The millisecond to set (0-999), or `undefined` to keep the original.
 * @param overflow_overwrite.microsecond - The microsecond to set (0-999), or `undefined` to keep the original.
 * @param overflow_overwrite.nanosecond - The nanosecond to set (0-999), or `undefined` to keep the original.
 *
 * @returns A new `Temporal.ZonedDateTime` object with the adjusted date and time, accounting for overflow
 *          or underflow as calculated from the differences between the provided and original values.
 *
 * @example
 * ```typescript
 * const zonedDateTime = new Temporal.ZonedDateTime(
 *   2023n, 10n, 15n, 12n, 0n, 0n, 0n, 0n, 0n, 'America/New_York'
 * );
 * const overflow = { year: 2024, month: 12 };
 * const result = overflowDatetime_global({ time: zonedDateTime }, overflow);
 * // Returns a new ZonedDateTime with year 2024 and month 12, other fields unchanged.
 * ```
 */
export declare function overflowDatetime_global(zonedDateTime: {
    time: Temporal.ZonedDateTime;
} | Datetime_global, overflow_overwrite: overflow_overwrite): Temporal.ZonedDateTime;
export declare function padNumber(number: number | bigint, zeros?: number): string;
export declare function validateTimezone(timezoneId: string, rethrowIfInvalid?: boolean): {
    valid: true;
    error: null;
} | {
    valid: false;
    error: RangeError | TypeError;
};
export {};
//# sourceMappingURL=Datetime_global.d.ts.map