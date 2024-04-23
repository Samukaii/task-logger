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
import { persistence } from "./core/save-file.js";
var allRecords = [];
var formatDate = function (date) {
    return "".concat(date.getFullYear(), "-").concat(date.getMonth() + 1, "-").concat(date.getDate());
};
var save = function () {
    var content = JSON.stringify(allRecords);
    persistence.save("registers/".concat(formatDate(new Date())), content);
};
var getLogsByDate = function (date) {
    var _a;
    var formatted = formatDate(date);
    var logs = (_a = persistence.read("registers/".concat(formatted))) !== null && _a !== void 0 ? _a : [];
    return logs.map(function (record, index) {
        return __assign(__assign({}, record), { id: index + 1, date: new Date(record.date) });
    });
};
var sortAll = function () {
    allRecords = allRecords.sort(function (a, b) { return a.date.getTime() - b.date.getTime(); });
};
var addRecord = function (label, taskId) {
    var date = new Date();
    var alreadyRegistered = allRecords.some(function (record) {
        return formatTime(record.date) === formatTime(date);
    });
    if (alreadyRegistered)
        throw new Error("You have already registered time: ".concat(formatTime(date)));
    allRecords.push({ date: date, label: label, id: allRecords.length, taskId: taskId });
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
allRecords = getLogsByDate(new Date());
export var taskLogsRepository = {
    getAll: function () { return allRecords.map(function (record, index) { return (__assign(__assign({}, record), { id: index + 1 })); }); },
    getRecord: function (id) { return allRecords[id - 1]; },
    getLastRecord: function () { return allRecords.at(-1); },
    getLogsByDate: getLogsByDate,
    addRecord: addRecord,
    remove: remove,
    addLabel: addLabel,
    update: update,
    clearAll: clearAll
};
//# sourceMappingURL=task-logs-repository.js.map