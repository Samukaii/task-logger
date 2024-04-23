import {allCommands} from "../../static/all-commands.js";
import {Command, CommandGroup} from "../../models/command.js";

const render = (commands: Record<string, Command | CommandGroup>, parentCommand?: string) => {
    Object.values(commands).forEach(command => {
        if('commands' in command) {
            render(command.commands);
            return;
        }
        console.log(`${command.usage.cyan}: ${command.description.yellow}`)
    });
}

export const renderCommands = () => {
    console.log("Commands".blue);

    render(allCommands);
}