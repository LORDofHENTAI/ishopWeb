import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ManagerModel } from 'src/app/models/invoice-models/managerModel';
import { DirectorModel } from 'src/app/models/invoice-models/directormodel';
import { TokenService } from '../token/token.service';
import { RequestModel } from 'src/app/models/invoice-models/requestmodel';
@Injectable({
  providedIn: 'root'
})
export class DataInvoiceService {

  constructor(private http: HttpClient) {
  }

  getManager = environment.apiUrl + '/GetManagers?token='
  createManager = environment.apiUrl + '/CreateManager/'
  updateManager = environment.apiUrl + '/UpdateManager/'
  deleteManager = environment.apiUrl + '/DeleteManager/'

  getDirector = environment.apiUrl + '/GetDirector?'
  createDirector = environment.apiUrl + '/CreateDirector/'
  updateDirector = environment.apiUrl + '/UpdateDirector/'
  deleteDirector = environment.apiUrl + '/DeleteDirector/'

  getManagers(data): Observable<Array<ManagerModel>> {
    return this.http.get<Array<ManagerModel>>(`${this.getManager}${data}/`);
  }
  createManagers(data: ManagerModel): Observable<string> {
    console.log(data)
    return this.http.post<string>(this.createManager, data)
  }
  updateManagers(data: ManagerModel): Observable<string> {
    console.log(data)
    return this.http.post<string>(this.updateManager, data)
  }
  deleteManagers(data: RequestModel): Observable<string> {
    return this.http.post<string>(this.deleteManager, data)
  }

  getDirectors(data): Observable<Array<DirectorModel>> {
    return this.http.get<Array<DirectorModel>>(`${this.getDirector}token=${data}`)
  }
  createDirectors(data: DirectorModel): Observable<string> {
    console.log(data)
    return this.http.post<string>(this.createDirector, data)
  }
  updateDirectors(data: DirectorModel): Observable<string> {
    return this.http.post<string>(this.updateDirector, data)
  }
  deleteDirectors(data: RequestModel): Observable<string> {
    return this.http.post<string>(this.deleteDirector, data)
  }
}
