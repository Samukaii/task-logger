import {TaskLog} from "./models/task-log.js";
import {formatTime} from "./utils/format-time.js";
import * as fs from "node:fs";
import * as os from "node:os";

let allRecords: TaskLog[] = [];

const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const save = () => {
    const userDir = os.homedir();
    const dir = `${userDir}/task-logger/registers`;

    fs.mkdirSync(dir, {recursive: true});

    const content = JSON.stringify(allRecords);

    fs.writeFileSync(`${dir}/${formatDate(new Date())}.json`, content);
}

const getLogsByDate = (date: Date) => {
    const formatted = formatDate(date);
    const userDir = os.homedir();
    const dir = `${userDir}/task-logger/registers`;

    fs.mkdirSync(dir, {recursive: true});

    let logs: TaskLog[] = [];

    try {
        const file = fs.readFileSync(`${dir}/${formatted}.json`, 'utf-8');

        logs = JSON.parse(file) as TaskLog[];
    }
    catch (e) {}

    return logs.map((record, index) => {
        return {
            ...record,
            id: index + 1,
            date: new Date(record.date)
        }
    });
}

const sortAll = () => {
    allRecords = allRecords.sort((a, b) => a.date.getTime() - b.date.getTime())
}

const addRecord = (label?: string) => {
    const date = new Date();

    const alreadyRegistered = allRecords.some(record => {
        return formatTime(record.date) === formatTime(date);
    })

    if (alreadyRegistered)
        throw new Error(`You have already registered time: ${formatTime(date)}`);

    allRecords.push({date, label, id: allRecords.length});

    sortAll();
    save();
}

const remove = (index: number) => {
    const item = allRecords[index];

    if (!item) throw new Error(`Record ${index + 1} not found!`);

    allRecords.splice(index, 1);
    sortAll();
    save();
}

const addLabel = (index: number, label: string) => {
    const record = allRecords[index];

    if (!record) throw new Error(`Record ${index + 1} not found!`);

    record.label = label;
    save();
}

const update = (index: number, time: string) => {
    const record = allRecords[index];

    if (!record) throw new Error(`Record ${index + 1} not found!`);

    if (!/\d\d:\d\d/.test(time))
        throw new Error(`The time provided is incorrectly formatted`);

    const [hours, minutes] = time.split(':');

    const now = new Date(record.date);

    now.setHours(+hours, +minutes);

    record.date = now;
    sortAll();
    save();
}

const clearAll = () => {
    allRecords = [];
    save();
}


allRecords = getLogsByDate(new Date());

export const taskLogsRepository = {
    getAll: () => allRecords.map((record, index) => ({
        ...record,
        id: index + 1
    })),
    getRecord: (id: number) => allRecords[id - 1],
    getLastRecord: () => allRecords.at(-1),
    getLogsByDate,
    addRecord,
    remove,
    addLabel,
    update,
    clearAll
}