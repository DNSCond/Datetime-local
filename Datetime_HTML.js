import { Datetime_global } from "./Datetime_global.js";
const Datetime_HTML = function (from, timezoneId) {
    const self = new.target ? this : Object.create(Datetime_HTML), { time } = new Datetime_HTML(from, timezoneId);
    self.time = time;
    if (new.target === undefined) {
        return self.toHTMLTime();
    }
};
Object.setPrototypeOf(Datetime_HTML.prototype, Datetime_global.prototype);
Object.setPrototypeOf(Datetime_HTML, Datetime_global);
/**
 * Returns the date-time as an ISO 8601 string in UTC (e.g., "2025-04-18T12:34:56.789Z").
 * Matches Date.prototype.toISOString, with millisecond precision.
 * @returns A string in ISO 8601 format.
 */
Datetime_HTML.prototype.toJSON = Datetime_HTML.prototype.toISOString = function () {
    return this.toDate().toISOString();
};
Datetime_HTML.prototype.toHTMLTimeFormatted = function (format) {
    const time = createTimeElement();
    time.textContent = this.format(format);
    time.dateTime = this.toISOString();
    return time;
};
Datetime_HTML.prototype.toHTMLTimeGMT = function () {
    const time = createTimeElement();
    time.textContent = this.toDate().toUTCString();
    time.dateTime = this.toISOString();
    return time;
};
Datetime_HTML.prototype.toHTMLTimeUTC = function () {
    const time = createTimeElement();
    time.textContent = this.toUTCString();
    time.dateTime = this.toISOString();
    return time;
};
Datetime_HTML.prototype.toHTMLTimeElement = function () {
    const time = createTimeElement();
    time.textContent = this.toDate().toString();
    time.dateTime = this.toISOString();
    return time;
};
Datetime_HTML.prototype.toHTMLTime = function () {
    const time = createTimeElement();
    time.textContent = this.toString();
    time.dateTime = this.toISOString();
    return time;
};
export function createTimeElement() {
    const time = document.createElement('time');
    time.className = 'Datetime_HTML';
    return time;
}
