import {CommandFn} from "./command-handler.js";
import {taskLogsRepository} from "../task-logs-repository.js";

export const removeRecord: CommandFn = async (value) => {
    const {index} = value;

    taskLogsRepository.remove((+index - 1));
}
