import figlet from "figlet";
import {getWorkLoad} from "../../work-load.js";
import {formatTime} from "../../utils/format-time.js";
import {renderCommands} from "./render-commands.js";

export const renderHeader = () => {
    console.log(figlet.textSync("Task Logger").blue);
    console.log("");
    console.log("Work load".blue);
    getWorkLoad().forEach(load => {
        console.log(formatTime(load.date).yellow);
    })
    console.log("");
    renderCommands();
}