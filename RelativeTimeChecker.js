import { Datetime_global } from "./Datetime_global.js";
// ClockTime extends HTMLElement, RelativeTime extends HTMLElement
class ClockTime extends HTMLElement {
    static get observedAttributes() {
        return ['datetime', 'format', 'timezone'];
    }
    constructor() {
        super();
        this.setAttribute('role', 'time');
    }
    connectedCallback() {
        this.updateTime();
    }
    attributeChangedCallback(_name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateTime();
        }
    }
    updateTime() {
        const dateString = this.getAttribute('datetime');
        const format = this.getAttribute('format') ?? 'Y-m-d H:i:s';
        const timezone = this.getAttribute('timezone') ?? 'UTC';
        const date = new Date(String(dateString));
        try {
            // @ts-ignore
            if (isNaN(date)) {
                // noinspection ExceptionCaughtLocallyJS
                throw new RangeError('Invalid date');
            }
            this.textContent = (new Datetime_global(date, timezone)).format(format);
        }
        catch (error) {
            if (error instanceof RangeError || error.name === 'RangeError') {
                // Display the stringified Date object on RangeError
                this.textContent = date.toString();
            }
            else {
                // For other errors, you might want to handle them differently
                console.error('Error in clock-time element:', error);
                this.textContent = 'Error displaying time';
            }
        }
    }
}
class RelativeTime extends HTMLElement {
    _timer;
    static get observedAttributes() {
        return ['datetime'];
    }
    constructor() {
        super();
        this.setAttribute('role', 'time');
        this._timer = null;
    }
    connectedCallback() {
        this.updateTime();
        // Update every minute to keep relative time current
        this._timer = setInterval(() => this.updateTime(), 1000);
    }
    disconnectedCallback() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }
    attributeChangedCallback(_name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateTime();
        }
    }
    updateTime() {
        const dateString = this.getAttribute('datetime');
        const date = new Date(String(dateString));
        try {
            // @ts-ignore
            if (isNaN(date)) {
                // noinspection ExceptionCaughtLocallyJS
                throw new RangeError('Invalid date');
            }
            this.textContent = this.getRelativeTime(date);
        }
        catch (error) {
            console.error('Error in relative-time element:', error);
            this.textContent = 'Invalid date';
        }
    }
    getRelativeTime(date) {
        const now = Date.now();
        const diffInSeconds = Math.floor((now - +date) / 1000);
        const absDiff = Math.abs(diffInSeconds);
        // Helper function to format the output
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
        if (absDiff < 1) {
            return 'now';
        }
        // Seconds
        return format(absDiff, absDiff === 1 ? 'second' : 'seconds');
    }
}
customElements.define('clock-time', ClockTime);
customElements.define('relative-time', RelativeTime);
