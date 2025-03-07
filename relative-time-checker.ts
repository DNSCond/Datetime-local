"use strict";

class RelativeTimeChecker {
    private element: HTMLTimeElement;
    private readonly format: 'R' | 'toString' | 'toDateString' | 'toTimeString' | 'toLocaleString' | 'toLocaleDateString' | 'toLocaleTimeString' | 'toUTCString' | Function;

    constructor(timetag: HTMLTimeElement, format: 'R' | 'Relative' | 'toString' | 'toDateString' | 'toTimeString' | 'toLocaleString' | 'toLocaleDateString' | 'toLocaleTimeString' | 'toUTCString' | Function = 'R') {
        this.element = timetag;
        if (format === 'Relative') {
            this.format = 'R';
        } else {
            this.format = format;
        }
    }

    run(format?: 'R' | 'Relative' | 'toString' | 'toDateString' | 'toTimeString' | 'toLocaleString' | 'toLocaleDateString' | 'toLocaleTimeString' | 'toUTCString' | Function | undefined): boolean {
        const temporaryTime: Date = new Date(this.element.dateTime), currentDate: number = +(new Date());
        const differenceSeconds: number = Math.trunc((currentDate - (+temporaryTime)) / 1_000);
        const positive: boolean = differenceSeconds >= 0;

        if (isNaN(temporaryTime.getTime())) {
            this.element.innerText = 'Invalid Date';
            return false;
        }
        format = format ?? this.format;
        if (typeof format === 'function') {
            const text = format(temporaryTime);
            if (text === undefined) {
                this.element.innerText = 'Invalid Date';
                return false;
            }
            this.element.innerText = text;
            return true;
        }
        switch (format) {
            case 'toString':
                this.element.innerText = temporaryTime.toString();
                break;
            case 'toDateString':
                this.element.innerText = temporaryTime.toDateString();
                break;
            case 'toTimeString':
                this.element.innerText = temporaryTime.toTimeString();
                break;
            case 'toLocaleString':
                this.element.innerText = temporaryTime.toLocaleString();
                break;
            case 'toLocaleDateString':
                this.element.innerText = temporaryTime.toLocaleDateString();
                break;
            case 'toLocaleTimeString':
                this.element.innerText = temporaryTime.toLocaleTimeString();
                break;
            case 'toUTCString':
                this.element.innerText = temporaryTime.toUTCString();
                break;
            default: // 'R'
                if (differenceSeconds === 0) {
                    this.element.innerText = 'now';
                } else if (Math.abs(differenceSeconds) < 60) {
                    this.element.innerText = `${Math.abs(differenceSeconds)} seconds ${positive ? 'ago' : 'from now'}`;
                } else if (Math.abs(differenceSeconds) < 3600) {
                    const minutes = Math.abs(Math.trunc(differenceSeconds / 60));
                    this.element.innerText = `${minutes} minute${minutes !== 1 ? 's' : ''} ${positive ? 'ago' : 'from now'}`;
                } else if (Math.abs(differenceSeconds) < 86400) {
                    const hours = Math.abs(Math.trunc(differenceSeconds / 3600));
                    this.element.innerText = `${hours} hour${hours !== 1 ? 's' : ''} ${positive ? 'ago' : 'from now'}`;
                } else {
                    const days = Math.abs(Math.trunc(differenceSeconds / 86400));
                    this.element.innerText = `${days} day${days !== 1 ? 's' : ''} ${positive ? 'ago' : 'from now'}`;
                }
        }
        return true;
    }

    autorun(until: number | Function | true = 50000000) {
        const until_type = typeof until, self = this;
        if (until_type !== 'number' && until_type !== 'function' && until !== true) {
            throw new Error('either a number or a Function can be specified');
        }
        let loops = 0;
        setTimeout(function recursive() {
            self.run();
            if (until === true) {
                setTimeout(recursive);
            } else if (until_type === 'number') {
                if (++loops <= Number(until)) {
                    setTimeout(recursive);
                }
            } else if (until_type === 'function') {
                if ((until as Function)(++loops)) {
                    setTimeout(recursive);
                }
            }
        });
    }
}
