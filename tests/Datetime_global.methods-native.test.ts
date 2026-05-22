// @vitest-environment jsdom
import {beforeEach, afterEach, describe, it, expect, vi} from 'vitest';
import {Datetime_global} from "../src/Datetime_global.js";

describe('Datetime_global Native Date Methods Proxy', () => {
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

    /*
    for unit in 'Hours,Minutes,Seconds,Date,Day,Milliseconds,FullYear'.split(','):
    print(f"it('should match get{unit}', () => {{const constructed = new Datetime_global, expected = new Date;expect(constructed.get{unit}()).toBe(expected.get{unit}());}});")
    */
    it.each('Hours,Minutes,Seconds,Date,Day,Milliseconds,FullYear'.split(','))
    ('should match get%s and getUTC* methods', (unit) => {
        const constructed = new Datetime_global();
        const expected = new Date();

        // Dynamically build the method names (e.g., "getHours" and "getUTCHours")
        const localMethod = `get${unit}` as const;
        const utcMethod = `getUTC${unit}` as const;

        // Execute and assert
        // @ts-expect-error this works, no need for property might not exist.
        expect(constructed[localMethod]()).toBe(expected[localMethod]());
        // @ts-expect-error this works, no need for property might not exist.
        expect(constructed[utcMethod]()).toBe(expected[utcMethod]());
    });

    const setterUnits = [
        {method: 'FullYear', value: 2030},
        {method: 'Month', value: 5},
        {method: 'Date', value: 15},
        {method: 'Hours', value: 18},
        {method: 'Minutes', value: 45},
        {method: 'Seconds', value: 30},
        {method: 'Milliseconds', value: 750},
    ];

    it.each(setterUnits)('should match set$method mutation behavior', ({method, value}) => {
        const constructed = new Datetime_global(1704067200000); // Start at Jan 1, 2024
        const expected = new Date(1704067200000);

        const setterName = `set${method}` as const;
        const getterName = `get${method}` as const;

        // Mutate both inline
        // @ts-expect-error this works, no need for property might not exist.
        constructed[setterName](value);
        // @ts-expect-error this works, no need for property might not exist.
        expected[setterName](value);

        // Verify they both rolled over/mutated identically
        // @ts-expect-error this works, no need for property might not exist.
        expect(constructed[getterName]()).toBe(expected[getterName]());
        expect(constructed.getTime()).toBe(expected.getTime());
    });
});
