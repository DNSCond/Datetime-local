import {Datetime_global} from "./Datetime_global.js";

// ClockTime extends HTMLElement, RelativeTime extends HTMLElement
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
class ClockTime extends HTMLElement {
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
     * @param {string|null} oldValue - The old value of the attribute.
     * @param {string|null} newValue - The new value of the attribute.
     * @returns {void}
     */
    attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null): void {
        if (oldValue !== newValue) {
            this.updateTime();
        }
    }

    /**
     * Updates the displayed time based on current attributes.
     * Handles invalid dates gracefully by displaying an error or the raw date string.
     * @returns {void}
     */
    updateTime(): void {
        const dateString: string | null = this.getAttribute('datetime');
        const format: string = this.getAttribute('format') ?? Datetime_global.FORMAT_DATETIME_GLOBALV3;
        const timezone: string = this.getAttribute('timezone') ?? 'UTC';
        const date: Date = new Date(String(dateString));
        try {
            // @ts-ignore
            if (isNaN(date)) {
                // noinspection ExceptionCaughtLocallyJS
                throw new RangeError('Invalid date');
            }
            this.textContent = (new Datetime_global(date, timezone)).format(format);
        } catch (error) {
            if (error instanceof RangeError || (error as Error).name === 'RangeError') {
                // Display the stringified Date object on RangeError
                this.textContent = date.toString();
            } else {
                // For other errors, you might want to handle them differently
                console.error('Error in clock-time element:', error);
                this.textContent = 'Error displaying time';
            }
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
class RelativeTime extends HTMLElement {
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
        // Update every minute to keep relative time current
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
     * @param {string} _name - The name of the attribute.
     * @param {string|null} oldValue - The old value of the attribute.
     * @param {string|null} newValue - The new value of the attribute.
     * @returns {void}
     */
    attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null): void {
        if (oldValue !== newValue) {
            this.updateTime();
        }
    }

    /**
     * Updates the displayed relative time based on the current "datetime" attribute.
     * Handles invalid dates gracefully by displaying an error message.
     * @returns {void}
     */
    updateTime(): void {
        const dateString: string | null = this.getAttribute('datetime');
        const date: Date = new Date(String(dateString));
        try {
            // @ts-ignore
            if (isNaN(date)) {
                // noinspection ExceptionCaughtLocallyJS
                throw new RangeError('Invalid date');
            }
            this.textContent = this.getRelativeTime(date);
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
