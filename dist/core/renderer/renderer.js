import 'colors';
import { renderHeader } from "./render-header.js";
import { renderFooter } from "./render-footer.js";
import { renderTaskLog, renderTaskLogs } from "./render-task-logs.js";
var reportLogParams;
var renderReportLogs = function (reportLogParams) {
    var date = reportLogParams.date, logs = reportLogParams.logs;
    var formatted = date.toLocaleString('en', {
        day: "2-digit",
        year: 'numeric',
        month: 'long'
    });
    console.log('');
    console.log("Logs for ".concat(formatted).blue);
    if (!logs.length) {
        console.log('');
        console.log('No logs found'.yellow);
    }
    logs.forEach(renderTaskLog);
    console.log('');
};
var render = function () {
    console.clear();
    renderHeader();
    renderTaskLogs();
    if (reportLogParams)
        renderReportLogs(reportLogParams);
    renderFooter();
    reportLogParams = null;
};
export var renderer = {
    render: render,
    setReportLogs: function (params) {
        reportLogParams = params;
    }
};
//# sourceMappingURL=renderer.js.map