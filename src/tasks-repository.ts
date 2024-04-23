import {formatTime} from "./utils/format-time.js";
import {persistence} from "./core/save-file.js";
import {Task} from "./models/task.js";

let allTasks: Task[] = [];

const save = () => {
    const content = JSON.stringify(allTasks);

    persistence.save('tasks/all-tasks', content);
}

const getSavedTasks = () => {
    return persistence.read<Task[]>('tasks/all-tasks') ?? [];
}

const add = (id: string, name: string) => {
    const date = new Date();

    const alreadyRegistered = allTasks.some(task => {
        return task.id === id;
    })

    if (alreadyRegistered)
        throw new Error(`You have already registered time: ${formatTime(date)}`);

    allTasks.push({id, name});

    save();
}

const remove = (id: string) => {
    const item = allTasks.find(task => task.id === id);

    if (!item) throw new Error(`Task with id: ${id} not found!`);

    allTasks = allTasks.filter(task => task.id !== id);
    save();
}

const rename = (id: string, name: string) => {
    allTasks = allTasks.map(task => {
        if (task.id !== id) return task;

        return {...task, name}
    });

    save();
}

const clearAll = () => {
    allTasks = [];
    save();
}


allTasks = getSavedTasks();

export const tasksRepository = {
    getAll: () => allTasks,
    getOne: (id: string) => allTasks.find(task => task.id === id),
    add,
    rename,
    remove,
    clearAll
}