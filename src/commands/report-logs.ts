import {CommandFn} from "./command-handler.js";
import {taskLogsRepository} from "../task-logs-repository.js";
import {renderer} from "../core/renderer/renderer.js";

export const reportLogs: CommandFn = async (value) => {
    const {date} = value;

    const asDate = new Date();

    if(!date)
        throw new Error("You need to provide a date");

    if(!date.match(/\d\d\d\d-\d\d-\d\d/) && date.toLowerCase() !== "yesterday" && date.toLowerCase() !== "today")
        throw new Error(`The date format "${date}" was not expected. The correct format is "yyyy-mm-dd" or "yesterday"`);


    if(date === "yesterday") {
        asDate.setDate(asDate.getDate() - 1);
    }
    else if(date.match(/\d\d\d\d-\d\d-\d\d/)){
        const [year, month, day] = date.split('-');

        asDate.setFullYear(+year);
        asDate.setMonth(+month - 1);
        asDate.setDate(date.toLowerCase() === "yesterday" ? +day : +day);
        asDate.setHours(0, 0, 0, 0);
    }

    renderer.setReportLogs({
        date: asDate,
        logs: taskLogsRepository.getLogsByDate(asDate)
    });
}
