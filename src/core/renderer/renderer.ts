import 'colors'
import {renderHeader} from "./render-header.js";
import {renderFooter} from "./render-footer.js";
import {renderTaskLog, renderTaskLogs} from "./render-task-logs.js";
import {ReportLogParams} from "../../models/report-log-params.js";
import {reportLogs} from "../../commands/report-logs.js";

let reportLogParams: ReportLogParams | null;

const renderReportLogs = (reportLogParams: ReportLogParams) => {
    const {date, logs} = reportLogParams;

    const formatted = date.toLocaleString('en', {
        day: "2-digit",
        year: 'numeric',
        month: 'long'
    });

    console.log('');
    console.log(`Logs for ${formatted}`.blue);
    if(!logs.length) {
        console.log('');
        console.log('No logs found'.yellow)
    }

    logs.forEach(renderTaskLog);
    console.log('');
}

const render = () => {
    console.clear();
    renderHeader();
    renderTaskLogs();
    if(reportLogParams) renderReportLogs(reportLogParams);
    renderFooter();
    reportLogParams = null;
}

export const renderer = {
    render,
    setReportLogs: (params: ReportLogParams) => {
        reportLogParams = params;
    }
}