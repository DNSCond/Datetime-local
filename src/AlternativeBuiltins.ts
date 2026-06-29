import {setDatetime, RelativeTime} from "./RelativeTimeChecker.js";
import {constructorInput, Datetime_global, validateTimezone} from "./Datetime_global.js";
import {Temporal} from "temporal-polyfill";

export class TimeElementBuiltin extends HTMLTimeElement {
    connectedCallback(): void {
    }

    /**
     * sets the `datetime` and possibly `timezone` attribute to the new timestamp of the param.
     * @param newValue a Date, Temporal.ZonedDateTime, Datetime_global, string, or number.
     */
    set dateTimeExtended(newValue: constructorInput) {
        setDatetime(newValue, this);
    }

    getTimeHTMLElement(): HTMLTimeElement {
        return this;
    }

    /**
     * a Date representing the `datetime` attribute or null.
     */
    get dateTimeExtended(): Date | null {
        const date = this.getAttribute('datetime');
        if (date === null) return null;
        return new Date(date);
    }

    /**
     * gets the `timezone` attribute of this element.
     */
    get timezone(): string | null {
        const timezone: string | null = this.getAttribute('data-timezone');
        if (timezone === 'local') return Datetime_global.hostLocalTimezone();
        return timezone;
    }

    /**
     * sets the `timezone` attribute to the new timezone of the param.
     */
    set timezone(newValue: string | null) {
        if (newValue === null) {
            this.removeAttribute('data-timezone');
        } else if (newValue === undefined) {
            throw new TypeError('undefined is not a timezone');
        } else if (newValue === 'local') {
            this.setAttribute('data-timezone', Datetime_global.hostLocalTimezone());
        } else {
            // if the timezone is invalid an error is thrown, do not catch it, It's for the one doing the assignment.
            validateTimezone(newValue as string, true);
            this.setAttribute('data-timezone', newValue as string);
        }
    }

    /**
     * gets a `Datetime_global` representing the `datetime` attribute or null. throws when the `timezone` is invalid.
     */
    get datetime_global(): Datetime_global | null {
        const datetime: string | null = this.getAttribute('datetime');
        const timezone: string | null = this.getAttribute('data-timezone');
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

/**
 * for inheritance only
 */
export abstract class TimeElementFormatter extends TimeElementBuiltin {
    /**
     * for internal use only. call when updating textContent
     * @param nativeDate
     * @param timezone
     * @param defaultFormatted
     */
    protected requestCustomFormat(nativeDate: Date | null, timezone: string, defaultFormatted: string): string {
        const detail = {
            date: nativeDate ?? new Date(NaN), timezone,
            formattedValue: defaultFormatted, // Let them override this property
        }, event = new CustomEvent('format-datetime', {
            bubbles: true, cancelable: true, composed: true, detail,
        }), isPrevented = !this.dispatchEvent(event);

        // If prevented, we return whatever the listener set on detail.formattedValue
        return isPrevented ? detail.formattedValue : defaultFormatted;
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
export class ClockTimeBuiltin extends TimeElementFormatter {
    /**
     * Returns the list of attributes to observe for changes.
     * @returns {string[]}
     */
    static get observedAttributes(): string[] {
        return ['datetime', 'data-format', 'data-timezone'];
    }

    /**
     * Called when the element is inserted into the DOM.
     * Triggers an initial update of the displayed time.
     * @returns {void}
     */
    connectedCallback(): void {
        super.connectedCallback();
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
        const format: string = this.getAttribute('data-format') ?? Datetime_global.FORMAT_DATETIME_GLOBALV3;
        this.getTimeHTMLElement().textContent = this.requestCustomFormat(
            this.dateTimeExtended, this.timezone ?? 'UTC',
            this.datetime_global?.format(format) ?? 'Invalid Date',
        );
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
export class RelativeTimeBuiltin extends TimeElementFormatter {
    /**
     * @private
     * @type {null|number}
     */
    private _timer: null | number = null;
    private innerTimeElement: HTMLTimeElement | undefined;

    /**
     * Returns the list of attributes to observe for changes.
     * @returns {string[]}
     */
    static get observedAttributes(): string[] {
        return ['datetime', 'precision'];
    }

    /**
     * Called when the element is inserted into the DOM.
     * Triggers an initial update and starts a timer to refresh the relative time every second.
     * @returns {void}
     */
    connectedCallback(): void {
        super.connectedCallback();
        this.updateTime();
        this.scheduleNextUpdate();
    }

    /**
     * Called when the element is removed from the DOM.
     * Clears the update timer.
     * @returns {void}
     */
    disconnectedCallback(): void {
        this.clearTimer();
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
        this.scheduleNextUpdate();
    }

    private clearTimer(): void {
        if (this._timer !== null) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }

    getDuration(): Temporal.Duration | null {
        const datetime_global = this.datetime_global, timezone = datetime_global?.getTimezoneId(),
            now: Temporal.ZonedDateTime = (new Datetime_global(Datetime_global.now(), timezone)).toTemporalZonedDateTime(),
            zdt: Temporal.ZonedDateTime | undefined = datetime_global?.toTemporalZonedDateTime();
        if (zdt === undefined) return null;
        return zdt.until(now, {
            largestUnit: 'years', smallestUnit: 'seconds',
        });
    }

    updateTime(): void {
        Reflect.apply(RelativeTime.prototype.updateTime, this, Array());
    }

    private scheduleNextUpdate(): void {
        // @ts-expect-error
        Reflect.apply(RelativeTime.prototype.scheduleNextUpdate, this, Array());
    }

    /**
     * Converts a Date object into a human-readable relative time string.
     * @param {Date} date - The date to compare to now.
     * @returns {string} A relative time string (e.g., "2 minutes ago", "in 3 weeks", "now").
     */
    getRelativeTime(date: Date): string {
        return Reflect.apply(RelativeTime.prototype.getRelativeTime, this, [date]);
    }
}

const extendsTime = {extends: 'time'};
customElements.define('clock-time-builtin', ClockTimeBuiltin, extendsTime);
customElements.define('relative-time-builtin', RelativeTimeBuiltin, extendsTime);
