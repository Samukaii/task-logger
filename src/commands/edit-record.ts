import {CommandFn} from "./command-handler.js";
import {taskLogsRepository} from "../task-logs-repository.js";
import {logMessage} from "../log-message.js";

export const editRecord: CommandFn = async (value) => {
    const {index, time} = value;

    taskLogsRepository.update((+index - 1), time);

    await logMessage("Log updated successfully!", 'success');
}
