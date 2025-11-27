import { constructorInput, Datetime_global } from "./Datetime_global.js";
import { Temporal } from "temporal-polyfill";
declare class Datetime_HTML_Internal extends Datetime_global {
    constructor(from?: constructorInput, timezoneId?: Temporal.TimeZoneLike | string);
    static withoutNew(from?: constructorInput, timezoneId?: Temporal.TimeZoneLike | string): HTMLTimeElement;
    /**
     * Returns the date-time as an ISO 8601 string in UTC (e.g., "2025-04-18T12:34:56.789Z").
     * Matches Date.prototype.toISOString, with millisecond precision.
     * @returns A string in ISO 8601 format.
     */
    toJSON(this: Datetime_global): string;
    toISOString(this: Datetime_global): string;
    toHTMLTimeFormatted(format: string): HTMLTimeElement;
    toHTMLTimeGMT(): HTMLTimeElement;
    toHTMLTimeUTC(): HTMLTimeElement;
    toHTMLTimeElement(): HTMLTimeElement;
    toHTMLTime(): HTMLTimeElement;
}
export declare const Datetime_HTML: import("./proxy.js").CallableConstructor<typeof Datetime_HTML_Internal>;
export type Datetime_HTML = Datetime_HTML_Internal;
export declare function createTimeElement(date?: Date, classArray?: string | string[]): HTMLTimeElement;
export {};
//# sourceMappingURL=Datetime_HTML.d.ts.map