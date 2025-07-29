import {Temporal} from "temporal-polyfill";
import {dateAsISOString, Datetime_global} from "./Datetime_global.js";

// TimeElement, DT_HTML_Formatter, ClockTime, and RelativeTime

/**
 * for inheritance only
 */
export abstract class TimeElement extends HTMLElement {
    /**
     * sets the `datetime` and possibly `timezone` attribute to the new timestamp of the param.
     * @param newValue a Date, Temporal.ZonedDateTime, Datetime_global, string, number, or bigint.
     */
    set dateTime(newValue: unknown) {
        if (newValue === null) {
            this.removeAttribute('datetime');
        } else if (newValue instanceof Temporal.ZonedDateTime) {
            this.setAttribute('datetime', dateAsISOString(newValue.epochMilliseconds));
            this.setAttribute('timezone', newValue.timeZoneId);
        } else if (newValue instanceof Datetime_global) {
            this.setAttribute('datetime', newValue.toISOString());
        } else if (newValue instanceof Date) {
            this.setAttribute('datetime', newValue.toISOString());
        } else if (newValue instanceof Temporal.Instant) {
            this.setAttribute('datetime', new Date(newValue.epochMilliseconds).toISOString());
        } else if (typeof newValue === 'string' || typeof newValue === 'number') {
            console.warn('please do not assign dateTime with a number or string');
            // toISOString throws on invalid dates.
            this.setAttribute('datetime', (new Date(newValue)).toISOString());
        } else {
            throw new TypeError('dateTime must be set using a Date, Temporal.ZonedDateTime, Datetime_global, string, number, or bigint');
        }
    }

    /**
     * a Date representing the `datetime` attribute or null.
     */
    get dateTime(): Date | null {
        const date = this.getAttribute('datetime');
        if (date === null) return null;
        return new Date(date);
    }

    /**
     * sets the `timezone` attribute to the new timezone of the param.
     */
    set timezone(newValue: unknown) {
        if (newValue === null) {
            this.removeAttribute('timezone');
        } else if (newValue === undefined) {
            throw new TypeError('undefined is not a timezone');
        } else if (newValue === 'local') {
            this.setAttribute('timezone', Datetime_global.hostLocalTimezone());
        } else {
            // if the timezone is invalid an error is thrown, do not catch it, It's for the one doing the assignment.
            (new Datetime_global(Date.now(), newValue as string));
            this.setAttribute('timezone', newValue as string);
        }
    }

    /**
     * gets the `timezone` attribute of this element.
     */
    get timezone(): string | null {
        const timezone: string | null = this.getAttribute('timezone');
        if (timezone === 'local') return Datetime_global.hostLocalTimezone();
        return timezone;
    }

    /**
     * gets a `Datetime_global` representing the `datetime` attribute or null. throws when the `timezone` is invalid.
     */
    get datetime_global(): Datetime_global | null {
        const datetime = this.getAttribute('datetime');
        const timezone = this.getAttribute('timezone');
        if (datetime === null) return null;
        if (timezone === 'local') {
            return new Datetime_global(datetime, Datetime_global.hostLocalTimezone());
        } else {
            return new Datetime_global(datetime, timezone ?? 'UTC');
        }
    }

    /**
     * gets a `Temporal.ZonedDateTime` representing the `datetime` attribute or null. throws when the `timezone` is invalid.
     */
    get zonedDateTime(): Temporal.ZonedDateTime | null {
        return this.datetime_global?.toTemporalZonedDateTime() ?? null;
    }
}

type customFormatter = (this: Datetime_global, dt: Datetime_global, element: DT_HTML_Formatter) => string;

/**
 * for inheritance only
 */
export abstract class DT_HTML_Formatter extends TimeElement {
    #callback: customFormatter | undefined = undefined;

    formatDT(defaultFormatter: customFormatter): string {
        const zdt = this.datetime_global;
        if (zdt === null) return "Invalid Date";
        const callback: customFormatter | undefined = this.#callback;
        const result = Function.prototype.call.call(
            callback ?? defaultFormatter ??
            (m => String(m)),
            zdt, zdt, this);
        if (typeof result === 'string') return result; else {
            throw new TypeError('the callback did not return a string');
        }
    }

    set formatCallback(value: customFormatter | undefined) {
        if (value === undefined) this.#callback = undefined;
        else if (typeof value === 'function') {
            this.#callback = value;
        } else {
            throw new TypeError('your provided formatCallback wasnt a function.');
        }
    }

    get formatCallback(): customFormatter | undefined {
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
    static get observedAttributes(): string[] {
        return ['datetime', 'format', 'timezone'];
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
    connectedCallback(): void {
        this.updateTime();
    }

    /**
     * Called when an observed attribute changes.
     * @param {string} _name - The name of the attribute.
     * @param {string|null} _oldValue - The old value of the attribute.
     * @param {string|null} _newValue - The new value of the attribute.
     * @returns {void}
     */
    attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null): void {
        this.updateTime();
    }

    /**
     * Updates the displayed time based on current attributes.
     * Handles invalid dates gracefully by displaying an error or the raw date string.
     * @returns {void}
     */
    updateTime(): void {
        const format: string = this.getAttribute('format') ?? Datetime_global.FORMAT_DATETIME_GLOBALV3;
        try {
            this.textContent = this.formatDT(zdt => zdt.format(format));
        } catch (error) {
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
    private _timer: null | number;

    /**
     * Returns the list of attributes to observe for changes.
     * @returns {string[]}
     */
    static get observedAttributes(): string[] {
        return ['datetime'];
    }

    /**
     * Constructs a RelativeTime element, sets the ARIA role, and initializes the timer.
     */
    constructor() {
        super();
        this.setAttribute('role', 'time');
        this._timer = null;
    }

    /**
     * Called when the element is inserted into the DOM.
     * Triggers an initial update and starts a timer to refresh the relative time every second.
     * @returns {void}
     */
    connectedCallback(): void {
        this.updateTime();
        // Update every second to keep relative time current
        this._timer = setInterval(() => this.updateTime(), 1000);
    }

    /**
     * Called when the element is removed from the DOM.
     * Clears the update timer.
     * @returns {void}
     */
    disconnectedCallback(): void {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    /**
     * Called when an observed attribute changes.
     * @param _name - The name of the attribute.
     * @param _oldValue
     * @param _newValue
     * @returns {void}
     */
    attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null): void {
        this.updateTime();
    }

    /**
     * Updates the displayed relative time based on the current "datetime" attribute.
     * Handles invalid dates gracefully by displaying an error message.
     * @returns {void}
     */
    updateTime(): void {
        try {
            this.textContent = this.formatDT(zdt => this.getRelativeTime(zdt.toDate()));
        } catch (error) {
            console.error('Error in relative-time element:', error);
            this.textContent = 'Invalid date';
        }
    }

    /**
     * Converts a Date object into a human-readable relative time string.
     * @param {Date} date - The date to compare to now.
     * @returns {string} A relative time string (e.g., "2 minutes ago", "in 3 weeks", "now").
     */
    getRelativeTime(date: Date): string {
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
        const format = function (value: number, unit: string): string {
            if (diffInSeconds < 0) return `in ${value} ${unit}`;
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
        if (absDiff < 1) {
            return 'now';
        }
        // Seconds
        return format(absDiff, absDiff === 1 ? 'second' : 'seconds');
    }
}

customElements.define('clock-time', ClockTime);
customElements.define('relative-time', RelativeTime);
