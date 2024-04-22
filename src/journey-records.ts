import {JourneyRecord} from "./models/journey-record.js";
import {formatTime} from "./utils/format-time.js";
import * as fs from "node:fs";
import * as os from "node:os";

let allRecords: JourneyRecord[] = [];

const formatCurrentDate = () => {
    const now = new Date();

    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

const save = () => {
    const userDir = os.homedir();
    const dir = `${userDir}/task-logger/registers`;

    fs.mkdirSync(dir, {recursive: true});

    const content = JSON.stringify(allRecords);

    fs.writeFileSync(`${dir}/${formatCurrentDate()}.json`, content);
}

const getSaved = () => {
    const userDir = os.homedir();
    const dir = `${userDir}/task-logger/registers`;

    fs.mkdirSync(dir, {recursive: true});

    try {
        const file = fs.readFileSync(`${dir}/${formatCurrentDate()}.json`, 'utf-8');

        return JSON.parse(file) as JourneyRecord[];
    }
    catch (e) {
        return [];
    }
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

    allRecords.push({date, label});

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


allRecords = getSaved().map(record => {
    return {
        ...record,
        date: new Date(record.date)
    }
});

export const journeyRecords = {
    getAll: () => allRecords,
    addRecord,
    remove,
    addLabel,
    update,
    clearAll
}