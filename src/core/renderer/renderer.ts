import 'colors'
import {renderHeader} from "./render-header.js";
import {renderFooter} from "./render-footer.js";
import {renderTaskLogs} from "./render-task-logs.js";
import {ReportLogParams} from "../../models/report-log-params.js";
import {renderReportLogs} from "./render-report-logs.js";
import {renderTasks} from "./render-tasks.js";

interface Params {
    reportLog?: ReportLogParams;
}

let renderParams: Params = {}

const clearParams = () => renderParams = {};

const render = () => {
    console.clear();

    renderHeader();
    renderTasks();
    renderTaskLogs();
    if(renderParams.reportLog) renderReportLogs(renderParams.reportLog);
    renderFooter();

    clearParams();
}

export const renderer = {
    render,
    setReportLogs: (params: ReportLogParams) => {
        renderParams.reportLog = params;
    }
}