import { allCommands } from "../../static/all-commands.js";
var render = function (commands, parentCommand) {
    Object.values(commands).forEach(function (command) {
        if ('commands' in command) {
            render(command.commands);
            return;
        }
        console.log("".concat(command.usage.cyan, ": ").concat(command.description.yellow));
    });
};
export var renderCommands = function () {
    console.log("Commands".blue);
    render(allCommands);
};
//# sourceMappingURL=render-commands.js.map