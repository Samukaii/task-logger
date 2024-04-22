import {CommandFn} from "./command-handler.js";
import {taskLogsRepository} from "../task-logs-repository.js";
import {logMessage} from "../log-message.js";

export const clearAll: CommandFn = async () => {
    taskLogsRepository.clearAll();

    await logMessage('All logs were deleted successfully!', 'success');
}
