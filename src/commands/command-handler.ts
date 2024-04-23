import {logMessage} from "../log-message.js";
import {allCommands} from "../static/all-commands.js";
import {renderer} from "../core/renderer/renderer.js";
import {Command, CommandGroup} from "../models/command.js";

export type CommandFn = ((value: any) => Promise<void>);

const execute = async (input: string, commands: Record<string, Command | CommandGroup>) => {
    const splint = input.split(" ");

    const commandName = splint.shift()!;

    const command = commands[commandName];

    if(!command)
        throw new Error(`Command "${commandName}" not found`);

    if('commands' in command) {
        await execute(splint.join(' '), command.commands);
        return;
    }

    const args = command.regex.exec(splint.join(' '))?.groups || {};

    try {
        await command.handler(args!);
    }
    catch (e) {
        await logMessage((e as Error).message, 'error');
    }
}

export const commandHandler = async (input: string) => {
    try {
        await execute(input, allCommands);
    }
    catch (e) {
        await logMessage((e as Error).message, 'error');
    }

    renderer.render();
}