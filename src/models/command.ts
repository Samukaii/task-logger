import {CommandFn} from "../commands/command-handler.js";

export interface Command {
    usage: string;
    description: string;
    regex: RegExp;
    handler: CommandFn;
}