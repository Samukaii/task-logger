import {CommandFn} from "./command-handler.js";
import {journeyRecords} from "../journey-records.js";
import {logMessage} from "../log-message.js";

export const clearAll: CommandFn = async () => {
    journeyRecords.clearAll();

    await logMessage('All logs were deleted successfully!', 'success');
}
