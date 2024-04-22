import { allCommands } from "../../static/all-commands.js";
export var renderCommands = function () {
    console.log("Commands".blue);
    Object.values(allCommands).forEach(function (command) {
        console.log("".concat(command.usage.cyan, ": ").concat(command.description.yellow));
    });
};
//# sourceMappingURL=render-commands.js.map