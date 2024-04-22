import {addRecord} from "../commands/add-record.js";
import {removeRecord} from "../commands/remove-record.js";
import {addLabelRecord} from "../commands/add-label-record.js";
import {editRecord} from "../commands/edit-record.js";
import {clearAll} from "../commands/clear-all.js";
import {Command} from "../models/command.js";

export const allCommands: Record<string, Command> = {
    add: {
        usage: 'add <label>',
        description: 'Registers a log at current time',
        regex: /(?<label>.*)/,
        handler: addRecord
    },
    remove: {
        usage: "remove <id>",
        description: "Removes a log",
        regex: /(?<index>.*)/,
        handler: removeRecord,
    },
    label: {
        usage: "label <id> <label>",
        description: "Adds a label to log",
        regex: /(?<index>\w*) (?<label>.*)/,
        handler: addLabelRecord
    },
    edit: {
        usage: "edit <id> <time>",
        description: "Updates a log",
        regex: /(?<index>\w*) (?<time>.*)/,
        handler: editRecord
    },
    clear: {
        usage: "clear",
        description: "Clear all logs",
        regex: /.*/,
        handler: clearAll
    }
}