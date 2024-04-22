import {allCommands} from "../../static/all-commands.js";

export const renderCommands = () => {
    console.log("Commands".blue);

    Object.values(allCommands).forEach((command) => {
        console.log(`${command.usage.cyan}: ${command.description.yellow}`)
    });
}