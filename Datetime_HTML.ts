import {constructorInput, Datetime_global} from "./Datetime_global.js";
import {Temporal} from "temporal-polyfill";
import {CallableClass} from "./proxy.js";

export const Datetime_HTML = CallableClass(class Datetime_HTML extends Datetime_global {
    constructor(from?: constructorInput, timezoneId: Temporal.TimeZoneLike | string = Temporal.Now.timeZoneId()) {
        super(from, timezoneId);
    }

    static withoutNew(from?: constructorInput, timezoneId: Temporal.TimeZoneLike | string = Temporal.Now.timeZoneId()): HTMLTimeElement {
        return (new Datetime_HTML(from, timezoneId)).toHTMLTime();
    }

    /**
     * Returns the date-time as an ISO 8601 string in UTC (e.g., "2025-04-18T12:34:56.789Z").
     * Matches Date.prototype.toISOString, with millisecond precision.
     * @returns A string in ISO 8601 format.
     */
    toJSON(this: Datetime_global): string {
        return this.toISOString();
    }

    toISOString(this: Datetime_global): string {
        return this.toDate().toISOString();
    };

    toHTMLTimeFormatted(format: string): HTMLTimeElement {
        const time: HTMLTimeElement = createTimeElement();
        time.textContent = this.format(format);
        time.dateTime = this.toISOString();
        return time;
    };

    toHTMLTimeGMT(): HTMLTimeElement {
        const time: HTMLTimeElement = createTimeElement();
        time.textContent = this.toDate().toUTCString();
        time.dateTime = this.toISOString();
        return time;
    };

    toHTMLTimeUTC(): HTMLTimeElement {
        const time: HTMLTimeElement = createTimeElement();
        time.textContent = this.toUTCString()
        time.dateTime = this.toISOString();
        return time;
    };

    toHTMLTimeElement(): HTMLTimeElement {
        const time: HTMLTimeElement = createTimeElement();
        time.textContent = this.toDate().toString();
        time.dateTime = this.toISOString();
        return time;
    };

    toHTMLTime(): HTMLTimeElement {
        const time: HTMLTimeElement = createTimeElement();
        time.textContent = this.toString();
        time.dateTime = this.toISOString();
        return time;
    };
});

export function createTimeElement(date?: Date, classArray: string | string[] = []): HTMLTimeElement {
    const time: HTMLTimeElement = document.createElement('time');
    if (typeof classArray === 'string') {
        classArray = [classArray];
    }
    time.className = ['Datetime_HTML', ...classArray].join(' ');
    if (date !== undefined) {
        date = new Date(date as any);
        if (!isNaN(date as any)) {
            time.dateTime = date.toISOString();
            // time.textContent = String(date);
            time.dataset.success = 'true';
        } else {
            time.dataset.success = 'false';
        }
    }
    return time;
}
