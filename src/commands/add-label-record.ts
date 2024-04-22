import {CommandFn} from "./command-handler.js";
import {journeyRecords} from "../journey-records.js";

export const addLabelRecord: CommandFn = async (value) => {
    const {index, label} = value;

    journeyRecords.addLabel((+index - 1), label)
}

