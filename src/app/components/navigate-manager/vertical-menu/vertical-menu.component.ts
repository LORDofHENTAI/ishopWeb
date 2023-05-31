import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/services/token/token.service';
@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss']
})
export class VerticalMenuComponent implements OnInit {

  showFiller = true;
  isAdminIshop = false;
  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.isAdminIshop = this.getAdminIshop();
  }
  getAdminIshop(): boolean {
    return environment.listAdminsIshop.includes(this.tokenService.getLogin().toLowerCase());
  }
  reload(url: string): void {
    if (this.router.url === url)
      this.router.navigate(['empty'], { state: { url: url } });
  }

}
