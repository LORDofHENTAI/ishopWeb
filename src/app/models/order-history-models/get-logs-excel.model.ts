import { HistoryReportModel } from "./history-report.model";

export class GetLogsExcelModel {
    constructor(
        public token: string,
        public history: HistoryReportModel[]
    ) { }
}