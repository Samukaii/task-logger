var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { formatTime } from "./utils/format-time.js";
import * as fs from "node:fs";
import * as os from "node:os";
var allRecords = [];
var formatCurrentDate = function () {
    var now = new Date();
    return "".concat(now.getFullYear(), "-").concat(now.getMonth() + 1, "-").concat(now.getDate());
};
var save = function () {
    var userDir = os.homedir();
    var dir = "".concat(userDir, "/task-logger/registers");
    fs.mkdirSync(dir, { recursive: true });
    var content = JSON.stringify(allRecords);
    fs.writeFileSync("".concat(dir, "/").concat(formatCurrentDate(), ".json"), content);
};
var getSaved = function () {
    var userDir = os.homedir();
    var dir = "".concat(userDir, "/task-logger/registers");
    fs.mkdirSync(dir, { recursive: true });
    try {
        var file = fs.readFileSync("".concat(dir, "/").concat(formatCurrentDate(), ".json"), 'utf-8');
        return JSON.parse(file);
    }
    catch (e) {
        return [];
    }
};
var sortAll = function () {
    allRecords = allRecords.sort(function (a, b) { return a.date.getTime() - b.date.getTime(); });
};
var addRecord = function (label) {
    var date = new Date();
    var alreadyRegistered = allRecords.some(function (record) {
        return formatTime(record.date) === formatTime(date);
    });
    if (alreadyRegistered)
        throw new Error("You have already registered time: ".concat(formatTime(date)));
    allRecords.push({ date: date, label: label, id: allRecords.length });
    sortAll();
    save();
};
var remove = function (index) {
    var item = allRecords[index];
    if (!item)
        throw new Error("Record ".concat(index + 1, " not found!"));
    allRecords.splice(index, 1);
    sortAll();
    save();
};
var addLabel = function (index, label) {
    var record = allRecords[index];
    if (!record)
        throw new Error("Record ".concat(index + 1, " not found!"));
    record.label = label;
    save();
};
var update = function (index, time) {
    var record = allRecords[index];
    if (!record)
        throw new Error("Record ".concat(index + 1, " not found!"));
    if (!/\d\d:\d\d/.test(time))
        throw new Error("The time provided is incorrectly formatted");
    var _a = time.split(':'), hours = _a[0], minutes = _a[1];
    var now = new Date(record.date);
    now.setHours(+hours, +minutes);
    record.date = now;
    sortAll();
    save();
};
var clearAll = function () {
    allRecords = [];
    save();
};
allRecords = getSaved().map(function (record) {
    return __assign(__assign({}, record), { date: new Date(record.date) });
});
export var taskLogsRepository = {
    getAll: function () { return allRecords.map(function (record, index) { return (__assign(__assign({}, record), { id: index + 1 })); }); },
    getRecord: function (id) { return allRecords[id - 1]; },
    getLastRecord: function () { return allRecords.at(-1); },
    addRecord: addRecord,
    remove: remove,
    addLabel: addLabel,
    update: update,
    clearAll: clearAll
};
//# sourceMappingURL=task-logs-repository.js.map