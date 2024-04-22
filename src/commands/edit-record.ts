import {CommandFn} from "./command-handler.js";
import {journeyRecords} from "../journey-records.js";
import {logMessage} from "../log-message.js";

export const editRecord: CommandFn = async (value) => {
    const {index, time} = value;

    journeyRecords.update((+index - 1), time);

    await logMessage("Log updated successfully!", 'success');
}
