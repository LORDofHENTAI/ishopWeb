import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';
import { formatDate } from '@angular/common';
import { SnakebarService } from 'src/app/services/snakebar/snakebar.service';
import { HistoryService } from 'src/app/services/order-history/order-history.service';
import { GetHistoryModel } from 'src/app/models/order-history-models/get-history.model';
import { HistoryReportModel } from 'src/app/models/order-history-models/history-report.model';
import { GetLogsExcelModel } from 'src/app/models/order-history-models/get-logs-excel.model';
export interface PropList {
  statusName: string,
  status: string
}
@Component({
  selector: 'app-order-history-form',
  templateUrl: './order-history-form.component.html',
  styleUrls: ['./order-history-form.component.scss'],
})
export class OrderHistoryFormComponent implements OnInit {
  constructor(
    private snackBarService: SnakebarService,
    private historyService: HistoryService,
    private tokenService: TokenService
  ) { }
  startDate: Date = new Date
  endDate: Date = new Date
  selectedUser: string
  selectedOrder: string
  selectedStatus: string = '%'
  selectedStore: string = '%'
  selectedDelivery: string = '%'
  logsList: HistoryReportModel[]
  //#region snackbar prop
  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageFailLogin = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';
  //#endregion
  //#region property list 
  statusList: PropList[] = [
    { status: '%', statusName: 'Все' },
    { status: 'не принят', statusName: 'Готов к сборке' },
    { status: 'в паузе', statusName: 'Некомплект' },
    { status: 'завершен', statusName: 'Готов к отгрузке' },
    { status: 'Выполнен', statusName: 'Выполнен' },
    { status: 'Отмена', statusName: 'Вернуть в секцию' },
    { status: 'Заблокирован', statusName: 'Отменен' },
  ]
  storeList: PropList[] = [
    { status: '%', statusName: 'Все' },
    { status: '8', statusName: 'Долгиновский' },
    { status: '11', statusName: 'Брест' },
    { status: '18', statusName: 'Партизанский' },
    { status: '21', statusName: 'Тимирязева' },
    { status: '22', statusName: 'Каменогорская' },
    { status: '24', statusName: 'Независимости' },
    { status: '25', statusName: 'Молодечно' },
    { status: '31', statusName: 'Diamond' },
    { status: '32', statusName: 'Outleto' },
    { status: '34', statusName: 'Expobel' },
    { status: '35', statusName: 'Горецкого' },
  ]
  displayedColumns: string[] = ['Логин', 'ФИО', '№ Заказа', 'Тип доставки', 'Склад', 'Статус', 'Дата действия']
  deliveryTypes: PropList[] = [
    { status: '%', statusName: 'Все' },
    { status: '', statusName: 'Самовывоз' },
    { status: 'mileby', statusName: 'Доставка' },
    { status: 'belpost', statusName: 'Белпочта' },
  ]
  //#endregion

  ngOnInit(): void {
  }
  getHistory() {
    let start = formatDate(this.startDate, 'dd.MM.yyyy 00:00:00', 'en-US')
    let end = formatDate(this.endDate, 'dd.MM.yyyy 21:00:00', 'en-US')
    this.historyService.GetHistory(new GetHistoryModel(this.tokenService.getToken(), this.selectedOrder, this.selectedStatus, this.selectedStore, this.selectedUser, this.selectedDelivery, start, end)).subscribe({
      next: result => {
        this.logsList = result
      },
      error: error => {
        console.log(error)
        this.snackBarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    })
  }
  exportExcel() {
    this.historyService.ExportToExcel(new GetLogsExcelModel(this.tokenService.getToken(), this.logsList))
  }
  clearFilter() {
    this.selectedUser = null
    this.selectedOrder = null
    this.selectedStatus = '%'
    this.selectedStore = '%'
    this.selectedDelivery = '%'
  }
}
