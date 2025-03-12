"use strict";
function chunk(array: any[]): any[][] {
    let index: number = 0, temporary: any[] = [];
    const result: any[] = [];
    for (const arrayElement of Array.from(array)) {
        temporary.push(arrayElement);
        if (((++index) % 3) === 0) {
            result.push(temporary);
            temporary = [];
        }
    }
    return result;
}

function underscoreNumber(n: number | bigint): string {
    return chunk(Array.from(BigInt(n).toString()).reverse()).map(function (e) {
        return e.reverse().join().replace(/\D/g, '');
    }).reverse().join().replace(/,/g, '_');
}