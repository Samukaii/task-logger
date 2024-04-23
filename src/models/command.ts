import {CommandFn} from "../commands/command-handler.js";

export interface CommandGroup {
    commands: Record<string, Command>;
}


export interface Command {
    usage: string;
    description: string;
    regex: RegExp;
    handler: CommandFn;
}