import {logMessage} from "../log-message.js";
import {allCommands} from "../static/all-commands.js";
import {renderer} from "../core/renderer/renderer.js";

export type CommandFn = ((value: any) => Promise<void>);

export const commandHandler = async (input: string) => {
    const splint = input.split(" ");

    const commandName = splint.shift()!;

    const command = allCommands[commandName];

    if(!command) {
        await logMessage(`Command "${commandName}" not found`, 'error');
        renderer.render();
        return;
    }

    const args = allCommands[commandName].regex.exec(splint.join(' '))?.groups || {};

    try {
        await command.handler(args!);
    }
    catch (e) {
        await logMessage((e as Error).message, 'error');
    }

    renderer.render();
}