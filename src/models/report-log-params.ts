import {TaskLog} from "./task-log.js";

export interface ReportLogParams {
    date: Date;
    logs: TaskLog[];
}