//import {Datetime_local} from "./Datetime_local.js";
function getDateFromUserSync(message, maxAttempts = 35) {
    if (new.target) throw new Error('getDateFromUserSync is not a .constructor');
    message = String(message);
    if (isNaN(maxAttempts)) {
        return new Promise(function (resolve, reject) {
            reject(null);
        });
    }
    let dateString, attempts = 0;
    while (dateString = window.prompt(message)) {
        if (++attempts > maxAttempts) {
            return new Promise(function (resolve, reject) {
                reject(null);
            });
        }
        dateString = new Date(Date.parse(dateString));
        if (window.confirm("do you really mean " + dateString.toString())) {
            return new Promise(function (resolve, _) {
                resolve(dateString);
            });
        }
    }
    return new Promise(function (resolve, reject) {
        reject(null);
    });
}

function getDateFromUserASync(message, maxAttempts = 35) {
    if (new.target) throw new Error('getDateFromUserSync is not a .constructor');
    message = String(message);
    if (isNaN(maxAttempts)) {
        return new Promise(function (resolve, reject) {
            reject(null);
        });
    }
    let dateString, attempts = 0;
    const now = performance.now().toString();
    const html = `<dialog id="${now}"><h2>what time?</h2><form method=dialog>` +
        `<label>datetime-local: <input type=datetime-local></label></form></dialog>`;
    document.body.insertAdjacentHTML('beforeend', html);
    document.getElementById(now).showModal();
    return new Promise(function (resolve, reject) {
        resolve(1n);
    });
}
