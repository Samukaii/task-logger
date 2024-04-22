import {getLunchTime, getWorkLoad} from "../work-load.js";
import {dateHelper} from "./date-helper.js";

const workLoad = getWorkLoad();
const lunchStart = workLoad[1];
const lunchEnd = workLoad[2];

export const getTimeBetweenDateRecords = (first: Date, second: Date) => {
    const start = new Date(first);
    const end = new Date(second);

    start.setSeconds(0, 0);
    end.setSeconds(0, 0);

    if(dateHelper.isAfterOrEqual(start, lunchEnd.date) && dateHelper.isAfterOrEqual(end, lunchEnd.date))
        return Math.abs(end.getTime() - start.getTime());
    if(dateHelper.isBeforeOrEqual(start, lunchStart.date) && dateHelper.isBeforeOrEqual(end, lunchStart.date))
        return Math.abs(end.getTime() - start.getTime());

    return Math.abs(Math.abs(end.getTime() - start.getTime()) - getLunchTime());
}