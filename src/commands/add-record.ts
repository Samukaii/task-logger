import {CommandFn} from "./command-handler.js";
import {taskLogsRepository} from "../task-logs-repository.js";

export const addRecord: CommandFn = async (value) => {
    const {label, taskId} = value;

    if(!label)
        throw new Error("You need to provide a label")

    taskLogsRepository.addRecord(label, taskId);
}
