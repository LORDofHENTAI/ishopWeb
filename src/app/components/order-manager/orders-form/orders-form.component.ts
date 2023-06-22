import { Component, OnInit, Input } from '@angular/core';
import { OrderSearchService } from 'src/app/services/order-search/order-search.service';
import { TimerService } from 'src/app/services/timer/timer.service';
import { SnakebarService } from 'src/app/services/snakebar/snakebar.service';
import { Title } from '@angular/platform-browser';
import { OrderListAnsw } from 'src/app/models/order-models/order-list-answ';
import { timer } from 'rxjs';
import { FindOrderReq } from 'src/app/models/order-models/find-order-req';
import { TokenService } from 'src/app/services/token/token.service';
import { OrderService } from 'src/app/services/order-service/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss']
})
export class OrdersFormComponent implements OnInit {

  @Input() data: string;
  tabIndex: number;
  searchNumOrder: string = '';
  timerValue: any = 120;
  intervalId: any;
  checkedOrders = false;
  pause = false;
  isAdminIshop: boolean = false;
  isChecked: boolean = false;

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    private titleService: Title,
    private tokenService: TokenService,
    private timerService: TimerService,
    private orderService: OrderService,
    private snackbarService: SnakebarService,
    private orderSearchService: OrderSearchService,) { }

  ngOnInit(): void {
    this.tabIndex = Number(localStorage.getItem('tabIndex'))
    console.log(this.tokenService.getToken())
    this.titleService.setTitle('IShop Mile');
    this.isAdminIshop = this.getAdminIshop();
    this.intervalId = setInterval(() => {
      this.timerValue = this.timerValue - 1;
      if (this.timerValue == 0) {
        this.snackbarService.openSnackBar('Список заказов был обновлен', 'Ok');
        this.timerService.updateEvent(this.tabIndex);
        this.timerValue = 120;
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  selectedTab($event) {
    this.tabIndex = $event.index;
    localStorage.setItem('tabIndex', String(this.tabIndex));
    if (this.searchNumOrder)
      this.orderSearchService.searchEvent({ order: this.searchNumOrder, shop: this.tabIndex });
    this.timerValue = 120;
  }

  onInputSearchData($event) {
    this.searchNumOrder = $event;
    this.timerValue = 120;
  }

  onClearNumOrder() {
    this.searchNumOrder = '';
    this.orderSearchService.searchEvent({ order: this.searchNumOrder, shop: this.tabIndex });
  }

  onSearchOrder() {
    this.timerValue = 120;
    if (!this.pause) {
      this.orderSearchService.searchEvent({ order: this.searchNumOrder, shop: this.tabIndex, check: this.isChecked });
      this.pause = true;
      let t = timer(0, 1000).subscribe(vl => {
        console.log(vl);
        if (vl >= 3) {
          this.pause = false;
          t.unsubscribe();
        }
      });
    }
  }


  // searchOrder(searchValue: string) {
  //   if(searchValue) {
  //     let findOrderReq = new FindOrderReq(this.tokenService.getToken(), searchValue, this.data);
  //     this.orderService.orderSearch(findOrderReq).subscribe(response => {
  //       if(response) {
  //         let orders = response;

  //       }
  //     },
  //     error => {
  //       console.log(error);
  //       this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
  //     });
  //   }
  // }

  onChanged(listOrders: Array<OrderListAnsw>) {
    if (listOrders.length > 0)
      this.checkedOrders = true;
    else
      this.checkedOrders = false;
  }

  onListOrdersPauseOrGo() {

  }

  getAdminIshop(): boolean {
    return environment.listAdminsIshop.includes(this.tokenService.getLogin().toLowerCase());
  }
}
