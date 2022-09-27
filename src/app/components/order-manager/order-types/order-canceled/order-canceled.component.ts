import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-canceled',
  templateUrl: './order-canceled.component.html',
  styleUrls: ['./order-canceled.component.scss']
})
export class OrderCanceledComponent implements OnInit {

  status = 'ob';

  constructor() { }

  ngOnInit(): void {
  }

}
