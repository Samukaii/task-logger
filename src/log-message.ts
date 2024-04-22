import {wait} from "./utils/wait.js";

export const logMessage = async (message: string, level: "success" | "info" | "error" = "info") => {
    switch (level) {
        case "success":
            console.log(message.green);
            break;
        case "info":
            console.log(message.blue);
            break;
        case "error":
            console.log(message.red);
            break;
    }

    await wait(1000);
}
