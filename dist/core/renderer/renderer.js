import 'colors';
import { renderHeader } from "./render-header.js";
import { renderFooter } from "./render-footer.js";
import { renderTaskLogs } from "./render-task-logs.js";
var render = function () {
    console.clear();
    renderHeader();
    renderTaskLogs();
    renderFooter();
};
export var renderer = {
    render: render
};
//# sourceMappingURL=renderer.js.map