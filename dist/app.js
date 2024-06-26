#! /usr/bin/env node
import readline from 'readline';
import 'colors';
import { commandHandler } from "./commands/command-handler.js";
import { renderer } from "./core/renderer/renderer.js";
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
renderer.render();
rl.on('line', commandHandler);
//# sourceMappingURL=app.js.map