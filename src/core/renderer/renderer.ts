import 'colors'
import {renderHeader} from "./render-header.js";
import {renderFooter} from "./render-footer.js";
import {renderTaskLogs} from "./render-task-logs.js";

const render = () => {
    console.clear();
    renderHeader();
    renderTaskLogs();
    renderFooter();
}

export const renderer = {
    render
}