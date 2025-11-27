import { Temporal } from "temporal-polyfill";
import { constructorInput, Datetime_global } from "./Datetime_global.js";
export declare function setDatetime(datetime: unknown, element: HTMLElement, setAttribute?: boolean): string | null;
/**
 * for inheritance only
 */
export declare abstract class TimeElement extends HTMLElement {
    constructor(timeValue?: constructorInput, timezone?: string);
    /**
     * sets the `datetime` and possibly `timezone` attribute to the new timestamp of the param.
     * @param newValue a Date, Temporal.ZonedDateTime, Datetime_global, string, or number.
     */
    set dateTime(newValue: constructorInput);
    /**
     * a Date representing the `datetime` attribute or null.
     */
    get dateTime(): Date | null;
    /**
     * sets the `timezone` attribute to the new timezone of the param.
     */
    set timezone(newValue: string | null);
    /**
     * gets the `timezone` attribute of this element.
     */
    get timezone(): string | null;
    /**
     * gets a `Datetime_global` representing the `datetime` attribute or null. throws when the `timezone` is invalid.
     */
    get datetime_global(): Datetime_global | null;
    /**
     * gets a `Temporal.ZonedDateTime` representing the `datetime` attribute or null. throws when the `timezone` is invalid.
     */
    get zonedDateTime(): Temporal.ZonedDateTime | null;
}
/**
 * for inheritance only
 */
export declare abstract class TimeElementFormatter extends TimeElement {
    _requestDTFormat(onGranted: (datetime_global: Datetime_global) => void, putContent: (textContent: string) => void): void;
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
export declare class ClockTime extends TimeElementFormatter {
    /**
     * Returns the list of attributes to observe for changes.
     * @returns {string[]}
     */
    static get observedAttributes(): string[];
    /**
     * Called when the element is inserted into the DOM.
     * Triggers an initial update of the displayed time.
     * @returns {void}
     */
    connectedCallback(): void;
    /**
     * Called when an observed attribute changes.
     * @param {string} _name - The name of the attribute.
     * @param {string|null} _oldValue - The old value of the attribute.
     * @param {string|null} _newValue - The new value of the attribute.
     * @returns {void}
     */
    attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null): void;
    /**
     * Updates the displayed time based on current attributes.
     * Handles invalid dates gracefully by displaying an error or the raw date string.
     * @returns {void}
     */
    updateTime(): void;
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
export declare class RelativeTime extends TimeElementFormatter {
    /**
     * @private
     * @type {null|number}
     */
    private _timer;
    private innerTimeElement;
    /**
     * Returns the list of attributes to observe for changes.
     * @returns {string[]}
     */
    static get observedAttributes(): string[];
    /**
     * Constructs a RelativeTime element, sets the ARIA role, and initializes the timer.
     */
    constructor();
    /**
     * Called when the element is inserted into the DOM.
     * Triggers an initial update and starts a timer to refresh the relative time every second.
     * @returns {void}
     */
    connectedCallback(): void;
    /**
     * Called when the element is removed from the DOM.
     * Clears the update timer.
     * @returns {void}
     */
    disconnectedCallback(): void;
    private getTimeElement;
    /**
     * Called when an observed attribute changes.
     * @param _name - The name of the attribute.
     * @param _oldValue
     * @param _newValue
     * @returns {void}
     */
    attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null): void;
    private clearTimer;
    getDuration(): Temporal.Duration | null;
    updateTime(): void;
    private scheduleNextUpdate;
    /**
     * Converts a Date object into a human-readable relative time string.
     * @param {Date} date - The date to compare to now.
     * @returns {string} A relative time string (e.g., "2 minutes ago", "in 3 weeks", "now").
     */
    getRelativeTime(date: Date): string;
}
export declare function toHumanString(self: Temporal.Duration | null, units?: number): string;
//# sourceMappingURL=RelativeTimeChecker.d.ts.map