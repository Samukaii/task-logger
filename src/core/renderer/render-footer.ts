import {taskLogsRepository} from "../../task-logs-repository.js";
import {getWorkLoad} from "../../work-load.js";
import {getTimeBetweenDateRecords} from "../../utils/get-time-between-records.js";
import {timestampToTime} from "../../utils/timestamp-to-time.js";

const getTotalTime = () => {
    const lastRecord = taskLogsRepository.getAll().at(-1);
    const workLoads = getWorkLoad();
    const start = workLoads[0];

    if (!lastRecord) return;
    const diff = getTimeBetweenDateRecords(lastRecord.date, start.date);

    return timestampToTime(diff);
}

export const renderFooter = () => {
    const width = process.stdout.columns;

    if (!getTotalTime()) return;

    console.log("=".repeat(width).yellow);
    console.log("");
    console.log(`${"Total work time: ".blue}${getTotalTime()?.green}`);
};