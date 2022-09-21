import { Component, OnInit, Input } from '@angular/core';
import { OrderBodyAnsw } from 'src/app/models/order-models/order-body-answ';
import { OrderBodyReq } from 'src/app/models/order-models/order-body-req';
import { TokenService } from 'src/app/services/token/token.service';
import { OrderService } from 'src/app/services/order-service/order.service';
import { OrderBody } from 'src/app/models/order-models/order-body';
@Component({
  selector: 'app-show-data-order-form',
  templateUrl: './show-data-order-form.component.html',
  styleUrls: ['./show-data-order-form.component.scss']
})
export class ShowDataOrderFormComponent implements OnInit {

  @Input() sub_order_id: string;
  orderBodyAnsw?: OrderBody[];
  constructor(
    private tokenService: TokenService,
    private orderService: OrderService
  ) { }



  ngOnInit(): void {
    let orderBodyReq = new OrderBodyReq(this.tokenService.getToken(), this.sub_order_id)
    this.orderService.getSuborder(orderBodyReq).subscribe({
      next: response => {
        if (response) {
          this.getData(response);
        }
      },
      error: error => {
        console.log(error);
      }
    });
    console.log();
  }

  getData(response: OrderBodyAnsw) {
    this.orderBodyAnsw = response.body;
    console.log(this.orderBodyAnsw);
  }
}
