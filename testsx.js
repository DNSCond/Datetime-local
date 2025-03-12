"use strict";
function chunk(array) {
    let index = 0, temporary = [];
    const result = [];
    for (const arrayElement of Array.from(array)) {
        temporary.push(arrayElement);
        if (((++index) % 3) === 0) {
            result.push(temporary);
            temporary = [];
        }
    }
    return result;
}
function underscoreNumber(n) {
    return chunk(Array.from(BigInt(n).toString()).reverse()).map(function (e) {
        return e.reverse().join().replace(/\D/g, '');
    }).reverse().join().replace(/,/g, '_');
}
export {};
