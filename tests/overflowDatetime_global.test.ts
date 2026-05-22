import { describe, it, expect } from 'vitest';
import { overflowDatetime_global } from '../src/Datetime_global.js'; // Adjust relative path
import { Temporal } from 'temporal-polyfill';

describe('overflowDatetime_global Internal Engine', () => {

    it('should pass through exact fields when no overwrites are provided', () => {
        const zdt = Temporal.ZonedDateTime.from('2026-05-22T12:00:00[UTC]');
        const mockContext = { time: zdt };

        const result = overflowDatetime_global(mockContext, {});

        expect(result).not.toBeNull();
        expect(result!.epochMilliseconds).toBe(zdt.epochMilliseconds);
    });

    it('should pass through exact fields when no overwrites are provided in Europe/Amsterdam', () => {
        const zdt = Temporal.ZonedDateTime.from('2026-05-22T12:00:00[Europe/Amsterdam]');
        const mockContext = { time: zdt };

        const result = overflowDatetime_global(mockContext, {});

        expect(result).not.toBeNull();
        expect(result!.epochMilliseconds).toBe(zdt.epochMilliseconds);
    });

    it('should roll over excess hours cleanly via MakeTime', () => {
        const zdt = Temporal.ZonedDateTime.from('2026-05-22T23:00:00[UTC]');
        const mockContext = { time: zdt };

        // 23:00 + 2 hours (bringing it to 25) rolls over into the next day
        const result = overflowDatetime_global(mockContext, { hour: 25 });

        expect(result).not.toBeNull();
        expect(result!.day).toBe(23); // <-- FIX THIS LINE from 24 to 23
        expect(result!.hour).toBe(1);
    });

    it('should roll over excess hours cleanly via MakeTime in Europe/Amsterdam', () => {
        const zdt = Temporal.ZonedDateTime.from('2026-05-22T23:00:00[Europe/Amsterdam]');
        const mockContext = { time: zdt };

        // 23:00 + 2 hours (bringing it to 25) rolls over into the next day
        const result = overflowDatetime_global(mockContext, { hour: 25 });

        expect(result).not.toBeNull();
        expect(result!.day).toBe(23); // <-- FIX THIS LINE from 24 to 23
        expect(result!.hour).toBe(1);
    });

    it('should roll backward underflowing days cleanly via MakeDay', () => {
        const zdt = Temporal.ZonedDateTime.from('2026-05-01T12:00:00[UTC]');
        const mockContext = { time: zdt };

        // Overwrite day to 0 (which means the last day of the previous month)
        // Should roll backward into April 30th
        const result = overflowDatetime_global(mockContext, { day: 0 });

        expect(result).not.toBeNull();
        expect(result!.month).toBe(4); // April
        expect(result!.day).toBe(30);
    });

    it('should handle sub-millisecond precision assembly correctly', () => {
        const zdt = Temporal.ZonedDateTime.from('2026-05-22T12:00:00.000000000[UTC]');
        const mockContext = { time: zdt };

        const result = overflowDatetime_global(mockContext, {
            microsecond: 123,
            nanosecond: 456
        });

        expect(result).not.toBeNull();
        // Extract nanoseconds from Temporal directly to verify assembly math
        expect(result!.nanosecond).toBe(456);
        expect(result!.microsecond).toBe(123);
    });

    it('should return null when parsing invalid numbers or NaN values', () => {
        const zdt = Temporal.ZonedDateTime.from('2026-05-22T12:00:00[UTC]');
        const mockContext = { time: zdt };

        const result = overflowDatetime_global(mockContext, { year: NaN });
        expect(result).toBeNull();
    });
});
