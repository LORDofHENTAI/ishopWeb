import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistoryReportModel } from 'src/app/models/order-history-models/history-report.model';
import { GetHistoryModel } from 'src/app/models/order-history-models/get-history.model';
import { GetLogsExcelModel } from 'src/app/models/order-history-models/get-logs-excel.model';
import { saveAs } from 'file-saver'
import { SnakebarService } from '../snakebar/snakebar.service';
import { Status } from 'src/app/models/status';
@Injectable({
    providedIn: 'root'
})
export class HistoryService {
    messageNoConnect = 'Нет соединения, попробуйте позже.';
    messageFailLogin = 'Нет соединения, попробуйте позже.';
    action = 'Ok';
    styleNoConnect = 'red-snackbar';
    constructor(
        private http: HttpClient,
        private snackbarService: SnakebarService) { }
    getHistoryURL = environment.apiUrl + '/GetHistory'
    exportToExcelURl = environment.apiUrl + '/ExportToExcel'
    clearHistoryURL = environment.apiUrl + '/ClearHistory'
    GetHistory(data: GetHistoryModel): Observable<HistoryReportModel[]> {
        return this.http.post<HistoryReportModel[]>(this.getHistoryURL, data)
    }
    ExportToExcel(data: GetLogsExcelModel) {
        this.http.post(this.exportToExcelURl, data, { responseType: 'blob' }).subscribe({
            next: result => {
                saveAs(result, 'print')
            },
            error: error => {
                console.log(error)
                this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
            }
        })
    }
    ClearHistory(data: GetHistoryModel): Observable<Status> {
        return this.http.post<Status>(this.clearHistoryURL, data)
    }
}