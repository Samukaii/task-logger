import 'colors';
import { renderHeader } from "./render-header.js";
import { renderFooter } from "./render-footer.js";
import { renderTaskLogs } from "./render-task-logs.js";
import { renderReportLogs } from "./render-report-logs.js";
import { renderTasks } from "./render-tasks.js";
var renderParams = {};
var clearParams = function () { return renderParams = {}; };
var render = function () {
    console.clear();
    renderHeader();
    renderTasks();
    renderTaskLogs();
    if (renderParams.reportLog)
        renderReportLogs(renderParams.reportLog);
    renderFooter();
    clearParams();
};
export var renderer = {
    render: render,
    setReportLogs: function (params) {
        renderParams.reportLog = params;
    }
};
//# sourceMappingURL=renderer.js.map