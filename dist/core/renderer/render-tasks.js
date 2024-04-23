import { tasksRepository } from "../../tasks-repository.js";
var renderTask = function (task) {
    console.log("".concat(task.id.cyan, " - ").concat(task.name.yellow));
};
export var renderTasks = function () {
    var all = tasksRepository.getAll();
    if (!all.length)
        return;
    console.log('');
    console.log("Tasks".blue);
    all.forEach(renderTask);
};
//# sourceMappingURL=render-tasks.js.map