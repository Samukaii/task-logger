import { getLunchTime, getWorkLoad } from "../work-load.js";
import { dateHelper } from "./date-helper.js";
var workLoad = getWorkLoad();
var lunchStart = workLoad[1];
var lunchEnd = workLoad[2];
export var getTimeBetweenDateRecords = function (first, second) {
    var start = new Date(first);
    var end = new Date(second);
    start.setSeconds(0, 0);
    end.setSeconds(0, 0);
    if (dateHelper.isAfterOrEqual(start, lunchEnd.date) && dateHelper.isAfterOrEqual(end, lunchEnd.date))
        return Math.abs(end.getTime() - start.getTime());
    if (dateHelper.isBeforeOrEqual(start, lunchStart.date) && dateHelper.isBeforeOrEqual(end, lunchStart.date))
        return Math.abs(end.getTime() - start.getTime());
    return Math.abs(Math.abs(end.getTime() - start.getTime()) - getLunchTime());
};
//# sourceMappingURL=get-time-between-records.js.map