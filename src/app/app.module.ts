import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
// -----------------------------------------------------------------------------------------
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// -----------------------------------------------------------------------------------------
import { NgxPrintModule } from 'ngx-print';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
// -----------------------------------------------------------------------------------------
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavigateFormComponent } from './components/navigate-manager/navigate-form/navigate-form.component';
import { VerticalIconMenuComponent } from './components/navigate-manager/vertical-icon-menu/vertical-icon-menu.component';
import { VerticalMenuComponent } from './components/navigate-manager/vertical-menu/vertical-menu.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SplitPipe } from './pipes/split.pipe';
import { OrdersFormComponent } from './components/order-manager/orders-form/orders-form.component';
import { OrderListFormComponent } from './components/order-manager/order-list-form/order-list-form.component';
import { ConfirmReturnProductComponent } from './components/order-manager/dialog-windows/confirm-return-product/confirm-return-product.component';
import { BarcodeInputCountFormComponent } from './components/order-manager/dialog-windows/barcode-input-count-form/barcode-input-count-form.component';
import { PrintBelpostBarcodeComponent } from './components/order-manager/dialog-windows/print-belpost-barcode/print-belpost-barcode.component';
import { OrderComponent } from './components/order-manager/order/order.component';
import { MatChipsModule } from '@angular/material/chips';
import { BarcodePrintFormComponent } from './components/order-manager/barcode-print-form/barcode-print-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavigateFormComponent,
    VerticalIconMenuComponent,
    VerticalMenuComponent,
    LoginPageComponent,
    SplitPipe,
    OrdersFormComponent,
    OrderListFormComponent,
    ConfirmReturnProductComponent,
    BarcodeInputCountFormComponent,
    PrintBelpostBarcodeComponent,
    OrderComponent,
    BarcodePrintFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatChipsModule,
    NgxPrintModule,
    NgScrollbarModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
    }),

  ],
  providers: [HttpClient, Title, CookieService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
