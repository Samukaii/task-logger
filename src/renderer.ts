import figlet from "figlet";
import {getWorkLoad} from "./work-load.js";
import {journeyRecords} from "./journey-records.js";
import 'colors'
import {JourneyRecord} from "./models/journey-record.js";
import {formatTime} from "./utils/format-time.js";
import {timestampToTime} from "./utils/timestamp-to-time.js";
import {allCommands} from "./static/all-commands.js";
import {getTimeBetweenDateRecords} from "./utils/get-time-between-records.js";

const logCommands = () => {
    console.log("Commands".blue);

    Object.entries(allCommands).forEach(([key, command]) => {
        console.log(`${command.usage.cyan}: ${command.description.yellow}`)
    });
}

const logHeader = () => {
    console.log(figlet.textSync("Task Logger").blue);
    console.log("");
    console.log("Work load".blue);
    getWorkLoad().forEach(load => {
        console.log(formatTime(load.date).yellow);
    })
    console.log("");
    logCommands();
    console.log("");
}

const getTotalTime = () => {
    const lastRecord = journeyRecords.getAll().at(-1);
    const workLoads = getWorkLoad();
    const start = workLoads[0];

    if (!lastRecord) return;
    const diff = getTimeBetweenDateRecords(lastRecord.date, start.date);

    return timestampToTime(diff);
}

const logFooter = () => {
    const width = process.stdout.columns;

    if(!getTotalTime()) return;

    console.log("=".repeat(width).yellow);
    console.log("");
    console.log(`${"Total work time: ".blue}${getTotalTime()?.green}`);
};

const logRecord = (record: JourneyRecord, index: number) => {
    const lastRecord = journeyRecords.getAll()[index - 1];
    let difference = '';
    if (lastRecord) {
        const diff = getTimeBetweenDateRecords(lastRecord.date, record.date);
        difference = timestampToTime(diff);
    }


    console.log(`${index + 1}: `.yellow
        + formatTime(record.date).green
        + `${record.label ? ` => ${record.label}` : ''}`.yellow
        + `${difference ? ` (+ ${difference})`.cyan : ''}`
    );
}

const render = () => {
    console.clear();
    logHeader();

    const all = journeyRecords.getAll();

    if(!all.length) {
        logFooter();
        return;
    }

    console.log("All logs:".blue)
    all.forEach(logRecord);

    logFooter();
}


export const renderer = {
    render
}