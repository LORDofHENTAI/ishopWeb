import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FullLoad } from 'src/app/models/full-load';
import { Observable } from 'rxjs';
import { Status } from 'src/app/models/status';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FullLoadService {
  fullLoad = environment.apiUrl + '/ishop/fullLoad/';
  stocksFullLoad = environment.apiUrl + '/ishop/stocksLoad/';
  priceFullLoad = environment.apiUrl + '/ishop/pricesLoad/';

  constructor(private http: HttpClient) { }

  fullIshopLoad(data: FullLoad): Observable<string> {
    return this.http.post<string>(this.fullLoad, data);
  }

  stockLoad(data: FullLoad): Observable<string> {
    return this.http.post<string>(this.stocksFullLoad, data);
  }
  priceLoad(data: FullLoad): Observable<string> {
    console.log('тут')
    return this.http.post<string>(this.priceFullLoad, data);
  }
}
