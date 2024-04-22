import {TaskLog} from "../../models/task-log.js";
import {taskLogsRepository} from "../../task-logs-repository.js";
import {getTimeBetweenDateRecords} from "../../utils/get-time-between-records.js";
import {timestampToTime} from "../../utils/timestamp-to-time.js";
import {formatTime} from "../../utils/format-time.js";

const getTimeBetweenTaskLogs = (first: TaskLog, second: TaskLog) => {
    const difference = getTimeBetweenDateRecords(first.date, second.date);

    return timestampToTime(difference);
};

export const renderTaskLog = (taskLog: TaskLog) => {
    const previousLog = taskLogsRepository.getRecord(taskLog.id - 1);

    const id = `${taskLog.id}: `.yellow;
    const time = `${formatTime(taskLog.date)}`.green;
    const label = ` => ${taskLog.label}`.yellow;
    const difference = previousLog ? ` (+ ${getTimeBetweenTaskLogs(previousLog, taskLog)})`.cyan : '';

    console.log(id + time + label + difference);
}

export const renderTaskLogs = () => {
    const all = taskLogsRepository.getAll();

    if (!all.length) return;

    console.log("All logs".blue);
    all.forEach(renderTaskLog);
}

