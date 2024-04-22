import figlet from "figlet";
import { getWorkLoad } from "./work-load.js";
import { journeyRecords } from "./journey-records.js";
import 'colors';
import { formatTime } from "./utils/format-time.js";
import { timestampToTime } from "./utils/timestamp-to-time.js";
import { allCommands } from "./static/all-commands.js";
import { getTimeBetweenDateRecords } from "./utils/get-time-between-records.js";
var logCommands = function () {
    console.log("Commands".blue);
    Object.entries(allCommands).forEach(function (_a) {
        var key = _a[0], command = _a[1];
        console.log("".concat(command.usage.cyan, ": ").concat(command.description.yellow));
    });
};
var logHeader = function () {
    console.log(figlet.textSync("Task Logger").blue);
    console.log("");
    console.log("Work load".blue);
    getWorkLoad().forEach(function (load) {
        console.log(formatTime(load.date).yellow);
    });
    console.log("");
    logCommands();
    console.log("");
};
var getTotalTime = function () {
    var lastRecord = journeyRecords.getAll().at(-1);
    var workLoads = getWorkLoad();
    var start = workLoads[0];
    if (!lastRecord)
        return;
    var diff = getTimeBetweenDateRecords(lastRecord.date, start.date);
    return timestampToTime(diff);
};
var logFooter = function () {
    var _a;
    var width = process.stdout.columns;
    if (!getTotalTime())
        return;
    console.log("=".repeat(width).yellow);
    console.log("");
    console.log("".concat("Total work time: ".blue).concat((_a = getTotalTime()) === null || _a === void 0 ? void 0 : _a.green));
};
var logRecord = function (record, index) {
    var lastRecord = journeyRecords.getAll()[index - 1];
    var difference = '';
    if (lastRecord) {
        var diff = getTimeBetweenDateRecords(lastRecord.date, record.date);
        difference = timestampToTime(diff);
    }
    console.log("".concat(index + 1, ": ").yellow
        + formatTime(record.date).green
        + "".concat(record.label ? " => ".concat(record.label) : '').yellow
        + "".concat(difference ? " (+ ".concat(difference, ")").cyan : ''));
};
var render = function () {
    console.clear();
    logHeader();
    var all = journeyRecords.getAll();
    if (!all.length) {
        logFooter();
        return;
    }
    console.log("All logs:".blue);
    all.forEach(logRecord);
    logFooter();
};
export var renderer = {
    render: render
};
//# sourceMappingURL=renderer.js.map