import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { UnloadingComponent } from './unloading-dialog/unloading/unloading.component';
import { GroupToArticleComponent } from './group-to-article/group-to-article.component';
import { DataInvoiceDialogComponent } from './data-invoice-dialog/data-invoice-dialog.component';
import { InstructionDialogComponent } from './instruction-dialog/instruction-dialog.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoginUser = false;
  userName = '';
  isAdminIshop = false;
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private dialog: MatDialog
  ) {
    this.tokenService.events$.forEach(value => { this.eventLogin(value) });
  }

  ngOnInit(): void {
    if (this.tokenService.isLoginUser()) {
      this.isLoginUser = true;
      this.userName = this.tokenService.getLogin();
      this.isAdminIshop = this.getAdminIshop();
      console.log('>>>' + this.isAdminIshop)
      // this.router.navigate(['/orders']);
    }
    else {
      this.isLoginUser = false;
      this.router.navigate(['/login']);
    }
  }
  getAdminIshop(): boolean {
    return environment.listAdminsIshop.includes(this.tokenService.getLogin().toLowerCase());
  }
  eventLogin(event: boolean) {
    if (event === true)
      this.isLoginUser = event;
    else {
      this.isLoginUser = event;
      this.router.navigate(['/login']);
    }
  }

  onClickLogout() {
    localStorage.clear();
    this.tokenService.deleteCookie();
    this.isLoginUser = false;
    this.router.navigate(['/login']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(UnloadingComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openGroupToArticleDialog() {
    const dialogRef = this.dialog.open(GroupToArticleComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  openDataInvoiceDialog() {
    const dialogRef = this.dialog.open(DataInvoiceDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
  opentInstructionDialog() {
    const dialogRef = this.dialog.open(InstructionDialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    })
  }

}
