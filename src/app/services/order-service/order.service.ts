import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FindOrderReq } from 'src/app/models/order-models/find-order-req';
import { OrderListReq } from 'src/app/models/order-models/order-list-req';
import { OrderListAnsw } from 'src/app/models/order-models/order-list-answ';
import { OrderBodyReq } from 'src/app/models/order-models/order-body-req';
import { OrderBodyAnsw } from 'src/app/models/order-models/order-body-answ';
import { ToCassa } from 'src/app/models/order-models/toCassa';
import { PauseOrderReq } from 'src/app/models/order-models/pause-order-req';
import { BelPostReq } from 'src/app/models/order-models/bel-post-req';
import { BelPostAnsw } from 'src/app/models/order-models/bel-post-answ';
import { Status } from 'src/app/models/status';
import { Changer } from 'src/app/models/order-models/changer';
import { DelPostRequest } from 'src/app/models/order-models/del-post-request';
import { FindOrderByAdReq } from 'src/app/models/order-models/find-order-by-ad-req';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  urlOrder = environment.apiUrl + '/ishop';
  urlGetOders = this.urlOrder + '/orderlist/';
  urlOrderSearch = this.urlOrder + '/findorder/';
  urlOrderSearchByAdres = this.urlOrder + '/findorderbyad/'
  urlGetSuborder = this.urlOrder + '/suborder/';
  urlToCassa = this.urlOrder + '/cassa/';
  urlPause = this.urlOrder + '/pause/';
  urlBelpost = this.urlOrder + '/belpost/';
  urlReturn = this.urlOrder + '/back/';
  urlReturnToAssembly = this.urlOrder + '/backorder/';
  urlDlete = this.urlOrder + '/delete/';
  urlToBitrix = this.urlOrder + '/oms/';
  urlSaveChange = this.urlOrder + '/change/';
  urlDelpost = this.urlOrder + '/delpost/';
  urlEndOrder = this.urlOrder + '/endOrder/';
  urlReturnToRetail = this.urlOrder + '/returnToRetail/';

  constructor(private http: HttpClient) { }

  getOrders(data: OrderListReq): Observable<Array<OrderListAnsw>> {
    return this.http.post<any>(`${this.urlGetOders}`, data);
  }

  orderSearch(data: FindOrderReq): Observable<Array<OrderListAnsw>> {
    return this.http.post<any>(`${this.urlOrderSearch}`, data);
  }

  orderSearchByAdres(data: FindOrderByAdReq): Observable<Array<OrderListAnsw>> {
    return this.http.post<any>(`${this.urlOrderSearchByAdres}`, data)
  }

  getSuborder(data: OrderBodyReq): Observable<OrderBodyAnsw> {
    return this.http.post<any>(`${this.urlGetSuborder}`, data);
  }

  orderPause(data: PauseOrderReq): Observable<any> {
    return this.http.post<any>(`${this.urlPause}`, data);
  }

  orderGo(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlOrder}`, data);
  }

  orderShow(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlOrder}`, data);
  }

  orderWriteToCashbox(data: ToCassa): Observable<any> {
    return this.http.post<any>(`${this.urlToCassa}`, data);
  }

  orderReturnToAssembly(data: PauseOrderReq): Observable<string> {
    return this.http.post<string>(`${this.urlReturnToAssembly}`, data);
  }

  getBarcode(data: BelPostReq): Observable<BelPostAnsw> {
    return this.http.post<BelPostAnsw>(`${this.urlBelpost}`, data);
  }

  orderReturn(data: PauseOrderReq): Observable<string> {
    return this.http.post<string>(`${this.urlReturn}`, data);
  }

  orderDelete(data: PauseOrderReq): Observable<string> {
    return this.http.post<string>(`${this.urlDlete}`, data);
  }

  orderSendToBitrix(data: FindOrderReq): Observable<string> {
    return this.http.post<string>(`${this.urlToBitrix}`, data);
  }

  orderSaveChange(data: Changer): Observable<string> {
    return this.http.post<string>(`${this.urlSaveChange}`, data);
  }

  orderDeleteBelpostBarcode(data: DelPostRequest): Observable<string> {
    return this.http.post<string>(`${this.urlDelpost}`, data);
  }

  orderCompliteOrder(data: FindOrderReq): Observable<string> {
    return this.http.post<string>(`${this.urlEndOrder}`, data);
  }

  orderReturnToRetail(data: PauseOrderReq): Observable<string> {
    return this.http.post<string>(`${this.urlReturnToRetail}`, data);
  }
}
