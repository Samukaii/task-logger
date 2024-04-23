import { taskLogsRepository } from "../../task-logs-repository.js";
import { getTimeBetweenDateRecords } from "../../utils/get-time-between-records.js";
import { timestampToTime } from "../../utils/timestamp-to-time.js";
import { formatTime } from "../../utils/format-time.js";
var getTimeBetweenTaskLogs = function (first, second) {
    var difference = getTimeBetweenDateRecords(first.date, second.date);
    return timestampToTime(difference);
};
export var renderTaskLog = function (taskLog) {
    var previousLog = taskLogsRepository.getRecord(taskLog.id - 1);
    var id = "".concat(taskLog.id, ": ").yellow;
    var time = "".concat(formatTime(taskLog.date)).green + ' => ';
    var task = (taskLog === null || taskLog === void 0 ? void 0 : taskLog.taskId) ? "".concat(taskLog.taskId).blue + ' - ' : '';
    var label = "".concat(taskLog.label).yellow;
    var difference = previousLog ? " (+ ".concat(getTimeBetweenTaskLogs(previousLog, taskLog), ")").cyan : '';
    console.log(id + time + task + label + difference);
};
export var renderTaskLogs = function () {
    var all = taskLogsRepository.getAll();
    if (!all.length)
        return;
    console.log('');
    console.log("All logs".blue);
    all.forEach(renderTaskLog);
};
//# sourceMappingURL=render-task-logs.js.map