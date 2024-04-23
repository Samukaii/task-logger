import {ReportLogParams} from "../../models/report-log-params.js";
import {renderTaskLog} from "./render-task-logs.js";

export const renderReportLogs = (reportLogParams: ReportLogParams) => {
    const {date, logs} = reportLogParams;

    const formatted = date.toLocaleString('en', {
        day: "2-digit",
        year: 'numeric',
        month: 'long'
    });

    console.log('');
    console.log(`Logs for ${formatted}`.blue);
    if (!logs.length) {
        console.log('');
        console.log('No logs found'.yellow)
    }

    logs.forEach(renderTaskLog);
    console.log('');
}