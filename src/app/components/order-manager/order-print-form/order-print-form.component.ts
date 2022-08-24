import { Component, OnInit, Input } from '@angular/core';
import { OrderBodyAnsw } from 'src/app/models/order-models/order-body-answ';
import { OrderBody } from 'src/app/models/order-models/order-body';
import { ClientInfo } from 'src/app/models/order-models/client-info';
import { element } from 'protractor';

@Component({
  selector: 'app-order-print-form',
  templateUrl: './order-print-form.component.html',
  styleUrls: ['./order-print-form.component.scss']
})
export class OrderPrintFormComponent implements OnInit {

  @Input() data: OrderBodyAnsw;
  dataSource: Array<OrderBody> = [];
  client: ClientInfo = new ClientInfo('', '', '');
  displayedColumns = ['article', 'name', 'barcode', 'count', 'countReady', 'cost'];

  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.data.body;
    this.client = this.data.aboutClient;
  }
}
