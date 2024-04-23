import {addRecord} from "../commands/add-record.js";
import {removeRecord} from "../commands/remove-record.js";
import {addLabelRecord} from "../commands/add-label-record.js";
import {editRecord} from "../commands/edit-record.js";
import {clearAll} from "../commands/clear-all.js";
import {Command, CommandGroup} from "../models/command.js";
import {reportLogs} from "../commands/report-logs.js";
import {tasksRepository} from "../tasks-repository.js";
import {logMessage} from "../log-message.js";

export const allCommands: Record<string, Command | CommandGroup> = {
    add: {
        usage: 'add <taskId> <label>',
        description: 'Registers a log at current time',
        regex: /(?<taskId>\d*) (?<label>.*)/,
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
    report: {
        usage: "report <date>",
        description: 'Report logs for a specific date. Date accepts "yesterday", "today" or a date with format "yyyy-mm-dd"',
        regex: /(?<date>.*)/,
        handler: reportLogs
    },
    clear: {
        usage: "clear",
        description: "Clear all logs",
        regex: /.*/,
        handler: clearAll
    },
    task: {
        commands: {
            add: {
                usage: "task add <id> <name>",
                description: 'Create a task',
                regex: /(?<id>\d*) (?<name>.*)/,
                handler: async (params) => {
                    tasksRepository.add(params.id, params.name);
                    await logMessage('Task successfully created!', 'success');
                }
            },
            remove: {
                usage: "task remove <id>",
                description: 'Remove a task',
                regex: /(?<id>.*)/,
                handler: async (params) => {
                    tasksRepository.remove(params.id);
                    await logMessage('Task successfully deleted!', 'success');
                }
            },
        }

    }
}