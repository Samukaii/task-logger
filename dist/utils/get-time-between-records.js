import { getLunchTime, getWorkLoad } from "../work-load.js";
import { dateHelper } from "./date-helper.js";
var workLoad = getWorkLoad();
var lunchStart = workLoad[1];
var lunchEnd = workLoad[2];
export var getTimeBetweenDateRecords = function (first, second) {
    var newFirst = new Date(first);
    var newSecond = new Date(second);
    newFirst.setSeconds(0, 0);
    newSecond.setSeconds(0, 0);
    if (dateHelper.isAfterOrEqual(newFirst, lunchEnd.date) && dateHelper.isAfterOrEqual(newSecond, lunchEnd.date))
        return Math.abs(newSecond.getTime() - newFirst.getTime());
    if (dateHelper.isBeforeOrEqual(newFirst, lunchStart.date) && dateHelper.isBeforeOrEqual(newSecond, lunchStart.date))
        return Math.abs(newSecond.getTime() - newFirst.getTime());
    return Math.abs(Math.abs(newSecond.getTime() - newFirst.getTime()) - getLunchTime());
};
//# sourceMappingURL=get-time-between-records.js.map