import {CommandFn} from "./command-handler.js";
import {journeyRecords} from "../journey-records.js";

export const addRecord: CommandFn = async (value) => {
    const {label} = value;

    if(!label)
        throw new Error("You need to provide a label")

    journeyRecords.addRecord(label);
}
