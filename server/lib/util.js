const xjs = require('xml-js')
    , icons = require('./icons').type;

module.exports.convert2json = function (xml) {
    return xjs.xml2js(xml, {compact: true, spaces: 2});
}

module.exports.filterFloat = function (value) {
    if (/^([-+])?([0-9]+(\.[0-9]+)?|Infinity)$/
        .test(value))
        return Number(value);
    return NaN;
}

module.exports.calcCoords = function (size, x, y) {
    let newX = null;
    let newY = null;

    if (x != null && y != null) {
        newX = (x / (size / 2)) * 375
        newY = ((y / (size / 2)) * 375) * (-1)
    }

    return {x: newX, y: newY}
}

module.exports.calcAndFormatTime = function (oldtime) {
    let pDays = 0;
    let pHours = 0;
    let pMinutes;
    oldtime = Math.floor(Number(oldtime));

    if (oldtime >= 60) {
        pHours = Math.floor(Number(oldtime) / 60);
        pMinutes = (Number(oldtime) - (pHours * 60));
    } else {
        pMinutes = Number(oldtime);
    }

    if (pHours >= 24) {
        pDays = Math.floor(Number(pHours) / 24);
        pHours = (pHours - (pDays * 24));
    }

    return (pDays > 0 ? pDays + 'd ' : '') + pHours + 'h ' + pMinutes + 'm';
}

module.exports.formatNumber = function (number, digits, icon) {
    const n = Number(number);
    return n.toLocaleString(undefined, {minimumFractionDigits: digits}) + icon;
}