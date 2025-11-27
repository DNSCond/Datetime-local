import { Temporal } from 'temporal-polyfill';
export type ZDTDuration = {
    durr: Temporal.Duration;
    toHumanString(this: ZDTDuration, units?: number): string;
    round(this: ZDTDuration, roundTo?: Temporal.DurationRoundTo): ZDTDuration;
    total(this: ZDTDuration, totalOf?: Temporal.DurationRoundTo): ZDTDuration;
    toMachineString(this: ZDTDuration): string;
    toJSON(this: ZDTDuration): string;
    toString(this: ZDTDuration): string;
};
export interface ZDTDuration_constructor {
    prototype: ZDTDuration;
    (duration: Temporal.Duration | string | number | any, months?: number, weeks?: number, days?: number, hours?: number, minutes?: number, seconds?: number, ms?: number, us?: number, ns?: number): string;
    new (duration: Temporal.Duration | string | number | any, months?: number, weeks?: number, days?: number, hours?: number, minutes?: number, seconds?: number, ms?: number, us?: number, ns?: number): ZDTDuration;
    mktime(hours?: number, minutes?: number, seconds?: number, months?: number, weeks?: number, days?: number, years?: number, ms?: number, us?: number, ns?: number): ZDTDuration;
}
/**
 * undocumented, can change any version
 */
export declare const ZDTDuration: ZDTDuration_constructor;
//# sourceMappingURL=ZDTDuration.d.ts.map