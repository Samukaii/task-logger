import { renderTaskLog } from "./render-task-logs.js";
export var renderReportLogs = function (reportLogParams) {
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
//# sourceMappingURL=render-report-logs.js.map