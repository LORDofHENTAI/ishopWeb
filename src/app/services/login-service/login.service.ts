import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginQuery } from 'src/app/models/login-models/login-query';
import { LoginResponse } from 'src/app/models/login-models/login-response';
import { Logout } from 'src/app/models/login-models/logout';
import { LogoutStatus } from 'src/app/models/login-models/logout-status';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlLogin = environment.apiUrlLog + '/auth/?data'; //адрес для логинизации
  private urlLogout = environment.apiUrlLog + '/logout/'; //адрес для логаута


  constructor(private http: HttpClient) { }

  getLogin(login: LoginQuery): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.urlLogin}`, login);
  }

  postLogout(login: Logout): Observable<LogoutStatus> {
    return this.http.post<LogoutStatus>(`${this.urlLogout}`, login);
  }
}
