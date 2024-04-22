import {CommandFn} from "./command-handler.js";
import {taskLogsRepository} from "../task-logs-repository.js";

export const addLabelRecord: CommandFn = async (value) => {
    const {index, label} = value;

    taskLogsRepository.addLabel((+index - 1), label)
}

