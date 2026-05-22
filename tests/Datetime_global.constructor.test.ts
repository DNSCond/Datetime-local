// @vitest-environment jsdom
import {beforeEach, afterEach, describe, it, expect, vi} from 'vitest';
import {Datetime_global} from "../src/Datetime_global.js";

describe('Datetime_global\'s constructor', () => {
    beforeEach(() => {
        // Tell the test runner to use fake timers
        vi.useFakeTimers();
        // Set the system time to a specific date (e.g., Jan 1, 2026)
        const date = new Date(Date.UTC(2026, 0, 1, 12, 0, 0));
        vi.setSystemTime(date);
    });

    afterEach(() => {
        // Always restore the real timers after each test
        vi.useRealTimers();
    });

    it('without arguments new Datetime_global and new Date on the exact same moment return the exact same value', () => {
        const constructed = new Datetime_global, expected = new Date;
        expect(constructed.getTime()).toBe(expected.getTime());
    });

    it('single argument numbers are interpreted as milliseconds since the unix epoch', () => {
        const singleNumber = 1716380000000;
        const constructed = new Datetime_global(singleNumber), expected = new Date(singleNumber);
        expect(constructed.getTime()).toBe(expected.getTime());
    });

    it('should accept a native Date object as an argument', () => {
        const nativeDate = new Date(Date.UTC(2026, 5, 15));
        const constructed = new Datetime_global(nativeDate);
        expect(constructed.getTime()).toBe(nativeDate.getTime());
    });

    it('should return localtime in the standard format without new', () => {
        const constructed = Datetime_global().slice(0, 33), expected = Date().slice(0, 33);
        expect(constructed).toBe(expected);
    });

    it('should interpret string arguments identical to Date.parse()', () => {
        const dateStr = "2026-01-01T12:00:00Z";
        const constructed = new Datetime_global(dateStr), expected = new Date(dateStr);
        expect(constructed.getTime()).toBe(expected.getTime());
    });

    it('should interpret string arguments identical to Date.parse()', () => {
        const dateStr = "2026-01-01";
        const constructed = new Datetime_global(dateStr), expected = new Date(dateStr);
        expect(constructed.getTime()).toBe(expected.getTime());
    });

    it('should interpret string arguments identical to Date.parse()', () => {
        const dateStr = "2024";
        const constructed = new Datetime_global(dateStr), expected = new Date(dateStr);
        expect(constructed.getTime()).toBe(expected.getTime());
    });

    it('should interpret string arguments identical to Date.parse()', () => {
        const dateStr = "Fri, 22 May 2026 14:33:08 GMT";
        const constructed = new Datetime_global(dateStr), expected = new Date(dateStr);
        expect(constructed.getTime()).toBe(expected.getTime());
    });

    it('should interpret a BigInt argument as nanoseconds since the epoch', () => {
        const constructed = new Datetime_global(1704067200000_000000n);
        expect(constructed.getTime()).toBe(1704067200000);
    });

    it('should interpret a BigInt argument as nanoseconds since the epoch and preserve precision', () => {
        // Let's add some trailing nanoseconds (123,456 ns) at the end
        const constructed = new Datetime_global(1704067200000_123456n);

        // Legacy millisecond API should truncate/ignore the sub-milliseconds:
        expect(constructed.getTime()).toBe(1704067200000);

        // Your custom high-precision getters should still see them:
        expect(constructed.nanosecond).toBe(456);
        expect(constructed.microsecond).toBe(123);
    });

    it('should output its millisecond timestamp when coerced to a number', () => {
        const timestamp = 1704067200000;
        const constructed = new Datetime_global(timestamp);
        const native = new Date(timestamp);

        // 1. Test explicit numeric coercion using the unary plus operator
        expect(+constructed).toBe(timestamp);

        // 2. Test implicit coercion using math operators (like subtraction)
        // This simulates real-world usage like finding the duration between two dates
        // @ts-ignore TypeScript ignore, this is intentional.
        expect(constructed - 0).toBe(+native);

        // 3. Test explicit .valueOf() parity
        expect(constructed.valueOf()).toBe(native.valueOf());
    });

    it('should output its string format if coerced to string', () => {
        const timestamp = 1704067200000;
        const constructed = new Datetime_global(timestamp, 'UTC');
        const expectedFormat = "Mon Jan 01 2024 00:00:00 GMT+0000 (UTC)";

        expect(String(constructed)).toBe(expectedFormat);
        // @ts-ignore TypeScript ignore, this is intentional.
        expect([] + (constructed)).toBe(expectedFormat);

        // Test explicit .toString() parity
        expect(constructed.toString()).toBe(expectedFormat);
    });
});
