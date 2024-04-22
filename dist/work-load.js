import { getTimeDifference } from "./utils/get-time-difference.js";
var workLoad = [
    '08:00',
    '12:30',
    '13:30',
    '17:30',
];
export var getWorkLoad = function () {
    return workLoad.map(function (time) {
        var _a = time.split(':'), hours = _a[0], minutes = _a[1];
        var date = new Date();
        date.setHours(+hours, +minutes, 0, 0);
        return {
            isAfter: function (dateToCompare) { return dateToCompare.getTime() < date.getTime(); },
            date: date
        };
    });
};
export var getLunchTime = function () {
    var workLoad = getWorkLoad();
    var lunchStart = workLoad[1];
    var lunchEnd = workLoad[2];
    return getTimeDifference(lunchStart.date, lunchEnd.date);
};
//# sourceMappingURL=work-load.js.map