import {tasksRepository} from "../../tasks-repository.js";
import {Task} from "../../models/task.js";

const renderTask = (task: Task) => {
    console.log(`${task.id.cyan} - ${task.name.yellow}`);
}

export const renderTasks = () => {
    const all = tasksRepository.getAll();

    if (!all.length) return;

    console.log('');
    console.log("Tasks".blue);
    all.forEach(renderTask);
}

