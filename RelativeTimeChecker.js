import { Temporal } from "temporal-polyfill";
import { Datetime_global } from "./Datetime_global.js";
// TimeElement, DT_HTML_Formatter, ClockTime, and RelativeTime
function setDatetime(datetime, element, setAttribute = true) {
    let attribute;
    if (datetime === null) {
        attribute = null;
        if (setAttribute)
            element.removeAttribute('datetime');
    }
    else if (datetime instanceof Temporal.ZonedDateTime) {
        attribute = (new Date(datetime.epochMilliseconds)).toISOString();
        if (setAttribute)
            element.setAttribute('timezone', datetime.timeZoneId);
    }
    else if (datetime instanceof Datetime_global) {
        attribute = datetime.toISOString();
    }
    else if (datetime instanceof Date) {
        attribute = datetime.toISOString();
    }
    else if (datetime instanceof Temporal.Instant) {
        attribute = new Date(datetime.epochMilliseconds).toISOString();
    }
    else if (typeof datetime === 'string' || typeof datetime === 'number') {
        console.warn('please do not assign dateTime with a number or string');
        // toISOString throws on invalid dates.
        attribute = (new Date(datetime)).toISOString();
    }
    else {
        throw new TypeError('dateTime must be set using a Date, Temporal.ZonedDateTime, Datetime_global, string, or number');
    }
    if (attribute === null)
        return null;
    if (setAttribute)
        element.setAttribute('datetime', attribute);
    return attribute;
}
/**
 * for inheritance only
 */
export class TimeElement extends HTMLElement {
    /**
     * sets the `datetime` and possibly `timezone` attribute to the new timestamp of the param.
     * @param newValue a Date, Temporal.ZonedDateTime, Datetime_global, string, or number.
     */
    set dateTime(newValue) {
        setDatetime(newValue, this);
    }
    /**
     * a Date representing the `datetime` attribute or null.
     */
    get dateTime() {
        const date = this.getAttribute('datetime');
        if (date === null)
            return null;
        return new Date(date);
    }
    /**
     * sets the `timezone` attribute to the new timezone of the param.
     */
    set timezone(newValue) {
        if (newValue === null) {
            this.removeAttribute('timezone');
        }
        else if (newValue === undefined) {
            throw new TypeError('undefined is not a timezone');
        }
        else if (newValue === 'local') {
            this.setAttribute('timezone', Datetime_global.hostLocalTimezone());
        }
        else {
            // if the timezone is invalid an error is thrown, do not catch it, It's for the one doing the assignment.
            (new Datetime_global(Date.now(), newValue));
            this.setAttribute('timezone', newValue);
        }
    }
    /**
     * gets the `timezone` attribute of this element.
     */
    get timezone() {
        const timezone = this.getAttribute('timezone');
        if (timezone === 'local')
            return Datetime_global.hostLocalTimezone();
        return timezone;
    }
    /**
     * gets a `Datetime_global` representing the `datetime` attribute or null. throws when the `timezone` is invalid.
     */
    get datetime_global() {
        const datetime = this.getAttribute('datetime');
        const timezone = this.getAttribute('timezone');
        if (datetime === null)
            return null;
        if (timezone === 'local') {
            return new Datetime_global(datetime, Datetime_global.hostLocalTimezone());
        }
        else {
            return new Datetime_global(datetime, timezone ?? 'UTC');
        }
    }
    /**
     * gets a `Temporal.ZonedDateTime` representing the `datetime` attribute or null. throws when the `timezone` is invalid.
     */
    get zonedDateTime() {
        return this.datetime_global?.toTemporalZonedDateTime() ?? null;
    }
}
/**
 * for inheritance only
 */
export class DT_HTML_Formatter extends TimeElement {
    #callback = undefined;
    formatDT(defaultFormatter) {
        const zdt = this.datetime_global;
        if (zdt === null)
            return "Invalid Date";
        const callback = this.#callback;
        const result = Function.prototype.call.call(callback ?? defaultFormatter ??
            (m => String(m)), zdt, zdt, this);
        if (typeof result === 'string')
            return result;
        else {
            throw new TypeError('the callback did not return a string');
        }
    }
    set formatCallback(value) {
        if (value === undefined)
            this.#callback = undefined;
        else if (typeof value === 'function') {
            this.#callback = value;
        }
        else {
            throw new TypeError('your provided formatCallback wasnt a function.');
        }
    }
    get formatCallback() {
        return this.#callback;
    }
}
/**
 * A custom HTML element that displays a formatted absolute time.
 *
 * @element clock-time
 * @attr {string} datetime - The date/time string to display.
 * @attr {string} format - The output format string (default: 'Y-m-d H:i:s'). Passed to Datetime_global's format method.
 * @attr {string} timezone - The timezone to use for formatting (default: 'UTC').
 *
 * Example usage:
 *   <clock-time datetime="2025-06-12T12:00:00Z" format="Y-m-d H:i" timezone="UTC"></clock-time>
 */
export class ClockTime extends DT_HTML_Formatter {
    /**
     * Returns the list of attributes to observe for changes.
     * @returns {string[]}
     */
    static get observedAttributes() {
        return ['datetime', 'format', 'timezone'];
    }
    /**
     * Called when the element is inserted into the DOM.
     * Triggers an initial update of the displayed time.
     * @returns {void}
     */
    connectedCallback() {
        this.updateTime();
    }
    /**
     * Called when an observed attribute changes.
     * @param {string} _name - The name of the attribute.
     * @param {string|null} _oldValue - The old value of the attribute.
     * @param {string|null} _newValue - The new value of the attribute.
     * @returns {void}
     */
    attributeChangedCallback(_name, _oldValue, _newValue) {
        this.updateTime();
    }
    /**
     * Updates the displayed time based on current attributes.
     * Handles invalid dates gracefully by displaying an error or the raw date string.
     * @returns {void}
     */
    updateTime() {
        const format = this.getAttribute('format') ?? Datetime_global.FORMAT_DATETIME_GLOBALV3;
        try {
            const textContent = this.formatDT(zdt => zdt.format(format)), dateTime = this.dateTime?.toISOString();
            if (dateTime === undefined) {
                // noinspection ExceptionCaughtLocallyJS
                throw new TypeError('no datetime set');
            }
            this.innerHTML = Object.assign(document.createElement('time'), { textContent, dateTime }).outerHTML;
        }
        catch (error) {
            this.textContent = "Invalid Date";
            throw error;
        }
    }
}
/**
 * A custom HTML element that displays a human-readable relative time.
 *
 * @element relative-time
 * @attr {string} datetime - The date/time string to compare to the current time.
 *
 * Example usage:
 *   <relative-time datetime="2025-06-12T12:00:00Z"></relative-time>
 */
export class RelativeTime extends DT_HTML_Formatter {
    /**
     * @private
     * @type {null|number}
     */
    _timer;
    /**
     * Returns the list of attributes to observe for changes.
     * @returns {string[]}
     */
    static get observedAttributes() {
        return ['datetime', 'precision'];
    }
    /**
     * Constructs a RelativeTime element, sets the ARIA role, and initializes the timer.
     */
    constructor() {
        super();
        this.setAttribute('role', 'time');
        this.setAttribute('aria-live', 'polite');
        this._timer = null;
    }
    /**
     * Called when the element is inserted into the DOM.
     * Triggers an initial update and starts a timer to refresh the relative time every second.
     * @returns {void}
     */
    connectedCallback() {
        this.updateTime();
        this.scheduleNextUpdate();
    }
    /**
     * Called when the element is removed from the DOM.
     * Clears the update timer.
     * @returns {void}
     */
    disconnectedCallback() {
        this.clearTimer();
    }
    /**
     * Called when an observed attribute changes.
     * @param _name - The name of the attribute.
     * @param _oldValue
     * @param _newValue
     * @returns {void}
     */
    attributeChangedCallback(_name, _oldValue, _newValue) {
        this.updateTime();
        this.scheduleNextUpdate();
    }
    clearTimer() {
        if (this._timer !== null) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }
    getDuration() {
        const datetime_global = this.datetime_global, timezone = datetime_global?.getTimezoneId(), now = (new Datetime_global(Datetime_global.now(), timezone)).toTemporalZonedDateTime(), zdt = datetime_global?.toTemporalZonedDateTime();
        if (zdt === undefined)
            return null;
        return zdt.until(now, {
            largestUnit: 'years', smallestUnit: 'seconds',
        });
    }
    updateTime() {
        const self = this;
        try {
            this.textContent = this.formatDT(function (zdt) {
                const precision = self.getAttribute('precision');
                if (precision === 'modern') {
                    const duration = self.getDuration();
                    if (duration) {
                        const value = toHumanString(duration, 2), format = function (value) {
                            if (duration.sign < 0)
                                return `in ${value}`;
                            return `${value} ago`;
                        };
                        return format(value);
                    }
                }
                return self.getRelativeTime(zdt.toDate());
            });
        }
        catch (error) {
            this.textContent = 'Invalid date';
            throw error;
        }
    }
    scheduleNextUpdate() {
        this.clearTimer();
        const date = this.dateTime;
        if (!date)
            return; // No valid datetime, no updates needed
        const absDiffInSeconds = Math.abs((Date.now() - date.getTime()) / 1000);
        // Determine the update interval based on the time difference
        let intervalMs;
        if (absDiffInSeconds >= 31536000) { // >1 year
            return; // No updates needed, relative time won't change soon
        }
        else if (absDiffInSeconds >= 2629746) { // >1 month
            intervalMs = 24 * 60 * 60 * 1000; // Update daily
        }
        else if (absDiffInSeconds >= 604800) { // >1 week
            intervalMs = 60 * 60 * 1000; // Update hourly
        }
        else if (absDiffInSeconds >= 3600) { // >1 hour
            intervalMs = 60 * 1000; // Update every minute
        }
        else if (absDiffInSeconds >= 60) { // >1 minute
            intervalMs = 1000; // Update every second
        }
        else { // <1 minute
            intervalMs = 10; // Update every second for near-real-time
        }
        this._timer = setTimeout(() => {
            this.updateTime();
            this.scheduleNextUpdate();
        }, intervalMs);
    }
    /**
     * Converts a Date object into a human-readable relative time string.
     * @param {Date} date - The date to compare to now.
     * @returns {string} A relative time string (e.g., "2 minutes ago", "in 3 weeks", "now").
     */
    getRelativeTime(date) {
        const now = Date.now();
        const diffInSeconds = Math.floor((now - +date) / 1000);
        const absDiff = Math.abs(diffInSeconds);
        // Helper function to format the output
        /**
         * Helper function to format time units.
         * @param {number} value
         * @param {string} unit
         * @returns {string}
         */
        const format = function (value, unit) {
            if (diffInSeconds < 0)
                return `in ${value} ${unit}`;
            return `${value} ${unit} ago`;
        };
        // Years
        if (absDiff >= 31536000) {
            const years = Math.floor(absDiff / 31536000);
            return format(years, years === 1 ? 'year' : 'years');
        }
        // Months (~30.44 days)
        if (absDiff >= 2629746) {
            const months = Math.floor(absDiff / 2629746);
            return format(months, months === 1 ? 'month' : 'months');
        }
        // Weeks
        if (absDiff >= 604800) {
            const weeks = Math.floor(absDiff / 604800);
            return format(weeks, weeks === 1 ? 'week' : 'weeks');
        }
        // Days
        if (absDiff >= 86400) {
            const days = Math.floor(absDiff / 86400);
            return format(days, days === 1 ? 'day' : 'days');
        }
        // Hours
        if (absDiff >= 3600) {
            const hours = Math.floor(absDiff / 3600);
            return format(hours, hours === 1 ? 'hour' : 'hours');
        }
        // Minutes
        if (absDiff >= 60) {
            const minutes = Math.floor(absDiff / 60);
            return format(minutes, minutes === 1 ? 'minute' : 'minutes');
        }
        // sub Seconds
        if (absDiff < 1)
            return 'now';
        // Seconds
        return format(absDiff, absDiff === 1 ? 'second' : 'seconds');
    }
}
class DurationTime extends HTMLElement {
    /**
     * Returns the list of attributes to observe for changes.
     * @returns {string[]}
     */
    static get observedAttributes() {
        return ['duration'];
    }
    /**
     * Constructs a ClockTime element and sets the ARIA role to "time".
     */
    constructor() {
        super();
        this.setAttribute('role', 'time');
    }
    /**
     * Called when the element is inserted into the DOM.
     * Triggers an initial update of the displayed time.
     * @returns {void}
     */
    connectedCallback() {
        this.updateTime();
    }
    /**
     * Called when an observed attribute changes.
     * @param {string} _name - The name of the attribute.
     * @param {string|null} _oldValue - The old value of the attribute.
     * @param {string|null} _newValue - The new value of the attribute.
     * @returns {void}
     */
    attributeChangedCallback(_name, _oldValue, _newValue) {
        this.updateTime();
    }
    set duration(value) {
        let duration;
        if (value === null) {
            this.removeAttribute('duration');
            return;
        }
        else if (typeof value === 'string') {
            duration = Temporal.Duration.from(value);
        }
        else if (value instanceof Temporal.Duration) {
            duration = value;
        }
        else {
            throw new TypeError('duration must be set using a Temporal.Duration or it in string form');
        }
        this.setAttribute('duration', duration.toString());
    }
    get duration() {
        const value = this.getAttribute('duration');
        if (value === null)
            return null;
        return Temporal.Duration.from(value);
    }
    updateTime() {
        try {
            this.textContent = toHumanString(this.duration);
        }
        catch (error) {
            this.textContent = 'Invalid duration';
            throw error;
        }
    }
}
export function toHumanString(self, units) {
    const constructed = [];
    if (self === null)
        return 'unknown duration';
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
}
customElements.define('clock-time', ClockTime);
customElements.define('relative-time', RelativeTime);
customElements.define('duration-time', DurationTime);
