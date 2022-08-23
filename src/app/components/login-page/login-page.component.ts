import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';
import { LoginQuery } from 'src/app/models/login-models/login-query';
import { LoginResponse } from 'src/app/models/login-models/login-response';
import { SnakebarService } from 'src/app/services/snakebar/snakebar.service';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isLoginUser = false;
  loginQuery = new LoginQuery("", "");

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageFailLogin = 'Вход не разрешен, имя или пароль неверны.';
  messageStatusTrue = 'Ваша сообщение в обработке.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    private router: Router,
    private titleService: Title,
    private loginService: LoginService,
    private tokenService: TokenService,
    private snackbarService: SnakebarService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('IShop Mile');
  }

  onClickLogin() {
    this.loginService.getLogin(this.loginQuery).subscribe({
      next: response => {
        if (this.checkResponse(response)) {
          this.tokenService.setCookie(response);
          this.tokenService.logEvent(true);
          this.router.navigate(['/orders/ready-build']);
        }
        else
          this.snackbarService.openSnackBar(this.messageFailLogin, this.action, this.styleNoConnect);
      },
      error: error => {
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      }
    });
  }

  checkResponse(response: LoginResponse): boolean {
    if (response)
      if (response.token)
        if (response.token.length > 0)
          return true;
        else return false;
      else return false;
    else return false;
  }
}
