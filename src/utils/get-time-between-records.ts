import {getLunchTime, getWorkLoad} from "../work-load.js";
import {dateHelper} from "./date-helper.js";

const workLoad = getWorkLoad();
const lunchStart = workLoad[1];
const lunchEnd = workLoad[2];

export const getTimeBetweenDateRecords = (first: Date, second: Date) => {
    const newFirst = new Date(first);
    const newSecond = new Date(second);

    newFirst.setSeconds(0, 0);
    newSecond.setSeconds(0, 0);

    if(dateHelper.isAfter(newFirst, lunchEnd.date) && dateHelper.isAfter(newSecond, lunchEnd.date))
        return Math.abs(newSecond.getTime() - newFirst.getTime());
    if(dateHelper.isBefore(newFirst, lunchStart.date) && dateHelper.isBefore(newSecond, lunchStart.date))
        return Math.abs(newSecond.getTime() - newFirst.getTime());

    return Math.abs(Math.abs(newSecond.getTime() - newFirst.getTime()) - getLunchTime());
}