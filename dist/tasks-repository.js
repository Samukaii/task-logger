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
var allTasks = [];
var save = function () {
    var content = JSON.stringify(allTasks);
    persistence.save('tasks/all-tasks', content);
};
var getSavedTasks = function () {
    var _a;
    return (_a = persistence.read('tasks/all-tasks')) !== null && _a !== void 0 ? _a : [];
};
var add = function (id, name) {
    var date = new Date();
    var alreadyRegistered = allTasks.some(function (task) {
        return task.id === id;
    });
    if (alreadyRegistered)
        throw new Error("You have already registered time: ".concat(formatTime(date)));
    allTasks.push({ id: id, name: name });
    save();
};
var remove = function (id) {
    var item = allTasks.find(function (task) { return task.id === id; });
    if (!item)
        throw new Error("Task with id: ".concat(id, " not found!"));
    allTasks = allTasks.filter(function (task) { return task.id !== id; });
    save();
};
var rename = function (id, name) {
    allTasks = allTasks.map(function (task) {
        if (task.id !== id)
            return task;
        return __assign(__assign({}, task), { name: name });
    });
    save();
};
var clearAll = function () {
    allTasks = [];
    save();
};
allTasks = getSavedTasks();
export var tasksRepository = {
    getAll: function () { return allTasks; },
    getOne: function (id) { return allTasks.find(function (task) { return task.id === id; }); },
    add: add,
    rename: rename,
    remove: remove,
    clearAll: clearAll
};
//# sourceMappingURL=tasks-repository.js.map