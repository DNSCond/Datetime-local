// EveneTimer.js
// timertarget.js
export class Timer extends EventTarget {
    #timerId = new Map;

    createTimer(eventId, millisecondInterval, customArguments = undefined, limitedFires = Infinity) {
        limitedFires = +limitedFires;
        millisecondInterval = +millisecondInterval;
        if (millisecondInterval <= 0) throw new RangeError('millisecondInterval is less or equals to 0');
        if (limitedFires < 0) throw new RangeError('limitedFires is less to 0');
        if (this.#timerId.has(eventId)) return this.#timerId.get(eventId);
        let fired = 0;
        const timerId = setInterval(() => {
            const date = new Date, detail = Object.freeze({
                eventId, date, get [Symbol.toStringTag]() {
                    return `Timer (${this.date})`;
                }, customArguments, fired: ++fired,
            }), event = new CustomEvent(eventId, {
                bubbles: true, cancelable: false, composed: false, detail,
            });
            this.dispatchEvent(event);
            if (fired >= limitedFires) return this.clearTimerById(timerId);
        }, millisecondInterval)
        this.#timerId.set(eventId, timerId);
        return timerId;
    }

    clearTimerByName(eventId) {
        const timerId = this.#timerId.get(eventId);
        if (timerId != null) {
            clearInterval(timerId);
            this.#timerId.delete(eventId);
            return true;
        } else return false;
    }

    clearTimerById(timerId) {
        for (const [eventId, value] of this.#timerId) {
            if (value === timerId) {
                clearInterval(timerId);
                this.#timerId.delete(eventId);
                return true;
            }
        }
        return false;
    }

    clearAllTimers() {
        for (const [_id, timerId] of this.#timerId) clearInterval(timerId);
        this.#timerId.clear();
    }

    hasTimerByName(eventId) {
        return this.#timerId.has(eventId);
    }

    hasTimerById(timerId) {
        for (const [_, value] of this.#timerId)
            if (value === timerId) return true;
        return false;
    }
}
