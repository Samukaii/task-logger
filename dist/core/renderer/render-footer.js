import { taskLogsRepository } from "../../task-logs-repository.js";
import { getWorkLoad } from "../../work-load.js";
import { getTimeBetweenDateRecords } from "../../utils/get-time-between-records.js";
import { timestampToTime } from "../../utils/timestamp-to-time.js";
var getTotalTime = function () {
    var lastRecord = taskLogsRepository.getAll().at(-1);
    var workLoads = getWorkLoad();
    var start = workLoads[0];
    if (!lastRecord)
        return;
    var diff = getTimeBetweenDateRecords(lastRecord.date, start.date);
    return timestampToTime(diff);
};
export var renderFooter = function () {
    var _a;
    var width = process.stdout.columns;
    if (!getTotalTime())
        return;
    console.log("=".repeat(width).yellow);
    console.log("");
    console.log("".concat("Total work time: ".blue).concat((_a = getTotalTime()) === null || _a === void 0 ? void 0 : _a.green));
};
//# sourceMappingURL=render-footer.js.map