import {CommandFn} from "./command-handler.js";
import {journeyRecords} from "../journey-records.js";

export const removeRecord: CommandFn = async (value) => {
    const {index} = value;

    journeyRecords.remove((+index - 1));
}
