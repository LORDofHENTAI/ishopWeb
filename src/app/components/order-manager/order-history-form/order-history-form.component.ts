import { Component, OnInit } from '@angular/core';
import { orderHistoryReq } from 'src/app/models/order-models/order-history';
import { orderHistoryRes } from 'src/app/models/order-models/order-history-Res';
import { TokenService } from 'src/app/services/token/token.service';
import { OrderService } from 'src/app/services/order-service/order.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-order-history-form',
  templateUrl: './order-history-form.component.html',
  styleUrls: ['./order-history-form.component.scss']
})
export class OrderHistoryFormComponent implements OnInit {

  constructor(private tokenService: TokenService, private orderService: OrderService) { }

  displayedColumns: string[] = ['Номер заказа', 'Статус', 'Логин', 'Дата']
  historyList: Array<orderHistoryRes> = [new orderHistoryRes(0, '', '', '', new Date)]
  selectedDate = new Date()
  nowFormatted: string
  searchOrder: string
  ngOnInit(): void {
    this.getHistory()

  }
  getHistory() {
    this.orderService.orderStatusHistory(new orderHistoryReq(this.tokenService.getLogin())).subscribe({
      next: response => {
        if (response) {
          console.log(response)
          this.historyList = response
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }
  getHistoryByDate() {
    this.nowFormatted = formatDate(this.selectedDate, 'dd.MM.yyyy', 'en-US');
    this.orderService.orderStatusHistoryByDate(new orderHistoryReq(this.tokenService.getLogin(), null, this.nowFormatted)).subscribe({
      next: responce => {
        if (responce) {
          this.historyList = responce
        }
      },
      error: error => {
        console.log(error)
      }
    })
  }
  getHistoryByOrder() {
    console.log(this.searchOrder)
    this.orderService.orderStatusHistoryByOrder(new orderHistoryReq(this.tokenService.getLogin(), this.searchOrder)).subscribe({
      next: responce => {
        if (responce) {
          console.log(responce)
          this.historyList = responce
        }
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
